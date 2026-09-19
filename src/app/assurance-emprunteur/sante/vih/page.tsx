import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur et VIH | Madeleg",
  description:
    "Être séropositif ne ferme pas la porte à l'assurance emprunteur. La grille de référence AERAS encadre les conditions d'accès pour les personnes vivant avec le VIH.",
  alternates: { canonical: "/assurance-emprunteur/sante/vih" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageAssuranceEmprunteurVih() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur et VIH
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Être séropositif complique un dossier d&apos;assurance emprunteur, cela ne le ferme pas. La grille de
          référence de la convention AERAS encadre spécifiquement les conditions d&apos;accès pour les personnes
          vivant avec le VIH.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Le VIH relève de la grille de référence, pas du droit à l&apos;oubli</h2>
        <p>
          Le{" "}
          <Link href="/assurance-emprunteur/sante/cancer" className="underline">
            droit à l&apos;oubli
          </Link>{" "}
          ne concerne que le cancer et l&apos;hépatite C : il ne s&apos;applique pas au VIH. Le VIH relève en
          revanche de la grille de référence de la convention AERAS, un dispositif distinct qui a été régulièrement
          révisé pour élargir et assouplir les conditions d&apos;accès des personnes séropositives à l&apos;assurance
          emprunteur.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Ce que prévoit la grille de référence</h2>
        <p>
          Pour les pathologies qu&apos;elle couvre, la grille de référence AERAS fixe à l&apos;avance des conditions
          d&apos;acceptation, sans surprime ni exclusion, ou avec des conditions encadrées et plafonnées, dès lors que
          des critères médicaux précis sont réunis (stabilité du traitement antirétroviral, suivi médical régulier,
          entre autres). Ces critères sont définis par la grille elle-même, régulièrement actualisée par les
          assureurs et les associations de patients qui y siègent, et peuvent évoluer : ils ne se substituent pas à
          l&apos;examen individuel de votre dossier.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">En dehors des critères de la grille : l&apos;examen AERAS classique</h2>
        <p>
          Si votre situation ne correspond pas aux critères actuels de la grille de référence, votre dossier suit le
          parcours d&apos;examen habituel du{" "}
          <Link href="/assurance-emprunteur/sante/risque-aggrave-sante" className="underline">
            risque aggravé de santé
          </Link>{" "}
          : examen standard par l&apos;assureur, puis second examen par son service médical spécialisé, puis pool de
          réassurance interprofessionnel pour les dossiers les plus complexes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi comparer les assureurs compte particulièrement ici</h2>
        <p>
          Chaque assureur applique la grille de référence et évalue le risque hors grille à sa manière. Un même
          dossier peut aboutir à des propositions très différentes d&apos;un assureur à l&apos;autre. Le contrat
          groupe de la banque, non individualisé, ne permet pas cette comparaison.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg vérifie si votre situation correspond aux critères actuels de la grille de référence,
          et sollicite plusieurs assureurs en parallèle pour comparer leurs propositions sur votre profil précis.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Le VIH bénéficie-t-il du droit à l'oubli ?",
              reponse:
                "Non, le droit à l'oubli ne concerne que le cancer et l'hépatite C. Le VIH relève de la grille de référence de la convention AERAS, un mécanisme distinct qui encadre les conditions d'accès sans dispenser de la déclaration.",
            },
            {
              question: "Une personne séropositive peut-elle obtenir une assurance emprunteur sans surprime ?",
              reponse:
                "Oui, c'est possible lorsque la situation correspond aux critères actuels de la grille de référence AERAS. En dehors de ces critères, le dossier suit l'examen classique prévu pour le risque aggravé de santé.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le VIH bénéficie-t-il du droit à l&apos;oubli ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, le droit à l&apos;oubli ne concerne que le cancer et l&apos;hépatite C. Le VIH relève de la grille
              de référence de la convention AERAS, un mécanisme distinct qui encadre les conditions d&apos;accès sans
              dispenser de la déclaration.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Une personne séropositive peut-elle obtenir une assurance emprunteur sans surprime ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui, c&apos;est possible lorsque la situation correspond aux critères actuels de la grille de référence
              AERAS. En dehors de ces critères, le dossier suit l&apos;examen classique prévu pour le risque aggravé
              de santé.
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
