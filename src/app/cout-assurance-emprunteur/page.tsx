import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Coût de l'assurance emprunteur : calcul, TAEA et simulation | Madeleg",
  description:
    "Comment est calculée la prime d'assurance emprunteur, ce que mesure le TAEA, et les leviers réels pour réduire son coût sur la durée du prêt.",
  alternates: { canonical: "/cout-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageCoutAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Comprendre le coût de votre assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          L&apos;assurance emprunteur peut représenter une part significative du coût total d&apos;un crédit
          immobilier. Comprendre comment elle est calculée est la première étape pour la réduire.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Ce qui détermine le montant de la prime</h2>
        <p>
          La prime d&apos;assurance emprunteur dépend du capital assuré, du taux appliqué par l&apos;assureur, de la
          durée du prêt, et de votre profil : âge, état de santé, profession, pratiques sportives. Un contrat en
          délégation individuelle calcule ce taux spécifiquement pour vous, tandis qu&apos;un contrat groupe
          applique une tarification mutualisée sur l&apos;ensemble des clients de la banque.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le TAEA, un indicateur de coût normalisé</h2>
        <p>
          Le taux annuel effectif de l&apos;assurance (TAEA) exprime le coût de l&apos;assurance en pourcentage du
          capital emprunté, sur une base annuelle. Il permet de comparer deux contrats sur une base homogène, à la
          différence de la seule cotisation mensuelle affichée, qui ne tient pas toujours compte de la même
          méthode de calcul (capital initial ou capital restant dû).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Assurance dégressive ou assurance constante</h2>
        <p>
          Une assurance dite dégressive calcule la cotisation sur le capital restant dû, qui diminue chaque année :
          la prime baisse avec le temps. Une assurance à capital constant applique le même taux sur le capital
          initial pendant toute la durée du prêt : la cotisation ne varie pas, mais le coût total est souvent plus
          élevé sur la durée complète du crédit. C&apos;est un des paramètres à vérifier avant de comparer deux
          offres au seul taux affiché.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur/vos-droits/prix" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Prix de l&apos;assurance emprunteur</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Les critères qui déterminent réellement votre tarif.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/moins-chere" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Assurance moins chère</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Les leviers concrets pour réduire votre cotisation.</p>
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
