import { getSampleReport } from "../../analysis.js";

export async function requestStockAnalysis({ ticker, language, t }) {
  const response = await fetch(
    `/api/stockgist-analyze?ticker=${encodeURIComponent(ticker)}&lang=${language}&_=${Date.now()}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || t("errorFallback"));
  }

  return data.report;
}

export async function loadStockAnalysis({ rawTicker, language, t }) {
  const ticker = rawTicker.trim().toUpperCase();

  if (!ticker) {
    return {
      ticker,
      report: null,
      errorMessage: null,
    };
  }

  try {
    const report = await requestStockAnalysis({ ticker, language, t });
    return {
      ticker,
      report,
      errorMessage: null,
    };
  } catch (error) {
    const fallbackReport = getSampleReport(ticker);
    if (fallbackReport) {
      return {
        ticker,
        report: fallbackReport,
        errorMessage: t("errorFallback"),
      };
    }

    return {
      ticker,
      report: null,
      errorMessage: error.message || t("errorUnknown"),
    };
  }
}
