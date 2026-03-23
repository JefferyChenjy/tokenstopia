import { SAMPLE_REPORTS } from "./reports.js";
import { createTranslator } from "./ui/i18n/translations.js";
import { getAppElements } from "./ui/dom/elements.js";
import { renderReportPresentation } from "./ui/presenters/report-presenter.js";
import { loadStockAnalysis } from "./ui/services/analysis-client.js";
import { createAppState } from "./ui/state/app-state.js";

const elements = getAppElements();
const {
  inputEl,
  analyzeBtn,
  quickTickersEl,
  langToggleEl,
  loadingStripEl,
  loadingTextEl,
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
} = elements;

const state = createAppState({
  language: "en",
  loadingTimer: null,
  loadingIndex: 0,
  currentReport: SAMPLE_REPORTS.AAPL,
});

function t(key) {
  return createTranslator(state.getLanguage())(key);
}

function renderStaticText() {
  const language = state.getLanguage();
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  inputEl.placeholder = language === "en" ? "AAPL, NVDA, MSFT..." : "AAPL、NVDA、MSFT...";
  langToggleEl.textContent = language === "en" ? "中文" : "EN";
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
  state.setCurrentReport(report);
  renderReportPresentation({
    report,
    language: state.getLanguage(),
    t,
    elements,
  });
}

function stopLoading() {
  if (state.getLoadingTimer()) {
    window.clearInterval(state.getLoadingTimer());
    state.clearLoadingTimer();
  }
  loadingStripEl.classList.add("hidden");
}

function startLoading() {
  stopLoading();
  state.setLoadingIndex(0);
  loadingTextEl.textContent = t("loadingMessages")[0];
  loadingStripEl.classList.remove("hidden");
  const timer = window.setInterval(() => {
    const nextIndex = (state.getLoadingIndex() + 1) % t("loadingMessages").length;
    state.setLoadingIndex(nextIndex);
    loadingTextEl.textContent = t("loadingMessages")[nextIndex];
  }, 900);
  state.setLoadingTimer(timer);
}

async function runAnalysis(rawTicker) {
  const ticker = rawTicker.trim().toUpperCase();
  if (!ticker) return;

  inputEl.value = ticker;
  startLoading();

  try {
    const result = await loadStockAnalysis({
      rawTicker: ticker,
      language: state.getLanguage(),
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
  state.toggleLanguage();
  renderStaticText();
  renderReport(state.getCurrentReport());
});

renderStaticText();
renderQuickTickers();
renderReport(SAMPLE_REPORTS.AAPL);
