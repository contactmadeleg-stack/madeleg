import Link from "next/link";
import type { MetaArticle } from "@/lib/content/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArticleLayout({
  meta,
  children,
}: {
  meta: MetaArticle;
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.titre,
    description: meta.description,
    datePublished: meta.datePublication,
    dateModified: meta.dateMiseAJour,
    author: {
      "@type": "Person",
      name: meta.auteur.nom,
      ...(meta.auteur.linkedin ? { sameAs: [meta.auteur.linkedin] } : {}),
    },
  };

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold text-[var(--color-texte)]">{meta.titre}</h1>
        <p className="text-sm text-[var(--color-texte-doux)]">
          Publié le {formatDate(meta.datePublication)}
          {meta.dateMiseAJour !== meta.datePublication && (
            <> — mis à jour le {formatDate(meta.dateMiseAJour)}</>
          )}
        </p>
      </header>

      <div className="prose-madeleg space-y-4 text-[var(--color-texte)]">{children}</div>

      <footer className="mt-10 pt-6 border-t border-[var(--color-bordure)] space-y-6">
        <div className="text-sm text-[var(--color-texte-doux)]">
          <p className="font-medium text-[var(--color-texte)]">{meta.auteur.nom}</p>
          <p>{meta.auteur.role}</p>
          {meta.auteur.linkedin && (
            <a href={meta.auteur.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
              Profil LinkedIn
            </a>
          )}
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-[var(--color-vert)] text-white font-medium hover:bg-[var(--color-vert-fonce)]"
        >
          Estimer mon économie sur mon assurance emprunteur
        </Link>
      </footer>
    </article>
  );
}
