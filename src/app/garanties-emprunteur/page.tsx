import Link from "next/link";
import type { Metadata } from "next";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Garanties de l'assurance emprunteur : DC, PTIA, IPT, ITT | Madeleg",
  description:
    "Décès, invalidité, incapacité de travail : les garanties de l'assurance emprunteur expliquées simplement, et ce qui doit figurer dans un contrat équivalent.",
  alternates: { canonical: "/garanties-emprunteur" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageGarantiesEmprunteur() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Catégorie
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Les garanties de l&apos;assurance emprunteur
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Décès, invalidité, incapacité de travail : chaque garantie couvre un risque précis, avec ses propres
          conditions de mise en jeu. Les connaître, c&apos;est comprendre ce que vous payez réellement.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Les garanties les plus courantes</h2>
        <p>
          Un contrat d&apos;assurance emprunteur combine plusieurs garanties, chacune désignée par un sigle :
          <strong> DC</strong> (décès), <strong>PTIA</strong> (perte totale et irréversible d&apos;autonomie),{" "}
          <strong>IPT</strong> (invalidité permanente totale), <strong>IPP</strong> (invalidité permanente
          partielle), <strong>ITT</strong> (incapacité temporaire totale de travail), et, selon les profils, une
          garantie perte d&apos;emploi. La banque exige toujours DC et PTIA ; les autres garanties dépendent de
          votre profil et du type de prêt.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Pourquoi les définitions varient d&apos;un contrat à l&apos;autre</h2>
        <p>
          Deux contrats peuvent afficher la même garantie IPT ou ITT tout en couvrant des situations différentes :
          les seuils d&apos;invalidité retenus, les délais de carence et de franchise, et la définition même de
          l&apos;incapacité (par rapport à votre profession ou à toute profession) ne sont pas standardisés entre
          assureurs. C&apos;est précisément ce que vérifie l&apos;examen d&apos;équivalence de garanties lors d&apos;un
          changement d&apos;assurance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">La quotité, la part du prêt réellement couverte</h2>
        <p>
          Quand un prêt est souscrit à deux, chaque emprunteur est assuré pour une quotité, une part du capital
          emprunté. La somme des quotités doit atteindre au moins 100 %, mais la répartition (50/50, 70/30,
          100/100 chacun) change fortement ce qui est couvert en cas de décès ou d&apos;invalidité d&apos;un seul des
          deux emprunteurs.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">À lire aussi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Loi Lemoine</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>L&apos;équivalence de garanties, condition unique pour changer d&apos;assurance.</p>
          </Link>
          <Link href="/changer-assurance-emprunteur/vos-droits/comparer" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Comparer deux contrats</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pourquoi le taux affiché ne suffit pas à comparer deux garanties.</p>
          </Link>
          <Link href="/risque-aggrave-sante" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Risque aggravé de santé</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Quand une garantie peut être exclue ou soumise à surprime.</p>
          </Link>
          <Link href="/assurance-emprunteur" className="mdl-card mdl-card--interactive mdl-card__pad block no-underline">
            <p className="font-titres font-bold mb-1" style={{ color: "var(--text-strong)" }}>Guide complet</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Retour au sommaire de l&apos;assurance emprunteur.</p>
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
