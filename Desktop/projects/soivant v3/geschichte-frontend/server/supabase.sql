-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Row Level Security stays ON. The backend connects with the service_role
-- key, which bypasses RLS entirely — so no public policies are needed here.

-- This means the anon/public key (if you ever use it client-side) still
-- cannot read or write this table, all writes go
-- through your Express server, not directly from the browser.
alter table waitlist enable row level security;

-- Optional but recommended: index for fast "how many signups" counts.
create index if not exists waitlist_created_at_idx on waitlist (created_at desc);
