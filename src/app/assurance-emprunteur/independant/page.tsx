import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurance emprunteur indépendant | Madeleg",
  description:
    "Travailleur indépendant et emprunteur : pourquoi le contrat groupe de votre banque est rarement adapté à des revenus professionnels, et comment le changer.",
  alternates: { canonical: "/assurance-emprunteur/independant" },
};

export default function PageAssuranceEmprunteurIndependant() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur pour les travailleurs indépendants
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Sans employeur pour maintenir votre rémunération en cas d&apos;arrêt de travail, le contrat d&apos;assurance
          de prêt joue un rôle plus direct dans votre protection. Le contrat groupe standard de la banque n&apos;est
          pas construit pour ce profil.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Pas de maintien de salaire en cas d&apos;arrêt</h2>
        <p>
          Un salarié bénéficie souvent, via sa convention collective, d&apos;un maintien partiel ou total de sa
          rémunération pendant les premiers mois d&apos;arrêt de travail. Un indépendant n&apos;a pas cet
          intermédiaire : ses revenus s&apos;arrêtent avec son activité. Le délai de carence de votre contrat
          d&apos;assurance de prêt (la période avant que la garantie ne commence à verser) a donc un impact concret
          sur votre trésorerie, bien plus que pour un salarié.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment votre revenu est évalué</h2>
        <p>
          Les assureurs calculent généralement l&apos;indemnisation en cas d&apos;incapacité à partir de la moyenne de
          vos résultats professionnels (BIC ou BNC) sur les deux ou trois derniers exercices. Pour une activité
          récente ou en croissance, cette moyenne peut sous-évaluer votre revenu réel au moment de la souscription.
          C&apos;est un point à vérifier précisément avant de signer, pas un détail administratif.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un contrat groupe pensé pour un salarié</h2>
        <p>
          Le contrat groupe de la banque applique les mêmes grilles de garanties à tous les emprunteurs, quel que
          soit leur statut professionnel. Les définitions de l&apos;incapacité et de l&apos;invalidité y sont souvent
          calquées sur le régime général des salariés, sans tenir compte des spécificités du régime social des
          indépendants. La délégation d&apos;assurance permet de choisir un contrat dont les garanties correspondent
          réellement à votre situation.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          La procédure suit la loi Lemoine, identique pour tous les emprunteurs : résiliation possible à tout moment,
          sans frais ni justification, à condition que le nouveau contrat offre des garanties équivalentes. Un
          conseiller Madeleg vérifie cette équivalence pour vous et suit l&apos;ensemble des échanges avec votre
          banque jusqu&apos;à validation.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un auto-entrepreneur peut-il changer d&apos;assurance emprunteur comme un autre indépendant ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui, la procédure est la même. Seule l&apos;évaluation de vos revenus professionnels par l&apos;assureur
              diffère selon votre régime.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le délai de carence est-il négociable ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Il varie selon les contrats et les assureurs. C&apos;est un des critères que nous comparons avec vous
              lors de l&apos;étude de votre dossier.
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
