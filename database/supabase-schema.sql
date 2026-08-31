create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  birth_date date,
  gender text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_state enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "state_select_own" on public.user_state for select using (auth.uid() = user_id);
create policy "state_insert_own" on public.user_state for insert with check (auth.uid() = user_id);
create policy "state_update_own" on public.user_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant select,insert,update on public.profiles to authenticated;
grant select,insert,update on public.user_state to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id,email,full_name,birth_date,gender,phone)
  values (new.id,new.email,new.raw_user_meta_data ->> 'full_name',nullif(new.raw_user_meta_data ->> 'birth_date','')::date,new.raw_user_meta_data ->> 'gender',new.raw_user_meta_data ->> 'phone');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Public, privacy-safe leaderboard. It exposes only the fields used by the
-- community screen; raw user_state and private profile fields remain protected.
create or replace function public.community_level(points bigint)
returns integer
language plpgsql
immutable
set search_path = ''
as $$
declare
  current_level integer := 1;
  points_left bigint := greatest(points, 0);
  points_needed bigint := 100;
begin
  while current_level < 100 and points_left >= points_needed loop
    points_left := points_left - points_needed;
    current_level := current_level + 1;
    points_needed := 100 + ((current_level - 1) * 20);
  end loop;
  return current_level;
end;
$$;

create or replace function public.community_streak(state_data jsonb)
returns integer
language plpgsql
stable
set search_path = ''
as $$
declare
  streak integer := 0;
  cursor_day date := (current_timestamp at time zone 'Asia/Bangkok')::date;
  has_day boolean;
begin
  select exists(
    select 1 from (
      select left(value, 10)::date as activity_day
      from jsonb_array_elements_text(coalesce(state_data -> 'completedDates', '[]'::jsonb))
      where left(value, 10) ~ '^\d{4}-\d{2}-\d{2}$'
      union
      select ((item ->> 'at')::timestamptz at time zone 'Asia/Bangkok')::date
      from jsonb_array_elements(coalesce(state_data -> 'prayerHistory', '[]'::jsonb)) item
      where item ? 'at'
    ) activity where activity_day = cursor_day
  ) into has_day;
  if not has_day then cursor_day := cursor_day - 1; end if;
  loop
    select exists(
      select 1 from (
        select left(value, 10)::date as activity_day
        from jsonb_array_elements_text(coalesce(state_data -> 'completedDates', '[]'::jsonb))
        where left(value, 10) ~ '^\d{4}-\d{2}-\d{2}$'
        union
        select ((item ->> 'at')::timestamptz at time zone 'Asia/Bangkok')::date
        from jsonb_array_elements(coalesce(state_data -> 'prayerHistory', '[]'::jsonb)) item
        where item ? 'at'
      ) activity where activity_day = cursor_day
    ) into has_day;
    exit when not has_day;
    streak := streak + 1;
    cursor_day := cursor_day - 1;
  end loop;
  return streak;
exception when others then
  return 0;
end;
$$;

create or replace function public.get_community_leaderboard(limit_count integer default 100)
returns table (
  rank bigint,
  is_current_user boolean,
  full_name text,
  gender text,
  points bigint,
  prayer_count integer,
  streak_days integer,
  level integer
)
language sql
security definer
set search_path = ''
as $$
  with scores as (
    select
      p.id,
      coalesce(nullif(trim(p.full_name), ''), 'นักสวดมือใหม่') as full_name,
      coalesce(p.gender, '') as gender,
      coalesce((s.data ->> 'gardenBonus')::bigint, 0)
        + coalesce((select sum(coalesce((item ->> 'points')::bigint, 10))
                    from jsonb_array_elements(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)) item), 0) as points,
      greatest(
        jsonb_array_length(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)),
        jsonb_array_length(coalesce(s.data -> 'completedDates', '[]'::jsonb))
      ) as prayer_count,
      public.community_streak(s.data) as streak_days
    from public.profiles p
    join public.user_state s on s.user_id = p.id
  ), ranked as (
    select *, rank() over (order by points desc, prayer_count desc, id) as position
    from scores
  )
  select position, id = auth.uid(), full_name, gender, points, prayer_count,
         streak_days, public.community_level(points)
  from ranked
  order by position
  limit greatest(1, least(coalesce(limit_count, 100), 100));
$$;

revoke all on function public.get_community_leaderboard(integer) from public;
grant execute on function public.get_community_leaderboard(integer) to anon, authenticated;
