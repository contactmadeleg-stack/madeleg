"use client";

import { IconeCoche, IconeChrono, IconeBouclier } from "./Icones";

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

export default function CarteAvantages() {
  return (
    <div className="carte-verre p-7 w-full max-w-sm relative overflow-hidden">
      <span className="lueur-ambre absolute -top-8 -right-8 w-28 h-28" aria-hidden />

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
    </div>
  );
}
