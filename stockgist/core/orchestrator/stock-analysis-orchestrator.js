import { buildReportFromOverview } from "../../analysis.js";
import { getSampleReport } from "../../analysis.js";
import { resolveTickerInput } from "../resolver/ticker-resolver.js";
import { fetchAlphaVantageStockSnapshot } from "../providers/alphavantage-provider.js";

export async function analyzeStockInput({ rawTicker, language, apiKey }) {
  const ticker = resolveTickerInput(rawTicker);

  if (apiKey) {
    try {
      const { overview, quote } = await fetchAlphaVantageStockSnapshot({
        ticker,
        apiKey,
      });

      const report = buildReportFromOverview({
        ticker,
        overview,
        quote,
        language,
      });

      return {
        ok: true,
        status: 200,
        body: {
          report,
          source: "live",
        },
        meta: {
          resolvedTicker: ticker,
          hasAlphaVantageKey: true,
          keyLength: apiKey.length,
        },
      };
    } catch (error) {
      const sample = getSampleReport(ticker);
      if (sample) {
        return {
          ok: true,
          status: 200,
          body: {
            report: sample,
            source: "sample",
            warning: "Live data fetch failed, served sample profile instead.",
          },
          meta: {
            resolvedTicker: ticker,
            hasAlphaVantageKey: true,
            keyLength: apiKey.length,
            fetchError: error.message || "unknown",
          },
        };
      }

      return {
        ok: false,
        status: 502,
        body: {
          error: error.message || "Failed to analyze ticker",
        },
        meta: {
          resolvedTicker: ticker,
          hasAlphaVantageKey: true,
          keyLength: apiKey.length,
        },
      };
    }
  }

  const sample = getSampleReport(ticker);
  if (sample) {
    return {
      ok: true,
      status: 200,
      body: {
        report: sample,
        source: "sample",
        warning: "ALPHAVANTAGE_API_KEY is not configured, served sample profile instead.",
      },
      meta: {
        resolvedTicker: ticker,
        hasAlphaVantageKey: false,
        keyLength: 0,
      },
    };
  }

  return {
    ok: false,
    status: 503,
    body: {
      error: "Live analysis requires ALPHAVANTAGE_API_KEY. Sample mode currently supports AAPL, NVDA, MSFT, and TSLA.",
    },
    meta: {
      resolvedTicker: ticker,
      hasAlphaVantageKey: false,
      keyLength: 0,
    },
  };
}
