import { ensureSchema, query } from "../lib/db.js";
import { isAuthenticated } from "../lib/ops-auth.js";
import { normalizeInstructionStatus, normalizePriority, sanitizeOpsText } from "../lib/ops.js";

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

  try {
    await ensureSchema();

    if (req.method === "POST") {
      const title = sanitizeOpsText(req.body?.title, 140);
      const body = sanitizeOpsText(req.body?.body, 2400);
      const priority = normalizePriority(req.body?.priority);

      if (!title || !body) {
        return sendJson(res, 400, { error: "Title and body are required." });
      }

      const result = await query(
        `
          insert into ops_instructions (title, body, priority, status, author)
          values ($1, $2, $3, 'open', 'human')
          returning
            id,
            title,
            body,
            priority,
            status,
            author,
            to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
            null::text as "closedAt"
        `,
        [title, body, priority],
      );

      return sendJson(res, 200, { instruction: result.rows[0] });
    }

    if (req.method === "PATCH") {
      const id = Number(req.body?.id);
      const status = normalizeInstructionStatus(req.body?.status);

      if (!id) {
        return sendJson(res, 400, { error: "Instruction id is required." });
      }

      const result = await query(
        `
          update ops_instructions
          set
            status = $2,
            closed_at = case when $2 = 'done' then now() else null end
          where id = $1
          returning
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
        `,
        [id, status],
      );

      if (!result.rows[0]) {
        return sendJson(res, 404, { error: "Instruction not found." });
      }

      return sendJson(res, 200, { instruction: result.rows[0] });
    }

    return sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
