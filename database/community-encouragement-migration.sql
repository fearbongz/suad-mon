-- Community friends and encouragements migration
-- Safe to run after the main supabase-schema.sql has already been installed.

create table if not exists public.community_friends (
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (owner_id, friend_id),
  check (owner_id <> friend_id)
);

create table if not exists public.encouragements (
  id bigint generated always as identity primary key,
  sender_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  message text not null check (char_length(message) between 1 and 200),
  is_anonymous boolean not null default false,
  merit_cost integer not null default 10 check (merit_cost >= 0),
  created_at timestamptz not null default now(),
  check (sender_id <> recipient_id)
);

alter table public.community_friends enable row level security;
alter table public.encouragements enable row level security;

drop policy if exists "friends_manage_own" on public.community_friends;
create policy "friends_manage_own"
on public.community_friends for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

drop policy if exists "encouragements_insert_own" on public.encouragements;
create policy "encouragements_insert_own"
on public.encouragements for insert
with check (auth.uid() = sender_id);

drop policy if exists "encouragements_read_related" on public.encouragements;
create policy "encouragements_read_related"
on public.encouragements for select
using (auth.uid() = sender_id or auth.uid() = recipient_id);

grant select, insert, update, delete on public.community_friends to authenticated;
grant select, insert on public.encouragements to authenticated;
grant usage, select on sequence public.encouragements_id_seq to authenticated;

create or replace function public.get_community_directory()
returns table (
  user_id uuid,
  full_name text,
  gender text,
  level integer,
  points integer,
  is_current_user boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    p.id,
    coalesce(nullif(p.full_name, ''), 'สมาชิกชุมชน'),
    coalesce(p.gender, 'หญิง'),
    greatest(
      1,
      least(
        100,
        1 + floor(
          greatest(
            0,
            coalesce((s.data ->> 'gardenBonus')::integer, 0) +
            coalesce((
              select sum(coalesce((x ->> 'points')::integer, 10))
              from jsonb_array_elements(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)) x
            ), 0)
          ) / 100.0
        )::integer
      )
    ),
    greatest(
      0,
      coalesce((s.data ->> 'gardenBonus')::integer, 0) +
      coalesce((
        select sum(coalesce((x ->> 'points')::integer, 10))
        from jsonb_array_elements(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)) x
      ), 0)
    )::integer,
    p.id = auth.uid()
  from public.profiles p
  join public.user_state s on s.user_id = p.id
  order by 5 desc
  limit 100;
$$;

revoke all on function public.get_community_directory() from public;
grant execute on function public.get_community_directory() to authenticated;
