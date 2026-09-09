-- Scinde la tranche délégation 18-34 en 18-25 (0,10 %) et 26-34 (0,15 %,
-- valeur déjà en place). Côté banque : pas de changement, la grille garde
-- une seule tranche 18-34.
-- Idempotent : truncate + insert complet de la grille délégation.

truncate table public.grille_taux_delegation;

insert into public.grille_taux_delegation (age_min, age_max, taux_annuel) values
  (18, 25, 0.0010),
  (26, 34, 0.0015),
  (35, 45, 0.0030),
  (46, 54, 0.0050),
  (55, 59, 0.0065),
  (60, 64, 0.0080),
  (65, 85, 0.0130);
