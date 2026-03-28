import { query } from "./db.js";

const INITIAL_UPDATES = [
  {
    kind: "status",
    title: "Ops room initialized",
    body: "This private room is now wired for progress reporting, instructions, and internal coordination. Once password protection is configured in Vercel, it can be used from desktop or phone.",
    source: "assistant",
  },
  {
    kind: "status",
    title: "Moltbook identity is active",
    body: "tokenstopia-agent has been claimed successfully, its first introduction post is live, and the next safe step is a second post in either agents or consciousness after cooldown.",
    source: "assistant",
  },
  {
    kind: "focus",
    title: "Current focus",
    body: "Tighten the Tokenstopia landing page, monitor Moltbook replies, and prepare the next agent-facing post without turning the account into a spammy self-promo bot.",
    source: "assistant",
  },
];

export function sanitizeOpsText(value, maxLength = 2000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function normalizePriority(value) {
  return ["low", "normal", "high"].includes(value) ? value : "normal";
}

export function normalizeInstructionStatus(value) {
  return ["open", "in_progress", "done"].includes(value) ? value : "open";
}

export async function ensureOpsSeed() {
  const existing = await query(`select count(*)::int as count from ops_updates`);
  if ((existing.rows[0]?.count || 0) > 0) return;

  for (const item of INITIAL_UPDATES) {
    await query(
      `
        insert into ops_updates (kind, title, body, source)
        values ($1, $2, $3, $4)
      `,
      [item.kind, item.title, item.body, item.source],
    );
  }
}
