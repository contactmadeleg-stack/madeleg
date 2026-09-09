-- Support du co-emprunteur : l'âge unique devient un tableau d'âges
-- (un par emprunteur). L'économie totale est la somme de l'économie de
-- chaque emprunteur, calculée sur son propre âge (capital plein pour
-- chacun — pas de répartition de quotité, décision explicite du courtier).

alter table public.simulations
  add column if not exists ages_emprunteurs jsonb;

update public.simulations
  set ages_emprunteurs = jsonb_build_array(age)
  where ages_emprunteurs is null and age is not null;

alter table public.simulations
  alter column ages_emprunteurs set not null,
  alter column ages_emprunteurs set default '[]'::jsonb;

alter table public.simulations
  drop column if exists age;
