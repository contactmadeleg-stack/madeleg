import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Résilier son assurance emprunteur : la procédure étape par étape | Madeleg",
  description:
    "Dossier de substitution, notification à la banque, délai légal de réponse : les étapes concrètes pour résilier votre assurance emprunteur, dans l'ordre.",
  alternates: { canonical: "/changer-assurance-emprunteur/vos-droits/resilier" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageResilierAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Résilier son assurance emprunteur, la procédure étape par étape
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          La{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            loi Lemoine
          </Link>{" "}
          vous donne le droit de résilier à tout moment. Concrètement, la démarche suit un ordre précis, avec un
          délai de réponse encadré par la loi.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">1. Identifier un contrat aux garanties équivalentes</h2>
        <p>
          Avant toute notification à la banque, il faut d&apos;abord trouver un contrat individuel dont les
          garanties sont{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/comparer" className="underline">
            équivalentes
          </Link>{" "}
          à celles exigées par votre offre de prêt. C&apos;est cette équivalence, vérifiée avant tout dépôt de
          dossier, qui conditionne l&apos;acceptation par la banque.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">2. Constituer le dossier de substitution</h2>
        <p>
          Le dossier réunit la nouvelle proposition d&apos;assurance, les conditions générales du nouveau contrat, et
          une demande écrite de substitution adressée à la banque. La demande doit permettre à la banque de comparer
          précisément les garanties du nouveau contrat à celles qu&apos;elle exige.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">3. Notifier la banque et compter le délai légal</h2>
        <p>
          Une fois le dossier complet reçu, la banque dispose d&apos;un délai de dix jours ouvrés pour répondre :
          accepter la substitution et modifier le contrat de prêt par avenant, ou refuser par écrit en motivant son
          refus par un défaut d&apos;équivalence de garanties. Les samedis, dimanches et jours fériés ne comptent pas
          dans ce délai. Passé ce délai sans réponse, ou en cas de refus non motivé par l&apos;équivalence des
          garanties, vous pouvez faire valoir vos droits, y compris en signalant la situation à l&apos;Autorité de
          contrôle prudentiel et de résolution (ACPR).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">4. La bascule, sans changement du prêt</h2>
        <p>
          En cas d&apos;acceptation, la banque modifie le contrat de prêt par avenant, sans frais supplémentaires
          exigibles pour cet avenant. Le taux, la durée et le montant du prêt restent identiques : seul
          l&apos;assureur change.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg identifie le contrat équivalent, prépare le dossier de substitution complet, et suit
          le délai de réponse de la banque à votre place, jusqu&apos;à la signature de l&apos;avenant.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Que se passe-t-il si la banque ne répond pas dans le délai de dix jours ouvrés ?",
              reponse:
                "Ce délai est encadré par la loi. En l'absence de réponse ou face à un refus non motivé par l'équivalence des garanties, vous pouvez faire valoir vos droits, y compris en signalant la situation à l'ACPR.",
            },
            {
              question: "La résiliation entraîne-t-elle des frais ?",
              reponse:
                "Non. La loi Lemoine supprime les frais de résiliation, et la banque ne peut pas facturer l'avenant au contrat de prêt lié au changement d'assurance.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Que se passe-t-il si la banque ne répond pas dans le délai de dix jours ouvrés ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Ce délai est encadré par la loi. En l&apos;absence de réponse ou face à un refus non motivé par
              l&apos;équivalence des garanties, vous pouvez faire valoir vos droits, y compris en signalant la
              situation à l&apos;ACPR.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              La résiliation entraîne-t-elle des frais ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non. La loi Lemoine supprime les frais de résiliation, et la banque ne peut pas facturer
              l&apos;avenant au contrat de prêt lié au changement d&apos;assurance.
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
