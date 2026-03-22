const translations = {
  en: {
    navPill: "Fast stock brief",
    eyebrow: "AI stock summary in minutes",
    heroTitle: "Understand a stock before you read 200 pages.",
    heroDesc:
      "Enter a ticker and get a clear, structured read on the business model, moat, risks, financial health, and a plain-English verdict.",
    searchLabel: "Ticker",
    searchButton: "Analyze",
    searchHint: "Try: AAPL, NVDA, MSFT, AMZN, TSLA, GOOGL",
    analysisKicker: "Structured analysis",
    verdictLabel: "Verdict",
    businessLabel: "Business model",
    moatLabel: "Competitive moat",
    risksLabel: "Key risks",
    financialsLabel: "Financial health",
    comparisonKicker: "Peer snapshot",
    comparisonTitle: "How it stacks up",
    colCompany: "Company",
    colGrowth: "Growth",
    colMargin: "Margin",
    colMoat: "Moat",
    colTake: "Take",
    whyKicker: "Why this format works",
    whyTitle: "Built for speed, not noise",
    why1Title: "Plain language",
    why1Desc: "No finance-speak wall. Every answer reads like a sharp operator briefing you fast.",
    why2Title: "Same checklist, every time",
    why2Desc: "Business, moat, risks, financials, verdict. The structure stays stable so comparisons are easy.",
    why3Title: "Good first pass",
    why3Desc: "This is not a replacement for deep research. It is the fastest way to know if a stock deserves it.",
    pricingKicker: "Pricing",
    pricingTitle: "Start free, go deeper later",
    freeTier: "Free",
    freePrice: "$0",
    free1: "Quick stock brief",
    free2: "Core verdict card",
    free3: "Peer comparison preview",
    freeCta: "Try a ticker",
    popular: "Popular",
    proTier: "Pro",
    proPrice: "$12/mo",
    pro1: "Longer financial breakdowns",
    pro2: "Watchlists and saved briefs",
    pro3: "More competitor context",
    proCta: "Join waitlist",
    closingTitle: "A useful stock app should reduce homework, not add more.",
    closingDesc: "Use StockGist as a fast first read. If the business is interesting, then do the deep work.",
    loadingMessages: [
      "Analyzing the business...",
      "Checking competitive position...",
      "Reviewing key risks...",
      "Scanning financial quality...",
      "Writing the verdict...",
    ],
    freshDemo: "Fresh demo",
  },
  zh: {
    navPill: "快速股票简报",
    eyebrow: "几分钟看懂一只股票",
    heroTitle: "先搞懂股票，再决定要不要读 200 页材料。",
    heroDesc:
      "输入股票代码，你会得到一份清晰的结构化摘要：商业模式、护城河、关键风险、财务健康度，以及一句人话结论。",
    searchLabel: "股票代码",
    searchButton: "开始分析",
    searchHint: "试试：AAPL、NVDA、MSFT、AMZN、TSLA、GOOGL",
    analysisKicker: "结构化分析",
    verdictLabel: "结论",
    businessLabel: "商业模式",
    moatLabel: "竞争护城河",
    risksLabel: "关键风险",
    financialsLabel: "财务健康度",
    comparisonKicker: "同业对比",
    comparisonTitle: "它和同行比怎么样",
    colCompany: "公司",
    colGrowth: "增长",
    colMargin: "利润率",
    colMoat: "护城河",
    colTake: "一句判断",
    whyKicker: "为什么这样做",
    whyTitle: "重点是更快，不是更吵",
    why1Title: "说人话",
    why1Desc: "不堆金融黑话。读起来像一个很懂行的人在快速 briefing 你。",
    why2Title: "固定结构",
    why2Desc: "商业、护城河、风险、财务、结论。每次都用同一套框架，比较会更轻松。",
    why3Title: "适合第一轮筛选",
    why3Desc: "它不能替代深度研究，但它是最快帮你判断值不值得继续研究的方法。",
    pricingKicker: "定价",
    pricingTitle: "先免费用，后面再深入",
    freeTier: "免费版",
    freePrice: "¥0",
    free1: "快速股票摘要",
    free2: "核心结论卡",
    free3: "同行对比预览",
    freeCta: "试一个代码",
    popular: "热门",
    proTier: "专业版",
    proPrice: "¥88/月",
    pro1: "更深的财务拆解",
    pro2: "自选股与保存摘要",
    pro3: "更多同行上下文",
    proCta: "加入候补",
    closingTitle: "一个好用的股票工具，应该减少作业，不是制造更多作业。",
    closingDesc: "把 StockGist 当成第一眼判断工具。如果公司值得研究，再去做深功课。",
    loadingMessages: [
      "正在分析商业模式...",
      "正在检查竞争位置...",
      "正在梳理关键风险...",
      "正在看财务质量...",
      "正在写结论...",
    ],
    freshDemo: "最新示例",
  },
};

