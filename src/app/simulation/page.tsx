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
  alternates: { canonical: "/simulation" },
};

// Voir le commentaire équivalent dans src/app/page.tsx : mis en cache 5
// minutes, avec l'erreur qui remonte à error.tsx plutôt que d'être avalée,
// pour que Next.js continue de servir la dernière version réussie en cas
// d'échec de régénération au lieu de figer une page d'erreur pour tous.
export const revalidate = 300;

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
