import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Loi Lemoine assurance emprunteur : ce qu'elle change | Madeleg",
  description:
    "Résiliation à tout moment, suppression du questionnaire médical sous conditions : ce que change concrètement la loi Lemoine sur votre assurance de prêt.",
  alternates: { canonical: "/assurance-emprunteur/loi-lemoine" },
};

export default function PageLoiLemoine() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          La loi Lemoine, ce qu&apos;elle change pour votre assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Entrée en vigueur le 1er juin 2022, la loi Lemoine a changé deux choses : quand vous pouvez changer
          d&apos;assurance de prêt, et dans quels cas vous devez encore répondre à un questionnaire de santé.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Résilier à tout moment, sans attendre une date anniversaire</h2>
        <p>
          Avant la loi Lemoine, changer d&apos;assurance de prêt n&apos;était possible qu&apos;à la date anniversaire
          du contrat, dans une fenêtre de quelques semaines à ne pas manquer. La loi Lemoine supprime cette
          contrainte : vous pouvez résilier votre assurance de prêt immobilier à tout moment, dès le premier jour du
          crédit, sans frais de résiliation ni justification à donner à la banque.
        </p>
        <p>
          Cette règle s&apos;applique aux contrats souscrits après le 1er juin 2022, mais aussi à tous les contrats en
          cours signés avant cette date. Que votre crédit ait dix mois ou dix ans, le droit de changer
          d&apos;assurance à tout moment s&apos;applique de la même façon, même si l&apos;intérêt à le faire{" "}
          <Link href="/assurance-emprunteur/apres-plusieurs-annees" className="underline">
            varie selon l&apos;ancienneté du prêt
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Une seule condition : l&apos;équivalence de garanties</h2>
        <p>
          La banque ne peut pas refuser votre nouveau contrat si celui-ci offre des garanties équivalentes, selon des{" "}
          <Link href="/assurance-emprunteur/comparer" className="underline">
            critères précis et encadrés
          </Link>
          , à celles qu&apos;elle exige initialement. Elle ne peut pas non plus modifier les conditions de votre
          prêt, ni son taux, au motif que vous changez d&apos;assureur. C&apos;est cette vérification d&apos;équivalence, précise
          et documentée, qui fait la différence entre une résiliation acceptée et un dossier qui traîne. C&apos;est le
          même principe que celui de la{" "}
          <Link href="/assurance-emprunteur/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>{" "}
          au moment de la souscription du prêt.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">La suppression du questionnaire de santé, sous conditions</h2>
        <p>
          La loi Lemoine supprime aussi le{" "}
          <Link href="/assurance-emprunteur/questionnaire-sante" className="underline">
            questionnaire médical
          </Link>{" "}
          pour les prêts immobiliers dont la part assurée par personne ne dépasse pas 200 000 €, et dont le terme
          intervient avant les 60 ans de l&apos;emprunteur. Dans ce cas, votre état de santé ne peut plus être un
          motif de refus ou de surprime, ce qui change la donne pour les personnes qui ont un{" "}
          <Link href="/assurance-emprunteur/risque-aggrave-sante" className="underline">
            antécédent médical
          </Link>{" "}
          à déclarer. Au-delà de ce seuil, le questionnaire de santé reste applicable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg identifie un contrat aux garanties équivalentes aux vôtres, prépare le dossier de
          substitution et suit l&apos;ensemble des échanges avec votre banque jusqu&apos;à validation. Vous
          n&apos;avez pas à gérer vous-même les délais de réponse ni les allers-retours administratifs.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "La loi Lemoine s'applique-t-elle à un contrat signé il y a plusieurs années ?",
              reponse:
                "Oui. Le droit de résilier à tout moment s'applique aux contrats en cours, quelle que soit leur date de signature.",
            },
            {
              question: "La banque peut-elle refuser ma demande de résiliation ?",
              reponse:
                "Elle ne peut refuser que si le nouveau contrat n'offre pas des garanties équivalentes. C'est précisément ce que nous vérifions avant de déposer votre dossier de substitution.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              La loi Lemoine s&apos;applique-t-elle à un contrat signé il y a plusieurs années ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui. Le droit de résilier à tout moment s&apos;applique aux contrats en cours, quelle que soit leur
              date de signature.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              La banque peut-elle refuser ma demande de résiliation ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Elle ne peut refuser que si le nouveau contrat n&apos;offre pas des garanties équivalentes. C&apos;est
              précisément ce que nous vérifions avant de déposer votre dossier de substitution.
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
