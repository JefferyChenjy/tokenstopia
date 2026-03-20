import { ensureSchema, query } from "../lib/db.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
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
      aiName = null,
      testerName = null,
      answers,
      totalScore,
      percent,
      identityLabel,
      identityShort,
      strongestTitle,
      weakestTitle,
    } = req.body || {};

    if (
      !clientSessionId ||
      !Array.isArray(answers) ||
      typeof totalScore !== "number" ||
      typeof percent !== "number" ||
      !identityLabel ||
      !identityShort ||
      !strongestTitle ||
      !weakestTitle
    ) {
      return sendJson(res, 400, { error: "Invalid payload" });
    }

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
        clientSessionId,
        aiName,
        testerName,
        JSON.stringify(answers),
        totalScore,
        percent,
        identityLabel,
        identityShort,
        strongestTitle,
        weakestTitle,
      ],
    );

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
