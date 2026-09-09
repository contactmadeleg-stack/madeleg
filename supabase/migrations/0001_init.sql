-- Madeleg — schéma initial
-- Table simulations : une ligne créée à l'étape 1 (résultat instantané),
-- complétée à l'étape 2 si le visiteur laisse ses coordonnées.
-- RLS activé sans policy publique : tous les accès passent par le serveur
-- (clé secrète Supabase, jamais exposée au client).

create table if not exists public.simulations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Étape 1 — saisie du visiteur
  capital numeric not null,
  duree_restante_annees integer not null,
  age integer not null,

  -- Étape 1 — hypothèses de calcul retenues (traçabilité / audit)
  taux_banque_moyen numeric not null,
  taux_delegation numeric not null,

  -- Étape 1 — résultat
  prime_banque_annuelle numeric not null,
  prime_delegation_annuelle numeric not null,
  economie_brute numeric not null,
  economie_affichee numeric not null,

  -- Étape 2 — coordonnées (remplies uniquement si le visiteur va au bout)
  prenom text,
  nom text,
  email text,
  mobile text,
  banque_selectionnee text, -- indicatif uniquement, aucun impact sur le calcul
  etape2_completed_at timestamptz,

  -- Suivi commercial (mis à jour manuellement par le courtier)
  rdv_pris boolean not null default false,
  email_capte_sans_rdv boolean not null default false,

  -- Attribution
  source_trafic text,

  -- durée initiale du prêt, non collectée dans le tunnel actuel (phase 2)
  duree_initiale_annees integer
);

comment on table public.simulations is 'Simulations de substitution d''assurance emprunteur — étape 1 (calcul) et étape 2 (coordonnées) si complétée.';

create index if not exists simulations_created_at_idx on public.simulations (created_at desc);
create index if not exists simulations_email_idx on public.simulations (email) where email is not null;

alter table public.simulations enable row level security;
-- Aucune policy créée : toute lecture/écriture se fait via la clé secrète
-- côté serveur (Next.js Route Handlers / Server Actions), jamais depuis le
-- navigateur. Le client public (clé "publishable") n'a donc aucun accès direct.

-- Grille des taux de délégation par tranche d'âge, utilisée pour le calcul
-- simplifié de l'étape 1 (taux moyen de marché, pas de grille par assureur).
-- Éditable en phase 2 depuis une console d'admin ; renseignée manuellement
-- pour l'instant.
create table if not exists public.grille_taux_delegation (
  id uuid primary key default gen_random_uuid(),
  age_min integer not null,
  age_max integer not null,
  taux_annuel numeric not null,
  actif boolean not null default true,
  updated_at timestamptz not null default now()
);

comment on table public.grille_taux_delegation is 'Taux annuel délégation par tranche d''âge — utilisé pour le calcul simplifié de l''étape 1 (pas de grille par assureur au lancement).';

alter table public.grille_taux_delegation enable row level security;
-- Lecture publique nécessaire : le calcul de l'étape 1 se fait dans une
-- Route Handler serveur qui lit cette table avec la clé secrète, donc pas
-- besoin de policy publique ici non plus.

-- Taux banque moyen de marché, utilisé comme constante pour la prime banque
-- de l'étape 1 (pas de lookup par banque précise au lancement).
-- Une seule ligne. Éditable directement dans Supabase en attendant la
-- console d'admin (phase 2).
create table if not exists public.parametres_calcul (
  id boolean primary key default true,
  taux_banque_moyen numeric not null,
  updated_at timestamptz not null default now(),
  constraint parametres_calcul_singleton check (id)
);

comment on table public.parametres_calcul is 'Paramètres globaux du calcul étape 1 (ligne unique). taux_banque_moyen = constante utilisée pour la prime banque.';

alter table public.parametres_calcul enable row level security;
