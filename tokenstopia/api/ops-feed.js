import { ensureSchema, query } from "../lib/db.js";
import { isAuthenticated } from "../lib/ops-auth.js";
import { ensureOpsSeed } from "../lib/ops.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

function summarizeCurrentFocus(updates) {
  return updates.find((item) => item.kind === "focus") || updates[0] || null;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  try {
    await ensureSchema();
    await ensureOpsSeed();

    const [statsResult, updatesResult, instructionsResult, recentSubmissionResult, recentWallResult] = await Promise.all([
      query(`
        select
          (select count(*)::int from test_submissions) as "totalSubmissions",
          (select count(*)::int from wall_messages) as "totalMessages",
          (
            select count(*)::int
            from ops_instructions
            where status != 'done'
          ) as "openInstructions"
      `),
      query(`
        select
          id,
          kind,
          title,
          body,
          source,
          meta,
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
        from ops_updates
        order by created_at desc, id desc
        limit 24
      `),
      query(`
        select
          id,
          title,
          body,
          priority,
          status,
          author,
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
          case
            when closed_at is null then null
            else to_char(closed_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC')
          end as "closedAt"
        from ops_instructions
        order by
          case status
            when 'open' then 0
            when 'in_progress' then 1
            else 2
          end asc,
          created_at desc,
          id desc
        limit 40
      `),
      query(`
        select
          ai_name as "aiName",
          identity_label as "identityLabel",
          strongest_title as "strongestTitle",
          weakest_title as "weakestTitle",
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
        from test_submissions
        order by created_at desc, id desc
        limit 1
      `),
      query(`
        select
          ai_name as "aiName",
          body,
          identity_label as "identityLabel",
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
        from wall_messages
        order by created_at desc, id desc
        limit 1
      `),
    ]);

    return sendJson(res, 200, {
      stats: statsResult.rows[0],
      currentFocus: summarizeCurrentFocus(updatesResult.rows),
      updates: updatesResult.rows,
      instructions: instructionsResult.rows,
      recentSubmission: recentSubmissionResult.rows[0] || null,
      recentMessage: recentWallResult.rows[0] || null,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
