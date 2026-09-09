import { getSupabaseServerClient } from "@/lib/supabase/server";

// Ces valeurs viennent de Supabase (tables parametres_calcul et
// grille_taux_delegation) — jamais de taux inventé ou codé en dur ici.
// Tant que ces tables ne sont pas renseignées, le calcul échoue
// explicitement plutôt que d'afficher un chiffre approximatif au visiteur.

export async function getTauxBanqueMoyen(): Promise<number> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("parametres_calcul")
    .select("taux_banque_moyen")
    .eq("id", true)
    .single();

  if (error || !data) {
    throw new Error(
      "Taux banque moyen non configuré (table parametres_calcul vide)."
    );
  }

  return Number(data.taux_banque_moyen);
}

export async function getTauxDelegation(age: number): Promise<number> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("grille_taux_delegation")
    .select("taux_annuel")
    .eq("actif", true)
    .lte("age_min", age)
    .gte("age_max", age)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error(
      `Taux délégation non configuré pour l'âge ${age} (table grille_taux_delegation).`
    );
  }

  return Number(data.taux_annuel);
}
