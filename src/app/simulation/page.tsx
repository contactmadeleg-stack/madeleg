import Link from "next/link";
import type { Metadata } from "next";
import Simulateur from "@/components/Simulateur";
import Logo from "@/components/Logo";
import { getGrillesCompletes } from "@/lib/calcul/parametres";
import { getBanquesActives } from "@/lib/getBanquesActives";

export const metadata: Metadata = {
  title: "Simulez votre économie | Madeleg",
  description:
    "Simulez en 30 secondes votre économie en changeant d'assurance emprunteur, sans quitter votre banque pour le prêt.",
};

export const revalidate = 300;

export default async function PageSimulation() {
  let grilles: Awaited<ReturnType<typeof getGrillesCompletes>> | null = null;
  try {
    grilles = await getGrillesCompletes();
  } catch (e) {
    console.error("Grilles de taux indisponibles :", e);
  }

  const banques = await getBanquesActives();

  return (
    <div className="min-h-[calc(100vh-1px)] flex flex-col">
      <div className="mx-auto max-w-3xl w-full px-4 pt-8 pb-4">
        <Link href="/" className="inline-block no-underline">
          <Logo size={22} tone="ink" />
        </Link>
      </div>

      <div className="mx-auto max-w-3xl w-full px-4 pb-16 flex-1">
        {grilles ? (
          <Simulateur grillesBanque={grilles.banque} grillesDelegation={grilles.delegation} banques={banques} />
        ) : (
          <p className="text-center" style={{ color: "var(--text-muted)" }}>
            Le simulateur est momentanément indisponible. Réessayez dans un instant.
          </p>
        )}
      </div>
    </div>
  );
}
