import Link from "next/link";
import type { Metadata } from "next";
import { registreArticles, slugsArticles } from "@/lib/content/registry";
import { IconeBouclier, IconeDossier, IconePoignee, IconeCoche } from "@/components/Icones";

export const metadata: Metadata = {
  title: "Assurance emprunteur : le guide complet | Madeleg",
  description:
    "Assurance de prêt immobilier, loi Lemoine, garanties, résiliation : tout comprendre sur l'assurance emprunteur et comment réduire son coût sans changer de banque.",
};

async function chargerArticles() {
  const slugs = slugsArticles();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const chargee = await registreArticles[slug]();
      return chargee.meta;
    })
  );
  return articles.sort((a, b) => (a.datePublication < b.datePublication ? 1 : -1));
}

export default async function PageAssuranceEmprunteur() {
  const articles = await chargerArticles();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Assurance emprunteur : le guide complet</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Ce que couvre l&apos;assurance de prêt immobilier, pourquoi elle coûte souvent plus cher que nécessaire, et
          comment la loi Lemoine permet de la changer sans quitter votre banque.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">À quoi sert l&apos;assurance emprunteur ?</h2>
        <p>
          Lorsqu&apos;une banque accorde un prêt immobilier, elle demande presque toujours une assurance de prêt en
          garantie : en cas de décès, d&apos;invalidité ou d&apos;incapacité de travail de l&apos;emprunteur, c&apos;est
          l&apos;assureur qui prend le relais du remboursement, pas la famille. Cette assurance n&apos;est pas
          légalement obligatoire, mais elle est en pratique systématiquement exigée pour obtenir un crédit immobilier.
        </p>
        <p>
          La banque propose presque toujours son propre contrat d&apos;assurance groupe au moment du prêt. Ce contrat
          n&apos;est pas obligatoire : vous pouvez le remplacer par un contrat individuel, chez un autre assureur, à
          condition qu&apos;il offre des garanties équivalentes. C&apos;est ce qu&apos;on appelle la délégation
          d&apos;assurance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">La loi Lemoine : changer d&apos;assurance à tout moment</h2>
        <p>
          Depuis juin 2022, la loi Lemoine vous permet de résilier votre assurance de prêt immobilier à tout moment,
          sans frais ni justification, pour la remplacer par un contrat aux garanties équivalentes, sans changer de
          banque ni de prêt. Avant cette loi, le changement n&apos;était possible qu&apos;à la date anniversaire du
          contrat, ce qui décourageait la plupart des emprunteurs.
        </p>

        <h2 id="garanties" className="text-2xl font-bold mt-8 mb-3 scroll-mt-24">
          Quelles garanties doit couvrir le nouveau contrat ?
        </h2>
        <p>
          La loi impose une équivalence de garanties avec votre contrat actuel. Les garanties les plus courantes sont
          désignées par leurs sigles :
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>DC</strong> : Décès
          </li>
          <li>
            <strong>PTIA</strong> : Perte Totale et Irréversible d&apos;Autonomie
          </li>
          <li>
            <strong>IPT</strong> : Invalidité Permanente Totale
          </li>
          <li>
            <strong>IPP</strong> : Invalidité Permanente Partielle
          </li>
          <li>
            <strong>ITT</strong> : Incapacité Temporaire Totale de travail
          </li>
          <li>
            <strong>MNO</strong> : troubles difficiles à objectiver médicalement (dos, troubles psychologiques…),
            souvent soumis à des exclusions ou franchises spécifiques selon les contrats
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi passer par un courtier plutôt que le faire seul ?</h2>
        <p>
          Comparer les garanties de plusieurs assureurs, monter un dossier de substitution complet et suivre les
          échanges avec la banque jusqu&apos;à validation prend du temps et demande de bien lire les conditions
          générales. Un courtier fait ce travail à votre place, gratuitement : c&apos;est lui qui est rémunéré par
          l&apos;assureur, pas vous.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Comment Madeleg vous accompagne</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icone: IconeCoche, texte: "Simulation gratuite de votre économie en 30 secondes" },
            { icone: IconeDossier, texte: "Constitution du dossier de substitution avec vous" },
            { icone: IconePoignee, texte: "Sélection de l'assureur adapté à votre profil" },
            { icone: IconeBouclier, texte: "Suivi des échanges avec votre banque jusqu'à validation" },
          ].map(({ icone: Icone, texte }) => (
            <div key={texte} className="mdl-card mdl-card__pad flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
                <Icone className="w-4 h-4" />
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-strong)" }}>{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">Nos articles</h2>
          <div className="space-y-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/assurance-emprunteur/${article.slug}`}
                className="mdl-card mdl-card--interactive mdl-card__pad block no-underline"
              >
                <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>{article.titre}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="text-center">
        <Link href="/#simulateur" className="mdl-btn mdl-btn--primary mdl-btn--lg inline-block">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
