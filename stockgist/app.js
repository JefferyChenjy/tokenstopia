import { SAMPLE_REPORTS } from "./reports.js";

const translations = {
  en: {
    navPill: "Fast stock brief",
    eyebrow: "Multi-angle stock agent",
    heroTitle: "Enter a stock. Let the agent break it down.",
    heroDesc:
      "The agent reads the ticker you enter, then analyzes the business model, moat, risks, financial health, and a plain-English verdict.",
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
    whyKicker: "What the agent checks",
    whyTitle: "One stock, several useful angles",
    why1Title: "Business quality",
    why1Desc: "The agent starts with how the company actually makes money and why customers keep coming back.",
    why2Title: "Moat and risk",
    why2Desc: "It then looks at competitive edge, pressure points, and what could realistically go wrong.",
    why3Title: "Financial reality",
    why3Desc: "Finally it checks whether the numbers support the story, then compresses everything into a usable verdict.",
    closingTitle: "A stock agent should help you think faster, not pretend to think for you.",
    closingDesc: "Use StockGist as a fast first read. If the business is interesting, then do the deep work.",
    loadingMessages: [
      "Analyzing the business...",
      "Checking competitive position...",
      "Reviewing key risks...",
      "Scanning financial quality...",
      "Writing the verdict...",
    ],
    freshDemo: "Sample profile",
    liveMeta: "Live snapshot",
    sampleMeta: "Sample profile",
    errorUnknown: "This ticker is not available yet. Add ALPHAVANTAGE_API_KEY to enable live analysis for arbitrary stocks.",
    errorFallback: "Live fetch failed. Sample mode currently supports AAPL, NVDA, MSFT, and TSLA.",
  },
  zh: {
    navPill: "快速股票简报",
    eyebrow: "多角度股票 agent",
    heroTitle: "输入一只股票，让 agent 帮你拆开看。",
    heroDesc:
      "输入股票代码后，agent 会从商业模式、护城河、关键风险、财务健康度等不同角度分析它，最后给出一句人话结论。",
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
    whyKicker: "agent 会看什么",
    whyTitle: "一只股票，几个真正有用的角度",
    why1Title: "商业质量",
    why1Desc: "先看这家公司到底怎么赚钱，客户为什么会持续留下来。",
    why2Title: "护城河和风险",
    why2Desc: "再看它的竞争优势、压力点，以及最现实的风险来自哪里。",
    why3Title: "财务现实",
    why3Desc: "最后看数字能不能支撑故事，再把这些压缩成一个可用结论。",
    closingTitle: "一个股票 agent 应该帮你更快思考，而不是假装替你思考。",
    closingDesc: "把 StockGist 当成第一眼判断工具。如果公司值得研究，再去做深功课。",
    loadingMessages: [
      "正在分析商业模式...",
      "正在检查竞争位置...",
      "正在梳理关键风险...",
      "正在看财务质量...",
      "正在写结论...",
    ],
    freshDemo: "示例档案",
    liveMeta: "实时快照",
    sampleMeta: "示例档案",
    errorUnknown: "这个 ticker 目前还不能直接分析。配置 ALPHAVANTAGE_API_KEY 后，就可以支持任意股票。",
    errorFallback: "实时抓取失败。当前示例模式只支持 AAPL、NVDA、MSFT、TSLA。",
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
  currentReport: SAMPLE_REPORTS.AAPL,
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
  Object.keys(SAMPLE_REPORTS).forEach((ticker) => {
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
  if (
    lowered.includes("weak") ||
    lowered.includes("competition") ||
    lowered.includes("regulation") ||
    lowered.includes("growth") ||
    lowered.includes("leverage") ||
    lowered.includes("volatility")
  ) {
    return "red";
  }
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
  state.currentReport = report;
  analysisSectionEl.classList.remove("hidden");
  comparisonSectionEl.classList.toggle("hidden", !report.peers?.length);

  analysisTitleEl.textContent = `${report.ticker} · ${report.company}`;
  analysisMetaEl.textContent = report.source === "live" ? t("liveMeta") : t("sampleMeta");

  verdictCardEl.className = `verdict-card ${report.verdictClass}`;
  verdictIconEl.textContent = report.verdictIcon;
  verdictTitleEl.textContent = report.verdictTitle[state.language];
  verdictDescriptionEl.textContent = report.verdictDescription[state.language];

  businessModelEl.textContent = report.businessModel[state.language];
  competitiveMoatEl.textContent = report.moat[state.language];
  keyRisksEl.textContent = report.risks[state.language];
  financialHealthEl.textContent = report.financials[state.language];

  moatTagsEl.textContent = "";
  (report.moatTags || []).forEach((tag) => moatTagsEl.appendChild(makeTag(tag, toneForTag(tag))));

  riskTagsEl.textContent = "";
  (report.riskTags || []).forEach((tag) => riskTagsEl.appendChild(makeTag(tag, toneForTag(tag))));

  if (report.peers?.length) {
    renderComparisonRows(report.peers);
  }
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

async function fetchAnalysis(ticker) {
  const response = await fetch(
    `/api/stockgist-analyze?ticker=${encodeURIComponent(ticker)}&lang=${state.language}&_=${Date.now()}`,
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || t("errorFallback"));
  }
  return data.report;
}

async function runAnalysis(rawTicker) {
  const ticker = rawTicker.trim().toUpperCase();
  if (!ticker) return;

  inputEl.value = ticker;
  startLoading();

  try {
    const report = await fetchAnalysis(ticker);
    renderReport(report);
    analysisSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const fallback = SAMPLE_REPORTS[ticker];
    if (fallback) {
      renderReport(fallback);
      alert(t("errorFallback"));
    } else {
      alert(error.message || t("errorUnknown"));
    }
  } finally {
    stopLoading();
  }
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
  renderReport(state.currentReport);
});

renderStaticText();
renderQuickTickers();
renderReport(SAMPLE_REPORTS.AAPL);
