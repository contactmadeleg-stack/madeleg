import type { MetaArticle } from "@/lib/content/types";
import { AUTEUR_COURTIER } from "@/lib/content/types";
import ArticleLayout from "@/components/ArticleLayout";

// BROUILLON — non publié (non ajouté à src/lib/content/registry.ts).
// À compléter avant mise en ligne : un apport personnel (expérience vécue,
// exemple concret rencontré sur un dossier réel) là où c'est indiqué
// ci-dessous par un commentaire TODO, conformément au processus de contenu
// du projet (relecture obligatoire en console d'administration).

export const meta: MetaArticle = {
  slug: "garanties-assurance-emprunteur-expliquees",
  titre: "Les garanties d'assurance emprunteur : tout comprendre simplement (sans jargon)",
  description:
    "DC, PTIA, IPT, IPP, ITT, MNO : ce que couvrent réellement les garanties d'une assurance de prêt immobilier, expliqué sans sigles ni jargon d'assureur.",
  datePublication: "",
  dateMiseAJour: "",
  auteur: AUTEUR_COURTIER,
};

export default function ArticleGarantiesExpliquees() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Quand on signe une assurance de prêt immobilier, le contrat liste une série de garanties désignées par des
        sigles : DC, PTIA, ITT, IPT, IPP, MNO. Sur le papier, ça ressemble à du jargon administratif. En réalité,
        chaque garantie répond à une question très concrète : que se passe-t-il pour votre prêt si un coup dur vous
        arrive ?
      </p>

      {/* TODO (utilisateur) : apport personnel ici, un exemple concret vécu sur
          un dossier réel (anonymisé) qui illustre pourquoi comprendre ces
          garanties fait une vraie différence pour l'emprunteur. */}

      <h2>Décès (DC)</h2>
      <p>
        Si l&apos;emprunteur assuré décède, l&apos;assureur rembourse à la banque le capital restant dû. Vos proches
        n&apos;héritent pas de la dette du logement.
      </p>

      <h2>Perte Totale et Irréversible d&apos;Autonomie (PTIA)</h2>
      <p>
        Quand l&apos;emprunteur devient totalement dépendant d&apos;une tierce personne pour les actes de la vie
        courante, de façon définitive, l&apos;assurance rembourse le capital restant dû, comme en cas de décès.
      </p>

      <h2>Invalidité Permanente Totale (IPT) et Partielle (IPP)</h2>
      <p>
        Après une maladie ou un accident, un taux d&apos;invalidité est déterminé par un médecin. Au-delà d&apos;un
        certain seuil (généralement 66% pour l&apos;IPT, entre 33% et 66% pour l&apos;IPP), l&apos;assurance prend le
        relais de tout ou partie des mensualités, selon les conditions du contrat.
      </p>

      <h2>Incapacité Temporaire Totale de travail (ITT)</h2>
      <p>
        En cas d&apos;arrêt de travail, après un délai de carence prévu au contrat, l&apos;assurance peut prendre en
        charge les mensualités le temps de l&apos;arrêt.
      </p>

      <h2>Troubles Non Objectivables (MNO)</h2>
      <p>
        Certains troubles, comme les douleurs dorsales ou les troubles psychologiques, sont difficiles à mesurer
        médicalement de façon objective. Beaucoup de contrats les excluent ou les limitent par des franchises
        spécifiques : c&apos;est un point à vérifier de près avant de signer, notamment lors d&apos;un changement
        d&apos;assurance.
      </p>

      {/* TODO (utilisateur) : compléter avec un cas vécu ou un conseil pratique
          propre à votre expérience de courtier, avant publication. */}

      <h2>Pourquoi ça compte au moment de changer d&apos;assurance</h2>
      <p>
        La loi impose que le nouveau contrat offre des garanties équivalentes à celui de la banque, pas identiques
        au mot près. C&apos;est là que la vigilance sur ces définitions fait la différence entre un contrat qui vous
        couvre vraiment et un contrat qui semble moins cher mais couvre moins bien.
      </p>
    </ArticleLayout>
  );
}
