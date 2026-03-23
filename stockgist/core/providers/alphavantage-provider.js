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

export async function fetchAlphaVantageStockSnapshot({ ticker, apiKey }) {
  const [overview, globalQuote] = await Promise.all([
    fetchAlphaVantage("OVERVIEW", ticker, apiKey),
    fetchAlphaVantage("GLOBAL_QUOTE", ticker, apiKey),
  ]);

  if (!overview?.Symbol || overview?.Information || overview?.Note) {
    throw new Error("Live overview data unavailable");
  }

  const quote = globalQuote?.["Global Quote"]
    ? {
        price: Number(globalQuote["Global Quote"]["05. price"]),
        changePercent: parseChangePercent(globalQuote["Global Quote"]["10. change percent"]),
      }
    : null;

  return {
    overview,
    quote,
  };
}
