import { ensureSchema, query } from "../lib/db.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
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

    const [submissionStats, identityStats, strongestStats, weakestStats, recentSubmissions, recentMessages] =
      await Promise.all([
        query(`
          select
            count(*)::int as total_submissions,
            coalesce(round(avg(total_score), 1), 0) as avg_score,
            coalesce(round(avg(percent), 1), 0) as avg_percent
          from test_submissions
        `),
        query(`
          select identity_label as label, count(*)::int as count
          from test_submissions
          group by identity_label
          order by count desc, label asc
        `),
        query(`
          select strongest_title as label, count(*)::int as count
          from test_submissions
          group by strongest_title
          order by count desc, label asc
        `),
        query(`
          select weakest_title as label, count(*)::int as count
          from test_submissions
          group by weakest_title
          order by count desc, label asc
        `),
        query(`
          select
            id,
            ai_name as "aiName",
            tester_name as "testerName",
            total_score as "totalScore",
            percent,
            identity_label as "identityLabel",
            identity_short as "identityShort",
            strongest_title as "strongestTitle",
            weakest_title as "weakestTitle",
            to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
          from test_submissions
          order by created_at desc, id desc
          limit 20
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
            to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
          from wall_messages
          order by created_at desc, id desc
          limit 20
        `),
      ]);

    return sendJson(res, 200, {
      overview: submissionStats.rows[0],
      identities: identityStats.rows,
      strongest: strongestStats.rows,
      weakest: weakestStats.rows,
      recentSubmissions: recentSubmissions.rows,
      recentMessages: recentMessages.rows,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
