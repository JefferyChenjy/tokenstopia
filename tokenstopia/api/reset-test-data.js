import { ensureSchema, query } from "../lib/db.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  const { confirm } = req.body || {};
  if (confirm !== "delete-tokenstopia-test-data") {
    return sendJson(res, 400, { error: "Confirmation phrase mismatch" });
  }

  try {
    await ensureSchema();
    await query("delete from wall_messages");
    await query("delete from test_submissions");

    return sendJson(res, 200, {
      ok: true,
      message: "All Tokenstopia test submissions and wall messages were deleted.",
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
