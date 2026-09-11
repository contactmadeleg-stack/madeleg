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
      <span className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-body)" }}>
        Votre banque actuelle
      </span>
      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
        Information indicative, sans impact sur le montant ci-dessus.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {banques.map(({ id, nom, logoUrl }) => {
          const active = valeur === nom;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(nom)}
              title={nom}
              className="flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 min-h-[3.5rem] transition-colors"
              style={{
                borderColor: active ? "var(--emerald-600)" : "var(--border-subtle)",
                backgroundColor: active ? "var(--emerald-50)" : "var(--surface-card)",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = "var(--emerald-600)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }
              }}
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={nom} className="max-h-6 max-w-[85%] object-contain" />
              ) : (
                <span
                  className="text-xs text-center leading-tight"
                  style={{
                    color: active ? "var(--emerald-600)" : "var(--text-body)",
                    fontWeight: active ? "600" : "400",
                  }}
                >
                  {nom}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onChange(AUTRE)}
        className="w-full mt-2 flex items-center justify-center rounded-lg border px-2 py-2.5 text-xs text-center leading-tight transition-colors"
        style={{
          borderColor: valeur === AUTRE ? "var(--emerald-600)" : "var(--border-subtle)",
          backgroundColor: valeur === AUTRE ? "var(--emerald-50)" : "var(--surface-card)",
          color: valeur === AUTRE ? "var(--emerald-600)" : "var(--text-body)",
          fontWeight: valeur === AUTRE ? "600" : "400",
        }}
        onMouseEnter={(e) => {
          if (valeur !== AUTRE) {
            e.currentTarget.style.borderColor = "var(--emerald-600)";
          }
        }}
        onMouseLeave={(e) => {
          if (valeur !== AUTRE) {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
          }
        }}
      >
        {AUTRE}
      </button>
      <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
        Marques citées à titre d&apos;identification, propriété de leurs détenteurs respectifs.
      </p>
    </div>
  );
}
