const BANQUES_AFFICHEES = ["Crédit Agricole", "BNP Paribas", "Société Générale", "Caisse d'Épargne"];

export default function BandeConfiance() {
  return (
    <div>
      <p className="text-center text-xs text-[var(--color-texte-doux)] mb-3">
        Vos emprunteurs viennent de ces banques, entre autres
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {BANQUES_AFFICHEES.map((b) => (
          <div
            key={b}
            className="text-xs text-[var(--color-texte-doux)] bg-[var(--color-fond-carte)] border border-[var(--color-bordure)] rounded-lg px-3.5 py-2"
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
