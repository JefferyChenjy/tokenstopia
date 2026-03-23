import { analyzeStockInput } from "../stockgist/core/orchestrator/stock-analysis-orchestrator.js";

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

  const rawTicker = String(req.query?.ticker || "").trim();
  const language = String(req.query?.lang || "en").trim().toLowerCase() === "zh" ? "zh" : "en";
  const debug = String(req.query?.debug || "") === "1";

  if (!rawTicker) {
    return sendJson(res, 400, { error: "Ticker is required" });
  }

  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  const result = await analyzeStockInput({
    rawTicker,
    language,
    apiKey,
  });

  return sendJson(res, result.status, {
    ...result.body,
    ...(debug ? { debug: result.meta } : {}),
  });
}
