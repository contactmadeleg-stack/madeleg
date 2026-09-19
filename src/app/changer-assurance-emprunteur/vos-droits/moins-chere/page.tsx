import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur moins chère : les leviers réels | Madeleg",
  description:
    "Délégation, mode de calcul du capital assuré, quotité : les leviers concrets pour réduire le coût de votre assurance de prêt, sans changer de banque ni de crédit.",
  alternates: { canonical: "/changer-assurance-emprunteur/vos-droits/moins-chere" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceEmprunteurMoinsChere() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Comment réduire le coût de votre assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Réduire sa cotisation ne se joue pas seulement en changeant d&apos;assureur. Le mode de calcul de votre
          contrat pèse souvent davantage que le taux affiché.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Le levier principal : la délégation d&apos;assurance</h2>
        <p>
          Remplacer le contrat groupe de votre banque par un contrat individuel équivalent reste le levier le plus
          direct. Un contrat individuel évalue votre profil réel, là où le contrat groupe applique un tarif moyen à
          toute une catégorie d&apos;emprunteurs. La{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>{" "}
          est possible avant la signature du prêt, et la{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            loi Lemoine
          </Link>{" "}
          permet de le faire à tout moment ensuite.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un critère souvent négligé : le mode de calcul du capital assuré</h2>
        <p>
          Un contrat qui calcule votre cotisation sur le capital restant dû, et non sur le capital initial fixé au
          départ, voit sa cotisation baisser chaque année à mesure que vous remboursez. Sur la durée totale du
          crédit, cette seule différence de méthode peut représenter un écart de coût plus important que la
          différence de taux entre deux contrats.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Ajuster la quotité à votre situation réelle</h2>
        <p>
          Pour un emprunt à deux, la quotité assurée par personne n&apos;est pas figée à parts égales : elle peut
          être répartie selon les revenus ou le rôle de chacun dans le remboursement. Une répartition mal ajustée à
          la souscription peut faire payer une garantie disproportionnée par rapport au risque réel supporté par
          chaque emprunteur.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg compare votre contrat actuel à des alternatives aux garanties équivalentes, en tenant
          compte du mode de calcul et de la répartition de la quotité, puis suit l&apos;ensemble des échanges avec
          votre banque jusqu&apos;à validation.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Réduire mon assurance de prêt peut-il faire baisser mes garanties sans que je m'en aperçoive ?",
              reponse:
                "Non. La loi impose une équivalence de garanties avec votre contrat actuel : un contrat moins cher mais moins protecteur ne peut pas être accepté par votre banque.",
            },
            {
              question: "Faut-il attendre la fin d'une période pour changer d'assurance moins chère ?",
              reponse: "Non, la loi Lemoine permet de résilier à tout moment, sans attendre une date anniversaire.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Réduire mon assurance de prêt peut-il faire baisser mes garanties sans que je m&apos;en aperçoive ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non. La loi impose une équivalence de garanties avec votre contrat actuel : un contrat moins cher mais
              moins protecteur ne peut pas être accepté par votre banque.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Faut-il attendre la fin d&apos;une période pour changer d&apos;assurance moins chère ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, la loi Lemoine permet de résilier à tout moment, sans attendre une date anniversaire.
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
