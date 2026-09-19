import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur profession libérale | Madeleg",
  description:
    "Médecin, avocat, expert-comptable, architecte : pourquoi votre exercice en profession libérale change la lecture de votre dossier d'assurance emprunteur.",
  alternates: { canonical: "/assurance-emprunteur/profession-liberale" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceEmprunteurProfessionLiberale() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur pour les professions libérales
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Médecin, avocat, expert-comptable, architecte : votre activité relève d&apos;un régime social spécifique, et
          souvent d&apos;un exercice où l&apos;incapacité à travailler personnellement n&apos;a pas d&apos;équivalent
          salarié à comparer. Le contrat groupe de la banque ne fait pas cette distinction.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Une activité qui repose sur votre présence personnelle</h2>
        <p>
          Dans de nombreuses professions libérales, le chiffre d&apos;affaires dépend directement de votre présence
          au cabinet ou à l&apos;étude. Une incapacité, même partielle, peut avoir un effet immédiat sur votre
          activité, sans qu&apos;un remplaçant salarié absorbe automatiquement la charge. La définition de
          l&apos;incapacité et les modalités d&apos;indemnisation retenues par votre contrat méritent donc une
          attention particulière.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un régime de prévoyance déjà en place, mais distinct</h2>
        <p>
          Selon votre profession, vous cotisez déjà à une caisse de prévoyance propre à votre secteur (par exemple la
          CARMF pour les médecins, la CNBF pour les avocats). Cette couverture protège votre activité
          professionnelle, pas le remboursement de votre crédit immobilier. Les deux contrats coexistent, l&apos;un
          ne remplace pas l&apos;autre, et leurs définitions de l&apos;incapacité ne sont pas nécessairement
          identiques.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le contrat groupe applique une grille générique</h2>
        <p>
          Le contrat groupe de la banque classe les emprunteurs par grandes catégories professionnelles, sans tenir
          compte des particularités de chaque exercice libéral. La{" "}
          <Link href="/assurance-emprunteur/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>{" "}
          permet de choisir un contrat dont les garanties et la définition de l&apos;incapacité correspondent à la
          réalité de votre activité.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          La procédure suit la{" "}
          <Link href="/assurance-emprunteur/loi-lemoine" className="underline">
            loi Lemoine
          </Link>
          , identique pour tous les emprunteurs : résiliation possible à tout moment, sans frais ni justification, à
          condition que le nouveau contrat offre des garanties équivalentes. Un
          conseiller Madeleg vérifie cette équivalence pour vous et suit l&apos;ensemble des échanges avec votre
          banque jusqu&apos;à validation.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Ma caisse de prévoyance professionnelle suffit-elle pour mon prêt immobilier ?",
              reponse:
                "Non, ce sont deux contrats distincts. Votre caisse professionnelle ne rembourse pas votre crédit immobilier à votre place.",
            },
            {
              question: "Le changement d'assurance emprunteur est-il différent pour une société d'exercice (SEL, SCP) ?",
              reponse:
                "Le principe reste le même. C'est votre situation personnelle d'emprunteur, pas la structure juridique de votre exercice, qui détermine les garanties applicables.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Ma caisse de prévoyance professionnelle suffit-elle pour mon prêt immobilier ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, ce sont deux contrats distincts. Votre caisse professionnelle ne rembourse pas votre crédit
              immobilier à votre place.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le changement d&apos;assurance emprunteur est-il différent pour une société d&apos;exercice (SEL, SCP) ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Le principe reste le même. C&apos;est votre situation personnelle d&apos;emprunteur, pas la structure
              juridique de votre exercice, qui détermine les garanties applicables.
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
