import { buildReportFromOverview } from "../../analysis.js";
import { getSampleReport } from "../../analysis.js";
import { resolveTickerInput } from "../resolver/ticker-resolver.js";
import { fetchAlphaVantageStockSnapshot } from "../providers/alphavantage-provider.js";
import { fetchYahooFinanceStockSnapshot } from "../providers/yahoo-finance-provider.js";

async function tryLiveProviders({ ticker, apiKey }) {
  const providers = [];

  if (apiKey) {
    providers.push({
      name: "alpha-vantage",
      load: () => fetchAlphaVantageStockSnapshot({ ticker, apiKey }),
    });
  }

  providers.push({
    name: "yahoo-finance",
    load: () => fetchYahooFinanceStockSnapshot({ ticker }),
  });

  const errors = [];

  for (const provider of providers) {
    try {
      const snapshot = await provider.load();
      return {
        provider: provider.name,
        snapshot,
        errors,
      };
    } catch (error) {
      errors.push({
        provider: provider.name,
        message: error.message || "unknown",
      });
    }
  }

  throw new Error(JSON.stringify(errors));
}

export async function analyzeStockInput({ rawTicker, language, apiKey }) {
  const ticker = resolveTickerInput(rawTicker);

  try {
    const { provider, snapshot, errors } = await tryLiveProviders({
      ticker,
      apiKey,
    });

    const report = buildReportFromOverview({
      ticker,
      overview: snapshot.overview,
      quote: snapshot.quote,
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
        hasAlphaVantageKey: Boolean(apiKey),
        keyLength: apiKey ? apiKey.length : 0,
        liveProvider: provider,
        providerErrors: errors,
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
          hasAlphaVantageKey: Boolean(apiKey),
          keyLength: apiKey ? apiKey.length : 0,
          fetchError: error.message || "unknown",
        },
      };
    }

    return {
      ok: false,
      status: 502,
      body: {
        error: "Live data is unavailable for this ticker right now. Try a different market code, or test again later.",
      },
      meta: {
        resolvedTicker: ticker,
        hasAlphaVantageKey: Boolean(apiKey),
        keyLength: apiKey ? apiKey.length : 0,
        fetchError: error.message || "unknown",
      },
    };
  }
}
