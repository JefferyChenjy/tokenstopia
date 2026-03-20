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
