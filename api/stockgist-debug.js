function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const key = process.env.ALPHAVANTAGE_API_KEY || "";

  return sendJson(res, 200, {
    hasAlphaVantageKey: Boolean(key),
    keyLength: key.length,
    maskedKey: key ? `${key.slice(0, 2)}***${key.slice(-2)}` : null,
    nodeEnv: process.env.NODE_ENV || null,
  });
}
