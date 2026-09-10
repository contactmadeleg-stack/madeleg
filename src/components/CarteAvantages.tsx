import { IconeCoche, IconeChrono, IconePoignee } from "./Icones";

const AVANTAGES = [
  { icone: IconeCoche, texte: "Zéro démarche à faire vous-même", couleur: "sauge" },
  { icone: IconeChrono, texte: "Résultat en 30 secondes", couleur: "ambre" },
  { icone: IconePoignee, texte: "Suivi personnalisé jusqu'à la validation", couleur: "marque" },
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

      <p className="font-titres text-xl font-bold text-[var(--color-marque)] leading-snug">
        Un seul interlocuteur, pas un centre d&apos;appel.
      </p>
      <p className="text-sm text-[var(--color-texte-doux)] mt-2">
        Courtier indépendant, contrôlé par l&apos;ACPR, qui suit votre dossier de bout en bout.
      </p>

      <div className="h-px bg-[var(--color-bordure)] my-6" />

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
