export type AuteurArticle = {
  nom: string;
  role: string;
  linkedin: string;
};

export type MetaArticle = {
  slug: string;
  titre: string;
  description: string;
  datePublication: string; // ISO 8601
  dateMiseAJour: string; // ISO 8601
  auteur: AuteurArticle;
};

// linkedin à compléter avec l'URL réelle du profil avant publication du
// premier article (exigence EEAT) — ne pas deviner l'URL.
// nom : forme publique utilisée partout sur le site. Le nom légal complet
// (Mario Romuald Dos Santos) reste réservé aux mentions légales.
export const AUTEUR_COURTIER: AuteurArticle = {
  nom: "Romuald Dos Santos",
  role: "Intermédiaire en assurance emprunteur (MIA), fondateur de Madeleg",
  linkedin: "",
};