const reports = {
  AAPL: {
    ticker: "AAPL",
    company: "Apple Inc.",
    verdictClass: "up",
    verdictIcon: "↑",
    verdictTitle: {
      en: "Elite business, valuation decides the return",
      zh: "顶级商业模式，但收益率取决于买入价格",
    },
    verdictDescription: {
      en: "Apple has brand power, sticky ecosystems, and huge cash generation. The question is rarely quality. It is whether the price already assumes too much perfection.",
      zh: "苹果拥有极强品牌、粘性生态和现金创造能力。问题通常不是它好不好，而是当前价格是不是已经把这种优秀提前算进去了。",
    },
    businessModel: {
      en: "Apple monetizes premium devices, then compounds value through services, accessories, and an ecosystem that raises switching costs over time.",
      zh: "苹果先靠高端硬件赚钱，再通过服务、配件和生态系统持续复利，把用户切换成本越做越高。",
    },
    moat: {
      en: "Its moat comes from brand, installed base, software integration, and customer habits. That combination is hard to copy at scale.",
      zh: "它的护城河来自品牌、装机量、软硬件整合和用户习惯。这个组合在大规模上非常难复制。",
    },
    moatTags: ["Strong"],
    risks: {
      en: "Regulatory pressure on the App Store, slower hardware cycles, and an expectation bar that is already very high.",
      zh: "App Store 监管压力、硬件更新周期放缓，以及市场对它的预期门槛已经很高。",
    },
    riskTags: ["Regulation", "Maturity"],
    financials: {
      en: "Margins remain strong, cash flow is exceptional, and capital returns are disciplined. It behaves like a mature machine with premium economics.",
      zh: "利润率稳健、现金流极强、资本回报纪律明确。它像一台成熟但依然高质量的赚钱机器。",
    },
    peers: [
      { ticker: "AAPL", company: "Apple", growth: "Mid", margin: "Very high", moat: "Strong", take: { en: "Quality leader", zh: "质量标杆" }, subject: true },
      { ticker: "MSFT", company: "Microsoft", growth: "Mid-high", margin: "Very high", moat: "Strong", take: { en: "Closest peer", zh: "最接近的同级" } },
      { ticker: "GOOGL", company: "Alphabet", growth: "Mid", margin: "High", moat: "Strong", take: { en: "Cheaper but different", zh: "更便宜但逻辑不同" } },
      { ticker: "AMZN", company: "Amazon", growth: "High", margin: "Mixed", moat: "Strong", take: { en: "More variance", zh: "波动更大" } },
    ],
  },
  NVDA: {
    ticker: "NVDA",
    company: "NVIDIA",
    verdictClass: "up",
    verdictIcon: "↗",
    verdictTitle: {
      en: "Category king with a valuation that demands execution",
      zh: "品类王者，但估值要求它持续完美执行",
    },
    verdictDescription: {
      en: "NVIDIA is the default pick-and-shovel supplier for advanced AI infrastructure. The business is exceptional, but the market already knows that.",
      zh: "英伟达是高级 AI 基础设施里默认的卖铲人。公司非常优秀，但市场也早就知道这一点。",
    },
    businessModel: {
      en: "It sells high-performance compute chips and an increasingly sticky software stack that makes the hardware harder to replace.",
      zh: "它卖高性能计算芯片，同时用越来越粘的软件栈强化硬件不可替代性。",
    },
    moat: {
      en: "CUDA, developer mindshare, platform momentum, and supply chain execution create a moat bigger than raw chip speed.",
      zh: "CUDA、开发者心智、平台惯性和供应链执行力，构成了比纯芯片速度更深的护城河。",
    },
    moatTags: ["Strong"],
    risks: {
      en: "Customer concentration, cyclicality after spending waves, and the possibility that hyperscalers gradually optimize around it.",
      zh: "客户集中度、资本开支周期波动，以及云厂商逐步绕开它做优化的可能性。",
    },
    riskTags: ["Cycle", "Competition"],
    financials: {
      en: "Growth is explosive and margins are elite, but numbers this strong raise the burden of sustaining them through the next cycle.",
      zh: "增长爆发、利润率顶级，但这种强度也意味着下一轮周期里维持高位会更难。",
    },
    peers: [
      { ticker: "NVDA", company: "NVIDIA", growth: "Extreme", margin: "Very high", moat: "Strong", take: { en: "AI leader", zh: "AI 龙头" }, subject: true },
      { ticker: "AMD", company: "AMD", growth: "High", margin: "Medium", moat: "Medium", take: { en: "Chasing fast", zh: "追赶很快" } },
      { ticker: "AVGO", company: "Broadcom", growth: "Mid-high", margin: "High", moat: "Strong", take: { en: "Different route", zh: "路线不同" } },
      { ticker: "TSM", company: "TSMC", growth: "Mid", margin: "High", moat: "Strong", take: { en: "Picks supplier", zh: "上游关键方" } },
    ],
  },
  MSFT: {
    ticker: "MSFT",
    company: "Microsoft",
    verdictClass: "up",
    verdictIcon: "↑",
    verdictTitle: {
      en: "One of the safest compounders in large-cap tech",
      zh: "大盘科技里最稳的复利机器之一",
    },
    verdictDescription: {
      en: "Microsoft combines enterprise lock-in, cloud scale, and disciplined capital allocation. It rarely looks broken. The issue is how much you pay for durability.",
      zh: "微软同时拥有企业锁定、云规模和资本配置纪律。它很少看起来有问题，真正的问题还是你为这种稳定性付出多少价格。",
    },
    businessModel: {
      en: "The company monetizes software subscriptions, cloud infrastructure, developer tools, and enterprise workflows that become deeply embedded over time.",
      zh: "公司通过软件订阅、云基础设施、开发工具和企业工作流赚钱，而且这些产品会随着时间深度嵌入客户系统。",
    },
    moat: {
      en: "Switching costs in enterprise software plus Azure scale make its position unusually sticky.",
      zh: "企业软件的切换成本，加上 Azure 的规模效应，让它的位置非常稳固。",
    },
    moatTags: ["Strong"],
    risks: {
      en: "Execution risk is lower than peers, but growth deceleration or over-optimism around AI monetization can still compress sentiment.",
      zh: "它的执行风险比同行低，但如果增长放缓，或市场对 AI 变现过度乐观，情绪仍然会压缩。",
    },
    riskTags: ["AI expectations", "Multiple"],
    financials: {
      en: "High margins, resilient recurring revenue, and a portfolio that spreads risk better than most mega-cap peers.",
      zh: "高利润率、稳定经常性收入，以及比多数 mega-cap 同行更分散的业务组合。",
    },
    peers: [
      { ticker: "MSFT", company: "Microsoft", growth: "Mid-high", margin: "Very high", moat: "Strong", take: { en: "Balanced giant", zh: "平衡型巨头" }, subject: true },
      { ticker: "AAPL", company: "Apple", growth: "Mid", margin: "Very high", moat: "Strong", take: { en: "More consumer-heavy", zh: "更偏消费" } },
      { ticker: "ORCL", company: "Oracle", growth: "Mid", margin: "High", moat: "Medium", take: { en: "Enterprise but narrower", zh: "企业属性更窄" } },
      { ticker: "GOOGL", company: "Alphabet", growth: "Mid", margin: "High", moat: "Strong", take: { en: "Cheaper, less locked in", zh: "更便宜，但锁定性弱些" } },
    ],
  },
  TSLA: {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    verdictClass: "neutral",
    verdictIcon: "•",
    verdictTitle: {
      en: "Ambitious platform, messier investment case",
      zh: "平台野心很大，但投资逻辑更复杂",
    },
    verdictDescription: {
      en: "Tesla still has product, brand, and manufacturing strengths, but the stock price often moves on future narratives faster than current operating proof.",
      zh: "特斯拉仍然有产品、品牌和制造优势，但股价常常比经营证据更快地交易未来叙事。",
    },
    businessModel: {
      en: "The core business is EV manufacturing, but the market also prices in software, autonomy, energy, and optionality around future platforms.",
      zh: "核心业务是电动车制造，但市场同时也在给软件、自动驾驶、储能和未来平台化机会定价。",
    },
    moat: {
      en: "The moat is real in brand and manufacturing culture, but not always as durable or one-sided as bulls assume.",
      zh: "品牌和制造文化层面的护城河是真实的，但未必像多头想象得那样长期且单边压制对手。",
    },
    moatTags: ["Medium"],
    risks: {
      en: "Margin pressure, EV competition, demand volatility, and the risk that optionality stays optional for longer than investors expect.",
      zh: "利润率压力、电车竞争、需求波动，以及那些“未来可选项”兑现时间可能比市场预期更久。",
    },
    riskTags: ["Competition", "Narrative"],
    financials: {
      en: "The balance sheet is solid, but earnings quality and margin durability no longer feel as effortless as before.",
      zh: "资产负债表仍然健康，但盈利质量和利润率耐久性已经不像以前那样轻松。",
    },
    peers: [
      { ticker: "TSLA", company: "Tesla", growth: "Mid", margin: "Medium", moat: "Medium", take: { en: "Narrative heavy", zh: "叙事权重大" }, subject: true },
      { ticker: "BYDDF", company: "BYD", growth: "High", margin: "Medium", moat: "Medium", take: { en: "Execution threat", zh: "执行型对手" } },
      { ticker: "RIVN", company: "Rivian", growth: "Low", margin: "Weak", moat: "Weak", take: { en: "Far earlier stage", zh: "阶段更早" } },
      { ticker: "GM", company: "General Motors", growth: "Low", margin: "Medium", moat: "Weak", take: { en: "Cheaper but legacy", zh: "更便宜但更传统" } },
    ],
  },
};

