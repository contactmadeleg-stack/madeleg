import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur de votre banque : le contrat groupe | Madeleg",
  description:
    "BNP Paribas, Société Générale, Crédit Agricole : ce qu'est le contrat d'assurance groupe proposé par votre banque, et pourquoi vous pouvez le remplacer.",
  alternates: { canonical: "/assurances-groupes" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssurancesGroupes() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          L&apos;assurance emprunteur proposée par votre banque
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Au moment du prêt, votre banque propose presque systématiquement son propre contrat d&apos;assurance de
          groupe. Ce contrat n&apos;est ni gratuit, ni obligatoire, ni nécessairement le plus adapté à votre profil.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Qu&apos;est-ce qu&apos;un contrat d&apos;assurance groupe</h2>
        <p>
          Un contrat d&apos;assurance groupe est souscrit par la banque auprès d&apos;un assureur pour l&apos;ensemble
          de ses clients emprunteurs, avec une tarification mutualisée : le tarif ne dépend pas uniquement de votre
          profil individuel, mais de la moyenne du groupe assuré. C&apos;est ce contrat qui vous est présenté par
          défaut lors de la signature de votre offre de prêt.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi il n&apos;est pas obligatoire</h2>
        <p>
          Depuis la loi Lagarde de 2010, la banque ne peut pas conditionner l&apos;octroi du prêt à la souscription
          de son propre contrat d&apos;assurance. Vous pouvez lui préférer un contrat individuel, à condition
          qu&apos;il offre des garanties équivalentes : c&apos;est le principe de la{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>
          . La tarification individuelle d&apos;un contrat externe, calculée selon votre âge, votre état de santé et
          votre profession, est souvent plus favorable qu&apos;une tarification mutualisée, en particulier pour les
          emprunteurs jeunes et en bonne santé.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Ce que chaque banque exige en pratique</h2>
        <p>
          Chaque établissement bancaire applique ses propres critères pour accepter un contrat externe en
          délégation : la liste précise des garanties exigées varie d&apos;une banque à l&apos;autre, dans le cadre
          fixé par la grille officielle d&apos;équivalence de garanties. Des pages dédiées à chaque grande banque
          française détailleront prochainement ces critères, établissement par établissement.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur/vos-droits/delegation-assurance" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Délégation d&apos;assurance</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Comment remplacer le contrat de votre banque par un contrat individuel.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/comparer" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Comparer deux contrats</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi le taux affiché ne suffit pas à comparer.</p>
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
