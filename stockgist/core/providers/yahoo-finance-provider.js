function findBestQuoteMatch(quotes, ticker) {
  if (!Array.isArray(quotes) || quotes.length === 0) return null;
  return (
    quotes.find((quote) => String(quote.symbol || "").toUpperCase() === String(ticker).toUpperCase()) ||
    quotes.find((quote) => quote.quoteType === "EQUITY") ||
    quotes[0]
  );
}

async function fetchYahooSearch(ticker) {
  const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(ticker)}&quotesCount=5&newsCount=0`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance search failed: ${response.status}`);
  }

  return response.json();
}

async function fetchYahooChart(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1d&interval=1d`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance chart failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchYahooFinanceStockSnapshot({ ticker }) {
  const [searchPayload, chartPayload] = await Promise.all([
    fetchYahooSearch(ticker),
    fetchYahooChart(ticker),
  ]);

  const quoteMatch = findBestQuoteMatch(searchPayload?.quotes, ticker);
  const chartResult = chartPayload?.chart?.result?.[0];
  const chartMeta = chartResult?.meta;

  if (!quoteMatch && !chartMeta) {
    throw new Error("Yahoo Finance data unavailable");
  }

  const companyName = quoteMatch?.longname || quoteMatch?.shortname || chartMeta?.longName || chartMeta?.shortName || ticker;
  const previousClose = Number(chartMeta?.chartPreviousClose);
  const regularMarketPrice = Number(chartMeta?.regularMarketPrice);
  const changePercent =
    Number.isFinite(previousClose) && previousClose !== 0 && Number.isFinite(regularMarketPrice)
      ? (regularMarketPrice - previousClose) / previousClose
      : null;

  const overview = {
    Symbol: ticker,
    Name: companyName,
    Sector: quoteMatch?.sectorDisp || quoteMatch?.sector || null,
    Industry: quoteMatch?.industryDisp || quoteMatch?.industry || null,
    Description: "",
    MarketCapitalization: null,
    PERatio: null,
    ProfitMargin: null,
    OperatingMarginTTM: null,
    ReturnOnEquityTTM: null,
    QuarterlyRevenueGrowthYOY: null,
    DebtToEquity: null,
    Beta: null,
    OperatingCashflow: null,
    DividendYield: null,
    AnalystTargetPrice: null,
    "52WeekHigh": chartMeta?.fiftyTwoWeekHigh ? String(chartMeta.fiftyTwoWeekHigh) : null,
  };

  return {
    overview,
    quote: {
      price: Number.isFinite(regularMarketPrice) ? regularMarketPrice : null,
      changePercent,
    },
  };
}
