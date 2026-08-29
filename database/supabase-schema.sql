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
