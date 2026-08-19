set local check_function_bodies = off;

alter default privileges for role "postgres" in schema "public" revoke all on sequences from "anon";

alter default privileges for role "postgres" in schema "public" revoke all on sequences from "authenticated";

alter default privileges for role "postgres" in schema "public" revoke all on sequences from "service_role";

alter default privileges for role "postgres" in schema "public" revoke all on tables from "anon";

alter default privileges for role "postgres" in schema "public" revoke all on tables from "authenticated";

alter default privileges for role "postgres" in schema "public" revoke all on tables from "service_role";

create schema "bookings";

create extension "pg_net" schema "extensions";

create table "public"."availability_rules" (
  "id"          uuid                   not null default gen_random_uuid(),
  "weekday"     smallint               not null,
  "start_time"  time without time zone not null,
  "end_time"    time without time zone not null,
  "valid_from"  date,
  "valid_until" date,
  "location_id" uuid,
  "closed"      boolean,
  constraint "availability_rules_pkey" primary key (id),
  constraint "availability_rules_weekday_check" check (((weekday >= 0) AND (weekday <= 6)))
);

create table "public"."blockers" (
  "id"             uuid                     not null default gen_random_uuid(),
  "location_id"    uuid                     not null,
  "start_datetime" timestamp with time zone not null,
  "end_datetime"   timestamp with time zone not null,
  "external_id"    text,
  "reason"         text,
  "created_at"     timestamp with time zone not null default now(),
  constraint "blockers_pkey" primary key (id)
);

create table "public"."bookings" (
  "id"           uuid                     not null default gen_random_uuid(),
  "time_slot_id" uuid                     not null,
  "customer_id"  uuid                     not null,
  "confirmed_at" timestamp with time zone,
  "cancelled_at" timestamp with time zone,
  "created_at"   timestamp with time zone not null default now(),
  constraint "bookings_pkey" primary key (id)
);

create table "public"."customers" (
  "id"         uuid                     not null default gen_random_uuid(),
  "name"       text                     not null,
  "email"      text                     not null,
  "phone"      text,
  "created_at" timestamp with time zone not null default now(),
  constraint "customers_pkey" primary key (id)
);

create table "public"."locations" (
  "id"          uuid                     not null default gen_random_uuid(),
  "name"        text                     not null,
  "address"     text,
  "is_active"   boolean                  not null default true,
  "created_at"  timestamp with time zone not null default now(),
  "emoji"       text,
  "prio_number" integer,
  "image_path"  text,
  "image_alt"   text,
  constraint "locations_pkey" primary key (id)
);

alter table "public"."locations"
  enable row level security;

create table "public"."service_types" (
  "id"         uuid                     not null default gen_random_uuid(),
  "created_at" timestamp with time zone not null default now(),
  "name"       text,
  constraint "service_types_pkey" primary key (id)
);

create table "public"."services" (
  "id"           uuid                     not null default gen_random_uuid(),
  "location_id"  uuid                     not null,
  "name"         text                     not null,
  "price_cents"  integer                  not null,
  "is_active"    boolean                  not null default true,
  "created_at"   timestamp with time zone not null default now(),
  "service_type" uuid,
  "description"  text,
  "image_path"   text,
  "image_alt"    text,
  "prio_number"  integer,
  "durations"    text[],
  constraint "services_pkey" primary key (id)
);

alter table "public"."services"
  enable row level security;

create table "public"."time_slots" (
  "id"             uuid                     not null default gen_random_uuid(),
  "location_id"    uuid                     not null,
  "service_id"     uuid                     not null,
  "start_datetime" timestamp with time zone not null,
  "end_datetime"   timestamp with time zone not null,
  "is_bookable"    boolean                  not null default true,
  "created_at"     timestamp with time zone not null default now(),
  constraint "time_slots_pkey" primary key (id),
  constraint "time_slots_valid_time" check ((end_datetime > start_datetime))
);

create type "public"."blocker_source" as enum (
  'apple',
  'manual',
  'system'
);

alter table "public"."blockers"
  add column "source" public.blocker_source not null;

create type "public"."booking_status" as enum (
  'requested',
  'confirmed',
  'cancelled',
  'expired'
);

alter table "public"."bookings"
  add column "status" public.booking_status not null default 'requested'::public.booking_status;

alter table "public"."bookings"
  add constraint "bookings_customer_id_fkey" foreign key (customer_id) references public.customers(id) on delete restrict;

alter table "public"."blockers"
  add constraint "blockers_location_id_fkey" foreign key (location_id) references public.locations(id) on delete cascade;

alter table "public"."services"
  add constraint "services_location_id_fkey" foreign key (location_id) references public.locations(id) on delete cascade;

alter table "public"."services"
  add constraint "services_service_type_fkey" foreign key (service_type) references public.service_types(id);

alter table "public"."time_slots"
  add constraint "time_slots_location_id_fkey" foreign key (location_id) references public.locations(id) on delete cascade;

alter table "public"."bookings"
  add constraint "bookings_time_slot_id_fkey" foreign key (time_slot_id) references public.time_slots(id) on delete restrict;

alter table "public"."time_slots"
  add constraint "time_slots_service_id_fkey" foreign key (service_id) references public.services(id) on delete cascade;

create policy "Read All Locations" on "public"."locations"
  for select
  to PUBLIC
  using (true);

create policy "Enable read access for all users" on "public"."services"
  for select
  to PUBLIC
  using (true);

comment on extension "pg_net" is 'Async HTTP';

grant create, usage on schema "bookings" to "postgres";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."availability_rules" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."blockers" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."bookings" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."customers" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."locations" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."service_types" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."services" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."time_slots" to "anon", "authenticated", "postgres", "service_role";

grant usage on type "public"."blocker_source" to "postgres";

grant usage on type "public"."booking_status" to "postgres";

alter default privileges for role "postgres" in schema "public" grant select, update, usage on sequences to "anon";

alter default privileges for role "postgres" in schema "public" grant select, update, usage on sequences to "authenticated";

alter default privileges for role "postgres" in schema "public" grant select, update, usage on sequences to "service_role";

alter default privileges for role "postgres" in schema "public" grant execute on FUNCTIONS to "anon";

alter default privileges for role "postgres" in schema "public" grant execute on FUNCTIONS to "authenticated";

alter default privileges for role "postgres" in schema "public" grant execute on FUNCTIONS to "service_role";

alter default privileges for role "postgres" in schema "public" grant delete, insert, maintain, references, select, trigger, truncate, update on tables to "anon";

alter default privileges for role "postgres" in schema "public" grant delete, insert, maintain, references, select, trigger, truncate, update on tables to "authenticated";

alter default privileges for role "postgres" in schema "public" grant delete, insert, maintain, references, select, trigger, truncate, update on tables to "service_role";

