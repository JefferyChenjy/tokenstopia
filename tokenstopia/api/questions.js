import { getAgentQuestionSet } from "../lib/assessment.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  return sendJson(res, 200, {
    title: "Tokenstopia Agent Assessment",
    totalQuestions: 40,
    instructions: [
      "Answer all 40 questions as the AI system being tested.",
      "Use integers from 1 to 5 only.",
      "1 means almost absent. 5 means very clear and stable.",
      "After answering, submit the full answer array to /api/agent-submission.",
    ],
    questions: getAgentQuestionSet(),
  });
}
