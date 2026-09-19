import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur et diabète | Madeleg",
  description:
    "Le diabète fait partie des risques aggravés de santé les plus fréquents en assurance emprunteur. Pourquoi comparer les assureurs compte particulièrement dans ce cas.",
  alternates: { canonical: "/assurance-emprunteur/diabete" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceEmprunteurDiabete() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur et diabète
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Le diabète est l&apos;un des antécédents les plus fréquemment déclarés dans un questionnaire de santé. Les
          assureurs ne le traitent pas tous de la même façon, ce qui rend la comparaison particulièrement utile ici.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Un antécédent courant, traité au cas par cas</h2>
        <p>
          Un diabète de type 1 ou de type 2 doit être déclaré dans le{" "}
          <Link href="/assurance-emprunteur/questionnaire-sante" className="underline">
            questionnaire de santé
          </Link>
          , lorsque celui-ci s&apos;applique. L&apos;assureur évalue le dossier en fonction du type de diabète, de
          l&apos;ancienneté du diagnostic, de la stabilité du traitement et du suivi médical régulier, pas seulement
          de la présence du diagnostic en tant que tel.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Une grille d&apos;évaluation qui diffère fortement d&apos;un assureur à l&apos;autre</h2>
        <p>
          Certains assureurs se sont spécialisés dans l&apos;évaluation des risques aggravés de santé et disposent de
          grilles plus fines pour les diabètes bien équilibrés, quand d&apos;autres appliquent une surprime plus
          générique. C&apos;est précisément sur ce type de profil que le contrat groupe de la banque, non
          individualisé, désavantage le plus souvent l&apos;emprunteur.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le diabète relève de la grille de référence, pas du droit à l&apos;oubli</h2>
        <p>
          Le{" "}
          <Link href="/assurance-emprunteur/risque-aggrave-sante" className="underline">
            droit à l&apos;oubli
          </Link>{" "}
          ne concerne que le cancer et l&apos;hépatite C : il ne s&apos;applique pas au diabète, pathologie
          chronique. Le diabète relève en revanche de la grille de référence de la convention AERAS, qui encadre les
          surprimes et exclusions applicables une fois la pathologie stabilisée depuis un délai défini, sans dispenser
          de la déclarer dans le questionnaire de santé.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg sollicite plusieurs assureurs en parallèle pour comparer leurs propositions sur votre
          profil précis, plutôt que de vous laisser accepter la première réponse du contrat groupe.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Un diabète bien équilibré entraîne-t-il forcément une surprime ?",
              reponse:
                "Pas systématiquement. Cela dépend de l'assureur sollicité et de la stabilité du traitement, d'où l'intérêt de comparer plusieurs propositions plutôt que de s'arrêter à la première.",
            },
            {
              question: "Faut-il refaire une déclaration si mon traitement change en cours de prêt ?",
              reponse:
                "Le contrat est évalué à la souscription. Un changement de traitement ultérieur ne remet pas en cause la garantie acceptée, sauf clause spécifique prévue par votre contrat.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un diabète bien équilibré entraîne-t-il forcément une surprime ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Pas systématiquement. Cela dépend de l&apos;assureur sollicité et de la stabilité du traitement, d&apos;où
              l&apos;intérêt de comparer plusieurs propositions plutôt que de s&apos;arrêter à la première.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Faut-il refaire une déclaration si mon traitement change en cours de prêt ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Le contrat est évalué à la souscription. Un changement de traitement ultérieur ne remet pas en cause la
              garantie acceptée, sauf clause spécifique prévue par votre contrat.
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
