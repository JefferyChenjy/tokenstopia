export function createAppState(initialState) {
  const state = {
    language: initialState.language,
    loadingTimer: initialState.loadingTimer ?? null,
    loadingIndex: initialState.loadingIndex ?? 0,
    currentReport: initialState.currentReport ?? null,
  };

  return {
    getLanguage() {
      return state.language;
    },
    toggleLanguage() {
      state.language = state.language === "en" ? "zh" : "en";
      return state.language;
    },
    getLoadingTimer() {
      return state.loadingTimer;
    },
    setLoadingTimer(timer) {
      state.loadingTimer = timer;
    },
    clearLoadingTimer() {
      state.loadingTimer = null;
    },
    getLoadingIndex() {
      return state.loadingIndex;
    },
    setLoadingIndex(index) {
      state.loadingIndex = index;
    },
    getCurrentReport() {
      return state.currentReport;
    },
    setCurrentReport(report) {
      state.currentReport = report;
    },
  };
}
