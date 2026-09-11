import Link from "next/link";
import type { Metadata } from "next";
import { getPartenairesActifs } from "@/lib/getPartenairesActifs";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nos assureurs partenaires | Madeleg",
  description:
    "Madeleg travaille avec un large panel d'assureurs partenaires pour trouver le contrat d'assurance emprunteur le plus adapté à votre profil.",
};

export default async function PagePartenaires() {
  const partenaires = await getPartenairesActifs();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
      <header className="mb-10 text-center">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Nos partenaires
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Un large panel d&apos;assureurs, pour trouver le contrat le plus adapté
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Madeleg travaille avec plusieurs compagnies d&apos;assurance, toutes agréées par l&apos;ACPR (Autorité de
          Contrôle Prudentiel et de Résolution). Cette diversité permet de comparer les garanties et tarifs pour
          sélectionner le contrat le plus adapté à votre profil, plutôt que de vous proposer une seule offre par
          défaut.
        </p>
      </header>

      {partenaires.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {partenaires.map(({ id, nom, logoUrl }) => (
            <div
              key={id}
              className="mdl-card mdl-card__pad flex items-center justify-center min-h-[6rem] text-center"
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={nom} className="max-h-10 max-w-full object-contain" />
              ) : (
                <span className="text-sm font-medium" style={{ color: "var(--text-strong)" }}>{nom}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mb-12" style={{ color: "var(--text-muted)" }}>
          La liste de nos partenaires est en cours de mise à jour.
        </p>
      )}

      <p className="text-xs text-center mb-10" style={{ color: "var(--text-muted)" }}>
        Marques citées à titre d&apos;identification, propriété de leurs détenteurs respectifs.
      </p>

      <div className="text-center">
        <Link href="/#simulateur" className="mdl-btn mdl-btn--primary mdl-btn--lg">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
