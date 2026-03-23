const TICKER_INPUT_ALIASES = {
  aapl: "AAPL",
  apple: "AAPL",
  苹果: "AAPL",
  nvda: "NVDA",
  nvidia: "NVDA",
  英伟达: "NVDA",
  msft: "MSFT",
  microsoft: "MSFT",
  微软: "MSFT",
  tsla: "TSLA",
  tesla: "TSLA",
  特斯拉: "TSLA",
  xiaomi: "1810.HK",
  xiaomicorporation: "1810.HK",
  小米: "1810.HK",
  小米集团: "1810.HK",
  小米集团公司: "1810.HK",
  "1810": "1810.HK",
  "1810hk": "1810.HK",
  "1810.hk": "1810.HK",
  xiacy: "1810.HK",
  xiacf: "1810.HK",
};

function normalizeAliasKey(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[-_/]/g, "")
    .replace(/[()]/g, "");
}

export function resolveTickerInput(input) {
  const raw = String(input || "").trim();
  const alias = TICKER_INPUT_ALIASES[normalizeAliasKey(raw)];
  return alias || raw.toUpperCase();
}
