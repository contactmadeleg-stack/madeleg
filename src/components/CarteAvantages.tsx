"use client";

import { IconeCoche, IconeChrono, IconeBouclier } from "./Icones";
import { useCompteurAnime } from "@/lib/useCompteurAnime";

const AVANTAGES = [
  { icone: IconeCoche, texte: "Zéro démarche à faire vous-même", couleur: "sauge" },
  { icone: IconeChrono, texte: "Résultat en 30 secondes", couleur: "ambre" },
  { icone: IconeBouclier, texte: "Assureurs partenaires agréés ACPR", couleur: "marque" },
] as const;

const STYLES_COULEUR: Record<(typeof AVANTAGES)[number]["couleur"], { bg: string; fg: string }> = {
  sauge: { bg: "var(--color-sauge-clair)", fg: "var(--color-marque)" },
  ambre: { bg: "var(--color-ambre-clair)", fg: "var(--color-ambre)" },
  marque: { bg: "rgba(27, 75, 74, 0.12)", fg: "var(--color-marque)" },
};

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CarteAvantages({
  exempleEconomie,
  exempleCapital,
  exempleDureeAnnees,
}: {
  exempleEconomie: number | null;
  exempleCapital: number;
  exempleDureeAnnees: number;
}) {
  const economieAnimee = useCompteurAnime(exempleEconomie ?? 0, 1000);

  return (
    <div className="carte-verre p-7 w-full max-w-sm relative overflow-hidden">
      <span className="lueur-ambre absolute -top-8 -right-8 w-28 h-28" aria-hidden />

      {exempleEconomie !== null && (
        <>
          <p className="text-xs font-bold text-[var(--color-sauge)] uppercase tracking-wide mb-1">
            Exemple concret
          </p>
          <p className="font-titres text-4xl font-extrabold text-[var(--color-ambre)] leading-none mb-1.5">
            {euros(Math.round(economieAnimee))}
          </p>
          <p className="text-xs text-[var(--color-texte-doux)] mb-6">
            économisés pour {euros(exempleCapital)} sur {exempleDureeAnnees} ans*
          </p>

          <div className="h-px bg-[var(--color-bordure)] mb-6" />
        </>
      )}

      <p className="text-xs font-bold text-[var(--color-sauge)] uppercase tracking-wide mb-4">Pourquoi Madeleg</p>
      <ul className="space-y-4">
        {AVANTAGES.map(({ icone: Icone, texte, couleur }) => (
          <li key={texte} className="flex items-center gap-3">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
              style={{ background: STYLES_COULEUR[couleur].bg, color: STYLES_COULEUR[couleur].fg }}
            >
              <Icone className="w-4 h-4" />
            </span>
            <span className="text-sm text-[var(--color-texte)] font-medium">{texte}</span>
          </li>
        ))}
      </ul>

      {exempleEconomie !== null && (
        <p className="text-[0.65rem] text-[var(--color-texte-doux)] mt-5">
          *avec garanties DC / PTIA + ITT + IPT + IPP + MNO et 100% de quotité
        </p>
      )}
    </div>
  );
}
