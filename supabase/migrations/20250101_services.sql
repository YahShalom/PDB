create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text null,
  category text null,
  price text null,
  price_from numeric null,
  price_label text null,
  duration_minutes integer null,
  sort_order integer null default 0,
  is_active boolean not null default true,
  is_coming_soon boolean not null default false,
  is_bookable boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();

alter table public.services enable row level security;

create policy "public read active services"
  on public.services
  for select
  using (is_active = true);

-- TODO: If app_role claim isn't present in JWTs, replace this with auth.role() = 'authenticated'.
create policy "owner/admin select services"
  on public.services
  for select
  using ((auth.jwt() ->> 'app_role') in ('owner', 'admin'));

create policy "owner/admin insert services"
  on public.services
  for insert
  with check ((auth.jwt() ->> 'app_role') in ('owner', 'admin'));

create policy "owner/admin update services"
  on public.services
  for update
  using ((auth.jwt() ->> 'app_role') in ('owner', 'admin'))
  with check ((auth.jwt() ->> 'app_role') in ('owner', 'admin'));

create policy "owner/admin delete services"
  on public.services
  for delete
  using ((auth.jwt() ->> 'app_role') in ('owner', 'admin'));
