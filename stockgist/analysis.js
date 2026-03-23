import { SAMPLE_REPORTS } from "./reports.js";
import { resolveTickerInput } from "./core/resolver/ticker-resolver.js";
export { buildReportFromOverview } from "./core/analyzers/report-analyzer.js";

export function getSampleReport(ticker) {
  const resolvedTicker = resolveTickerInput(ticker);
  return SAMPLE_REPORTS[resolvedTicker] || null;
}
