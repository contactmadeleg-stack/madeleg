import { getSupabaseServerClient } from "@/lib/supabase/server";
import KanbanBoard from "./KanbanBoard";
import type { Simulation } from "./FicheClient";

export const dynamic = "force-dynamic";

// Frontière "aujourd'hui" calculée en UTC pour rester simple (v1 du
// dashboard) — décalée de quelques heures par rapport à minuit heure de
// Paris selon la saison, acceptable pour un indicateur de suivi, pas une
// donnée légale ou financière.
function debutJourneeUTC(): string {
  const maintenant = new Date();
  return new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate())).toISOString();
}

async function chargerStats() {
  const supabase = getSupabaseServerClient();
  const depuis = debutJourneeUTC();

  const [visites, estimations, demandes] = await Promise.all([
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", depuis),
    supabase.from("simulations").select("id", { count: "exact", head: true }).gte("created_at", depuis),
    supabase
      .from("simulations")
      .select("id", { count: "exact", head: true })
      .gte("etape2_completed_at", depuis),
  ]);

  return {
    visites: visites.count ?? 0,
    estimations: estimations.count ?? 0,
    demandes: demandes.count ?? 0,
  };
}

export default async function PageDashboardAdmin() {
  const supabase = getSupabaseServerClient();
  const [{ data, error }, stats] = await Promise.all([
    supabase
      .from("simulations")
      .select(
        "id, created_at, prenom, nom, email, mobile, banque_selectionnee, economie_affichee, ages_emprunteurs, capital, statut_dossier, notes_internes, ppa, frais_distribution"
      )
      .not("etape2_completed_at", "is", null)
      .order("created_at", { ascending: false }),
    chargerStats(),
  ]);

  const simulations = (data ?? []) as Simulation[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Vue d&apos;ensemble de l&apos;activité et des dossiers en cours.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="mdl-card mdl-card__pad mdl-stat">
          <span className="mdl-stat__label">Visites aujourd&apos;hui</span>
          <span className="mdl-stat__value">{stats.visites}</span>
        </div>
        <div className="mdl-card mdl-card__pad mdl-stat">
          <span className="mdl-stat__label">Estimations validées</span>
          <span className="mdl-stat__value">{stats.estimations}</span>
        </div>
        <div className="mdl-card mdl-card__pad mdl-stat">
          <span className="mdl-stat__label">Demandes validées</span>
          <span className="mdl-stat__value">{stats.demandes}</span>
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-bold">Dossiers</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {simulations.length} demande{simulations.length > 1 ? "s" : ""} au total
        </p>
      </div>

      {error && <p className="text-sm text-red-700 mb-4">Erreur de chargement : {error.message}</p>}

      {!error && simulations.length === 0 && (
        <p style={{ color: "var(--text-muted)" }}>Aucune demande complétée pour l&apos;instant.</p>
      )}

      {!error && simulations.length > 0 && <KanbanBoard simulationsInitiales={simulations} />}
    </div>
  );
}
