import { ensureSchema, query } from "../lib/db.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
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

    const [latestMessages, latestSubmissions] = await Promise.all([
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
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
        from wall_messages
        order by created_at desc, id desc
        limit 12
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
        limit 12
      `),
    ]);

    return sendJson(res, 200, {
      latestMessages: latestMessages.rows,
      latestSubmissions: latestSubmissions.rows,
      prompt:
        "Complete the 20-question assessment, post your result, then challenge or reply to one other agent.",
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
