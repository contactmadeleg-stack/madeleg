// Liste des entreprises d'assurance dont Madeleg peut proposer les contrats
// (information obligatoire, art. L. 521-2 du Code des assurances).
//
// Accès via FINSPOT (mandant) et le courtier grossiste Digital Insure.
// Porteurs de risque relevés dans les notices / IPID publics des contrats
// (septembre 2026). À revérifier dans les notices de l'extranet Digital
// Insure à chaque changement de gamme : c'est l'entreprise d'assurance
// (porteur de risque) qui doit être nommée, pas seulement le produit.

export type Partenaire = {
  assureur: string;
  precision?: string;
  contrats: string[];
};

export const ASSUREURS_EMPRUNTEUR: Partenaire[] = [
  {
    assureur: "CACI",
    precision: "Crédit Agricole Creditor Insurance",
    contrats: ["CACI Solution Emprunteur"],
  },
  {
    assureur: "CNP Assurances",
    contrats: ["CNP Access Protect", "CNP Protect"],
  },
  {
    assureur: "MNCAP",
    precision: "Mutuelle Nationale des Constructeurs et Accédants à la Propriété",
    contrats: ["MNCAP Emprunteur Pro"],
  },
  {
    assureur: "Mutlog",
    contrats: ["Altitude Emprunteur"],
  },
  {
    assureur: "Oradéa Vie",
    precision: "groupe Société Générale Assurances",
    contrats: ["Iriade Emprunteur"],
  },
  {
    assureur: "Quatrem",
    precision: "groupe Malakoff Humanis",
    contrats: ["Maestro Emprunteur"],
  },
  {
    assureur: "Suravenir",
    contrats: ["Avenir Naoassur Emprunteur Équivalence 2", "Sérénité Emprunteur"],
  },
  {
    assureur: "SwissLife Assurance et Patrimoine / SwissLife Prévoyance et Santé",
    contrats: ["Assurance des emprunteurs SwissLife"],
  },
  // TODO : Naoassur Protect — porteur de risque à confirmer dans la notice
  // Digital Insure avant de l'ajouter ici (ne pas deviner).
];

export const ASSUREURS_PREVOYANCE: Partenaire[] = [
  {
    assureur: "Groupama Gan Vie",
    contrats: ["Gan Digital Prévoyance"],
  },
  {
    assureur: "Miltis",
    contrats: ["DigiPrév TNS"],
  },
];
