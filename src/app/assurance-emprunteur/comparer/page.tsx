import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment comparer deux contrats d'assurance emprunteur | Madeleg",
  description:
    "Le taux affiché ne suffit pas à comparer deux contrats. Quotité, mode de calcul, délai de carence, exclusions : les points à vérifier avant de choisir.",
  alternates: { canonical: "/assurance-emprunteur/comparer" },
};

export default function PageComparerAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Comment comparer deux contrats d&apos;assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Deux contrats avec un taux proche peuvent couvrir très différemment le même risque. Le taux seul ne dit
          rien sur ce que vous touchez réellement en cas de sinistre.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Le taux affiché ne suffit pas</h2>
        <p>
          La quotité assurée, le mode de calcul du capital (initial ou restant dû), le délai de carence et les
          exclusions de garantie pèsent tout autant que le taux sur ce que vous payez réellement et sur ce que vous
          êtes couvert. Comparer deux contrats uniquement sur leur taux affiché revient à comparer deux prix sans
          regarder ce qu&apos;ils incluent.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">L&apos;équivalence de garanties, le critère qui compte pour la banque</h2>
        <p>
          Ce n&apos;est pas votre appréciation personnelle qui détermine si un contrat est valable, c&apos;est
          l&apos;équivalence de garanties par rapport au contrat exigé par la banque : chaque risque couvert (décès,
          invalidité, incapacité) doit être couvert au moins aussi bien dans le nouveau contrat. C&apos;est ce que la
          banque vérifie avant d&apos;accepter une{" "}
          <Link href="/assurance-emprunteur/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Les points souvent oubliés dans une comparaison rapide</h2>
        <p>
          Le délai de carence (avant que la garantie ne commence à verser), les franchises, et les exclusions liées à
          votre profession ou à certains loisirs ne figurent pas toujours en évidence dans les comparatifs en ligne.
          Ce sont pourtant ces clauses qui font la différence le jour où vous en avez besoin.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg examine votre contrat actuel clause par clause et identifie une alternative dont
          l&apos;équivalence de garanties est vérifiable avant de la soumettre à votre banque.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un comparateur en ligne suffit-il pour choisir un nouveau contrat ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Il donne une première idée des tarifs, mais ne remplace pas la vérification précise de
              l&apos;équivalence de garanties avec votre contrat actuel, propre à chaque dossier.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le nouveau contrat doit-il être identique à l&apos;ancien ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, équivalent suffit. Il peut même être plus adapté à votre situation réelle que le contrat groupe
              d&apos;origine.
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
