import { BANQUES } from "@/lib/banques";

const AUTRE = "Ma banque n'est pas dans la liste";

export default function SelecteurBanque({
  valeur,
  onChange,
}: {
  valeur: string;
  onChange: (v: string) => void;
}) {
  const options = [...BANQUES.filter((b) => b !== "Autre banque"), AUTRE];

  return (
    <div>
      <span className="block text-sm font-medium text-[var(--color-texte)] mb-1.5">
        Votre banque actuelle
      </span>
      <p className="text-xs text-[var(--color-texte-doux)] mb-3">
        Information indicative, sans impact sur le montant ci-dessus.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {options.map((banque) => {
          const active = valeur === banque;
          return (
            <button
              key={banque}
              type="button"
              onClick={() => onChange(banque)}
              className={`text-sm text-center rounded-xl border px-3 py-3 transition-colors ${
                active
                  ? "border-[var(--color-marque)] bg-[var(--color-sauge-clair)] font-semibold text-[var(--color-marque)]"
                  : "border-[var(--color-bordure)] bg-[var(--color-fond-carte)] text-[var(--color-texte)] hover:border-[var(--color-marque)]"
              }`}
            >
              {banque}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-[var(--color-texte-doux)] mt-3">
        Marques citées à titre d&apos;identification, propriété de leurs détenteurs respectifs.
      </p>
    </div>
  );
}
