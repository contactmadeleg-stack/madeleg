// Identité légale de l'éditeur — source unique pour les pages légales.
//
// RAPPEL CONFORMITÉ : Madeleg n'est PAS courtier. Mario Romuald Dos Santos est
// mandataire d'intermédiaire d'assurance (MIA), mandaté par FINSPOT (Pretto),
// qui est le courtier en assurance (COA). Ne jamais écrire « courtier » ni
// « certifié ORIAS » pour désigner Madeleg sur le site.

export const EDITEUR = {
  nomCommercial: "Madeleg",
  nomLegal: "Mario Romuald Dos Santos EI",
  forme: "entrepreneur individuel (micro-entrepreneur)",
  adresse: "1 Boulevard Auguste Priou, 44120 Vertou",
  siren: "814 537 684",
  siret: "814 537 684 00056",
  email: "contact.madeleg@gmail.com",
  telephone: "06 66 60 91 19",
  orias: "20004713",
} as const;

export const MANDANT = {
  raisonSociale: "FINSPOT SAS",
  marque: "Pretto",
  siren: "825 077 886",
  orias: "17000916",
  categorie: "courtier en assurance",
  adresse: "42 rue de Paradis, 75010 Paris",
} as const;

export const GROSSISTE = {
  nom: "Digital Insure",
  role: "courtier grossiste",
} as const;

export const MEDIATEUR = {
  nom: "Centre de Médiation et d'Arbitrage de Paris (CMAP)",
  adresse: "39 avenue Franklin D. Roosevelt, 75008 Paris",
  site: "https://www.cmap.fr",
} as const;

export const ACPR = {
  nom: "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
  adresse: "4 Place de Budapest, CS 92459, 75436 Paris Cedex 09",
} as const;
