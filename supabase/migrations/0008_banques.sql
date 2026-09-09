-- Table des banques affichées dans le sélecteur (étape 2 du simulateur),
-- gérée depuis la console admin (logo, actif/inactif, ordre d'affichage).
-- "Ma banque n'est pas dans la liste" reste une option fixe côté front,
-- pas une ligne ici.
create table public.banques (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  logo_path text,
  actif boolean not null default true,
  ordre integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.banques is
  'Banques affichées comme cartes cliquables dans le sélecteur de banque (étape 2). Logo géré via la console admin, stocké dans le bucket logos-banques.';
comment on column public.banques.logo_path is
  'Chemin de l''objet dans le bucket public logos-banques, ou NULL si aucun logo (carte texte seul en fallback).';

alter table public.banques enable row level security;

-- Bucket public en lecture (logos servis directement par le CDN Supabase) ;
-- les écritures passent exclusivement par le serveur (clé secrète), qui
-- contourne RLS comme pour toutes les autres tables — aucune policy
-- storage.objects nécessaire.
insert into storage.buckets (id, name, public)
values ('logos-banques', 'logos-banques', true)
on conflict (id) do nothing;

insert into public.banques (nom, slug, ordre) values
  ('Crédit Agricole', 'credit-agricole', 1),
  ('BNP Paribas', 'bnp-paribas', 2),
  ('Société Générale', 'societe-generale', 3),
  ('Banque Populaire', 'banque-populaire', 4),
  ('Caisse d''Épargne', 'caisse-epargne', 5),
  ('Crédit Mutuel', 'credit-mutuel', 6),
  ('LCL', 'lcl', 7),
  ('CIC', 'cic', 8),
  ('La Banque Postale', 'la-banque-postale', 9),
  ('HSBC Continental Europe', 'hsbc-continental-europe', 10),
  ('Boursorama Banque', 'boursorama-banque', 11);
