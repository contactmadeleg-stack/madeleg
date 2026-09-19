import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Assurance emprunteur selon votre profil professionnel | Madeleg",
  description:
    "Fonctionnaire, indépendant, profession libérale, investisseur locatif : ce que votre situation professionnelle change réellement pour votre assurance de prêt.",
  alternates: { canonical: "/profil-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageProfilEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          L&apos;assurance emprunteur selon votre profil
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Les garanties standard sont pensées pour un salarié en CDI. Fonctionnaire, indépendant, profession
          libérale ou investisseur locatif : votre situation change ce qui compte vraiment dans votre contrat.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi le profil professionnel compte</h2>
        <p>
          Les garanties d&apos;incapacité de travail (ITT) et d&apos;invalidité (IPT, IPP) sont définies par
          rapport à une activité professionnelle. Or cette définition varie selon les contrats : certains
          indemnisent dès que vous ne pouvez plus exercer votre métier précis, d&apos;autres seulement si vous ne
          pouvez plus exercer aucune activité. Cette différence pèse plus lourd pour un indépendant ou une
          profession libérale, dont l&apos;arrêt de travail n&apos;est pas couvert de la même façon qu&apos;un
          salarié par la sécurité sociale et la prévoyance d&apos;entreprise.
        </p>
        <p>
          Le statut professionnel influence aussi le questionnaire de santé et, pour certains profils, la nature
          des risques exclus ou surprimés par l&apos;assureur.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Selon votre situation professionnelle</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/profil-emprunteur/situation-professionnelle/fonctionnaire" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Fonctionnaire</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Ce que votre statut change réellement, et ce qu&apos;il ne change pas.</p>
          </Link>
          <Link href="/profil-emprunteur/situation-professionnelle/independant" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Travailleur indépendant</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi le délai de carence compte plus pour vous que pour un salarié.</p>
          </Link>
          <Link href="/profil-emprunteur/situation-professionnelle/profession-liberale" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Profession libérale</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Caisse de prévoyance professionnelle et assurance de prêt : deux contrats distincts.</p>
          </Link>
          <Link href="/profil-emprunteur/situation-professionnelle/investissement-locatif" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Investissement locatif</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi la garantie ne se pense pas comme pour une résidence principale.</p>
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
