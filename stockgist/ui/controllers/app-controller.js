import { createTranslator } from "../i18n/translations.js";
import { renderReportPresentation } from "../presenters/report-presenter.js";
import { loadStockAnalysis } from "../services/analysis-client.js";

const QUICK_TICKERS = ["AAPL", "NVDA", "MSFT", "TSLA", "1810.HK"];

export function createAppController({ elements, state, initialReport }) {
  function t(key) {
    return createTranslator(state.getLanguage())(key);
  }

  function renderStaticText() {
    const language = state.getLanguage();
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18n);
    });
    elements.inputEl.placeholder = language === "en" ? "AAPL, NVDA, MSFT..." : "AAPL、NVDA、MSFT...";
    elements.langToggleEl.textContent = language === "en" ? "中文" : "EN";
  }

  function renderQuickTickers() {
    elements.quickTickersEl.textContent = "";
    QUICK_TICKERS.forEach((ticker) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quick-ticker";
      button.textContent = ticker;
      button.addEventListener("click", () => {
        elements.inputEl.value = ticker;
        void runAnalysis(ticker);
      });
      elements.quickTickersEl.appendChild(button);
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
    elements.loadingStripEl.classList.add("hidden");
  }

  function startLoading() {
    stopLoading();
    state.setLoadingIndex(0);
    elements.loadingTextEl.textContent = t("loadingMessages")[0];
    elements.loadingStripEl.classList.remove("hidden");
    const timer = window.setInterval(() => {
      const nextIndex = (state.getLoadingIndex() + 1) % t("loadingMessages").length;
      state.setLoadingIndex(nextIndex);
      elements.loadingTextEl.textContent = t("loadingMessages")[nextIndex];
    }, 900);
    state.setLoadingTimer(timer);
  }

  async function runAnalysis(rawTicker) {
    const ticker = rawTicker.trim().toUpperCase();
    if (!ticker) return;

    elements.inputEl.value = ticker;
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

      renderReport(result.report);
      if (result.errorMessage) {
        alert(result.errorMessage);
      }
      elements.analysisSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      stopLoading();
    }
  }

  function bindEvents() {
    elements.analyzeBtn.addEventListener("click", () => {
      void runAnalysis(elements.inputEl.value);
    });

    elements.inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        void runAnalysis(elements.inputEl.value);
      }
    });

    elements.langToggleEl.addEventListener("click", () => {
      state.toggleLanguage();
      renderStaticText();
      renderReport(state.getCurrentReport());
    });
  }

  function init() {
    renderStaticText();
    renderQuickTickers();
    renderReport(initialReport);
    bindEvents();
  }

  return {
    init,
  };
}
