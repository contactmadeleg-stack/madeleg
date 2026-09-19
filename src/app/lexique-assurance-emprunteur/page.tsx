import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Lexique de l'assurance emprunteur : tous les termes expliqués | Madeleg",
  description:
    "DC, PTIA, quotité, délégation, TAEA : le lexique de l'assurance emprunteur, avec des définitions simples pour chaque terme technique du secteur.",
  alternates: { canonical: "/lexique-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

const TERMES = [
  { terme: "Assurance emprunteur", definition: "Assurance couvrant le remboursement d'un prêt immobilier en cas de décès, d'invalidité ou d'incapacité de travail de l'emprunteur." },
  { terme: "Contrat groupe", definition: "Contrat d'assurance souscrit par la banque pour l'ensemble de ses clients emprunteurs, avec une tarification mutualisée." },
  { terme: "Délégation d'assurance", definition: "Le fait de remplacer le contrat groupe de la banque par un contrat individuel équivalent, chez un autre assureur." },
  { terme: "Quotité", definition: "La part du capital emprunté couverte par l'assurance pour chaque emprunteur, exprimée en pourcentage." },
  { terme: "TAEA", definition: "Taux annuel effectif de l'assurance : le coût de l'assurance exprimé en pourcentage du capital emprunté, sur une base annuelle." },
  { terme: "Délai de carence", definition: "Période suivant la souscription du contrat pendant laquelle une garantie ne peut pas encore être activée." },
  { terme: "Délai de franchise", definition: "Période suivant la survenance d'un sinistre pendant laquelle l'assureur ne verse encore aucune indemnisation." },
  { terme: "Convention AERAS", definition: "Dispositif s'Assurer et Emprunter avec un Risque Aggravé de Santé, qui encadre l'accès à l'assurance emprunteur pour les profils avec antécédents médicaux." },
  { terme: "Droit à l'oubli", definition: "Droit de ne plus déclarer un ancien cancer ou une hépatite C dans le questionnaire de santé, un délai après la fin du traitement." },
  { terme: "Mandataire d'intermédiaire d'assurance (MIA)", definition: "Statut d'intermédiaire immatriculé à l'ORIAS, agissant pour le compte d'un mandant courtier, sans engagement propre envers les assureurs." },
];

export default function PageLexiqueAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Le lexique de l&apos;assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Les termes techniques de l&apos;assurance de prêt immobilier, expliqués simplement.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="mb-12 space-y-5">
        {TERMES.map(({ terme, definition }) => (
          <div key={terme} className="mdl-card mdl-card__pad">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>{terme}</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{definition}</p>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/garanties-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Les garanties</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>DC, PTIA, IPT, ITT : le détail de chaque garantie.</p>
          </Link>
          <Link href="/assurance-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Guide complet</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Retour au sommaire de l&apos;assurance emprunteur.</p>
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