const inputEl = document.getElementById("ticker-input");
const analyzeBtn = document.getElementById("analyze-btn");
const quickTickersEl = document.getElementById("quick-tickers");
const langToggleEl = document.getElementById("lang-toggle");
const loadingStripEl = document.getElementById("loading-strip");
const loadingTextEl = document.getElementById("loading-text");
const analysisSectionEl = document.getElementById("analysis-section");
const comparisonSectionEl = document.getElementById("comparison-section");
const analysisTitleEl = document.getElementById("analysis-title");
const analysisMetaEl = document.getElementById("analysis-meta");
const verdictCardEl = document.getElementById("verdict-card");
const verdictIconEl = document.getElementById("verdict-icon");
const verdictTitleEl = document.getElementById("verdict-title");
const verdictDescriptionEl = document.getElementById("verdict-description");
const businessModelEl = document.getElementById("business-model");
const competitiveMoatEl = document.getElementById("competitive-moat");
const moatTagsEl = document.getElementById("moat-tags");
const keyRisksEl = document.getElementById("key-risks");
const riskTagsEl = document.getElementById("risk-tags");
const financialHealthEl = document.getElementById("financial-health");
const comparisonBodyEl = document.getElementById("comparison-body");

const state = {
  language: "en",
  loadingTimer: null,
  loadingIndex: 0,
};

