import Link from "next/link";
import type { Metadata } from "next";
import { ASSUREURS_EMPRUNTEUR, ASSUREURS_PREVOYANCE, type Partenaire } from "@/lib/partenaires";
import { EDITEUR, MANDANT, GROSSISTE } from "@/lib/identite";

export const metadata: Metadata = {
  title: "Nos assureurs partenaires | Madeleg",
  description:
    "Liste des entreprises d'assurance dont Madeleg peut vous proposer les contrats d'assurance emprunteur, et base de notre conseil.",
};

function ListeAssureurs({ partenaires }: { partenaires: Partenaire[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {partenaires.map(({ assureur, precision, contrats }) => (
        <div key={assureur} className="mdl-card mdl-card__pad">
          <p className="font-semibold" style={{ color: "var(--text-strong)" }}>
            {assureur}
          </p>
          {precision && (
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {precision}
            </p>
          )}
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            {contrats.join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PagePartenaires() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
      <header className="mb-10 text-center">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Nos partenaires
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Les assureurs dont nous pouvons vous proposer les contrats
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Plusieurs assureurs, tous agréés pour exercer en France, pour comparer les garanties et les tarifs et
          retenir le contrat adapté à votre profil.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Assurance emprunteur</h2>
        <ListeAssureurs partenaires={ASSUREURS_EMPRUNTEUR} />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Prévoyance</h2>
        <ListeAssureurs partenaires={ASSUREURS_PREVOYANCE} />
      </section>

      <section className="mb-12 space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        <h2 className="text-xl font-bold" style={{ color: "var(--text-strong)" }}>
          Comment nous accédons à ces contrats
        </h2>
        <p>
          {EDITEUR.nomCommercial} ({EDITEUR.nomLegal}) est mandataire d&apos;intermédiaire d&apos;assurance (MIA),
          immatriculé à l&apos;ORIAS sous le n° {EDITEUR.orias}. Nous agissons pour le compte de{" "}
          {MANDANT.raisonSociale} ({MANDANT.marque}), {MANDANT.categorie} immatriculé à l&apos;ORIAS sous le n°{" "}
          {MANDANT.orias}, qui accède à ces contrats notamment par l&apos;intermédiaire du {GROSSISTE.role}{" "}
          {GROSSISTE.nom}.
        </p>
        <h2 className="text-xl font-bold pt-3" style={{ color: "var(--text-strong)" }}>
          Base de notre conseil
        </h2>
        <p>
          Notre conseil ne repose pas sur une analyse impartiale et personnalisée de l&apos;ensemble du marché, au
          sens de l&apos;article L. 521-2 du Code des assurances. Nous vous recommandons, parmi les contrats des
          assureurs listés ci-dessus, celui qui correspond le mieux à vos besoins et exigences, après étude de votre
          situation.
        </p>
        <p>
          Nous ne détenons aucune participation dans une entreprise d&apos;assurance, et aucune entreprise
          d&apos;assurance ne détient de participation dans notre activité. Notre rémunération est détaillée dans
          nos{" "}
          <Link href="/mentions-legales" className="underline">
            mentions légales
          </Link>
          .
        </p>
      </section>

      <div className="text-center">
        <Link href="/#simulateur" className="mdl-btn mdl-btn--primary mdl-btn--lg">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
