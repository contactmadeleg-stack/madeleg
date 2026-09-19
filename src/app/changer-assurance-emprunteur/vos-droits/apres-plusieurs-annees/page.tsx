import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Changer d'assurance emprunteur après plusieurs années | Madeleg",
  description:
    "Votre prêt a plusieurs années : vous pouvez toujours changer d'assurance emprunteur. Ce qui reste intéressant, et le cas où ça ne l'est plus.",
  alternates: { canonical: "/changer-assurance-emprunteur/vos-droits/apres-plusieurs-annees" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageChangerApresPlusieursAnnees() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Changer d&apos;assurance emprunteur après plusieurs années, est-ce trop tard ?
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Non, il n&apos;existe aucun délai limite. La question qui compte n&apos;est pas l&apos;ancienneté de votre
          prêt, mais si l&apos;économie potentielle justifie encore la démarche.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Aucun délai limite, quelle que soit l&apos;ancienneté du prêt</h2>
        <p>
          La{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            loi Lemoine
          </Link>{" "}
          permet de résilier votre assurance de prêt à tout moment, sans condition d&apos;ancienneté. Un crédit signé
          il y a quinze ans est concerné exactement de la même façon qu&apos;un crédit de l&apos;an dernier.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi ça reste souvent intéressant, même tard dans le prêt</h2>
        <p>
          Si votre contrat actuel calcule la cotisation sur le capital initial emprunté plutôt que sur le capital
          restant dû, vous continuez de payer sur la base du montant emprunté au départ, alors que votre dette a
          diminué. Dans ce cas, l&apos;écart avec un contrat calculé sur le capital restant dû peut rester
          significatif même après plusieurs années de remboursement.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le cas où ça ne l&apos;est plus vraiment</h2>
        <p>
          Sur les toutes dernières années d&apos;un prêt, le capital restant dû devient faible et l&apos;économie
          potentielle diminue avec lui. À ce stade, le temps passé à monter un dossier de substitution peut ne plus
          être justifié par le gain. C&apos;est un calcul à faire au cas par cas, pas une règle générale.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Ce qui ne change pas : votre prêt reste identique</h2>
        <p>
          Changer d&apos;assurance emprunteur ne touche ni au taux, ni à la durée, ni à la banque qui gère votre
          crédit. Seul le contrat qui couvre les risques décès, invalidité et incapacité est remplacé.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg calcule l&apos;économie réelle possible sur le capital restant dû de votre prêt avant
          d&apos;engager une démarche, pour vérifier que le changement en vaut la peine dans votre cas précis.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Mon prêt a quinze ans, ça vaut vraiment le coup de vérifier ?",
              reponse:
                "Ça dépend du capital restant dû et du mode de calcul de votre contrat actuel. C'est justement ce qu'un conseiller vérifie avant de vous dire si la démarche est pertinente.",
            },
            {
              question: "Dois-je prévenir ma banque avant de chercher un nouveau contrat ?",
              reponse:
                "Non, vous pouvez d'abord identifier un contrat aux garanties équivalentes avant de notifier votre banque de la résiliation.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Mon prêt a quinze ans, ça vaut vraiment le coup de vérifier ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Ça dépend du capital restant dû et du mode de calcul de votre contrat actuel. C&apos;est justement ce
              qu&apos;un conseiller vérifie avant de vous dire si la démarche est pertinente.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Dois-je prévenir ma banque avant de chercher un nouveau contrat ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, vous pouvez d&apos;abord identifier un contrat aux garanties équivalentes avant de notifier votre
              banque de la résiliation.
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
