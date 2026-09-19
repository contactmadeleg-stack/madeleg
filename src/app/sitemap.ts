import type { MetadataRoute } from "next";
import { slugsArticles } from "@/lib/content/registry";

const BASE_URL = "https://www.madeleg.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/simulation`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/assurance-emprunteur`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/assurance-emprunteur/fonctionnaire`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/independant`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/profession-liberale`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/investissement-locatif`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/loi-lemoine`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/delegation-assurance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/resilier`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/prix`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/moins-chere`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assurance-emprunteur/comparer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/apres-plusieurs-annees`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/risque-aggrave-sante`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/questionnaire-sante`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/diabete`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/assurance-emprunteur/cancer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assurance-emprunteur/vih`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/qui-sommes-nous`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/partenaires`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politique-de-confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cgu`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/reclamation`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articles: MetadataRoute.Sitemap = slugsArticles().map((slug) => ({
    url: `${BASE_URL}/assurance-emprunteur/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pagesStatiques, ...articles];
}
