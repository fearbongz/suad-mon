-- เพิ่มเพื่อนครั้งเดียวแล้วเป็นเพื่อนกันทั้งสองฝ่าย
create or replace function public.add_community_friend(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then raise exception 'Not authenticated'; end if;
  if target_user_id is null or target_user_id = current_user_id then raise exception 'Invalid friend'; end if;
  if not exists(select 1 from public.profiles where id = target_user_id) then raise exception 'User not found'; end if;

  insert into public.community_friends(owner_id, friend_id)
  values (current_user_id, target_user_id), (target_user_id, current_user_id)
  on conflict (owner_id, friend_id) do nothing;
end;
$$;

revoke all on function public.add_community_friend(uuid) from public;
grant execute on function public.add_community_friend(uuid) to authenticated;

-- ทำให้ความสัมพันธ์ที่เพิ่มไว้ก่อนหน้านี้เห็นกันทั้งสองฝ่ายด้วย
insert into public.community_friends(owner_id, friend_id)
select friend_id, owner_id from public.community_friends
on conflict (owner_id, friend_id) do nothing;

create or replace function public.get_my_community_friends()
returns table (user_id uuid, full_name text, gender text, level integer, points integer)
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
    )::integer
  from public.community_friends f
  join public.profiles p on p.id = f.friend_id
  left join public.user_state s on s.user_id = p.id
  where f.owner_id = auth.uid()
  order by f.created_at desc;
$$;

revoke all on function public.get_my_community_friends() from public;
grant execute on function public.get_my_community_friends() to authenticated;
