import type { NextConfig } from "next";

// Redirections permanentes suite a la restructuration du silo
// /assurance-emprunteur (mise en place le 2026-09-19) : chaque page passe
// d'une URL plate a une URL groupee par categorie (profil/droits/sante),
// sur le modele de l'architecture Pretto. A conserver indefiniment : ce
// sont des URLs qui ont pu etre indexees, partagees ou mises en favori.
const ANCIENNES_URLS_ASSURANCE_EMPRUNTEUR: Record<string, string> = {
  fonctionnaire: "profil/fonctionnaire",
  independant: "profil/independant",
  "profession-liberale": "profil/profession-liberale",
  "investissement-locatif": "profil/investissement-locatif",
  "loi-lemoine": "droits/loi-lemoine",
  "delegation-assurance": "droits/delegation-assurance",
  resilier: "droits/resilier",
  prix: "droits/prix",
  "moins-chere": "droits/moins-chere",
  comparer: "droits/comparer",
  "apres-plusieurs-annees": "droits/apres-plusieurs-annees",
  "risque-aggrave-sante": "sante/risque-aggrave-sante",
  "questionnaire-sante": "sante/questionnaire-sante",
  diabete: "sante/diabete",
  cancer: "sante/cancer",
  vih: "sante/vih",
  "maladies-cardiovasculaires": "sante/maladies-cardiovasculaires",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(ANCIENNES_URLS_ASSURANCE_EMPRUNTEUR).map(([ancien, nouveau]) => ({
      source: `/assurance-emprunteur/${ancien}`,
      destination: `/assurance-emprunteur/${nouveau}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
