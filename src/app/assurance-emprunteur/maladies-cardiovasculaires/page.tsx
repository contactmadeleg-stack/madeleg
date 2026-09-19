import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur et maladies cardiovasculaires | Madeleg",
  description:
    "Infarctus, valvulopathie opérée, trouble du rythme stabilisé : un antécédent cardiovasculaire ne ferme pas la porte à l'assurance emprunteur. Ce que prévoit la grille de référence AERAS.",
  alternates: { canonical: "/assurance-emprunteur/maladies-cardiovasculaires" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceEmprunteurMaladiesCardiovasculaires() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur et maladies cardiovasculaires
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Un infarctus, une valvulopathie opérée ou un trouble du rythme cardiaque compliquent un dossier
          d&apos;assurance emprunteur, sans le fermer. La grille de référence de la convention AERAS encadre
          spécifiquement les pathologies cardiovasculaires qu&apos;elle couvre.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Les pathologies cardiovasculaires relèvent de la grille de référence</h2>
        <p>
          Le{" "}
          <Link href="/assurance-emprunteur/cancer" className="underline">
            droit à l&apos;oubli
          </Link>{" "}
          ne concerne que le cancer et l&apos;hépatite C : il ne s&apos;applique pas aux pathologies
          cardiovasculaires. Certaines d&apos;entre elles (infarctus du myocarde selon son évolution, certaines
          valvulopathies opérées avec succès, certains troubles du rythme stabilisés) relèvent en revanche de la
          grille de référence de la convention AERAS, au même titre que le{" "}
          <Link href="/assurance-emprunteur/vih" className="underline">
            VIH
          </Link>{" "}
          ou le{" "}
          <Link href="/assurance-emprunteur/diabete" className="underline">
            diabète
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Ce que prévoit la grille de référence</h2>
        <p>
          Pour les pathologies cardiovasculaires qu&apos;elle couvre, la grille fixe à l&apos;avance des conditions
          d&apos;acceptation encadrées et plafonnées, selon des critères médicaux précis (ancienneté de
          l&apos;événement, résultats d&apos;examens de suivi, absence de complication ou de facteur de risque non
          contrôlé). Ces critères, définis et actualisés par les assureurs et les associations de patients qui
          siègent à la commission de suivi de la convention, évoluent régulièrement et ne se substituent pas à
          l&apos;examen individuel de votre dossier.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">En dehors des critères de la grille : l&apos;examen AERAS classique</h2>
        <p>
          Si votre situation ne correspond pas aux critères actuels de la grille de référence, votre dossier suit le
          parcours d&apos;examen habituel du{" "}
          <Link href="/assurance-emprunteur/risque-aggrave-sante" className="underline">
            risque aggravé de santé
          </Link>{" "}
          : examen standard par l&apos;assureur, puis second examen par son service médical spécialisé, puis pool de
          réassurance interprofessionnel pour les dossiers les plus complexes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi comparer les assureurs compte particulièrement ici</h2>
        <p>
          Face à un même antécédent cardiovasculaire, deux assureurs peuvent aboutir à des propositions très
          différentes selon leur propre grille d&apos;évaluation du risque hors des critères de la grille de
          référence. Le contrat groupe de la banque, non individualisé, ne permet pas cette comparaison.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg vérifie si votre situation correspond aux critères actuels de la grille de référence,
          et sollicite plusieurs assureurs en parallèle pour comparer leurs propositions sur votre profil précis,
          plutôt que de vous laisser au tarif du contrat groupe de la banque.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Un antécédent cardiovasculaire entraîne-t-il toujours une surprime ?",
              reponse:
                "Non. Lorsque la situation correspond aux critères actuels de la grille de référence AERAS, l'acceptation se fait à des conditions encadrées et plafonnées à l'avance. En dehors de ces critères, le dossier suit l'examen classique du risque aggravé de santé.",
            },
            {
              question: "Le droit à l'oubli s'applique-t-il après un infarctus ?",
              reponse:
                "Non, le droit à l'oubli ne concerne que le cancer et l'hépatite C. Les pathologies cardiovasculaires relèvent de la grille de référence AERAS, un mécanisme distinct qui n'élimine pas l'obligation de déclaration.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un antécédent cardiovasculaire entraîne-t-il toujours une surprime ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non. Lorsque la situation correspond aux critères actuels de la grille de référence AERAS,
              l&apos;acceptation se fait à des conditions encadrées et plafonnées à l&apos;avance. En dehors de ces
              critères, le dossier suit l&apos;examen classique du risque aggravé de santé.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le droit à l&apos;oubli s&apos;applique-t-il après un infarctus ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, le droit à l&apos;oubli ne concerne que le cancer et l&apos;hépatite C. Les pathologies
              cardiovasculaires relèvent de la grille de référence AERAS, un mécanisme distinct qui n&apos;élimine
              pas l&apos;obligation de déclaration.
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
