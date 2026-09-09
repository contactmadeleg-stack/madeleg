-- Correction des taux fournis par le courtier (grilles réelles) :
-- delta sur 46-54 / 55-59 / 60-64 côté délégation, et convergence banque =
-- délégation = 1,30 % au-delà de 65 ans (remplace l'extrapolation de la
-- migration précédente).
-- Idempotent : peut être rejoué sans effet de bord (truncate + insert).

truncate table public.grille_taux_banque_moyen;
truncate table public.grille_taux_delegation;

insert into public.grille_taux_banque_moyen (age_min, age_max, taux_annuel) values
  (18, 34, 0.00269),
  (35, 45, 0.00417),
  (46, 54, 0.00595),
  (55, 59, 0.00835),
  (60, 64, 0.00913),
  (65, 85, 0.01300);

insert into public.grille_taux_delegation (age_min, age_max, taux_annuel) values
  (18, 34, 0.0015),
  (35, 45, 0.0030),
  (46, 54, 0.0050),
  (55, 59, 0.0065),
  (60, 64, 0.0080),
  (65, 85, 0.0130);
