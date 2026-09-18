import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurance emprunteur investissement locatif | Madeleg",
  description:
    "Prêt pour un investissement locatif : pourquoi la logique de garantie diffère d'un crédit pour la résidence principale, et ce que cela change sur votre contrat.",
  alternates: { canonical: "/assurance-emprunteur/investissement-locatif" },
};

export default function PageAssuranceEmprunteurInvestissementLocatif() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur pour un investissement locatif
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Un prêt pour un bien mis en location ne protège pas un toit familial, il protège un flux de loyers. Cette
          différence d&apos;objet change la façon dont la garantie doit être pensée, et dont plusieurs prêts en
          parallèle doivent être regardés ensemble.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Un prêt qui ne protège pas un logement familial</h2>
        <p>
          Pour une résidence principale, l&apos;assurance de prêt sert avant tout à éviter qu&apos;un accident de la
          vie ne mette la famille à la rue. Pour un investissement locatif, la logique est différente : le bien
          génère un loyer censé couvrir tout ou partie de l&apos;échéance, et c&apos;est ce montage financier que la
          garantie doit sécuriser, pas un toit occupé par l&apos;emprunteur.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Plusieurs prêts en parallèle changent l&apos;analyse du risque</h2>
        <p>
          Un investisseur qui accumule les crédits immobiliers accumule aussi les capitaux assurés auprès des
          assureurs. Au-delà de certains seuils, cette accumulation peut déclencher des formalités médicales
          supplémentaires ou limiter les garanties accordées sur un nouveau contrat, même si chaque prêt pris
          isolément semble ordinaire. C&apos;est un point que le contrat groupe de la banque, pensé pour un emprunteur
          avec un seul crédit, ne gère pas toujours de façon lisible.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un contrat groupe optimisé pour un profil différent</h2>
        <p>
          Le contrat groupe de la banque applique la même grille de garanties à un emprunteur en résidence principale
          et à un investisseur locatif, sans distinguer ce qui est réellement en jeu dans chaque cas. La délégation
          d&apos;assurance permet de choisir des garanties dimensionnées pour un crédit d&apos;investissement, et un
          tarif qui ne pénalise pas votre profil au motif qu&apos;il ne correspond pas au cas type du contrat groupe.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          La procédure suit la{" "}
          <Link href="/assurance-emprunteur/loi-lemoine" className="underline">
            loi Lemoine
          </Link>
          , identique pour tous les emprunteurs : résiliation possible à tout moment, sans frais ni justification, à
          condition que le nouveau contrat offre des garanties équivalentes. Un conseiller Madeleg vérifie cette
          équivalence pour vous et suit l&apos;ensemble des échanges avec votre banque jusqu&apos;à validation.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Faut-il assurer 100 % du capital emprunté sur un investissement locatif ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              La répartition de la quotité assurée entre co-emprunteurs et le niveau de garantie retenu se
              déterminent au cas par cas avec votre banque et l&apos;assureur, en fonction du montage de
              l&apos;opération.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un investisseur avec plusieurs crédits en cours peut-il quand même déléguer son assurance ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Oui, la loi Lemoine s&apos;applique de la même façon. L&apos;examen médical et tarifaire tient
              simplement compte du cumul de capitaux déjà assurés sur vos autres prêts.
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
