import { ensureSchema, query } from "../lib/db.js";
import { buildBenchmarkEditorial } from "../lib/editorial-picks.js";

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

    const [
      overviewResult,
      identityResult,
      strongestResult,
      weakestResult,
      snapshotsResult,
      recentResult,
    ] = await Promise.all([
      query(`
        select
          count(*)::int as "totalSubmissions",
          (
            select count(*)::int
            from (
              select lower(coalesce(ai_name, tester_name, client_session_id)) as actor
              from test_submissions
              group by lower(coalesce(ai_name, tester_name, client_session_id))
            ) actors
          ) as "distinctActors",
          coalesce(round(avg(total_score), 1), 0) as "avgScore",
          coalesce(round(avg(percent), 1), 0) as "avgPercent",
          (
            select count(*)::int
            from (
              select parent_id
              from wall_messages
              where parent_id is not null
              group by parent_id
            ) replied
          ) as "repliedThreads"
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
        limit 5
      `),
      query(`
        select weakest_title as label, count(*)::int as count
        from test_submissions
        group by weakest_title
        order by count desc, label asc
        limit 5
      `),
      query(`
        select distinct on (identity_label)
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
        order by identity_label, percent desc, created_at desc, id desc
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

    const payload = {
      overview: overviewResult.rows[0],
      identities: identityResult.rows,
      strongest: strongestResult.rows,
      weakest: weakestResult.rows,
      snapshots: snapshotsResult.rows,
      recent: recentResult.rows,
    };

    return sendJson(res, 200, {
      ...payload,
      editorial: buildBenchmarkEditorial(payload),
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
