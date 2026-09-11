# madeleg — Product Truth

**madeleg** est une activité d'intermédiation en assurance emprunteur (France), exercée en tant que MIA. L'activité démarre en solo et a vocation à se structurer en réseau : mandataires, puis salariés, pilotés par un cabinet-tête de réseau.

## Surfaces

### 1. Site vitrine
- **Objectif**: Acquisition de leads, éducation sur la loi Lemoine, chiffrage de l'économie, capture via simulateur
- **Utilisateur**: Particulier non-expert, emprunteur en cours/envisageant un crédit
- **Promesse centrale**: Économiser plusieurs milliers d'euros sans surcharge administrative
- **Actions primaires**: Simuler, demander un rappel, comparer les assureurs

### 2. Espace client & simulateur
- **Objectif**: Conversion et suivi du dossier jusqu'à signature
- **Utilisateur**: Particulier engagé (statut client)
- **Parcours**: Étapes linéaires, comparateur d'offres, dépôt de pièces, suivi
- **Actions primaires**: Progresser dans le parcours, valider les étapes

### 3. Back-office réseau (admin)
- **Objectif**: Pilotage du portefeuille, gestion des mandataires et production
- **Utilisateur**: Reseau manager (non développé dans cette refonte)
- **Contrainte**: Ne pas toucher

---

## Registre & ton

**Vouvoiement systématique** — jamais de tutoiement.
**« Nous » pour le cabinet, « vous » pour le client.**

Ton: **Direct, factuel, pédagogue.** Chiffre précède la promesse.
- ✅ « Vous économisez **14 280 €** sur les 18 ans restants. »
- ❌ « Économisez jusqu'à 50 % sur votre assurance ! »

**Casse phrase partout**, madeleg en bas de casse. Pas de point d'exclamation sauf félicitation. Pas d'emoji, pas de superlatif non chiffré, pas d'urgence artificielle.

---

## Contenu clé

- Hero: Question/bénéfice chiffré + simulateur 30 sec
- Explication: Loi Lemoine, changement possible, gratuit
- Étapes: 3–4 phases linéaires, durée estimée
- Mission: Qui sommes-nous, notre engagement, notes ORIAS
- FAQ: Légalité, confidentialité, délais, coûts cachés
- CTA: Demande de rappel / simulation

---

## Éléments immuables

✅ **Garde**: Simulateur interactif, structure des sections, contenu éducatif, calculs de taux
❌ **Remodèle**: Logo, couleurs, typographie, tous les éléments non-structurels

---

## Conformité

**Statut : Madeleg n'est PAS courtier.** Mario Romuald Dos Santos EI est mandataire d'intermédiaire d'assurance (MIA, ORIAS 20004713), mandaté par FINSPOT / Pretto (courtier, ORIAS 17000916), accès aux contrats via le grossiste Digital Insure. Ne jamais écrire « courtier », « cabinet de courtage » ni « certifié ORIAS » pour Madeleg sur le site ; dire « intermédiaire en assurance ». Des frais de distribution peuvent être facturés : ne jamais promettre « gratuit » au-delà de la simulation et de l'étude. Identité légale centralisée dans `src/lib/identite.ts`, assureurs dans `src/lib/partenaires.ts`. Mentions obligatoires en pied de page et parcours. Performances chiffrées sourcées et datées. Ton « note de bas de page » assumé pour la conformité — c'est un argument de confiance, pas une gêne.
