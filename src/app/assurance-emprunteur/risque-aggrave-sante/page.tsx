import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Risque aggravé de santé et assurance emprunteur : la convention AERAS | Madeleg",
  description:
    "Un problème de santé ne ferme pas la porte à l'assurance emprunteur. La convention AERAS et le droit à l'oubli, ce qu'ils changent concrètement pour votre dossier.",
  alternates: { canonical: "/assurance-emprunteur/risque-aggrave-sante" },
};

export default function PageRisqueAggraveSante() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Risque aggravé de santé : ce que change la convention AERAS
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Un antécédent médical peut compliquer l&apos;accès à l&apos;assurance emprunteur, il ne l&apos;empêche pas.
          La convention AERAS encadre précisément ce qui se passe quand votre profil sort de la grille standard.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Qu&apos;est-ce qu&apos;un risque aggravé de santé</h2>
        <p>
          Un risque aggravé de santé désigne une situation où vos antécédents ou votre état de santé actuel amènent
          l&apos;assureur à s&apos;écarter de sa grille tarifaire standard : surprime, exclusion de garantie sur un
          risque précis, ou dans certains cas refus. Ce n&apos;est pas un jugement sur votre situation, c&apos;est un
          calcul statistique propre à chaque assureur, et c&apos;est précisément parce qu&apos;il diffère d&apos;un
          assureur à l&apos;autre que la comparaison prend tout son sens ici.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">La convention AERAS, un examen automatique à plusieurs niveaux</h2>
        <p>
          La convention AERAS (s&apos;Assurer et Emprunter avec un Risque Aggravé de Santé) organise l&apos;examen de
          votre dossier sur trois niveaux, automatiquement et sans démarche de votre part si le niveau précédent ne
          suffit pas : un examen standard par l&apos;assureur à partir du questionnaire de santé, puis un second
          examen par son service médical spécialisé, puis un pool de réassurance interprofessionnel pour les risques
          les plus élevés. Si vous estimez que ce parcours n&apos;a pas été correctement appliqué, une commission de
          médiation propre à la convention peut être saisie.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le droit à l&apos;oubli, une avancée concrète de la loi Lemoine</h2>
        <p>
          La{" "}
          <Link href="/assurance-emprunteur/loi-lemoine" className="underline">
            loi Lemoine
          </Link>{" "}
          a réduit le délai du droit à l&apos;oubli à 5 ans après la fin du protocole thérapeutique, sans rechute,
          pour l&apos;ensemble des cancers et l&apos;hépatite C, sans distinction d&apos;âge au moment du diagnostic
          (contre 10 ans auparavant, hors exception déjà applicable à certains cancers pédiatriques). Passé ce délai,
          vous n&apos;avez plus à déclarer cet antécédent dans le{" "}
          <Link href="/assurance-emprunteur/questionnaire-sante" className="underline">
            questionnaire de santé
          </Link>
          , et il ne peut plus justifier ni surprime ni exclusion.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Droit à l&apos;oubli et grille de référence : deux mécanismes distincts</h2>
        <p>
          Le droit à l&apos;oubli dispense totalement de déclarer certaines pathologies après un délai donné, mais il
          ne concerne que le cancer et l&apos;hépatite C. Pour les autres pathologies chroniques (diabète, maladies
          cardiovasculaires, VIH, entre autres), la convention AERAS prévoit une grille de référence distincte : elle
          n&apos;écarte pas l&apos;obligation de déclaration, mais encadre les surprimes et exclusions applicables
          lorsque la pathologie est stabilisée depuis un délai défini par la grille.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg identifie les assureurs dont la grille de tarification est la plus favorable à votre
          situation précise, plutôt que de vous laisser au tarif du contrat groupe de la banque, qui n&apos;a pas
          cette marge de négociation par profil.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Un risque aggravé de santé signifie-t-il un refus automatique ?",
              reponse:
                "Non. Cela peut se traduire par une surprime ou une exclusion ciblée, et la convention AERAS prévoit un examen renforcé, automatique, avant tout refus définitif.",
            },
            {
              question: "Le droit à l'oubli s'applique-t-il à toutes les pathologies ?",
              reponse:
                "Non, il ne concerne que le cancer et l'hépatite C, 5 ans après la fin du traitement. Les autres pathologies chroniques relèvent de la grille de référence, un mécanisme distinct.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un risque aggravé de santé signifie-t-il un refus automatique ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non. Cela peut se traduire par une surprime ou une exclusion ciblée, et la convention AERAS prévoit un
              examen renforcé, automatique, avant tout refus définitif.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Le droit à l&apos;oubli s&apos;applique-t-il à toutes les pathologies ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, il ne concerne que le cancer et l&apos;hépatite C, 5 ans après la fin du traitement. Les autres
              pathologies chroniques relèvent de la grille de référence, un mécanisme distinct.
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
