import type { MetadataRoute } from "next";
import { slugsArticles } from "@/lib/content/registry";

const BASE_URL = "https://www.madeleg.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/simulation`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/assurance-emprunteur`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/garanties-emprunteur`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changer-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/profil-emprunteur`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurances-groupes`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/cout-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/sinistre-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/cadre-legal-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-par-type-de-pret`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/lexique-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/choisir-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/cas-particuliers-assurance-emprunteur`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/profil-emprunteur/situation-professionnelle/fonctionnaire`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/profil-emprunteur/situation-professionnelle/independant`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/profil-emprunteur/situation-professionnelle/profession-liberale`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/profil-emprunteur/situation-professionnelle/investissement-locatif`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/loi-lemoine`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/delegation-assurance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/resilier`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/prix`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/moins-chere`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/comparer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/changer-assurance-emprunteur/vos-droits/apres-plusieurs-annees`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/risque-aggrave-sante`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/risque-aggrave-sante/questionnaire-et-declaration/questionnaire-sante`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/risque-aggrave-sante/pathologies/diabete`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/risque-aggrave-sante/pathologies/cancer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/risque-aggrave-sante/pathologies/vih`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/risque-aggrave-sante/pathologies/maladies-cardiovasculaires`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/qui-sommes-nous`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/partenaires`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politique-de-confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cgu`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/reclamation`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articles: MetadataRoute.Sitemap = slugsArticles().map((slug) => ({
    url: `${BASE_URL}/articles/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pagesStatiques, ...articles];
}
