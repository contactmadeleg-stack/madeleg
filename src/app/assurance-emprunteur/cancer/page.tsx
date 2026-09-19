import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur et cancer : le droit à l'oubli | Madeleg",
  description:
    "Un cancer, passé ou en cours, ne ferme pas la porte à l'assurance emprunteur. Le droit à l'oubli et la convention AERAS, ce qu'ils changent concrètement pour votre dossier.",
  alternates: { canonical: "/assurance-emprunteur/cancer" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceEmprunteurCancer() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur et cancer : le droit à l&apos;oubli
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Un cancer, passé ou en cours de traitement, complique un dossier d&apos;assurance emprunteur, il ne le ferme
          pas. Le droit à l&apos;oubli et la convention AERAS encadrent précisément ce qui se passe dans les deux cas.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Le droit à l&apos;oubli : 5 ans après la fin du traitement</h2>
        <p>
          Depuis la{" "}
          <Link href="/assurance-emprunteur/loi-lemoine" className="underline">
            loi Lemoine
          </Link>
          , le droit à l&apos;oubli s&apos;applique 5 ans après la fin du protocole thérapeutique, sans rechute, pour
          l&apos;ensemble des cancers, sans distinction d&apos;âge au moment du diagnostic. Avant cette loi, le délai
          était de 10 ans, avec une exception déjà applicable à certains cancers pédiatriques. Passé ce délai de 5
          ans, vous n&apos;avez plus à déclarer ce cancer dans le{" "}
          <Link href="/assurance-emprunteur/questionnaire-sante" className="underline">
            questionnaire de santé
          </Link>
          , et il ne peut plus justifier ni surprime ni exclusion de garantie sur votre contrat.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pendant les 5 ans, ou pour un cancer en cours de traitement</h2>
        <p>
          Tant que le délai de 5 ans n&apos;est pas écoulé, ou si le traitement est encore en cours, le cancer doit
          être déclaré et le dossier relève du{" "}
          <Link href="/assurance-emprunteur/risque-aggrave-sante" className="underline">
            risque aggravé de santé
          </Link>
          . La convention AERAS organise alors un examen automatique à plusieurs niveaux : un examen standard par
          l&apos;assureur, puis un second examen par son service médical spécialisé, puis un pool de réassurance
          interprofessionnel pour les dossiers les plus complexes. Cet examen peut aboutir à une acceptation aux
          conditions standards, une surprime, une exclusion ciblée, ou plus rarement un refus.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi comparer les assureurs compte particulièrement ici</h2>
        <p>
          Face à un même dossier de cancer, deux assureurs peuvent aboutir à des propositions très différentes :
          l&apos;un applique une surprime marquée quand l&apos;autre, plus habitué à ce type de profil, propose des
          conditions plus favorables. Le contrat groupe de la banque, non individualisé, ne permet pas cette
          comparaison. C&apos;est précisément l&apos;intérêt de solliciter plusieurs assureurs en parallèle plutôt que
          d&apos;accepter la première réponse.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg vérifie d&apos;abord si le droit à l&apos;oubli s&apos;applique à votre situation, et
          si ce n&apos;est pas le cas, identifie les assureurs dont la grille de tarification est la plus favorable à
          votre profil précis, plutôt que de vous laisser au tarif du contrat groupe de la banque.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Le droit à l'oubli s'applique-t-il pendant le traitement du cancer ?",
              reponse:
                "Non, il ne s'applique que 5 ans après la fin du protocole thérapeutique, sans rechute. Pendant le traitement ou avant ce délai, le dossier relève du risque aggravé de santé et de l'examen prévu par la convention AERAS.",
            },
            {
              question: "Le délai de 5 ans est-il le même pour tous les types de cancer ?",
              reponse:
                "Oui, depuis la loi Lemoine, le délai de 5 ans s'applique à l'ensemble des cancers, sans distinction d'âge au moment du diagnostic. Avant cette loi, le délai était de 10 ans, avec une exception déjà applicable à certains cancers pédiatriques.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le droit à l&apos;oubli s&apos;applique-t-il pendant le traitement du cancer ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, il ne s&apos;applique que 5 ans après la fin du protocole thérapeutique, sans rechute. Pendant le
              traitement ou avant ce délai, le dossier relève du risque aggravé de santé et de l&apos;examen prévu par
              la convention AERAS.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le délai de 5 ans est-il le même pour tous les types de cancer ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui, depuis la loi Lemoine, le délai de 5 ans s&apos;applique à l&apos;ensemble des cancers, sans
              distinction d&apos;âge au moment du diagnostic. Avant cette loi, le délai était de 10 ans, avec une
              exception déjà applicable à certains cancers pédiatriques.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link href="/#simulateur" className="mdl-btn mdl-btn--primary mdl-btn--lg">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
