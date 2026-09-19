import type { NextConfig } from "next";

// Redirections permanentes suite aux deux restructurations du silo guides
// (2026-09-19 puis 2026-09-19) : les pages sont passees d'une URL plate a une
// URL groupee par categorie sous /assurance-emprunteur, puis les categories
// elles-memes sont montees a la racine du domaine (profil-emprunteur,
// changer-assurance-emprunteur, risque-aggrave-sante...), sur le modele de
// l'architecture Pretto ou chaque categorie est un dossier racine, pas un
// sous-dossier du nom du metier. Les deux generations d'anciennes URLs
// pointent directement vers la destination finale, sans redirection en
// chaine. A conserver indefiniment : ce sont des URLs qui ont pu etre
// indexees, partagees ou mises en favori.
const ANCIENNES_URLS_VERS_DESTINATION_FINALE: Record<string, string> = {
  // Generation 1 : URLs plates d'origine, sous /assurance-emprunteur/{slug}
  "/assurance-emprunteur/fonctionnaire": "/profil-emprunteur/situation-professionnelle/fonctionnaire",
  "/assurance-emprunteur/independant": "/profil-emprunteur/situation-professionnelle/independant",
  "/assurance-emprunteur/profession-liberale": "/profil-emprunteur/situation-professionnelle/profession-liberale",
  "/assurance-emprunteur/investissement-locatif": "/profil-emprunteur/situation-professionnelle/investissement-locatif",
  "/assurance-emprunteur/loi-lemoine": "/changer-assurance-emprunteur/vos-droits/loi-lemoine",
  "/assurance-emprunteur/delegation-assurance": "/changer-assurance-emprunteur/vos-droits/delegation-assurance",
  "/assurance-emprunteur/resilier": "/changer-assurance-emprunteur/vos-droits/resilier",
  "/assurance-emprunteur/prix": "/changer-assurance-emprunteur/vos-droits/prix",
  "/assurance-emprunteur/moins-chere": "/changer-assurance-emprunteur/vos-droits/moins-chere",
  "/assurance-emprunteur/comparer": "/changer-assurance-emprunteur/vos-droits/comparer",
  "/assurance-emprunteur/apres-plusieurs-annees": "/changer-assurance-emprunteur/vos-droits/apres-plusieurs-annees",
  "/assurance-emprunteur/risque-aggrave-sante": "/risque-aggrave-sante",
  "/assurance-emprunteur/questionnaire-sante": "/risque-aggrave-sante/questionnaire-et-declaration/questionnaire-sante",
  "/assurance-emprunteur/diabete": "/risque-aggrave-sante/pathologies/diabete",
  "/assurance-emprunteur/cancer": "/risque-aggrave-sante/pathologies/cancer",
  "/assurance-emprunteur/vih": "/risque-aggrave-sante/pathologies/vih",
  "/assurance-emprunteur/maladies-cardiovasculaires": "/risque-aggrave-sante/pathologies/maladies-cardiovasculaires",

  // Generation 2 : URLs groupees sous /assurance-emprunteur/{categorie}/{slug}
  "/assurance-emprunteur/profil/fonctionnaire": "/profil-emprunteur/situation-professionnelle/fonctionnaire",
  "/assurance-emprunteur/profil/independant": "/profil-emprunteur/situation-professionnelle/independant",
  "/assurance-emprunteur/profil/profession-liberale": "/profil-emprunteur/situation-professionnelle/profession-liberale",
  "/assurance-emprunteur/profil/investissement-locatif": "/profil-emprunteur/situation-professionnelle/investissement-locatif",
  "/assurance-emprunteur/droits/loi-lemoine": "/changer-assurance-emprunteur/vos-droits/loi-lemoine",
  "/assurance-emprunteur/droits/delegation-assurance": "/changer-assurance-emprunteur/vos-droits/delegation-assurance",
  "/assurance-emprunteur/droits/resilier": "/changer-assurance-emprunteur/vos-droits/resilier",
  "/assurance-emprunteur/droits/prix": "/changer-assurance-emprunteur/vos-droits/prix",
  "/assurance-emprunteur/droits/moins-chere": "/changer-assurance-emprunteur/vos-droits/moins-chere",
  "/assurance-emprunteur/droits/comparer": "/changer-assurance-emprunteur/vos-droits/comparer",
  "/assurance-emprunteur/droits/apres-plusieurs-annees": "/changer-assurance-emprunteur/vos-droits/apres-plusieurs-annees",
  "/assurance-emprunteur/sante/risque-aggrave-sante": "/risque-aggrave-sante",
  "/assurance-emprunteur/sante/questionnaire-sante": "/risque-aggrave-sante/questionnaire-et-declaration/questionnaire-sante",
  "/assurance-emprunteur/sante/diabete": "/risque-aggrave-sante/pathologies/diabete",
  "/assurance-emprunteur/sante/cancer": "/risque-aggrave-sante/pathologies/cancer",
  "/assurance-emprunteur/sante/vih": "/risque-aggrave-sante/pathologies/vih",
  "/assurance-emprunteur/sante/maladies-cardiovasculaires": "/risque-aggrave-sante/pathologies/maladies-cardiovasculaires",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(ANCIENNES_URLS_VERS_DESTINATION_FINALE).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
