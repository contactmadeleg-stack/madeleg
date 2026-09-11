import { getSupabaseServerClient } from "@/lib/supabase/server";
import GrilleEditable from "./GrilleEditable";
import CoefficientDecote from "./CoefficientDecote";

export const dynamic = "force-dynamic";

export default async function PageGrillesAdmin() {
  const supabase = getSupabaseServerClient();

  const [banque, delegation, parametres] = await Promise.all([
    supabase.from("grille_taux_banque_moyen").select("*").order("age_min"),
    supabase.from("grille_taux_delegation").select("*").order("age_min"),
    supabase.from("parametres_simulation").select("coefficient_decote").eq("id", true).single(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">Grilles de taux</h1>
        <p className="text-sm text-[var(--color-texte-doux)]">
          Paliers par tranche d&apos;âge utilisés par le simulateur pour estimer l&apos;économie. Le taux annuel
          s&apos;exprime en décimal (ex. 0,004 pour 0,40&nbsp;%).
        </p>
      </div>

      <CoefficientDecote valeurInitiale={Number(parametres.data?.coefficient_decote ?? 0.75)} />

      <section>
        <h2 className="text-lg font-bold mb-1">Assurance groupe (banque)</h2>
        <p className="text-sm text-[var(--color-texte-doux)] mb-4">
          Taux moyen constaté pour l&apos;assurance groupe proposée par les banques, par tranche d&apos;âge.
        </p>
        {banque.error && <p className="text-sm text-red-700 mb-4">Erreur de chargement : {banque.error.message}</p>}
        <GrilleEditable table="banque" paliersInitiaux={banque.data ?? []} />
      </section>

      <section>
        <h2 className="text-lg font-bold mb-1">Assurance déléguée</h2>
        <p className="text-sm text-[var(--color-texte-doux)] mb-4">
          Taux proposé par les assureurs partenaires en délégation, par tranche d&apos;âge.
        </p>
        {delegation.error && (
          <p className="text-sm text-red-700 mb-4">Erreur de chargement : {delegation.error.message}</p>
        )}
        <GrilleEditable table="delegation" paliersInitiaux={delegation.data ?? []} />
      </section>
    </div>
  );
}
