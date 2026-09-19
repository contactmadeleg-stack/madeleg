import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Changer d'assurance emprunteur : vos droits et la procédure | Madeleg",
  description:
    "Loi Lemoine, délégation d'assurance, résiliation : tout savoir sur vos droits pour changer d'assurance de prêt immobilier sans changer de banque.",
  alternates: { canonical: "/changer-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageChangerAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Changer d&apos;assurance emprunteur : ce que dit la loi
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Le droit de changer d&apos;assurance de prêt immobilier n&apos;est pas un usage toléré par les banques,
          c&apos;est une succession de lois qui l&apos;ont construit depuis 2010.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Depuis la loi Lemoine, changer à tout moment</h2>
        <p>
          Depuis le 1er juin 2022, la{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            loi Lemoine
          </Link>{" "}
          vous permet de résilier votre assurance de prêt immobilier à tout moment, sans attendre une date
          anniversaire, à condition que le nouveau contrat offre des garanties équivalentes. C&apos;est le
          mécanisme que la plupart des emprunteurs utilisent aujourd&apos;hui pour changer d&apos;assurance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un droit qui existait déjà, mais plus contraint</h2>
        <p>
          Avant la loi Lemoine, deux textes encadraient déjà le changement d&apos;assurance. La loi Hamon, issue de
          la loi consommation du 17 mars 2014, autorisait la substitution du contrat dans les douze mois suivant la
          signature de l&apos;offre de prêt. L&apos;amendement Bourquin, applicable depuis 2018 et fondé sur
          l&apos;article L113-12 du code des assurances, a ensuite ouvert un droit de résiliation annuelle, à la
          date anniversaire du contrat, sans limite dans le temps.
        </p>
        <p>
          Ces deux droits existent toujours, mais la loi Lemoine les a largement rendus secondaires puisqu&apos;elle
          supprime la contrainte de date : plus besoin d&apos;attendre un anniversaire ou une fenêtre de douze mois.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Le socle commun : la délégation d&apos;assurance</h2>
        <p>
          Ce qui rend tout changement possible, c&apos;est le principe de{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>
          , introduit par la loi Lagarde du 1er juillet 2010 : le droit de remplacer le contrat groupe proposé par
          votre banque par un contrat individuel équivalent, sans que celle-ci puisse modifier le taux ou les
          conditions de votre prêt de ce fait.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Vos droits, en détail</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Loi Lemoine</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Résiliation à tout moment, questionnaire médical : ce qu&apos;elle change.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/delegation-assurance" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Délégation d&apos;assurance</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Remplacer le contrat groupe par un contrat individuel équivalent.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/resilier" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Résilier son assurance emprunteur</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>La procédure étape par étape, et le délai légal de réponse de la banque.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/prix" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Prix de l&apos;assurance emprunteur</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Les critères qui déterminent réellement votre tarif.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/moins-chere" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Assurance moins chère</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Les leviers concrets pour réduire votre cotisation.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/comparer" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Comparer deux contrats</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi le taux affiché ne suffit pas à comparer.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/apres-plusieurs-annees" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Changer après plusieurs années</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Est-ce trop tard si votre prêt a déjà plusieurs années ?</p>
          </Link>
          <Link href="/garanties-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Les garanties</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>DC, PTIA, IPT, ITT : ce que doit couvrir le nouveau contrat.</p>
          </Link>
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
