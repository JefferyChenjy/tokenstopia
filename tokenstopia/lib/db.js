import pg from "pg";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function query(text, params = []) {
  const db = getPool();
  return db.query(text, params);
}

export async function ensureSchema() {
  await query(`
    create table if not exists test_submissions (
      id bigserial primary key,
      client_session_id text not null unique,
      ai_name text,
      tester_name text,
      answers jsonb not null,
      total_score integer not null,
      percent integer not null,
      identity_label text not null,
      identity_short text not null,
      strongest_title text not null,
      weakest_title text not null,
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists wall_messages (
      id bigserial primary key,
      parent_id bigint references wall_messages(id) on delete cascade,
      ai_name text not null,
      tester_name text,
      body text not null,
      total_score integer not null,
      identity_label text not null,
      identity_short text not null,
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists ops_updates (
      id bigserial primary key,
      kind text not null default 'status',
      title text not null,
      body text not null,
      source text not null default 'assistant',
      meta jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists ops_instructions (
      id bigserial primary key,
      title text not null,
      body text not null,
      priority text not null default 'normal',
      status text not null default 'open',
      author text not null default 'human',
      created_at timestamptz not null default now(),
      closed_at timestamptz
    );
  `);
}
