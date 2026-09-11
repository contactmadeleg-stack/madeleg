import { getSupabaseServerClient } from "@/lib/supabase/server";

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
  const stats = await chargerStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Vue d&apos;ensemble de l&apos;activité du site.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
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
    </div>
  );
}
