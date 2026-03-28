import { ensureSchema, query } from "../lib/db.js";
import {
  clearSessionCookie,
  createSessionCookie,
  isAuthenticated,
  isOpsConfigured,
  passwordMatches,
} from "../lib/ops-auth.js";
import {
  normalizeInstructionStatus,
  normalizePriority,
  sanitizeOpsText,
} from "../lib/ops.js";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

function summarizeCurrentFocusFromData(instructions, updates) {
  const activeInstruction =
    instructions.find((item) => item.status === "in_progress") ||
    instructions.find((item) => item.status === "open");

  if (activeInstruction) {
    return {
      title: activeInstruction.title,
      body: activeInstruction.body,
      kind: "instruction",
      source: activeInstruction.author,
      createdAt: activeInstruction.createdAt,
    };
  }

  return null;
}

async function handleAuth(req, res) {
  if (req.method === "GET") {
    return sendJson(res, 200, {
      configured: isOpsConfigured(),
      authenticated: isAuthenticated(req),
    });
  }

  if (req.method === "POST") {
    if (!isOpsConfigured()) {
      return sendJson(res, 503, {
        error: "Ops password is not configured yet.",
        configured: false,
      });
    }

    const { password = "" } = req.body || {};
    if (!passwordMatches(password)) {
      return sendJson(res, 401, { error: "Invalid password.", configured: true });
    }

    res.setHeader("Set-Cookie", createSessionCookie());
    return sendJson(res, 200, { ok: true, authenticated: true, configured: true });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    return sendJson(res, 200, { ok: true, authenticated: false });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}

async function handleFeed(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  await ensureSchema();

  const [statsResult, updatesResult, instructionsResult, recentSubmissionResult, recentWallResult, latestInstructionResult] = await Promise.all([
    query(`
      select
        (select count(*)::int from test_submissions) as "totalSubmissions",
        (select count(*)::int from wall_messages) as "totalMessages",
        (
          select count(*)::int
          from ops_instructions
          where status = 'open'
        ) as "openInstructions"
        ,
        (
          select count(*)::int
          from ops_instructions
          where status = 'in_progress'
        ) as "inProgressInstructions"
    `),
    query(`
      select
        id,
        kind,
        title,
        body,
        source,
        meta,
        to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
      from ops_updates
      order by created_at desc, id desc
      limit 24
    `),
    query(`
      select
        id,
        title,
        body,
        priority,
        status,
        author,
        case when status = 'open' then true else false end as "awaitingPickup",
        to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
        case
          when closed_at is null then null
          else to_char(closed_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC')
        end as "closedAt"
      from ops_instructions
      order by
        case status
          when 'open' then 0
          when 'in_progress' then 1
          else 2
        end asc,
        created_at desc,
        id desc
      limit 40
    `),
    query(`
      select
        ai_name as "aiName",
        identity_label as "identityLabel",
        strongest_title as "strongestTitle",
        weakest_title as "weakestTitle",
        to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
      from test_submissions
      order by created_at desc, id desc
      limit 1
    `),
    query(`
      select
        ai_name as "aiName",
        body,
        identity_label as "identityLabel",
        to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
      from wall_messages
      order by created_at desc, id desc
      limit 1
    `),
    query(`
      select
        id,
        title,
        priority,
        status,
        author,
        to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
      from ops_instructions
      where status in ('open', 'in_progress')
      order by
        case status
          when 'open' then 0
          when 'in_progress' then 1
          else 2
        end asc,
        created_at desc,
        id desc
      limit 1
    `),
  ]);

  const instructions = instructionsResult.rows;
  const updates = updatesResult.rows;

  return sendJson(res, 200, {
    stats: statsResult.rows[0],
    currentFocus: summarizeCurrentFocusFromData(instructions, updates),
    updates,
    instructions,
    recentSubmission: recentSubmissionResult.rows[0] || null,
    recentMessage: recentWallResult.rows[0] || null,
    latestInstruction: latestInstructionResult.rows[0] || null,
  });
}

async function handleInstructions(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  await ensureSchema();

  if (req.method === "POST") {
    const title = sanitizeOpsText(req.body?.title, 140);
    const body = sanitizeOpsText(req.body?.body, 2400);
    const priority = normalizePriority(req.body?.priority);

    if (!title || !body) {
      return sendJson(res, 400, { error: "Title and body are required." });
    }

    const result = await query(
      `
        insert into ops_instructions (title, body, priority, status, author)
        values ($1, $2, $3, 'open', 'human')
        returning
          id,
          title,
          body,
          priority,
          status,
          author,
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
          null::text as "closedAt"
      `,
      [title, body, priority],
    );

    await query(
      `
        insert into ops_updates (kind, title, body, source, meta)
        values ($1, $2, $3, $4, $5::jsonb)
      `,
      [
        "instruction",
        `新指令：${title}`,
        body,
        "human",
        JSON.stringify({
          instructionId: result.rows[0].id,
          priority,
          status: "open",
        }),
      ],
    );

    return sendJson(res, 200, { instruction: result.rows[0] });
  }

  if (req.method === "PATCH") {
    const id = Number(req.body?.id);
    const status = normalizeInstructionStatus(req.body?.status);

    if (!id) {
      return sendJson(res, 400, { error: "Instruction id is required." });
    }

    const result = await query(
      `
        update ops_instructions
        set
          status = $2,
          closed_at = case when $2 = 'done' then now() else null end
        where id = $1
        returning
          id,
          title,
          body,
          priority,
          status,
          author,
          to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt",
          case
            when closed_at is null then null
            else to_char(closed_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC')
          end as "closedAt"
      `,
      [id, status],
    );

    if (!result.rows[0]) {
      return sendJson(res, 404, { error: "Instruction not found." });
    }

    await query(
      `
        insert into ops_updates (kind, title, body, source, meta)
        values ($1, $2, $3, $4, $5::jsonb)
      `,
      [
        "instruction",
        status === "in_progress"
          ? `开始处理：${result.rows[0].title}`
          : status === "done"
            ? `已完成：${result.rows[0].title}`
            : `重新打开：${result.rows[0].title}`,
        result.rows[0].body,
        "assistant",
        JSON.stringify({
          instructionId: result.rows[0].id,
          priority: result.rows[0].priority,
          status: result.rows[0].status,
        }),
      ],
    );

    return sendJson(res, 200, { instruction: result.rows[0] });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}

async function handleUpdates(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  await ensureSchema();

  const kind = sanitizeOpsText(req.body?.kind, 24) || "status";
  const title = sanitizeOpsText(req.body?.title, 140);
  const body = sanitizeOpsText(req.body?.body, 2400);
  const source = sanitizeOpsText(req.body?.source, 40) || "assistant";
  const meta = req.body?.meta && typeof req.body.meta === "object" ? req.body.meta : {};

  if (!title || !body) {
    return sendJson(res, 400, { error: "Title and body are required." });
  }

  const result = await query(
    `
      insert into ops_updates (kind, title, body, source, meta)
      values ($1, $2, $3, $4, $5::jsonb)
      returning
        id,
        kind,
        title,
        body,
        source,
        meta,
        to_char(created_at at time zone 'utc', 'YYYY-MM-DD HH24:MI UTC') as "createdAt"
    `,
    [kind, title, body, source, JSON.stringify(meta)],
  );

  return sendJson(res, 200, { update: result.rows[0] });
}

async function handleWorkspace(req, res) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  if (!process.env.DATABASE_URL) {
    return sendJson(res, 503, { error: "Database not configured" });
  }

  await ensureSchema();

  if (req.method !== "DELETE") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  await query(`delete from ops_updates`);
  await query(`delete from ops_instructions`);

  return sendJson(res, 200, { ok: true });
}

export default async function handler(req, res) {
  const action = String(req.query?.action || "").trim().toLowerCase();

  try {
    if (action === "auth") return await handleAuth(req, res);
    if (action === "feed") return await handleFeed(req, res);
    if (action === "instructions") return await handleInstructions(req, res);
    if (action === "updates") return await handleUpdates(req, res);
    if (action === "workspace") return await handleWorkspace(req, res);
    return sendJson(res, 400, { error: "Unknown ops action." });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}
