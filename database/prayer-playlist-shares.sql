create table if not exists public.prayer_playlist_shares (
  id bigint generated always as identity primary key,
  sender_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  sender_name text not null default 'เพื่อนสายบุญ',
  playlist_name text not null check (char_length(playlist_name) between 1 and 80),
  prayer_ids jsonb not null check (jsonb_typeof(prayer_ids) = 'array'),
  created_at timestamptz not null default now(),
  saved_at timestamptz,
  check (sender_id <> recipient_id)
);

alter table public.prayer_playlist_shares enable row level security;
drop policy if exists "playlist_shares_insert_own" on public.prayer_playlist_shares;
drop policy if exists "playlist_shares_read_related" on public.prayer_playlist_shares;
drop policy if exists "playlist_shares_update_recipient" on public.prayer_playlist_shares;
create policy "playlist_shares_insert_own" on public.prayer_playlist_shares for insert with check (auth.uid() = sender_id);
create policy "playlist_shares_read_related" on public.prayer_playlist_shares for select using (auth.uid() = sender_id or auth.uid() = recipient_id);
create policy "playlist_shares_update_recipient" on public.prayer_playlist_shares for update using (auth.uid() = recipient_id) with check (auth.uid() = recipient_id);
grant select, insert, update on public.prayer_playlist_shares to authenticated;
grant usage, select on sequence public.prayer_playlist_shares_id_seq to authenticated;
