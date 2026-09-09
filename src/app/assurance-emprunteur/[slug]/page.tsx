import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { registreArticles, slugsArticles } from "@/lib/content/registry";

export function generateStaticParams() {
  return slugsArticles().map((slug) => ({ slug }));
}

async function chargerArticle(slug: string) {
  const charger = registreArticles[slug];
  if (!charger) return null;
  return charger();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await chargerArticle(slug);
  if (!article) return {};
  return {
    title: `${article.meta.titre} — Madeleg`,
    description: article.meta.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await chargerArticle(slug);
  if (!article) notFound();

  const Contenu = article.default;
  return (
    <ArticleLayout meta={article.meta}>
      <Contenu />
    </ArticleLayout>
  );
}
