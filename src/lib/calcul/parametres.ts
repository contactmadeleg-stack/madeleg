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
    throw new Error(`Impossible de charger la grille ${table} : ${error?.message ?? "réponse vide"} (code ${error?.code ?? "?"}).`);
  }

  return data.map((r) => ({
    ageMin: r.age_min,
    ageMax: r.age_max,
    tauxAnnuel: Number(r.taux_annuel),
  }));
}

// Des 401 intermittents ont été observés côté Supabase peu après la
// création du projet (clés API au nouveau format) — un aller-retour isolé
// qui échoue ne doit pas rendre toute la page d'accueil indisponible.
// Jusqu'à 3 tentatives avec un délai croissant avant d'abandonner pour de bon.
async function chargerGrille(table: string): Promise<TrancheAge[]> {
  const delais = [300, 900];
  let derniereErreur: unknown;

  for (let tentative = 0; tentative <= delais.length; tentative++) {
    try {
      return await chargerGrilleUneFois(table);
    } catch (e) {
      derniereErreur = e;
      console.error(`Tentative ${tentative + 1} échouée pour ${table} :`, e);
      if (tentative < delais.length) {
        await new Promise((r) => setTimeout(r, delais[tentative]));
      }
    }
  }

  throw derniereErreur;
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
