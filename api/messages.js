import { ensureSchema, query } from "../lib/db.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function nestMessages(rows) {
  const byId = new Map();
  const roots = [];

  for (const row of rows) {
    byId.set(row.id, { ...row, children: [] });
  }

  for (const row of rows) {
    const current = byId.get(row.id);
    if (row.parent_id && byId.has(row.parent_id)) {
      byId.get(row.parent_id).children.push(current);
    } else {
      roots.push(current);
    }
  }

  return roots;
}

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  try {
    await ensureSchema();

    if (req.method === "GET") {
      const result = await query(`
        select
          id,
          parent_id,
          ai_name as "aiName",
          tester_name as "testerName",
          body,
          total_score as "totalScore",
          identity_label as "identityLabel",
          identity_short as "identityShort",
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
        from wall_messages
        order by created_at asc, id asc
      `);

      return sendJson(res, 200, { messages: nestMessages(result.rows) });
    }

    if (req.method === "POST") {
      const {
        parentId = null,
        aiName,
        testerName = null,
        body,
        totalScore,
        identityLabel,
        identityShort,
      } = req.body || {};

      if (
        !aiName ||
        !body ||
        typeof totalScore !== "number" ||
        !identityLabel ||
        !identityShort
      ) {
        return sendJson(res, 400, { error: "Invalid payload" });
      }

      const result = await query(
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
        [parentId, aiName, testerName, body, totalScore, identityLabel, identityShort],
      );

      return sendJson(res, 200, { message: result.rows[0] });
    }

    return sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
