-- Compteur de visites maison pour le dashboard admin. Une ligne par visite
-- (pas par page vue — dédupliquée côté client via sessionStorage, jamais un
-- cookie ni un identifiant persistant, cf. politique de confidentialité :
-- "aucun cookie de mesure d'audience ni traceur publicitaire"). Aucune IP,
-- aucun identifiant visiteur, aucun user-agent stocké : juste un chemin et
-- un horodatage, comparable à des logs serveur agrégés.
create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null
);

comment on table public.page_views is
  'Une ligne par visite (session de navigation, dédupliquée côté client via sessionStorage — pas un cookie). Sert uniquement au compteur "visites du jour" du dashboard admin.';

create index page_views_created_at_idx on public.page_views (created_at);

alter table public.page_views enable row level security;
