const BANQUES_AFFICHEES = ["Crédit Agricole", "BNP Paribas", "Société Générale", "Caisse d'Épargne"];

export default function BandeConfiance() {
  return (
    <div>
      <p className="text-center text-xs font-semibold text-[var(--color-texte-doux)] uppercase tracking-wide mb-3">
        Vos emprunteurs viennent de ces banques, entre autres
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {BANQUES_AFFICHEES.map((b) => (
          <div
            key={b}
            className="flex items-center gap-2 text-sm text-[var(--color-texte)] bg-[var(--color-fond)] border border-[var(--color-bordure)] rounded-full pl-2 pr-3.5 py-1.5"
          >
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white shrink-0"
              style={{ background: "var(--color-marque)" }}
            >
              {b[0]}
            </span>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
