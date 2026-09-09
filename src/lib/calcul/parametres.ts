import { getSupabaseServerClient } from "@/lib/supabase/server";

// Ces valeurs viennent de Supabase (grille_taux_banque_moyen et
// grille_taux_delegation) — jamais de taux inventé ou codé en dur ici.
// Tant que ces tables ne sont pas renseignées pour une tranche d'âge
// donnée, le calcul échoue explicitement plutôt que d'afficher un chiffre
// approximatif au visiteur.

async function lookupTauxParAge(table: string, age: number): Promise<number> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .select("taux_annuel")
    .eq("actif", true)
    .lte("age_min", age)
    .gte("age_max", age)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error(`Taux non configuré pour l'âge ${age} (table ${table}).`);
  }

  return Number(data.taux_annuel);
}

export function getTauxBanqueMoyen(age: number): Promise<number> {
  return lookupTauxParAge("grille_taux_banque_moyen", age);
}

export function getTauxDelegation(age: number): Promise<number> {
  return lookupTauxParAge("grille_taux_delegation", age);
}
