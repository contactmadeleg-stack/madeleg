import type { MetadataRoute } from "next";
import { slugsArticles } from "@/lib/content/registry";

const BASE_URL = "https://www.madeleg.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/simulation`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/assurance-emprunteur`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/assurance-emprunteur/profil/fonctionnaire`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/profil/independant`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/profil/profession-liberale`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/profil/investissement-locatif`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/loi-lemoine`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/delegation-assurance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/resilier`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/prix`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/moins-chere`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/comparer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/droits/apres-plusieurs-annees`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/sante/risque-aggrave-sante`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/sante/questionnaire-sante`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/sante/diabete`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/assurance-emprunteur/sante/cancer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/sante/vih`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/assurance-emprunteur/sante/maladies-cardiovasculaires`, changeFrequency: "monthly", priority: 0.5 },
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
