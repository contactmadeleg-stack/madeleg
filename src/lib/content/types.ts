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
export const AUTEUR_COURTIER: AuteurArticle = {
  nom: "Mario Romuald Dos Santos",
  role: "Intermédiaire en assurance emprunteur (MIA), fondateur de Madeleg",
  linkedin: "",
};
