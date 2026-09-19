type EntreeFAQ = { question: string; reponse: string };

// Donnée structurée FAQPage : le texte doit correspondre exactement à ce qui
// est visible sur la page (exigence Google), jamais un résumé ou une
// reformulation. Un seul de ces blocs par page.
export default function FAQSchema({ entrees }: { entrees: EntreeFAQ[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entrees.map(({ question, reponse }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: reponse },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
