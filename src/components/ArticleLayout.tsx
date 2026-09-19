import Image from "next/image";
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
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-strong)" }}>{meta.titre}</h1>
        <Link href="/qui-sommes-nous" className="flex items-center gap-3 no-underline w-fit">
          <Image
            src="/images/romuald-dos-santos.jpg"
            alt={meta.auteur.nom}
            width={36}
            height={36}
            className="rounded-full object-cover"
            style={{ width: 36, height: 36 }}
          />
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            Écrit par <span className="font-medium underline" style={{ color: "var(--text-strong)" }}>{meta.auteur.nom}</span>
          </span>
        </Link>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Publié le {formatDate(meta.datePublication)}
          {meta.dateMiseAJour !== meta.datePublication && (
            <>, mis à jour le {formatDate(meta.dateMiseAJour)}</>
          )}
        </p>
      </header>

      <div className="prose-madeleg space-y-4" style={{ color: "var(--text-body)" }}>{children}</div>

      <footer className="mt-10 pt-6 border-t space-y-6" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/qui-sommes-nous" className="font-medium underline" style={{ color: "var(--text-strong)" }}>
            {meta.auteur.nom}
          </Link>
          <p>{meta.auteur.role}</p>
          {meta.auteur.linkedin && (
            <a href={meta.auteur.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
              Profil LinkedIn
            </a>
          )}
        </div>

        <Link href="/" className="mdl-btn mdl-btn--primary mdl-btn--md">
          Estimer mon économie sur mon assurance emprunteur
        </Link>
      </footer>
    </article>
  );
}
