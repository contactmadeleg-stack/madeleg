import Simulateur from "@/components/Simulateur";
import FormeDecorative from "@/components/FormeDecorative";
import { IconeEclair } from "@/components/Icones";
import SectionExplication from "@/components/SectionExplication";
import SectionEtapes from "@/components/SectionEtapes";
import SectionMission from "@/components/SectionMission";
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
          <div
            className="relative mx-auto max-w-3xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center"
            style={{ maxWidth: "1080px" }}
          >
            {/* Overline badge */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full mb-6"
              style={{
                backgroundColor: "var(--surface-brand-subtle)",
                color: "var(--text-brand)",
              }}
            >
              <IconeEclair className="w-3.5 h-3.5" />
              Simple et sans prise de tête
            </span>

            {/* H1: Design-system Display + H1 styles */}
            <h1
              className="max-w-2xl mx-auto mb-6"
              style={{
                font: "var(--type-h1)",
                color: "var(--text-strong)",
              }}
            >
              Payez-vous <span className="texte-degrade-ambre">trop cher</span> votre assurance emprunteur&nbsp;?
            </h1>

            {/* Subheading: Body large */}
            <p
              className="mx-auto max-w-xl"
              style={{
                font: "var(--type-body-lg)",
                color: "var(--text-muted)",
              }}
            >
              Changez à tout moment, sans quitter votre banque. Estimation gratuite en 30 secondes.
            </p>
          </div>
        </section>

        <div id="simulateur" className="relative mx-auto max-w-3xl px-6 pb-16 sm:pb-20 scroll-mt-20">
          {grilles ? (
            <Simulateur grillesBanque={grilles.banque} grillesDelegation={grilles.delegation} banques={banques} />
          ) : (
            <p className="text-center" style={{ color: "var(--text-muted)" }}>
              Le simulateur est momentanément indisponible. Réessayez dans un instant.
            </p>
          )}
        </div>
      </div>

      <SectionExplication />
      <SectionEtapes />
      <SectionMission />
      <SectionPourquoi />
      <SectionFAQ />
      <SectionCTAFinale />
    </div>
  );
}
