import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Questionnaire de santé assurance emprunteur : comment ça marche | Madeleg",
  description:
    "Quand le questionnaire de santé s'applique, ce qu'il couvre, à qui il est transmis : ce qu'il faut comprendre avant de le remplir pour votre assurance emprunteur.",
  alternates: { canonical: "/risque-aggrave-sante/questionnaire-et-declaration/questionnaire-sante" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageQuestionnaireSante() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Le questionnaire de santé de l&apos;assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Il ne s&apos;applique pas à tous les emprunteurs, il n&apos;est pas identique d&apos;un assureur à
          l&apos;autre, et il n&apos;est jamais transmis à votre banque. Voici ce qu&apos;il faut savoir avant de le
          remplir.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Il ne s&apos;applique pas à tout le monde</h2>
        <p>
          Depuis la{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            loi Lemoine
          </Link>
          , le questionnaire de santé n&apos;est pas exigé pour les prêts dont la part assurée par personne ne
          dépasse pas 200 000 €, à condition que le remboursement s&apos;achève avant vos 60 ans. Au-delà de ce
          seuil, il reste une étape normale du dossier, pas une formalité à part.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Ce qu&apos;il couvre, dans les grandes lignes</h2>
        <p>
          Le questionnaire porte sur vos antécédents médicaux, vos traitements en cours et certains éléments de votre
          mode de vie susceptibles d&apos;influencer le risque assuré. Son contenu exact et sa formulation varient
          d&apos;un assureur à l&apos;autre : deux questionnaires ne posent pas nécessairement les mêmes questions de
          la même façon, ce qui explique pourquoi un même profil peut être évalué différemment selon l&apos;assureur
          sollicité.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le secret médical est respecté</h2>
        <p>
          Vos réponses sont examinées par le service médical de l&apos;assureur, pas par votre banque ni par
          l&apos;intermédiaire qui monte votre dossier. Seule la décision finale (acceptation, surprime, exclusion)
          est communiquée, jamais le détail de vos réponses.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Répondre avec exactitude, un point qui ne se négocie pas</h2>
        <p>
          Une réponse inexacte, même involontaire, peut être requalifiée en fausse déclaration et remettre en cause
          la garantie au moment où vous en avez besoin. En cas de doute sur une question, mieux vaut la clarifier
          avec l&apos;assureur avant de répondre que de deviner.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg vous oriente vers l&apos;assureur dont le questionnaire et la grille
          d&apos;évaluation correspondent le mieux à votre situation, en particulier si vous relevez d&apos;un{" "}
          <Link href="/risque-aggrave-sante" className="underline">
            risque aggravé de santé
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Ma banque peut-elle voir mes réponses au questionnaire de santé ?",
              reponse:
                "Non. Seul le service médical de l'assureur y a accès. Votre banque ne reçoit que la décision finale sur votre dossier.",
            },
            {
              question: "Puis-je changer d'assureur si le premier questionnaire aboutit à une surprime ?",
              reponse:
                "Oui, chaque assureur évalue votre dossier selon sa propre grille. Un second avis peut aboutir à une proposition différente.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Ma banque peut-elle voir mes réponses au questionnaire de santé ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non. Seul le service médical de l&apos;assureur y a accès. Votre banque ne reçoit que la décision
              finale sur votre dossier.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Puis-je changer d&apos;assureur si le premier questionnaire aboutit à une surprime ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui, chaque assureur évalue votre dossier selon sa propre grille. Un second avis peut aboutir à une
              proposition différente.
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
