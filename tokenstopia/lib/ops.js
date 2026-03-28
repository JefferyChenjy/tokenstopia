export function sanitizeOpsText(value, maxLength = 2000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function normalizePriority(value) {
  return ["low", "normal", "high"].includes(value) ? value : "normal";
}

export function normalizeInstructionStatus(value) {
  return ["open", "in_progress", "done"].includes(value) ? value : "open";
}
