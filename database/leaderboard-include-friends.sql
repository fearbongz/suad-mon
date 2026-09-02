-- Keep the public community Top 100, and additionally include the signed-in
-- user's own row and every friend so their real global rank is always visible.
-- LEFT JOIN also lets brand-new members appear before they have user_state data.
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
      (coalesce((s.data ->> 'gardenBonus')::bigint, 0)
        + coalesce((select sum(coalesce((item ->> 'points')::bigint, 10))
                    from jsonb_array_elements(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)) item), 0))::bigint as points,
      greatest(
        jsonb_array_length(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)),
        jsonb_array_length(coalesce(s.data -> 'completedDates', '[]'::jsonb))
      ) as prayer_count,
      public.community_streak(coalesce(s.data, '{}'::jsonb)) as streak_days
    from public.profiles p
    left join public.user_state s on s.user_id = p.id
  ), ranked as (
    select *, rank() over (order by points desc, prayer_count desc, id) as position
    from scores
  )
  select r.position, r.id = auth.uid(), r.full_name, r.gender, r.points,
         r.prayer_count, r.streak_days, public.community_level(r.points::bigint)
  from ranked r
  where r.position <= greatest(1, least(coalesce(limit_count, 100), 100))
     or r.id = auth.uid()
     or exists (
       select 1
       from public.community_friends f
       where f.owner_id = auth.uid()
         and f.friend_id = r.id
     )
  order by r.position;
$$;

revoke all on function public.get_community_leaderboard(integer) from public;
grant execute on function public.get_community_leaderboard(integer) to anon, authenticated;
