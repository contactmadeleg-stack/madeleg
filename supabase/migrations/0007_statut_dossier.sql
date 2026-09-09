-- Mini-CRM : statut du dossier pour les simulations dont l'étape 2 a été
-- complétée (coordonnées renseignées). Permet au courtier de suivre chaque
-- prospect depuis la console admin, du premier contact jusqu'à la vente
-- (ou la perte).
alter table public.simulations
  add column statut_dossier text not null default 'nouveau'
    check (statut_dossier in ('nouveau', 'contacte', 'dossier_en_cours', 'gagne', 'perdu')),
  add column notes_internes text;

comment on column public.simulations.statut_dossier is
  'Statut du suivi commercial (mini-CRM console admin) : nouveau, contacte, dossier_en_cours, gagne, perdu.';
comment on column public.simulations.notes_internes is
  'Notes libres du courtier sur ce dossier, visibles uniquement en console admin.';
