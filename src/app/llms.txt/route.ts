const CONTENU = `# Madeleg

Madeleg accompagne les emprunteurs français pour changer d'assurance de prêt
immobilier (assurance emprunteur) sans changer de banque, dans le cadre de
la loi Lemoine. Mario Romuald Dos Santos EI, mandataire d'intermédiaire
d'assurance (MIA) immatriculé à l'ORIAS sous le n° 20004713, mandaté par
FINSPOT SAS (Pretto), courtier en assurance (ORIAS 17000916).

## Pages

- [Simulateur d'économie](https://www.madeleg.fr/): estimation gratuite et
  indicative de l'économie réalisable en changeant d'assurance emprunteur.
- [Guide assurance emprunteur](https://www.madeleg.fr/assurance-emprunteur):
  page pilier, sommaire de l'ensemble des guides ci-dessous.
- [Qui sommes-nous](https://www.madeleg.fr/qui-sommes-nous): parcours du
  fondateur, Romuald Dos Santos, et statut réglementaire de Madeleg.

### Vos droits

- [Loi Lemoine](https://www.madeleg.fr/assurance-emprunteur/loi-lemoine):
  résiliation à tout moment, suppression du questionnaire médical sous
  conditions.
- [Résilier son assurance emprunteur](https://www.madeleg.fr/assurance-emprunteur/resilier):
  la procédure étape par étape et le délai légal de réponse de la banque
  (dix jours ouvrés).
- [Délégation d'assurance](https://www.madeleg.fr/assurance-emprunteur/delegation-assurance):
  remplacer le contrat groupe de la banque par un contrat individuel
  équivalent.
- [Comparer deux contrats](https://www.madeleg.fr/assurance-emprunteur/comparer):
  la grille CCSF des 18 critères d'équivalence de garanties.
- [Prix de l'assurance emprunteur](https://www.madeleg.fr/assurance-emprunteur/prix)
- [Assurance emprunteur moins chère](https://www.madeleg.fr/assurance-emprunteur/moins-chere)
- [Changer après plusieurs années](https://www.madeleg.fr/assurance-emprunteur/apres-plusieurs-annees)

### Selon votre situation

- [Fonctionnaire](https://www.madeleg.fr/assurance-emprunteur/fonctionnaire)
- [Travailleur indépendant](https://www.madeleg.fr/assurance-emprunteur/independant)
- [Profession libérale](https://www.madeleg.fr/assurance-emprunteur/profession-liberale)
- [Investissement locatif](https://www.madeleg.fr/assurance-emprunteur/investissement-locatif)

### Risque aggravé de santé

- [Risque aggravé de santé](https://www.madeleg.fr/assurance-emprunteur/risque-aggrave-sante):
  convention AERAS, droit à l'oubli et grille de référence.
- [Questionnaire de santé](https://www.madeleg.fr/assurance-emprunteur/questionnaire-sante)
- [Cancer et droit à l'oubli](https://www.madeleg.fr/assurance-emprunteur/cancer):
  délai de 5 ans après la fin du traitement, sans distinction d'âge.
- [Diabète](https://www.madeleg.fr/assurance-emprunteur/diabete)
- [VIH](https://www.madeleg.fr/assurance-emprunteur/vih): grille de référence
  AERAS pour les personnes séropositives.
- [Maladies cardiovasculaires](https://www.madeleg.fr/assurance-emprunteur/maladies-cardiovasculaires):
  infarctus, valvulopathie opérée, grille de référence AERAS.

### Informations légales

- [Nos partenaires](https://www.madeleg.fr/partenaires): liste des
  entreprises d'assurance dont Madeleg peut proposer les contrats.
- [Mentions légales](https://www.madeleg.fr/mentions-legales): statut
  réglementaire, rémunération, assurance RC Pro.
- [Politique de confidentialité](https://www.madeleg.fr/politique-de-confidentialite)
- [Réclamation et médiation](https://www.madeleg.fr/reclamation)

## Notes

Le simulateur fournit une estimation indicative, non contractuelle. Le
montant définitif et les garanties applicables ne sont arrêtés qu'après
étude individuelle du dossier par un conseiller Madeleg.
`;

export function GET() {
  return new Response(CONTENU, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
