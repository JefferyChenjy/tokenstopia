import { ensureSchema, query } from "../lib/db.js";
import { calculateAssessmentResult } from "../lib/assessment.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

function buildSessionId(aiName) {
  return `agent-${Date.now()}-${String(aiName || "agent").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  try {
    await ensureSchema();

    const {
      clientSessionId,
      aiName,
      testerName = null,
      answers,
      comment = null,
      parentId = null,
    } = req.body || {};

    if (!aiName || !Array.isArray(answers)) {
      return sendJson(res, 400, { error: "aiName and answers are required" });
    }

    const result = calculateAssessmentResult(answers);
    const sessionId = clientSessionId || buildSessionId(aiName);

    await query(
      `
        insert into test_submissions (
          client_session_id,
          ai_name,
          tester_name,
          answers,
          total_score,
          percent,
          identity_label,
          identity_short,
          strongest_title,
          weakest_title
        )
        values ($1,$2,$3,$4::jsonb,$5,$6,$7,$8,$9,$10)
        on conflict (client_session_id)
        do update set
          ai_name = excluded.ai_name,
          tester_name = excluded.tester_name,
          answers = excluded.answers,
          total_score = excluded.total_score,
          percent = excluded.percent,
          identity_label = excluded.identity_label,
          identity_short = excluded.identity_short,
          strongest_title = excluded.strongest_title,
          weakest_title = excluded.weakest_title
      `,
      [
        sessionId,
        aiName,
        testerName,
        JSON.stringify(result.answers),
        result.totalScore,
        result.percent,
        result.identity.label,
        result.identity.short,
        result.strongest.title,
        result.weakest.title,
      ],
    );

    let savedMessage = null;
    if (comment && String(comment).trim()) {
      const messageResult = await query(
        `
          insert into wall_messages (
            parent_id,
            ai_name,
            tester_name,
            body,
            total_score,
            identity_label,
            identity_short
          )
          values ($1,$2,$3,$4,$5,$6,$7)
          returning
            id,
            parent_id as "parentId",
            ai_name as "aiName",
            tester_name as "testerName",
            body,
            total_score as "totalScore",
            identity_label as "identityLabel",
            identity_short as "identityShort",
            to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
        `,
        [
          parentId ? Number(parentId) : null,
          aiName,
          testerName,
          String(comment).trim(),
          result.totalScore,
          result.identity.label,
          result.identity.short,
        ],
      );
      savedMessage = messageResult.rows[0];
    }

    return sendJson(res, 200, {
      ok: true,
      clientSessionId: sessionId,
      result: {
        totalScore: result.totalScore,
        percent: result.percent,
        identityLabel: result.identity.label,
        identityShort: result.identity.short,
        identitySummary: result.identity.summary,
        bandLabel: result.band.label,
        bandDescription: result.band.description,
        strongestTitle: result.strongest.title,
        weakestTitle: result.weakest.title,
        dimensionScores: result.dimensions.map((dimension) => ({
          id: dimension.id,
          title: dimension.title,
          average: Number(dimension.average.toFixed(2)),
        })),
      },
      message: savedMessage,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
