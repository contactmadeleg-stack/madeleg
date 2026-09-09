import Link from "next/link";
import type { Metadata } from "next";
import { getPartenairesActifs } from "@/lib/getPartenairesActifs";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nos assureurs partenaires — Madeleg",
  description:
    "Madeleg travaille avec un large panel d'assureurs partenaires pour trouver le contrat d'assurance emprunteur le plus adapté à votre profil.",
};

export default async function PagePartenaires() {
  const partenaires = await getPartenairesActifs();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
      <header className="mb-10 text-center">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
          Nos partenaires
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Un large panel d&apos;assureurs, pour trouver le contrat le plus adapté
        </h1>
        <p className="text-lg text-[var(--color-texte-doux)] leading-relaxed max-w-2xl mx-auto">
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
              className="carte-madeleg flex items-center justify-center p-5 min-h-[6rem] text-center"
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={nom} className="max-h-10 max-w-full object-contain" />
              ) : (
                <span className="text-sm font-medium text-[var(--color-texte)]">{nom}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-texte-doux)] mb-12">
          La liste de nos partenaires est en cours de mise à jour.
        </p>
      )}

      <p className="text-xs text-[var(--color-texte-doux)] text-center mb-10">
        Marques citées à titre d&apos;identification, propriété de leurs détenteurs respectifs.
      </p>

      <div className="text-center">
        <Link href="/#simulateur" className="btn-madeleg btn-madeleg-principal inline-block px-8 py-3 text-white">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
