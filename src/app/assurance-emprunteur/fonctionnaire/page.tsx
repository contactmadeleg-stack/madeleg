import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurance emprunteur fonctionnaire | Madeleg",
  description:
    "Fonctionnaire et emprunteur : pourquoi votre contrat d'assurance de prêt mérite d'être vérifié, et comment le changer sans quitter votre banque.",
  alternates: { canonical: "/assurance-emprunteur/fonctionnaire" },
};

export default function PageAssuranceEmprunteurFonctionnaire() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Assurance emprunteur pour les fonctionnaires : ce qui change vraiment
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Être fonctionnaire rassure votre banque sur votre stabilité d&apos;emploi. Cela ne dit rien de la qualité du
          contrat d&apos;assurance de prêt qu&apos;elle vous propose — un contrat qui reste, dans la plupart des cas,
          pensé pour un salarié du secteur privé.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Votre statut ne remplace pas l&apos;assurance de prêt</h2>
        <p>
          Beaucoup de fonctionnaires pensent être déjà couverts par leur régime de prévoyance statutaire en cas de
          maladie ou d&apos;invalidité. Ce régime protège votre traitement, pas le remboursement de votre crédit
          immobilier : ce sont deux contrats distincts, et l&apos;un ne dispense pas de l&apos;autre.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          Le point à vérifier en priorité : la définition de l&apos;incapacité dans votre contrat
        </h2>
        <p>
          La plupart des contrats groupe bancaires définissent l&apos;incapacité et l&apos;invalidité par référence
          aux catégories de la Sécurité sociale, pensées pour le régime général. Or le parcours d&apos;un
          fonctionnaire en arrêt prolongé suit des règles différentes (congé de longue maladie, congé de longue
          durée, comité médical, reclassement, mise en disponibilité). Si les définitions du contrat ne correspondent
          pas à votre régime réel, une partie de la garantie peut s&apos;avérer inadaptée le jour où vous en avez
          besoin — cela se vérifie avant de signer, pas après un sinistre.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Un profil que l&apos;assurance groupe valorise rarement à sa juste mesure</h2>
        <p>
          Le contrat groupe de la banque applique une tarification par grandes catégories, pas un tarif individualisé
          à votre situation réelle. La stabilité d&apos;emploi d&apos;un fonctionnaire n&apos;y change souvent rien :
          vous payez le même tarif qu&apos;un profil plus risqué placé dans la même catégorie. C&apos;est précisément
          ce que la délégation d&apos;assurance permet de corriger.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          La procédure est identique à celle de tout emprunteur, grâce à la loi Lemoine : résiliation possible à tout
          moment, sans frais ni justification, à condition que le nouveau contrat offre des garanties équivalentes. Un
          conseiller Madeleg vérifie cette équivalence pour vous et suit l&apos;ensemble des échanges avec votre
          banque jusqu&apos;à validation.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              La garantie prévoyance de mon administration remplace-t-elle l&apos;assurance emprunteur ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Non, ce sont deux contrats distincts : l&apos;un ne dispense pas de l&apos;autre.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Un contractuel de la fonction publique est-il concerné de la même façon qu&apos;un titulaire ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Le principe est le même, mais le régime d&apos;incapacité applicable diffère souvent selon le statut —
              c&apos;est un point à vérifier au cas par cas dans votre dossier.
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
