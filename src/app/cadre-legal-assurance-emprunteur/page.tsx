import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Cadre légal de l'assurance emprunteur : les lois qui la régissent | Madeleg",
  description:
    "Loi Lagarde, loi Hamon, amendement Bourquin, loi Lemoine : l'historique des lois qui ont construit vos droits en matière d'assurance emprunteur.",
  alternates: { canonical: "/cadre-legal-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageCadreLegalAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Le cadre légal de l&apos;assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Vos droits actuels sont le résultat de quatre lois successives, chacune ayant élargi la possibilité de
          changer d&apos;assurance sans quitter sa banque.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Loi Lagarde (2010) : la fin du contrat imposé</h2>
        <p>
          La loi n° 2010-737 du 1er juillet 2010, dite loi Lagarde, entrée en vigueur le 1er septembre 2010, met fin
          à l&apos;obligation implicite de souscrire l&apos;assurance de son prêteur. Elle ouvre le droit à la{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/delegation-assurance" className="underline">
            délégation d&apos;assurance
          </Link>{" "}
          : la banque ne peut refuser un contrat individuel équivalent, ni modifier son offre de prêt à ce motif.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Loi Hamon (2014) : changer dans la première année</h2>
        <p>
          La loi relative à la consommation du 17 mars 2014, dite loi Hamon, ouvre un droit de résiliation dans les
          douze mois suivant la signature de l&apos;offre de prêt, sans frais ni pénalité, pour la remplacer par un
          contrat aux garanties équivalentes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Amendement Bourquin (2018) : une résiliation annuelle</h2>
        <p>
          L&apos;amendement Bourquin, applicable depuis 2018 et fondé sur l&apos;article L113-12 du code des
          assurances, étend ce droit au-delà de la première année : chaque assuré peut résilier son contrat à sa
          date anniversaire, chaque année, et pas seulement une fois.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            Loi Lemoine
          </Link>{" "}
          (2022) : la résiliation à tout moment
        </h2>
        <p>
          Depuis le 1er juin 2022, la loi Lemoine supprime la contrainte de date : la résiliation est possible à
          tout moment de l&apos;année, sans attendre un anniversaire ni une échéance. Elle assouplit aussi les
          obligations de questionnaire de santé sous certaines conditions de montant et d&apos;âge.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Changer d&apos;assurance emprunteur</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Vos droits et la procédure, en pratique.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Loi Lemoine</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Résiliation à tout moment, questionnaire médical : ce qu&apos;elle change.</p>
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
