import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur : cas particuliers et situations spécifiques | Madeleg",
  description:
    "Divorce, décès d'un co-emprunteur, prêt ancien, indivision : comment ces situations spécifiques affectent votre assurance de prêt immobilier.",
  alternates: { canonical: "/cas-particuliers-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageCasParticuliersAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur : les cas particuliers
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Divorce, décès d&apos;un co-emprunteur, prêt déjà ancien : certaines situations ne suivent pas le
          parcours standard de l&apos;assurance de prêt et demandent une démarche spécifique.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Séparation ou décès d&apos;un co-emprunteur</h2>
        <p>
          En cas de divorce ou de séparation, le prêt et son assurance ne disparaissent pas automatiquement : ils
          doivent être désolidarisés, rachetés par l&apos;un des emprunteurs, ou le bien doit être vendu. En cas de
          décès d&apos;un co-emprunteur, la garantie décès s&apos;applique à hauteur de sa seule quotité assurée,
          ce qui ne solde pas nécessairement l&apos;intégralité du capital restant dû si la répartition
          n&apos;était pas de 100 % chacun.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un prêt déjà ancien</h2>
        <p>
          Un prêt souscrit depuis plusieurs années reste éligible au changement d&apos;assurance dans les mêmes
          conditions qu&apos;un prêt récent, la loi Lemoine ne fixant aucune limite d&apos;ancienneté. L&apos;intérêt
          financier du changement dépend surtout du capital restant dû, qui diminue avec le temps.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Bien détenu en indivision ou en SCI</h2>
        <p>
          Lorsque le bien est détenu en indivision ou via une SCI familiale, l&apos;assurance emprunteur peut
          couvrir un seul associé, plusieurs, ou l&apos;ensemble des emprunteurs selon la structure retenue et la
          répartition des parts, ce qui demande une attention particulière au moment de définir les quotités.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur/vos-droits/apres-plusieurs-annees" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Changer après plusieurs années</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Est-ce trop tard si votre prêt a déjà plusieurs années ?</p>
          </Link>
          <Link href="/garanties-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Les garanties</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Quotité et répartition entre co-emprunteurs.</p>
          </Link>
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
