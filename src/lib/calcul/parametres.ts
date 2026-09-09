import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { TrancheAge } from "./simulation";

// Ces valeurs viennent de Supabase (grille_taux_banque_moyen et
// grille_taux_delegation) — jamais de taux inventé ou codé en dur ici.
// Tant que ces tables ne sont pas renseignées, le calcul échoue
// explicitement plutôt que d'afficher un chiffre approximatif au visiteur.

async function chargerGrilleUneFois(table: string): Promise<TrancheAge[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .select("age_min, age_max, taux_annuel")
    .eq("actif", true)
    .order("age_min");

  if (error || !data) {
    throw new Error(`Impossible de charger la grille ${table}.`);
  }

  return data.map((r) => ({
    ageMin: r.age_min,
    ageMax: r.age_max,
    tauxAnnuel: Number(r.taux_annuel),
  }));
}

// Un aller-retour réseau ponctuel qui échoue (blip de connexion Supabase)
// ne doit pas rendre toute la page d'accueil indisponible — un essai
// supplémentaire avant d'abandonner pour de bon.
async function chargerGrille(table: string): Promise<TrancheAge[]> {
  try {
    return await chargerGrilleUneFois(table);
  } catch (e) {
    console.error(`Premier essai échoué pour ${table}, nouvelle tentative :`, e);
    await new Promise((r) => setTimeout(r, 500));
    return chargerGrilleUneFois(table);
  }
}

// Grilles complètes (server-only), transmises en props au composant client
// pour permettre un recalcul instantané au curseur sans aller-retour réseau.
export async function getGrillesCompletes(): Promise<{
  banque: TrancheAge[];
  delegation: TrancheAge[];
}> {
  const [banque, delegation] = await Promise.all([
    chargerGrille("grille_taux_banque_moyen"),
    chargerGrille("grille_taux_delegation"),
  ]);
  return { banque, delegation };
}
