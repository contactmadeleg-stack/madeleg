import Simulateur from "@/components/Simulateur";
import { getGrillesCompletes } from "@/lib/calcul/parametres";

// Les grilles de taux sont éditables directement dans Supabase (en
// attendant une console d'admin) — revalidation régulière pour que les
// changements se reflètent sans nécessiter un redéploiement.
export const revalidate = 300;

export default async function Home() {
  let grilles: Awaited<ReturnType<typeof getGrillesCompletes>> | null = null;
  try {
    grilles = await getGrillesCompletes();
  } catch (e) {
    console.error("Grilles de taux indisponibles :", e);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-texte)] tracking-tight">
          Vous avez déjà un prêt immobilier ? Vous pouvez changer d&apos;assurance emprunteur, gratuitement.
        </h1>
        <p className="text-lg text-[var(--color-texte-doux)]">
          La loi Lemoine vous permet de résilier votre assurance de prêt à tout moment, sans quitter votre banque.
          Estimez votre économie en 30 secondes.
        </p>
      </div>

      {grilles ? (
        <Simulateur grillesBanque={grilles.banque} grillesDelegation={grilles.delegation} />
      ) : (
        <p className="text-center text-[var(--color-texte-doux)]">
          Le simulateur est momentanément indisponible. Réessayez dans un instant.
        </p>
      )}
    </div>
  );
}