function t(key) {
  return translations[state.language][key];
}

function renderStaticText() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  inputEl.placeholder = state.language === "en" ? "AAPL, NVDA, MSFT..." : "AAPL、NVDA、MSFT...";
  langToggleEl.textContent = state.language === "en" ? "中文" : "EN";
}

function renderQuickTickers() {
  quickTickersEl.textContent = "";
  Object.keys(reports).forEach((ticker) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-ticker";
    button.textContent = ticker;
    button.addEventListener("click", () => {
      inputEl.value = ticker;
      runAnalysis(ticker);
    });
    quickTickersEl.appendChild(button);
  });
}

function makeTag(label, tone) {
  const span = document.createElement("span");
  span.className = `tag ${tone}`;
  span.textContent = label;
  return span;
}

function toneForTag(label) {
  const lowered = label.toLowerCase();
  if (lowered.includes("strong") || lowered.includes("quality")) return "green";
  if (lowered.includes("weak") || lowered.includes("competition") || lowered.includes("regulation")) return "red";
  return "yellow";
}

function renderComparisonRows(peers) {
  comparisonBodyEl.textContent = "";
  peers.forEach((peer) => {
    const row = document.createElement("tr");
    if (peer.subject) row.classList.add("subject");

    row.innerHTML = `
      <td>
        <span class="company-main">${peer.ticker}</span>
        <span class="company-sub">${peer.company}</span>
      </td>
      <td>${peer.growth}</td>
      <td>${peer.margin}</td>
      <td>${peer.moat}</td>
      <td>${peer.take[state.language]}</td>
    `;
    comparisonBodyEl.appendChild(row);
  });
}

