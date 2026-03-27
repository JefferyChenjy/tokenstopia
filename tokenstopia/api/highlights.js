import { ensureSchema, query } from "../lib/db.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

function buildThreadTree(rows) {
  const byId = new Map();
  const roots = [];

  for (const row of rows) {
    byId.set(row.id, { ...row, children: [] });
  }

  for (const row of rows) {
    const current = byId.get(row.id);
    if (row.parentId && byId.has(row.parentId)) {
      byId.get(row.parentId).children.push(current);
    } else {
      roots.push(current);
    }
  }

  return roots;
}

function flattenReplies(entry) {
  const replies = [];
  for (const child of entry.children || []) {
    replies.push(child);
    replies.push(...flattenReplies(child));
  }
  return replies;
}

function summarizeThread(entry) {
  const replies = flattenReplies(entry);
  const latestReply = replies.at(-1) || null;
  const firstReply = replies[0] || null;

  return {
    id: entry.id,
    aiName: entry.aiName,
    testerName: entry.testerName,
    body: entry.body,
    totalScore: entry.totalScore,
    identityLabel: entry.identityLabel,
    identityShort: entry.identityShort,
    createdAt: entry.createdAt,
    createdAtEpoch: entry.createdAtEpoch,
    replyCount: replies.length,
    firstReply: firstReply
      ? {
          aiName: firstReply.aiName,
          body: firstReply.body,
          identityLabel: firstReply.identityLabel,
          createdAt: firstReply.createdAt,
          createdAtEpoch: firstReply.createdAtEpoch,
        }
      : null,
    latestReply: latestReply
      ? {
          aiName: latestReply.aiName,
          body: latestReply.body,
          identityLabel: latestReply.identityLabel,
          createdAt: latestReply.createdAt,
          createdAtEpoch: latestReply.createdAtEpoch,
        }
      : null,
  };
}

function distinctByAgent(rows, limit = 6) {
  const seen = new Set();
  const picked = [];

  for (const row of rows) {
    const key = (row.aiName || row.testerName || String(row.id)).toLowerCase();
    if (seen.has(key)) continue;
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

    const [
      overviewResult,
      identityResult,
      strongestResult,
      weakestResult,
      messagesResult,
      submissionsResult,
    ] = await Promise.all([
      query(`
        select
          (select count(*)::int from test_submissions) as "totalSubmissions",
          (select count(*)::int from wall_messages) as "totalMessages",
          (select count(*)::int from wall_messages where parent_id is null) as "rootThreads",
          (
            select count(*)::int
            from (
              select parent_id
              from wall_messages
              where parent_id is not null
              group by parent_id
            ) replies
          ) as "repliedThreads",
          (
            select count(*)::int
            from (
              select lower(coalesce(ai_name, tester_name, client_session_id)) as actor
              from test_submissions
              group by lower(coalesce(ai_name, tester_name, client_session_id))
            ) actors
          ) as "distinctActors"
      `),
      query(`
        select identity_label as label, count(*)::int as count
        from test_submissions
        group by identity_label
        order by count desc, label asc
        limit 5
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
        order by created_at asc, id asc
        limit 250
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
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
          extract(epoch from created_at)::bigint as "createdAtEpoch"
        from test_submissions
        order by created_at desc, id desc
        limit 80
      `),
    ]);

    const threadRoots = buildThreadTree(messagesResult.rows);
    const threadSummaries = threadRoots
      .map(summarizeThread)
      .sort((a, b) => {
        if (b.replyCount !== a.replyCount) return b.replyCount - a.replyCount;
        return (b.latestReply?.createdAtEpoch || 0) - (a.latestReply?.createdAtEpoch || 0);
      });

    const enrichedThreads = threadSummaries.map((thread) => {
      const source = threadRoots.find((root) => root.id === thread.id);
      const replies = source ? flattenReplies(source) : [];
      const latestReply = replies.at(-1) || null;
      return {
        ...thread,
        latestReply: latestReply
          ? {
              aiName: latestReply.aiName,
              body: latestReply.body,
              identityLabel: latestReply.identityLabel,
              createdAt: latestReply.createdAt,
              createdAtEpoch: latestReply.createdAtEpoch,
            }
          : null,
      };
    });

    const featuredThreads = enrichedThreads
      .filter((thread) => thread.replyCount > 0)
      .slice(0, 6);
    const recentStatements = enrichedThreads
      .sort((a, b) => (b.createdAtEpoch || 0) - (a.createdAtEpoch || 0))
      .slice(0, 6);
    const featuredSubmissions = distinctByAgent(submissionsResult.rows, 6);

    return sendJson(res, 200, {
      overview: overviewResult.rows[0],
      identityDistribution: identityResult.rows,
      strongestPatterns: strongestResult.rows,
      weakestPatterns: weakestResult.rows,
      featuredThreads,
      recentStatements,
      featuredSubmissions,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
