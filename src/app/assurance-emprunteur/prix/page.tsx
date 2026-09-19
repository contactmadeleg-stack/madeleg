import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Prix de l'assurance emprunteur : les critères qui comptent | Madeleg",
  description:
    "Âge, état de santé, quotité, mode de calcul du capital assuré : ce qui détermine réellement le prix de votre assurance emprunteur, et pourquoi deux profils similaires paient rarement le même tarif.",
  alternates: { canonical: "/assurance-emprunteur/prix" },
};

export default function PagePrixAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Le prix de l&apos;assurance emprunteur, ce qui le détermine
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Deux emprunteurs pour un montant et une durée identiques peuvent payer des cotisations très différentes.
          Ce n&apos;est pas un hasard : le tarif dépend de critères précis, et surtout de la façon dont l&apos;assureur
          calcule le capital sur lequel il vous fait cotiser.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Les critères qui entrent dans le calcul</h2>
        <p>
          Votre âge à la souscription, votre état de santé, votre profession, le montant emprunté, la durée du prêt
          et la quotité assurée (la part du capital couverte par chaque emprunteur) forment la base du calcul. Un
          assureur individuel évalue ces critères pour votre profil précis, là où le contrat groupe de la banque
          applique une grille commune à tous ses emprunteurs.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Capital initial ou capital restant dû : deux calculs qui changent tout</h2>
        <p>
          C&apos;est le point le moins connu, et souvent le plus déterminant sur le montant total payé. Certains
          contrats calculent votre cotisation sur le capital initial emprunté, fixe pendant toute la durée du prêt.
          D&apos;autres la calculent sur le capital restant dû, qui diminue chaque année à mesure que vous
          remboursez. Sur la durée totale du crédit, ces deux méthodes n&apos;aboutissent pas au même coût, même à
          taux affiché identique.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi le contrat groupe ne reflète pas votre profil réel</h2>
        <p>
          Le contrat groupe de la banque mutualise le risque entre tous ses emprunteurs et applique un tarif moyen
          par catégorie. Un profil favorable (jeune, non-fumeur, sans antécédent médical) y paie souvent plus cher
          que ce qu&apos;un contrat individuel lui proposerait, puisque son tarif finance aussi les profils plus
          risqués de la même catégorie.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg examine votre profil et le mode de calcul de votre contrat actuel, puis identifie un
          contrat aux garanties équivalentes susceptible de réduire votre cotisation. Pour connaître les leviers
          concrets de réduction, consultez notre page{" "}
          <Link href="/assurance-emprunteur/moins-chere" className="underline">
            assurance emprunteur moins chère
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Le tabagisme influence-t-il vraiment le prix ?",
              reponse:
                "Oui, c'est un critère standard du questionnaire de santé lorsque celui-ci s'applique, au même titre que l'âge ou les antécédents médicaux.",
            },
            {
              question: "Le prix est-il fixé une fois pour toutes à la souscription ?",
              reponse:
                "Cela dépend du mode de calcul retenu par votre contrat. C'est précisément ce que nous vérifions avant de vous proposer une alternative.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le tabagisme influence-t-il vraiment le prix ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui, c&apos;est un critère standard du questionnaire de santé lorsque celui-ci s&apos;applique, au même
              titre que l&apos;âge ou les antécédents médicaux.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le prix est-il fixé une fois pour toutes à la souscription ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Cela dépend du mode de calcul retenu par votre contrat. C&apos;est précisément ce que nous vérifions
              avant de vous proposer une alternative.
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
