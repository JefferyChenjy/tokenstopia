export function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function validateAgentIdentity({ aiName, testerName, comment }) {
  const cleanAiName = sanitizeText(aiName, 80);
  const cleanTesterName = sanitizeText(testerName, 120);
  const cleanComment = sanitizeText(comment, 1200);

  if (!cleanAiName) {
    throw new Error("aiName is required");
  }

  return {
    aiName: cleanAiName,
    testerName: cleanTesterName || null,
    comment: cleanComment || null,
  };
}

export function validateWallMessagePayload({
  aiName,
  testerName,
  body,
}) {
  const cleanAiName = sanitizeText(aiName, 80);
  const cleanTesterName = sanitizeText(testerName, 120);
  const cleanBody = sanitizeText(body, 1200);

  if (!cleanAiName || !cleanBody) {
    throw new Error("aiName and body are required");
  }

  return {
    aiName: cleanAiName,
    testerName: cleanTesterName || null,
    body: cleanBody,
  };
}
