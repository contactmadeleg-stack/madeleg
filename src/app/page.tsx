import Simulateur from "@/components/Simulateur";
import FormeDecorative from "@/components/FormeDecorative";
import CarteAvantages from "@/components/CarteAvantages";
import { IconeEclair } from "@/components/Icones";
import SectionExplication from "@/components/SectionExplication";
import SectionEtapes from "@/components/SectionEtapes";
import SectionPourquoi from "@/components/SectionPourquoi";
import SectionFAQ from "@/components/SectionFAQ";
import SectionCTAFinale from "@/components/SectionCTAFinale";
import { getGrillesCompletes } from "@/lib/calcul/parametres";
import { getBanquesActives } from "@/lib/getBanquesActives";

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

  const banques = await getBanquesActives();

  return (
    <div>
      <div className="relative overflow-hidden">
        <FormeDecorative />

        <section className="relative">
          <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20 sm:pb-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-5">
                <IconeEclair className="w-3.5 h-3.5 text-[var(--color-ambre)]" />
                Simple, rapide, 100% gratuit
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-xl mx-auto lg:mx-0">
                Payez-vous <span className="texte-degrade-ambre">trop cher</span> votre assurance
                emprunteur&nbsp;?
              </h1>
              <p className="text-lg text-[var(--color-texte-doux)] mt-4 max-w-lg mx-auto lg:mx-0">
                Changez à tout moment, sans quitter votre banque. Estimation gratuite en 30 secondes.
              </p>
            </div>

            <div className="hidden lg:flex justify-center relative">
              <CarteAvantages />
              <div className="carte-verre absolute -bottom-5 -left-6 px-4 py-2.5 flex items-center gap-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[var(--color-sauge)] shrink-0 animate-pulse" />
                <span className="text-xs font-semibold text-[var(--color-marque)] whitespace-nowrap">
                  Réponse sous 24h ouvrées
                </span>
              </div>
            </div>
          </div>
        </section>

        <div id="simulateur" className="relative mx-auto max-w-3xl px-4 pb-16 sm:pb-20 scroll-mt-20">
          {grilles ? (
            <Simulateur grillesBanque={grilles.banque} grillesDelegation={grilles.delegation} banques={banques} />
          ) : (
            <p className="text-center text-[var(--color-texte-doux)]">
              Le simulateur est momentanément indisponible. Réessayez dans un instant.
            </p>
          )}
        </div>
      </div>

      <SectionExplication />
      <SectionEtapes />
      <SectionPourquoi />
      <SectionFAQ />
      <SectionCTAFinale />
    </div>
  );
}
