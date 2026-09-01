-- Inbox, sent-items and read status for community encouragements.
-- Run after community-encouragement-migration.sql.

alter table public.encouragements
  add column if not exists read_at timestamptz;

drop policy if exists "encouragements_update_recipient" on public.encouragements;
create policy "encouragements_update_recipient"
on public.encouragements for update
using (auth.uid() = recipient_id)
with check (auth.uid() = recipient_id);

grant update on public.encouragements to authenticated;

create or replace function public.get_received_encouragements()
returns table (
  id bigint,
  sender_id uuid,
  sender_name text,
  sender_gender text,
  sender_level integer,
  message text,
  is_anonymous boolean,
  created_at timestamptz,
  read_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    e.id,
    e.sender_id,
    case when e.is_anonymous then null else coalesce(nullif(p.full_name, ''), 'เพื่อนสายบุญ') end,
    case when e.is_anonymous then null else coalesce(p.gender, 'หญิง') end,
    1,
    e.message,
    e.is_anonymous,
    e.created_at,
    e.read_at
  from public.encouragements e
  left join public.profiles p on p.id = e.sender_id
  where e.recipient_id = auth.uid()
  order by e.created_at desc;
$$;

create or replace function public.get_sent_encouragements()
returns table (
  id bigint,
  recipient_id uuid,
  recipient_name text,
  recipient_gender text,
  recipient_level integer,
  message text,
  is_anonymous boolean,
  created_at timestamptz,
  read_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    e.id,
    e.recipient_id,
    coalesce(nullif(p.full_name, ''), 'เพื่อนสายบุญ'),
    coalesce(p.gender, 'หญิง'),
    1,
    e.message,
    e.is_anonymous,
    e.created_at,
    e.read_at
  from public.encouragements e
  left join public.profiles p on p.id = e.recipient_id
  where e.sender_id = auth.uid()
  order by e.created_at desc;
$$;

create or replace function public.mark_encouragement_read(encouragement_id bigint)
returns void
language sql
security invoker
set search_path = ''
as $$
  update public.encouragements
  set read_at = coalesce(read_at, now())
  where id = encouragement_id and recipient_id = auth.uid();
$$;

revoke all on function public.get_received_encouragements() from public;
revoke all on function public.get_sent_encouragements() from public;
revoke all on function public.mark_encouragement_read(bigint) from public;
grant execute on function public.get_received_encouragements() to authenticated;
grant execute on function public.get_sent_encouragements() to authenticated;
grant execute on function public.mark_encouragement_read(bigint) to authenticated;
