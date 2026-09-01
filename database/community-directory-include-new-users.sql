-- ให้สมาชิกใหม่แสดงในหน้าค้นหาเพื่อนทันที แม้ยังไม่มี user_state
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
    coalesce(nullif(trim(p.full_name), ''), 'สมาชิกชุมชน'),
    coalesce(nullif(p.gender, ''), 'หญิง'),
    public.community_level(
      coalesce((s.data ->> 'gardenBonus')::bigint, 0) +
      coalesce((select sum(coalesce((x ->> 'points')::bigint, 10))
                from jsonb_array_elements(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)) x), 0)
    ),
    (
      coalesce((s.data ->> 'gardenBonus')::bigint, 0) +
      coalesce((select sum(coalesce((x ->> 'points')::bigint, 10))
                from jsonb_array_elements(coalesce(s.data -> 'prayerHistory', '[]'::jsonb)) x), 0)
    )::integer,
    p.id = auth.uid()
  from public.profiles p
  left join public.user_state s on s.user_id = p.id
  order by 5 desc, p.created_at asc
  limit 100;
$$;

revoke all on function public.get_community_directory() from public;
grant execute on function public.get_community_directory() to authenticated;
