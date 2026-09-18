import Link from "next/link";
import type { Metadata } from "next";
import Simulateur from "@/components/Simulateur";
import Logo from "@/components/Logo";
import { getGrillesCompletes, getCoefficientDecote } from "@/lib/calcul/parametres";
import { getBanquesActives } from "@/lib/getBanquesActives";

export const metadata: Metadata = {
  title: "Simulez votre économie | Madeleg",
  description:
    "Simulez en 30 secondes votre économie en changeant d'assurance emprunteur, sans quitter votre banque pour le prêt.",
};

// Rendu à chaque requête, jamais mis en cache : avec `revalidate`, un échec
// Supabase pendant la régénération en arrière-plan (ex. dérive d'horloge
// JWT PGRST303) se retrouvait figé dans le cache statique et servi à tous
// les visiteurs jusqu'au cycle suivant — c'était le bug "indisponible par
// intermittence". En dynamique, une erreur n'affecte que la requête qui
// l'a déclenchée (voir error.tsx) ; la suivante repart de zéro.
export const dynamic = "force-dynamic";

export default async function PageSimulation() {
  const [grilles, banques, coefficientDecote] = await Promise.all([
    getGrillesCompletes(),
    getBanquesActives(),
    getCoefficientDecote(),
  ]);

  return (
    <div className="min-h-[calc(100vh-1px)] flex flex-col">
      <div className="mx-auto max-w-3xl w-full px-4 pt-8 pb-4">
        <Link href="/" className="inline-block no-underline">
          <Logo size={22} tone="ink" />
        </Link>
      </div>

      <div className="mx-auto max-w-3xl w-full px-4 pb-16 flex-1">
        <Simulateur
          grillesBanque={grilles.banque}
          grillesDelegation={grilles.delegation}
          banques={banques}
          coefficientDecote={coefficientDecote}
        />
      </div>

      <p className="mx-auto max-w-3xl w-full px-4 pb-6 text-[11px] text-center" style={{ color: "var(--text-muted)" }}>
        Madeleg – Mario Romuald Dos Santos EI · Mandataire d&apos;intermédiaire d&apos;assurance, N° ORIAS 20004713 ·{" "}
        <Link href="/mentions-legales" className="underline">
          Mentions légales
        </Link>{" "}
        ·{" "}
        <Link href="/politique-de-confidentialite" className="underline">
          Confidentialité
        </Link>{" "}
        ·{" "}
        <Link href="/reclamation" className="underline">
          Réclamation
        </Link>
      </p>
    </div>
  );
}
