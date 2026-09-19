import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Bien choisir son assurance emprunteur : la méthode | Madeleg",
  description:
    "Les critères qui comptent vraiment pour choisir une assurance de prêt immobilier, et les erreurs les plus fréquentes à éviter avant de signer.",
  alternates: { canonical: "/choisir-assurance-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageChoisirAssuranceEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Bien choisir son assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Le contrat le moins cher n&apos;est pas toujours le mieux adapté à votre situation. Voici ce qui compte
          réellement dans la comparaison, au-delà du seul taux affiché.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Comparer les garanties avant le prix</h2>
        <p>
          Deux contrats au même tarif peuvent couvrir des situations très différentes selon la définition retenue
          pour l&apos;invalidité ou l&apos;incapacité de travail, les délais de carence et de franchise, et les
          exclusions propres à votre profil. Comparer uniquement le taux affiché conduit souvent à sous-estimer ces
          écarts, qui ne se révèlent qu&apos;au moment d&apos;un sinistre.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Les erreurs les plus fréquentes</h2>
        <p>
          Les erreurs les plus courantes sont de comparer des contrats à quotités différentes, d&apos;ignorer le
          mode de calcul de la prime (capital initial ou capital restant dû), de ne pas vérifier que le nouveau
          contrat respecte bien la grille d&apos;équivalence de garanties exigée par la banque, et de sous-déclarer
          un antécédent de santé, ce qui peut entraîner la nullité du contrat en cas de sinistre.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Groupe ou individuel : une question de profil</h2>
        <p>
          Un contrat groupe peut rester compétitif pour un profil senior ou avec un antécédent de santé important,
          en raison de sa tarification mutualisée. Un contrat individuel est généralement plus avantageux pour un
          emprunteur jeune et en bonne santé, dont le tarif est calculé sur son profil réel plutôt que sur une
          moyenne de groupe.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur/vos-droits/comparer" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Comparer deux contrats</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi le taux affiché ne suffit pas à comparer.</p>
          </Link>
          <Link href="/garanties-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Les garanties</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>DC, PTIA, IPT, ITT expliquées.</p>
          </Link>
          <Link href="/cout-assurance-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Le coût de l&apos;assurance</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Calcul de la prime, TAEA, dégressive ou constante.</p>
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
