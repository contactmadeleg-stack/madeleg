// Mot-symbole madeleg — aucun logo dessiné : "madeleg" bas de casse, jamais
// de majuscule ni de capitales, suivi d'un point émeraude (voir DESIGN.md /
// guidelines/brand-logo.html du design system fourni). tone choisit la
// couleur du texte et du point selon le fond sur lequel il est posé.
type Tone = "ink" | "inverse" | "brand";

const TEXT_COLOR: Record<Tone, string> = {
  ink: "var(--ink-900)",
  inverse: "var(--white)",
  brand: "var(--white)",
};

const DOT_COLOR: Record<Tone, string> = {
  ink: "var(--emerald-500)",
  inverse: "var(--emerald-400)",
  brand: "var(--emerald-100)",
};

export default function Logo({
  size = 24,
  tone = "ink",
  className,
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-black)" as unknown as number,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color: TEXT_COLOR[tone],
      }}
    >
      madeleg<span style={{ color: DOT_COLOR[tone] }}>.</span>
    </span>
  );
}
