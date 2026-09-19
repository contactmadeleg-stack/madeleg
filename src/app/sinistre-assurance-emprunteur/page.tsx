import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Sinistre assurance emprunteur : déclaration et indemnisation | Madeleg",
  description:
    "Comment déclarer un sinistre à votre assurance de prêt, les délais d'indemnisation, et les recours possibles en cas de refus de prise en charge.",
  alternates: { canonical: "/sinistre-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageSinistreAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Sinistre en assurance emprunteur : la marche à suivre
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Décès, invalidité, arrêt de travail : au moment où la garantie doit jouer, la rapidité et la qualité du
          dossier transmis à l&apos;assureur font toute la différence sur le délai d&apos;indemnisation.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Déclarer un sinistre à temps</h2>
        <p>
          La notice d&apos;information de votre contrat précise le délai dans lequel un sinistre doit être déclaré
          à l&apos;assureur, ainsi que les pièces justificatives à fournir : certificat médical, arrêt de travail,
          justificatifs de revenus selon la garantie concernée. Un dossier incomplet est la première cause de
          retard dans le traitement d&apos;un dossier.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">En cas de refus de prise en charge</h2>
        <p>
          Un assureur peut refuser une prise en charge si les conditions contractuelles de la garantie ne sont pas
          réunies, ou si une exclusion s&apos;applique. Ce refus doit être motivé par écrit. En cas de désaccord, une
          contestation peut être portée devant le service réclamations de l&apos;assureur, puis, si le désaccord
          persiste, devant le médiateur de l&apos;assurance, une voie de recours gratuite et indépendante.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">L&apos;expertise médicale en cas de désaccord</h2>
        <p>
          Pour les garanties d&apos;invalidité, un désaccord sur le taux d&apos;invalidité retenu par le médecin
          conseil de l&apos;assureur peut donner lieu à une expertise médicale contradictoire, avec un médecin
          désigné par l&apos;assuré, aux frais partagés selon les termes du contrat.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/garanties-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Les garanties</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>DC, PTIA, IPT, ITT : les conditions de mise en jeu de chaque garantie.</p>
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
