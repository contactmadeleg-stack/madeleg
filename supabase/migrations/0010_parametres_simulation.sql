-- Coefficient de décote (marge de sécurité) appliqué à l'économie brute
-- calculée par le simulateur — était codé en dur à 0.75 dans
-- src/lib/calcul/simulation.ts (MARGE_SECURITE). Rendu ajustable depuis la
-- console admin (page Grilles de taux). Table singleton à une ligne : les
-- écritures passent par le serveur (clé secrète), comme les autres tables
-- de paramétrage — RLS activée sans policy, donc aucun accès direct côté
-- client.
create table public.parametres_simulation (
  id boolean primary key default true,
  coefficient_decote numeric not null default 0.75,
  updated_at timestamptz not null default now(),
  constraint parametres_simulation_singleton check (id),
  constraint coefficient_decote_borne check (coefficient_decote > 0 and coefficient_decote <= 1)
);

comment on table public.parametres_simulation is
  'Réglages globaux du calcul de simulation. Une seule ligne (id = true). coefficient_decote = marge de sécurité appliquée à l''économie brute avant affichage (ex. 0.75 = 75% de l''économie brute affichée).';

alter table public.parametres_simulation enable row level security;

insert into public.parametres_simulation (id, coefficient_decote) values (true, 0.75);
