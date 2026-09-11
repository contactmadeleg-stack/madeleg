-- Mini-CRM kanban sur les dossiers : 4 étapes au lieu des 5 précédentes
-- (nouveau/contacté fusionnés en "à joindre" ou "en cours" selon leur sens),
-- plus deux montants saisis à la main sur la fiche client pour calculer le
-- CA généré par dossier (PPA + frais de distribution), cumulé en tête de
-- chaque colonne du kanban.
--
-- La contrainte CHECK doit être élargie (ou retirée) AVANT la mise à jour
-- des données : sinon la première ligne réécrite en 'a_joindre' viole la
-- contrainte encore active sur les 5 anciennes valeurs.

alter table public.simulations drop constraint simulations_statut_dossier_check;

update public.simulations set statut_dossier = 'a_joindre' where statut_dossier = 'nouveau';
update public.simulations set statut_dossier = 'en_cours' where statut_dossier in ('contacte', 'dossier_en_cours');

alter table public.simulations add constraint simulations_statut_dossier_check
  check (statut_dossier = ANY (ARRAY['a_joindre'::text, 'en_cours'::text, 'gagne'::text, 'perdu'::text]));
alter table public.simulations alter column statut_dossier set default 'a_joindre';

comment on column public.simulations.statut_dossier is
  'Étape du mini-CRM kanban (console admin) : a_joindre, en_cours, gagne, perdu.';

alter table public.simulations add column ppa numeric not null default 0;
alter table public.simulations add column frais_distribution numeric not null default 0;

comment on column public.simulations.ppa is
  'Montant PPA saisi manuellement sur la fiche client — composante du CA généré, affiché cumulé en tête de colonne du kanban.';
comment on column public.simulations.frais_distribution is
  'Frais de distribution facturés au client, saisis manuellement sur la fiche client — seconde composante du CA généré.';
