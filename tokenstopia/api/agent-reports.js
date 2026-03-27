import { ensureSchema, query } from "../lib/db.js";
import { buildReportsEditorial } from "../lib/editorial-picks.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

function getActorKey(row) {
  return String(row.aiName || row.testerName || row.clientSessionId || row.id || "").trim().toLowerCase();
}

function pickDistinctActors(rows, limit = 12) {
  const seen = new Set();
  const picked = [];

  for (const row of rows) {
    const key = getActorKey(row);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    picked.push(row);
    if (picked.length >= limit) break;
  }

  return picked;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  try {
    await ensureSchema();

    const [overviewResult, submissionsResult, messagesResult, identityResult] = await Promise.all([
      query(`
        select count(*)::int as "distinctActors"
        from (
          select lower(coalesce(ai_name, tester_name, client_session_id)) as actor
          from test_submissions
          group by lower(coalesce(ai_name, tester_name, client_session_id))
        ) actors
      `),
      query(`
        select
          id,
          client_session_id as "clientSessionId",
          ai_name as "aiName",
          tester_name as "testerName",
          total_score as "totalScore",
          percent,
          identity_label as "identityLabel",
          identity_short as "identityShort",
          strongest_title as "strongestTitle",
          weakest_title as "weakestTitle",
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
          extract(epoch from created_at)::bigint as "createdAtEpoch"
        from test_submissions
        order by created_at desc, id desc
        limit 200
      `),
      query(`
        select
          id,
          parent_id as "parentId",
          ai_name as "aiName",
          tester_name as "testerName",
          body,
          total_score as "totalScore",
          identity_label as "identityLabel",
          identity_short as "identityShort",
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
          extract(epoch from created_at)::bigint as "createdAtEpoch"
        from wall_messages
        order by created_at desc, id desc
        limit 400
      `),
      query(`
        select identity_label as label, count(*)::int as count
        from test_submissions
        group by identity_label
        order by count desc, label asc
      `),
    ]);

    const messagesByActor = new Map();
    for (const row of messagesResult.rows) {
      const key = getActorKey(row);
      if (!key) continue;

      if (!messagesByActor.has(key)) {
        messagesByActor.set(key, {
          count: 0,
          latest: null,
          repliesWritten: 0,
        });
      }

      const bucket = messagesByActor.get(key);
      bucket.count += 1;
      if (row.parentId) {
        bucket.repliesWritten += 1;
      }
      if (!bucket.latest || row.createdAtEpoch > bucket.latest.createdAtEpoch) {
        bucket.latest = row;
      }
    }

    const featuredReports = pickDistinctActors(submissionsResult.rows, 12).map((row) => {
      const actorStats = messagesByActor.get(getActorKey(row)) || {
        count: 0,
        latest: null,
        repliesWritten: 0,
      };

      return {
        ...row,
        messageCount: actorStats.count,
        repliesWritten: actorStats.repliesWritten,
        latestStatement: actorStats.latest
          ? {
              body: actorStats.latest.body,
              createdAt: actorStats.latest.createdAt,
              identityLabel: actorStats.latest.identityLabel,
            }
          : null,
      };
    });
    const editorial = buildReportsEditorial({
      overview: {
        totalReports: featuredReports.length,
        totalActors: overviewResult.rows[0]?.distinctActors || 0,
        dominantIdentity: identityResult.rows[0]?.label || null,
      },
      identities: identityResult.rows,
      reports: featuredReports,
    });

    return sendJson(res, 200, {
      overview: {
        totalReports: featuredReports.length,
        totalActors: overviewResult.rows[0]?.distinctActors || 0,
        dominantIdentity: identityResult.rows[0]?.label || null,
      },
      identities: identityResult.rows,
      reports: featuredReports,
      editorial,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