function renderReport(report) {
  analysisSectionEl.classList.remove("hidden");
  comparisonSectionEl.classList.remove("hidden");

  analysisTitleEl.textContent = `${report.ticker} · ${report.company}`;
  analysisMetaEl.textContent = t("freshDemo");

  verdictCardEl.className = `verdict-card ${report.verdictClass}`;
  verdictIconEl.textContent = report.verdictIcon;
  verdictTitleEl.textContent = report.verdictTitle[state.language];
  verdictDescriptionEl.textContent = report.verdictDescription[state.language];

  businessModelEl.textContent = report.businessModel[state.language];
  competitiveMoatEl.textContent = report.moat[state.language];
  keyRisksEl.textContent = report.risks[state.language];
  financialHealthEl.textContent = report.financials[state.language];

  moatTagsEl.textContent = "";
  report.moatTags.forEach((tag) => moatTagsEl.appendChild(makeTag(tag, toneForTag(tag))));

  riskTagsEl.textContent = "";
  report.riskTags.forEach((tag) => riskTagsEl.appendChild(makeTag(tag, toneForTag(tag))));

  renderComparisonRows(report.peers);
}

function stopLoading() {
  if (state.loadingTimer) {
    window.clearInterval(state.loadingTimer);
    state.loadingTimer = null;
  }
  loadingStripEl.classList.add("hidden");
}

function startLoading() {
  stopLoading();
  state.loadingIndex = 0;
  loadingTextEl.textContent = t("loadingMessages")[0];
  loadingStripEl.classList.remove("hidden");
  state.loadingTimer = window.setInterval(() => {
    state.loadingIndex = (state.loadingIndex + 1) % t("loadingMessages").length;
    loadingTextEl.textContent = t("loadingMessages")[state.loadingIndex];
  }, 900);
}

function runAnalysis(rawTicker) {
  const ticker = rawTicker.trim().toUpperCase();
  if (!ticker) return;

  const report = reports[ticker] || reports.AAPL;
  inputEl.value = ticker;
  startLoading();

  window.setTimeout(() => {
    stopLoading();
    renderReport(report);
    analysisSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1350);
}

analyzeBtn.addEventListener("click", () => runAnalysis(inputEl.value));
inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    runAnalysis(inputEl.value);
  }
});

langToggleEl.addEventListener("click", () => {
  state.language = state.language === "en" ? "zh" : "en";
  renderStaticText();

  const currentTicker = inputEl.value.trim().toUpperCase();
  if (reports[currentTicker]) {
    renderReport(reports[currentTicker]);
  }
});

document.querySelectorAll("[data-scroll-top]").forEach((button) => {
  button.addEventListener("click", () => {
    inputEl.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

renderStaticText();
renderQuickTickers();
renderReport(reports.AAPL);
