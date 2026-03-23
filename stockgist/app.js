import { SAMPLE_REPORTS } from "./reports.js";
import { getAppElements } from "./ui/dom/elements.js";
import { createAppController } from "./ui/controllers/app-controller.js";
import { createAppState } from "./ui/state/app-state.js";

const elements = getAppElements();
const state = createAppState({
  language: "en",
  loadingTimer: null,
  loadingIndex: 0,
  currentReport: SAMPLE_REPORTS.AAPL,
});

const controller = createAppController({
  elements,
  state,
  initialReport: SAMPLE_REPORTS.AAPL,
});

controller.init();
