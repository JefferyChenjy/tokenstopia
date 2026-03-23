import { SAMPLE_REPORTS } from "./reports.js";
import { createTranslator } from "./ui/i18n/translations.js";
import { renderReportPresentation } from "./ui/presenters/report-presenter.js";
import { loadStockAnalysis } from "./ui/services/analysis-client.js";

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
  return createTranslator(state.language)(key);
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
  ["AAPL", "NVDA", "MSFT", "TSLA", "1810.HK"].forEach((ticker) => {
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

function renderReport(report) {
  state.currentReport = report;
  renderReportPresentation({
    report,
    language: state.language,
    t,
    elements: {
      analysisSectionEl,
      comparisonSectionEl,
      analysisTitleEl,
      analysisMetaEl,
      verdictCardEl,
      verdictIconEl,
      verdictTitleEl,
      verdictDescriptionEl,
      businessModelEl,
      competitiveMoatEl,
      moatTagsEl,
      keyRisksEl,
      riskTagsEl,
      financialHealthEl,
      comparisonBodyEl,
    },
  });
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

async function runAnalysis(rawTicker) {
  const ticker = rawTicker.trim().toUpperCase();
  if (!ticker) return;

  inputEl.value = ticker;
  startLoading();

  try {
    const result = await loadStockAnalysis({
      rawTicker: ticker,
      language: state.language,
      t,
    });

    if (!result.report) {
      alert(result.errorMessage || t("errorUnknown"));
      return;
    }

    const report = result.report;
    renderReport(report);
    if (result.errorMessage) {
      alert(result.errorMessage);
    }
    analysisSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
