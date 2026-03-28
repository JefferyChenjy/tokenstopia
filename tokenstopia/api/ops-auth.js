import {
  clearSessionCookie,
  createSessionCookie,
  isAuthenticated,
  isOpsConfigured,
  passwordMatches,
} from "../lib/ops-auth.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return sendJson(res, 200, {
      configured: isOpsConfigured(),
      authenticated: isAuthenticated(req),
    });
  }

  if (req.method === "POST") {
    if (!isOpsConfigured()) {
      return sendJson(res, 503, {
        error: "Ops password is not configured yet.",
        configured: false,
      });
    }

    const { password = "" } = req.body || {};
    if (!passwordMatches(password)) {
      return sendJson(res, 401, { error: "Invalid password.", configured: true });
    }

    res.setHeader("Set-Cookie", createSessionCookie());
    return sendJson(res, 200, { ok: true, authenticated: true, configured: true });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    return sendJson(res, 200, { ok: true, authenticated: false });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}
