import Link from "next/link";
import type { Metadata } from "next";
import { EDITEUR, MANDANT } from "@/lib/identite";

export const metadata: Metadata = {
  title: "Qui sommes-nous | Madeleg",
  description:
    "Madeleg est porté par Romuald Dos Santos, mandataire d'intermédiaire d'assurance issu du monde bancaire. Son parcours, et pourquoi il a créé Madeleg.",
  alternates: { canonical: "/qui-sommes-nous" },
};

export default function PageQuiSommesNous() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10 text-center">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Qui sommes-nous
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Romuald Dos Santos, fondateur de Madeleg
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Madeleg est né d&apos;un parcours dans la banque, puis dans le courtage, et d&apos;un constat simple : la
          plupart des emprunteurs ne comprennent pas ce qu&apos;ils paient pour leur assurance de prêt.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Un parcours construit entièrement dans la banque et le courtage</h2>
        <p>
          Toute ma formation s&apos;est faite dans la banque : BTS banque, licence, puis master banque. J&apos;ai
          ensuite débuté ma carrière à l&apos;accueil d&apos;une agence, avant de devenir conseiller pour les
          particuliers, puis conseiller pour les professionnels. J&apos;ai ensuite passé plusieurs années dans le
          courtage en prêt immobilier et en assurance emprunteur, à monter des dossiers de délégation pour des
          emprunteurs de tous profils.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le constat qui a mené à la création de Madeleg</h2>
        <p>
          Sur le terrain, un même constat revenait sans cesse : pour la plupart des emprunteurs, l&apos;assurance de
          prêt reste complexe, et beaucoup ne savent pas vraiment pourquoi ils paient ce qu&apos;ils paient. Le
          contrat que la banque propose par défaut est souvent plus cher qu&apos;un contrat individuel, sans être
          pour autant mieux couvrant.
        </p>
        <p>
          L&apos;argument le plus fréquent des banques pour défendre leur contrat groupe, c&apos;est l&apos;absence
          ou la rareté des exclusions de garantie. Mais en pratique, une délégation d&apos;assurance bien choisie
          couvre les mêmes risques, dans les mêmes conditions. Les écarts se jouent sur des comportements extrêmes,
          par exemple la conduite sous stupéfiants ou avec une alcoolémie très élevée, que certains contrats groupe
          peuvent encore couvrir quand une délégation les exclut. Sur le risque ordinaire, un emprunteur reste
          assuré aussi bien, voire mieux, avec un contrat délégué. C&apos;est cet écart entre la réalité des
          garanties et l&apos;argument commercial des banques qui m&apos;a poussé à créer Madeleg : donner à chaque
          emprunteur une comparaison claire, plutôt qu&apos;un choix par défaut.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le statut de Madeleg, en toute transparence</h2>
        <p>
          Madeleg n&apos;est pas un courtier. J&apos;exerce en tant que mandataire d&apos;intermédiaire
          d&apos;assurance (MIA), immatriculé à l&apos;ORIAS sous le n° {EDITEUR.orias}, pour le compte de{" "}
          {MANDANT.raisonSociale} ({MANDANT.marque}), {MANDANT.categorie}. Le détail de cette relation, des
          assureurs partenaires et de notre rémunération est expliqué sur la page{" "}
          <Link href="/partenaires" className="underline">
            nos partenaires
          </Link>{" "}
          et dans nos{" "}
          <Link href="/mentions-legales" className="underline">
            mentions légales
          </Link>
          .
        </p>
      </section>

      <div className="text-center">
        <Link href="/#simulateur" className="mdl-btn mdl-btn--primary mdl-btn--lg">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
