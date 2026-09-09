-- Nettoyage : parametres_calcul était l'ancienne table (constante unique)
-- remplacée par grille_taux_banque_moyen (migration 0002). Jamais utilisée
-- en production (0 ligne). Appliqué directement en base via le connecteur
-- Supabase ; cette migration documente le changement dans l'historique.
drop table if exists public.parametres_calcul;
