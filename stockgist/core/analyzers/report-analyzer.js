function toNumber(value) {
  if (value === undefined || value === null || value === "" || value === "None") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatPercent(value) {
  if (value === null) return null;
  return `${(value * 100).toFixed(1)}%`;
}

function ratingLabel(score) {
  if (score >= 8) return "Strong";
  if (score >= 5) return "Medium";
  return "Weak";
}

function verdictDirection(score) {
  if (score >= 8) return "up";
  if (score >= 5) return "neutral";
  return "down";
}

function verdictIcon(direction) {
  if (direction === "up") return "↑";
  if (direction === "down") return "↓";
  return "•";
}

function summarizeBusiness(name, sector, industry, description, language) {
  const trimmed = description?.split(". ").slice(0, 2).join(". ");
  if (language === "zh") {
    if (trimmed) return `${name} 属于${sector || "相关行业"}，主要在${industry || "所在赛道"}经营。${trimmed}`;
    return `${name} 属于${sector || "相关行业"}，主要在${industry || "所在赛道"}经营，核心逻辑需要结合它的收入来源和行业位置一起看。`;
  }

  if (trimmed) return `${name} operates in ${sector || "its sector"}, mainly through ${industry || "its core industry"}. ${trimmed}`;
  return `${name} operates in ${sector || "its sector"}, mainly through ${industry || "its core industry"}, so the core question is how durable that revenue engine really is.`;
}

function summarizeMoat(name, score, margin, roe, language) {
  const label = ratingLabel(score);
  const marginText = formatPercent(margin);
  const roeText = formatPercent(roe);
  if (language === "zh") {
    if (label === "Strong") {
      return `${name} 的盈利能力和资本回报都不差${marginText ? `，利润率约 ${marginText}` : ""}${roeText ? `，ROE 约 ${roeText}` : ""}，说明它可能具备一定定价权、规模优势或客户粘性。`;
    }
    if (label === "Medium") {
      return `${name} 可能有一定竞争优势，但护城河未必深到可以高枕无忧。${marginText ? `利润率约 ${marginText}` : ""}${roeText ? `，ROE 约 ${roeText}` : ""}。`;
    }
    return `${name} 的竞争优势看起来没有那么稳，盈利质量或资本回报没有明显强到可以自动说明护城河很深。`;
  }

  if (label === "Strong") {
    return `${name} shows signs of a real moat${marginText ? ` with margins around ${marginText}` : ""}${roeText ? ` and ROE near ${roeText}` : ""}, which usually points to some combination of pricing power, scale, or sticky customers.`;
  }
  if (label === "Medium") {
    return `${name} likely has some competitive edge, but not the kind of moat you can treat as untouchable.${marginText ? ` Margins are around ${marginText}` : ""}${roeText ? ` and ROE is around ${roeText}` : ""}.`;
  }
  return `${name} does not yet look obviously protected by a deep moat. Profitability and capital returns are not strong enough to make that case on their own.`;
}

function summarizeRisks(beta, revenueGrowth, debtToEquity, language) {
  const risks = [];
  if (beta !== null && beta > 1.4) risks.push(language === "zh" ? "股价波动偏大" : "share-price volatility is high");
  if (revenueGrowth !== null && revenueGrowth < 0.03) risks.push(language === "zh" ? "收入增长偏慢" : "revenue growth looks soft");
  if (debtToEquity !== null && debtToEquity > 120) risks.push(language === "zh" ? "杠杆不算低" : "leverage is not light");
  if (risks.length === 0) {
    return language === "zh"
      ? "当前最大的风险更可能来自估值、行业周期变化或执行偏差，而不是某一个单独财务指标突然恶化。"
      : "The bigger risks may come from valuation, industry cyclicality, or execution slippage rather than a single obvious financial red flag.";
  }
  return language === "zh"
    ? `目前值得盯紧的点包括：${risks.join("、")}。`
    : `The main pressure points right now are that ${risks.join(", ")}.`;
}

function summarizeFinancials(marketCap, margin, revenueGrowth, debtToEquity, language) {
  const marketCapText =
    marketCap === null
      ? null
      : marketCap >= 1e12
        ? `${(marketCap / 1e12).toFixed(2)}T`
        : marketCap >= 1e9
          ? `${(marketCap / 1e9).toFixed(1)}B`
          : `${(marketCap / 1e6).toFixed(1)}M`;

  if (language === "zh") {
    return [
      marketCapText ? `当前市值大约 ${marketCapText}` : null,
      margin !== null ? `净利率约 ${formatPercent(margin)}` : null,
      revenueGrowth !== null ? `收入增速约 ${formatPercent(revenueGrowth)}` : null,
      debtToEquity !== null ? `债务股本比约 ${debtToEquity.toFixed(1)}` : null,
    ]
      .filter(Boolean)
      .join("，");
  }

  return [
    marketCapText ? `Market cap is roughly ${marketCapText}` : null,
    margin !== null ? `net margin is around ${formatPercent(margin)}` : null,
    revenueGrowth !== null ? `revenue growth is around ${formatPercent(revenueGrowth)}` : null,
    debtToEquity !== null ? `debt to equity is about ${debtToEquity.toFixed(1)}` : null,
  ]
    .filter(Boolean)
    .join(", ");
}

function summarizeValuation(name, peRatio, marketCap, revenueGrowth, language) {
  const peText = peRatio !== null ? peRatio.toFixed(1) : null;
  const marketCapText =
    marketCap === null
      ? null
      : marketCap >= 1e12
        ? `${(marketCap / 1e12).toFixed(2)}T`
        : marketCap >= 1e9
          ? `${(marketCap / 1e9).toFixed(1)}B`
          : `${(marketCap / 1e6).toFixed(1)}M`;

  if (language === "zh") {
    if (peRatio !== null && peRatio > 30) {
      return `${name} 当前估值不便宜${peText ? `，PE 大约 ${peText}` : ""}。如果未来增长不能持续兑现，高估值会先压回报。`;
    }
    if (peRatio !== null && peRatio < 18) {
      return `${name} 的估值看起来不算激进${peText ? `，PE 大约 ${peText}` : ""}${marketCapText ? `，当前市值约 ${marketCapText}` : ""}，关键在于基本面是否足够稳。`;
    }
    return `${name} 的估值处在需要结合增长一起看的区间${peText ? `，PE 大约 ${peText}` : ""}${revenueGrowth !== null ? `，收入增速约 ${formatPercent(revenueGrowth)}` : ""}。`;
  }

  if (peRatio !== null && peRatio > 30) {
    return `${name} is not trading like a cheap stock${peText ? ` with a P/E around ${peText}` : ""}. If growth slips, valuation can become the first source of pain.`;
  }
  if (peRatio !== null && peRatio < 18) {
    return `${name} does not look aggressively priced${peText ? ` at roughly ${peText}x earnings` : ""}${marketCapText ? ` on a market cap near ${marketCapText}` : ""}. The real question is whether the business deserves more trust.`;
  }
  return `${name} sits in a valuation range that still needs context${peText ? ` with a P/E around ${peText}` : ""}${revenueGrowth !== null ? ` and revenue growth near ${formatPercent(revenueGrowth)}` : ""}.`;
}

function summarizeCapitalAllocation(name, freeCashFlow, roe, dividendYield, language) {
  const fcfText =
    freeCashFlow === null
      ? null
      : freeCashFlow >= 1e9
        ? `${(freeCashFlow / 1e9).toFixed(1)}B`
        : `${(freeCashFlow / 1e6).toFixed(1)}M`;
  const roeText = formatPercent(roe);
  const dividendText = formatPercent(dividendYield);

  if (language === "zh") {
    if (freeCashFlow !== null && freeCashFlow > 0 && roe !== null && roe > 0.18) {
      return `${name} 看起来有一定资本配置基础${fcfText ? `，自由现金流约 ${fcfText}` : ""}${roeText ? `，ROE 约 ${roeText}` : ""}，说明它至少不是只会扩张而不会回收价值。`;
    }
    return `${name} 的资本配置要继续看自由现金流、回报率和分红/回购纪律${dividendText ? `，当前股息率约 ${dividendText}` : ""}${roeText ? `，ROE 约 ${roeText}` : ""}。`;
  }

  if (freeCashFlow !== null && freeCashFlow > 0 && roe !== null && roe > 0.18) {
    return `${name} shows decent capital-allocation foundations${fcfText ? ` with free cash flow around ${fcfText}` : ""}${roeText ? ` and ROE near ${roeText}` : ""}. That at least suggests the company is turning scale into shareholder value.`;
  }
  return `${name}'s capital allocation still deserves scrutiny around free cash flow, return on equity, and whether dividends or buybacks are actually disciplined${dividendText ? `, with dividend yield near ${dividendText}` : ""}${roeText ? ` and ROE around ${roeText}` : ""}.`;
}

function summarizeCatalysts(name, revenueGrowth, analystTargetPrice, price, language) {
  const upside =
    analystTargetPrice !== null && price !== null && price > 0
      ? (analystTargetPrice - price) / price
      : null;

  if (language === "zh") {
    if (revenueGrowth !== null && revenueGrowth > 0.15) {
      return `${name} 接下来最现实的催化剂通常来自增长继续超预期。如果收入还能保持 ${formatPercent(revenueGrowth)} 左右的速度，市场会更容易继续给高估值。`;
    }
    if (upside !== null && upside > 0.12) {
      return `${name} 目前存在一定预期上修空间。按分析师目标价粗看，潜在上行大约 ${formatPercent(upside)}，但前提是经营兑现跟得上。`;
    }
    return `${name} 更可能依赖新产品、盈利改善、管理层执行超预期等具体事件来推动下一阶段重估。`;
  }

  if (revenueGrowth !== null && revenueGrowth > 0.15) {
    return `${name}'s cleanest catalyst is continued upside in growth. If revenue can keep compounding near ${formatPercent(revenueGrowth)}, the market is more willing to defend a premium multiple.`;
  }
  if (upside !== null && upside > 0.12) {
    return `${name} appears to have some room for expectation upgrades. Against analyst targets, implied upside is roughly ${formatPercent(upside)}, though only if execution keeps up.`;
  }
  return `${name} likely needs more specific triggers such as product wins, margin improvement, or better-than-expected execution to drive the next rerating.`;
}

function buildVerdict(score, name, peRatio, revenueGrowth, language) {
  const direction = verdictDirection(score);
  const valuationRich = peRatio !== null && peRatio > 30;
  const growthStrong = revenueGrowth !== null && revenueGrowth > 0.12;

  if (language === "zh") {
    if (direction === "up") {
      return {
        title: valuationRich
          ? `${name} 质量很强，但估值需要更挑`
          : `${name} 的基本面质量较强`,
        description: valuationRich
          ? `这家公司看起来有不错的经营质量和竞争优势，但如果估值已经很高，未来回报更依赖买入价格。`
          : `从盈利质量、增长和竞争位置看，这家公司目前更像是“基本面先过关，再去看价格是否合适”。`,
      };
    }
    if (direction === "neutral") {
      return {
        title: growthStrong
          ? `${name} 有增长故事，但波动也不小`
          : `${name} 有亮点，也有需要继续验证的地方`,
        description: `现在更像一个需要继续拆解的标的，而不是只看一个指标就能下结论。`,
      };
    }
    return {
      title: `${name} 目前更像高风险判断题`,
      description: `它不是一定差，而是经营稳定性、增长质量或财务结构里至少有一项还不够让人放心。`,
    };
  }

  if (direction === "up") {
    return {
      title: valuationRich
        ? `${name} looks high quality, but price still matters`
        : `${name} looks fundamentally solid`,
      description: valuationRich
        ? `The business appears strong, but if the valuation is already rich, future returns depend a lot more on your entry price.`
        : `On operating quality, growth, and competitive position, this looks more like a stock where the next question is price, not whether the business works.`,
    };
  }
  if (direction === "neutral") {
    return {
      title: growthStrong
        ? `${name} has upside, but the setup is less clean`
        : `${name} has strengths, but still needs more proof`,
      description: `This looks more like a name that deserves more unpacking than a snap yes-or-no answer.`,
    };
  }
  return {
    title: `${name} looks like a higher-risk judgment call`,
    description: `That does not automatically make it bad, but business stability, growth quality, or balance-sheet comfort is not strong enough yet.`,
  };
}

function buildPeerSnapshot(ticker, name, growth, margin, moatScore, language) {
  const growthLabel = growth === null ? (language === "zh" ? "未知" : "Unknown") : growth > 0.15 ? (language === "zh" ? "高" : "High") : growth > 0.05 ? (language === "zh" ? "中等" : "Mid") : (language === "zh" ? "偏低" : "Low");
  const marginLabel = margin === null ? (language === "zh" ? "未知" : "Unknown") : margin > 0.22 ? (language === "zh" ? "很高" : "Very high") : margin > 0.12 ? (language === "zh" ? "较高" : "High") : margin > 0.05 ? (language === "zh" ? "中等" : "Medium") : (language === "zh" ? "偏弱" : "Weak");
  const moatLabel = ratingLabel(moatScore);
  return [
    {
      ticker,
      company: name,
      growth: growthLabel,
      margin: marginLabel,
      moat: moatLabel,
      take: {
        en: "Current subject",
        zh: "当前分析对象",
      },
      subject: true,
    },
    {
      ticker: "Growth",
      company: language === "zh" ? "收入增速视角" : "Revenue growth lens",
      growth: growthLabel,
      margin: marginLabel,
      moat: moatLabel,
      take: {
        en: growth !== null && growth > 0.12 ? "Still expanding" : "Needs stronger demand proof",
        zh: growth !== null && growth > 0.12 ? "增长仍有支撑" : "需求端还要更多证明",
      },
    },
    {
      ticker: "Margin",
      company: language === "zh" ? "盈利质量视角" : "Profitability lens",
      growth: growthLabel,
      margin: marginLabel,
      moat: moatLabel,
      take: {
        en: margin !== null && margin > 0.15 ? "Economics look healthy" : "Economics look more fragile",
        zh: margin !== null && margin > 0.15 ? "盈利结构较健康" : "盈利结构更脆弱",
      },
    },
  ];
}

export function buildReportFromOverview({ ticker, overview, quote, language = "en" }) {
  const name = overview.Name || ticker;
  const sector = overview.Sector || null;
  const industry = overview.Industry || null;
  const description = overview.Description || "";
  const marketCap = toNumber(overview.MarketCapitalization);
  const peRatio = toNumber(overview.PERatio);
  const profitMargin = toNumber(overview.ProfitMargin);
  const operatingMargin = toNumber(overview.OperatingMarginTTM);
  const roe = toNumber(overview.ReturnOnEquityTTM);
  const revenueGrowth = toNumber(overview.QuarterlyRevenueGrowthYOY);
  const debtToEquity = toNumber(overview.DebtToEquity);
  const beta = toNumber(overview.Beta);
  const freeCashFlow = toNumber(overview.OperatingCashflow);
  const dividendYield = toNumber(overview.DividendYield);
  const analystTargetPrice = toNumber(overview.AnalystTargetPrice);
  const price = quote?.price ?? toNumber(overview["52WeekHigh"]);
  const changePercent = quote?.changePercent ?? null;

  let score = 5;
  if (profitMargin !== null) score += profitMargin > 0.2 ? 2 : profitMargin > 0.1 ? 1 : profitMargin < 0.03 ? -1 : 0;
  if (revenueGrowth !== null) score += revenueGrowth > 0.15 ? 2 : revenueGrowth > 0.05 ? 1 : revenueGrowth < 0 ? -2 : 0;
  if (roe !== null) score += roe > 0.2 ? 1 : roe < 0.08 ? -1 : 0;
  if (debtToEquity !== null) score += debtToEquity > 160 ? -1 : debtToEquity < 60 ? 1 : 0;
  if (changePercent !== null && Math.abs(changePercent) > 8) score -= 1;
  score = Math.max(1, Math.min(10, score));

  const moatScore = Math.max(1, Math.min(10, score + (operatingMargin !== null && operatingMargin > 0.18 ? 1 : 0)));
  const verdict = buildVerdict(score, name, peRatio, revenueGrowth, language);
  const direction = verdictDirection(score);

  return {
    ticker,
    company: name,
    verdictClass: direction,
    verdictIcon: verdictIcon(direction),
    verdictTitle: {
      en: buildVerdict(score, name, peRatio, revenueGrowth, "en").title,
      zh: buildVerdict(score, name, peRatio, revenueGrowth, "zh").title,
    },
    verdictDescription: {
      en: buildVerdict(score, name, peRatio, revenueGrowth, "en").description,
      zh: buildVerdict(score, name, peRatio, revenueGrowth, "zh").description,
    },
    businessModel: {
      en: summarizeBusiness(name, sector, industry, description, "en"),
      zh: summarizeBusiness(name, sector, industry, description, "zh"),
    },
    moat: {
      en: summarizeMoat(name, moatScore, operatingMargin, roe, "en"),
      zh: summarizeMoat(name, moatScore, operatingMargin, roe, "zh"),
    },
    moatTags: [ratingLabel(moatScore)],
    risks: {
      en: summarizeRisks(beta, revenueGrowth, debtToEquity, "en"),
      zh: summarizeRisks(beta, revenueGrowth, debtToEquity, "zh"),
    },
    riskTags: [
      ...(beta !== null && beta > 1.4 ? ["Volatility"] : []),
      ...(revenueGrowth !== null && revenueGrowth < 0.03 ? ["Growth"] : []),
      ...(debtToEquity !== null && debtToEquity > 120 ? ["Leverage"] : []),
    ].slice(0, 3),
    financials: {
      en: summarizeFinancials(marketCap, profitMargin, revenueGrowth, debtToEquity, "en"),
      zh: summarizeFinancials(marketCap, profitMargin, revenueGrowth, debtToEquity, "zh"),
    },
    valuation: {
      en: summarizeValuation(name, peRatio, marketCap, revenueGrowth, "en"),
      zh: summarizeValuation(name, peRatio, marketCap, revenueGrowth, "zh"),
    },
    capitalAllocation: {
      en: summarizeCapitalAllocation(name, freeCashFlow, roe, dividendYield, "en"),
      zh: summarizeCapitalAllocation(name, freeCashFlow, roe, dividendYield, "zh"),
    },
    catalysts: {
      en: summarizeCatalysts(name, revenueGrowth, analystTargetPrice, price, "en"),
      zh: summarizeCatalysts(name, revenueGrowth, analystTargetPrice, price, "zh"),
    },
    peers: buildPeerSnapshot(ticker, name, revenueGrowth, profitMargin, moatScore, "en").map((row, index) => ({
      ...row,
      take: {
        en: buildPeerSnapshot(ticker, name, revenueGrowth, profitMargin, moatScore, "en")[index].take.en,
        zh: buildPeerSnapshot(ticker, name, revenueGrowth, profitMargin, moatScore, "zh")[index].take.zh,
      },
    })),
    source: "live",
    quote: quote || null,
  };
}

