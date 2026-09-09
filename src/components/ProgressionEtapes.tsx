const ETAPES = ["Vos infos", "Résultat", "Coordonnées"];

export default function ProgressionEtapes({ etapeActive }: { etapeActive: 1 | 2 | 3 }) {
  return (
    <div className="mb-6">
      <div className="progression-track mb-3">
        <div className="progression-fill" style={{ width: `${(etapeActive / 3) * 100}%` }} />
      </div>
      <div className="flex justify-center gap-2 text-xs text-[var(--color-texte-doux)]">
        {ETAPES.map((label, i) => {
          const numero = i + 1;
          const active = numero <= etapeActive;
          return (
            <span key={label} className={active ? "font-bold" : undefined} style={active ? { color: "var(--color-marque)" } : undefined}>
              {numero === 1 ? "①" : numero === 2 ? "②" : "③"} {label}
              {numero < 3 ? <span className="mx-2 text-[var(--color-bordure)]">·</span> : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}
