import type { BanqueAffichee } from "@/lib/getBanquesActives";

const AUTRE = "Ma banque n'est pas dans la liste";

export default function SelecteurBanque({
  valeur,
  onChange,
  banques,
}: {
  valeur: string;
  onChange: (v: string) => void;
  banques: BanqueAffichee[];
}) {
  return (
    <div>
      <span className="block text-sm font-medium text-[var(--color-texte)] mb-1.5">
        Votre banque actuelle
      </span>
      <p className="text-xs text-[var(--color-texte-doux)] mb-3">
        Information indicative, sans impact sur le montant ci-dessus.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {banques.map(({ id, nom, logoUrl }) => {
          const active = valeur === nom;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(nom)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-3 min-h-[4.5rem] transition-colors ${
                active
                  ? "border-[var(--color-marque)] bg-[var(--color-sauge-clair)]"
                  : "border-[var(--color-bordure)] bg-[var(--color-fond-carte)] hover:border-[var(--color-marque)]"
              }`}
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={nom} className="max-h-8 max-w-[80%] object-contain" />
              ) : (
                <span
                  className={`text-sm text-center leading-tight ${
                    active ? "font-semibold text-[var(--color-marque)]" : "text-[var(--color-texte)]"
                  }`}
                >
                  {nom}
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onChange(AUTRE)}
          className={`flex items-center justify-center rounded-xl border px-3 py-3 min-h-[4.5rem] text-sm text-center leading-tight transition-colors ${
            valeur === AUTRE
              ? "border-[var(--color-marque)] bg-[var(--color-sauge-clair)] font-semibold text-[var(--color-marque)]"
              : "border-[var(--color-bordure)] bg-[var(--color-fond-carte)] text-[var(--color-texte)] hover:border-[var(--color-marque)]"
          }`}
        >
          {AUTRE}
        </button>
      </div>
      <p className="text-xs text-[var(--color-texte-doux)] mt-3">
        Marques citées à titre d&apos;identification, propriété de leurs détenteurs respectifs.
      </p>
    </div>
  );
}
