import { IconeCoche, IconeChrono, IconeEuro } from "./Icones";

const AVANTAGES = [
  { icone: IconeCoche, texte: "Sans engagement, résiliable à tout moment" },
  { icone: IconeChrono, texte: "Résultat en 30 secondes" },
  { icone: IconeEuro, texte: "Assureurs partenaires agréés ACPR" },
];

export default function CarteAvantages() {
  return (
    <div className="carte-madeleg p-6 w-full max-w-sm">
      <p className="text-xs font-bold text-[var(--color-sauge)] uppercase tracking-wide mb-4">
        Pourquoi Madeleg
      </p>
      <ul className="space-y-4">
        {AVANTAGES.map(({ icone: Icone, texte }) => (
          <li key={texte} className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] shrink-0">
              <Icone className="w-4 h-4" />
            </span>
            <span className="text-sm text-[var(--color-texte)]">{texte}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
