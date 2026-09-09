// Motif de marque original (pas un stock icon générique) : un bouclier —
// la protection de l'assurance — contenant une barre ascendante — l'économie
// qui grandit —, avec un badge ambre en pourcentage. Aplat, géométrique,
// aucune photo/illustration externe.
export default function IllustrationBouclier({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label="Illustration : bouclier de protection avec économie croissante">
      <path
        d="M160 20 L268 56 V140 C268 210 222 262 160 292 C98 262 52 210 52 140 V56 Z"
        fill="var(--color-marque)"
      />
      <path
        d="M160 20 L268 56 V140 C268 210 222 262 160 292 Z"
        fill="var(--color-marque-clair)"
      />
      <rect x="98" y="185" width="26" height="55" rx="4" fill="var(--color-fond-carte)" opacity="0.9" />
      <rect x="147" y="155" width="26" height="85" rx="4" fill="var(--color-fond-carte)" />
      <rect x="196" y="115" width="26" height="125" rx="4" fill="var(--color-ambre-clair)" />

      <circle cx="246" cy="76" r="34" fill="var(--color-ambre)" stroke="var(--color-fond)" strokeWidth="6" />
      <text x="246" y="83" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--color-texte)" fontFamily="var(--font-titres), sans-serif">
        25%
      </text>

      <circle cx="70" cy="240" r="10" fill="var(--color-sauge)" />
    </svg>
  );
}
