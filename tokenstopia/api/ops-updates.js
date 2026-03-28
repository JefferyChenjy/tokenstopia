import { ensureSchema, query } from "../lib/db.js";
import { isAuthenticated } from "../lib/ops-auth.js";
import { sanitizeOpsText } from "../lib/ops.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    await ensureSchema();

    const kind = sanitizeOpsText(req.body?.kind, 24) || "status";
    const title = sanitizeOpsText(req.body?.title, 140);
    const body = sanitizeOpsText(req.body?.body, 2400);
    const source = sanitizeOpsText(req.body?.source, 40) || "assistant";
    const meta = req.body?.meta && typeof req.body.meta === "object" ? req.body.meta : {};

    if (!title || !body) {
      return sendJson(res, 400, { error: "Title and body are required." });
    }

    const result = await query(
      `
        insert into ops_updates (kind, title, body, source, meta)
        values ($1, $2, $3, $4, $5::jsonb)
        returning
          id,
          kind,
          title,
          body,
          source,
          meta,
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
      `,
      [kind, title, body, source, JSON.stringify(meta)],
    );

    return sendJson(res, 200, { update: result.rows[0] });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
