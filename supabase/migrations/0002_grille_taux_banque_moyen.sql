-- Le taux banque devient une grille par tranche d'âge (comme la délégation)
-- au lieu d'une constante unique : une constante flate côté banque combinée
-- à un taux délégation par âge gonflait artificiellement l'économie
-- affichée aux jeunes emprunteurs et l'écrasait pour les plus âgés.
-- Remplace parametres_calcul, jamais utilisée en production (aucune ligne
-- n'y avait encore été insérée).

drop table if exists public.parametres_calcul;

create table if not exists public.grille_taux_banque_moyen (
  id uuid primary key default gen_random_uuid(),
  age_min integer not null,
  age_max integer not null,
  taux_annuel numeric not null,
  actif boolean not null default true,
  updated_at timestamptz not null default now()
);

comment on table public.grille_taux_banque_moyen is 'Taux annuel banque moyen par tranche d''âge (moyenne des grilles de plusieurs banques, pas de lookup par banque précise) — utilisé pour le calcul simplifié de l''étape 1.';

alter table public.grille_taux_banque_moyen enable row level security;
