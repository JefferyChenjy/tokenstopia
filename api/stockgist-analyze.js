import { buildReportFromOverview, getSampleReport } from "../stockgist/analysis.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function parseChangePercent(value) {
  if (!value) return null;
  return Number(String(value).replace("%", "")) / 100;
}

async function fetchAlphaVantage(functionName, symbol, apiKey) {
  const url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Alpha Vantage request failed: ${response.status}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const ticker = String(req.query?.ticker || "").trim().toUpperCase();
  const language = String(req.query?.lang || "en").trim().toLowerCase() === "zh" ? "zh" : "en";
  const debug = String(req.query?.debug || "") === "1";

  if (!ticker) {
    return sendJson(res, 400, { error: "Ticker is required" });
  }

  const apiKey = process.env.ALPHAVANTAGE_API_KEY;

  if (apiKey) {
    try {
      const [overview, globalQuote] = await Promise.all([
        fetchAlphaVantage("OVERVIEW", ticker, apiKey),
        fetchAlphaVantage("GLOBAL_QUOTE", ticker, apiKey),
      ]);

      if (overview?.Symbol && !overview?.Information && !overview?.Note) {
        const quote = globalQuote?.["Global Quote"]
          ? {
              price: Number(globalQuote["Global Quote"]["05. price"]),
              changePercent: parseChangePercent(globalQuote["Global Quote"]["10. change percent"]),
            }
          : null;

        const report = buildReportFromOverview({ ticker, overview, quote, language });
        return sendJson(res, 200, {
          report,
          source: "live",
          ...(debug
            ? {
                debug: {
                  hasAlphaVantageKey: true,
                  keyLength: apiKey.length,
                },
              }
            : {}),
        });
      }
    } catch (error) {
      const sample = getSampleReport(ticker);
      if (sample) {
        return sendJson(res, 200, {
          report: sample,
          source: "sample",
          warning: "Live data fetch failed, served sample profile instead.",
          ...(debug
            ? {
                debug: {
                  hasAlphaVantageKey: true,
                  keyLength: apiKey.length,
                  fetchError: error.message || "unknown",
                },
              }
            : {}),
        });
      }
      return sendJson(res, 502, {
        error: error.message || "Failed to analyze ticker",
        ...(debug
          ? {
              debug: {
                hasAlphaVantageKey: true,
                keyLength: apiKey.length,
              },
            }
          : {}),
      });
    }
  }

  const sample = getSampleReport(ticker);
  if (sample) {
    return sendJson(res, 200, {
      report: sample,
      source: "sample",
      warning: "ALPHAVANTAGE_API_KEY is not configured, served sample profile instead.",
      ...(debug
        ? {
            debug: {
              hasAlphaVantageKey: false,
              keyLength: 0,
            },
          }
        : {}),
    });
  }

  return sendJson(res, 503, {
    error: "Live analysis requires ALPHAVANTAGE_API_KEY. Sample mode currently supports AAPL, NVDA, MSFT, and TSLA.",
    ...(debug
      ? {
          debug: {
            hasAlphaVantageKey: false,
            keyLength: 0,
          },
        }
      : {}),
  });
}
