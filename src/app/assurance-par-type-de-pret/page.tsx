import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur selon le type de prêt immobilier | Madeleg",
  description:
    "Résidence principale, investissement locatif, prêt relais, prêt travaux : comment le type de prêt influence les garanties d'assurance emprunteur à souscrire.",
  alternates: { canonical: "/assurance-par-type-de-pret" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceParTypeDePret() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          L&apos;assurance emprunteur selon le type de prêt
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Résidence principale, investissement locatif, prêt relais : le type de crédit contracté change la
          logique de couverture à privilégier, indépendamment de votre profil personnel.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Résidence principale : la couverture la plus complète</h2>
        <p>
          Pour une résidence principale, la banque exige généralement le niveau de garanties le plus élevé, DC,
          PTIA et le plus souvent ITT et IPT, la logique étant de protéger le toit familial en toutes circonstances.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Investissement locatif : une logique différente</h2>
        <p>
          Pour un{" "}
          <Link href="/profil-emprunteur/situation-professionnelle/investissement-locatif" className="underline">
            investissement locatif
          </Link>
          , le bien génère des loyers qui peuvent en partie couvrir les échéances en cas d&apos;incapacité. Certains
          emprunteurs choisissent donc de limiter la garantie à DC et PTIA pour réduire le coût, quand d&apos;autres
          préfèrent maintenir une couverture ITT complète en cas de vacance locative prolongée. Le bon niveau de
          garantie dépend ici de votre stratégie patrimoniale globale, pas uniquement du type de prêt.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Prêt relais, prêt travaux, prêt à taux zéro</h2>
        <p>
          Un prêt relais, généralement plus court et lié à la vente d&apos;un bien existant, un prêt travaux
          complémentaire, ou une quotité de prêt à taux zéro (PTZ) peuvent chacun être couverts par une assurance
          spécifique ou intégrés à l&apos;assurance du prêt principal, selon la politique de la banque prêteuse et
          les montants en jeu.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/profil-emprunteur/situation-professionnelle/investissement-locatif" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Investissement locatif</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi la garantie ne se pense pas comme pour une résidence principale.</p>
          </Link>
          <Link href="/garanties-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Les garanties</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>DC, PTIA, IPT, ITT expliquées.</p>
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
