import type { PointAnnuel } from "@/lib/calcul/simulation";

const LARGEUR = 640;
const HAUTEUR = 280;
const MARGE = { haut: 20, bas: 36, gauche: 8, droite: 8 };

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function GraphiquePrimes({ courbe }: { courbe: PointAnnuel[] }) {
  if (courbe.length === 0) return null;

  const maxY = Math.max(...courbe.map((p) => p.primeBanque), 1);
  const zoneW = LARGEUR - MARGE.gauche - MARGE.droite;
  const zoneH = HAUTEUR - MARGE.haut - MARGE.bas;

  const x = (i: number) =>
    MARGE.gauche + (courbe.length === 1 ? 0 : (i / (courbe.length - 1)) * zoneW);
  const y = (v: number) => MARGE.haut + zoneH - (v / maxY) * zoneH;

  const ligneBanque = courbe.map((p, i) => `${x(i)},${y(p.primeBanque)}`).join(" ");
  const ligneDelegation = courbe.map((p, i) => `${x(i)},${y(p.primeDelegation)}`).join(" ");

  const airePoints = [
    `${x(0)},${y(courbe[0].primeBanque)}`,
    ...courbe.map((p, i) => `${x(i)},${y(p.primeBanque)}`),
    ...[...courbe].reverse().map((p, i) => `${x(courbe.length - 1 - i)},${y(p.primeDelegation)}`),
  ].join(" ");

  // quelques repères d'années sur l'axe X
  const nbRepères = Math.min(courbe.length, 6);
  const pasRepère = Math.max(1, Math.round(courbe.length / nbRepères));
  const repères = courbe.filter((_, i) => i % pasRepère === 0 || i === courbe.length - 1);

  return (
    <div>
      <svg
        viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
        className="w-full h-auto"
        role="img"
        aria-label="Comparaison entre la prime d'assurance banque, stable, et la prime en délégation, qui diminue avec le capital restant dû."
      >
        {/* zone d'économie */}
        <polygon points={airePoints} fill="var(--color-sauge-clair)" />

        {/* ligne banque */}
        <polyline
          points={ligneBanque}
          fill="none"
          stroke="var(--color-texte-doux)"
          strokeWidth={2.5}
          strokeDasharray="5 4"
        />

        {/* ligne délégation */}
        <polyline points={ligneDelegation} fill="none" stroke="var(--color-marque)" strokeWidth={3} />

        {/* repères années */}
        {repères.map((p) => (
          <text
            key={p.annee}
            x={x(p.annee - 1)}
            y={HAUTEUR - 10}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-texte-doux)"
          >
            an {p.annee}
          </text>
        ))}
      </svg>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
        <span className="inline-flex items-center gap-2 text-[var(--color-texte-doux)]">
          <span className="inline-block w-4 h-0.5 bg-[var(--color-texte-doux)]" />
          Assurance actuelle (banque) — {euros(courbe[0].primeBanque)}/an, stable
        </span>
        <span className="inline-flex items-center gap-2 text-[var(--color-texte-doux)]">
          <span className="inline-block w-4 h-0.5 bg-[var(--color-marque)]" />
          Avec la délégation — {euros(courbe[0].primeDelegation)}/an la 1ʳᵉ année, puis dégressive
        </span>
      </div>
    </div>
  );
}
