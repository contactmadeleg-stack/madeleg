import { getSupabaseServerClient } from "@/lib/supabase/server";
import LigneSimulation from "./LigneSimulation";

export const dynamic = "force-dynamic";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

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

function dateFr(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

type Simulation = {
  id: string;
  created_at: string;
  prenom: string | null;
  nom: string | null;
  email: string | null;
  mobile: string | null;
  banque_selectionnee: string | null;
  economie_affichee: number;
  ages_emprunteurs: number[];
  capital: number;
  statut_dossier: string;
  notes_internes: string | null;
};

export default async function PageDashboardAdmin() {
  const supabase = getSupabaseServerClient();
  const [{ data, error }, stats] = await Promise.all([
    supabase
      .from("simulations")
      .select(
        "id, created_at, prenom, nom, email, mobile, banque_selectionnee, economie_affichee, ages_emprunteurs, capital, statut_dossier, notes_internes"
      )
      .not("etape2_completed_at", "is", null)
      .order("created_at", { ascending: false }),
    chargerStats(),
  ]);

  const simulations = (data ?? []) as Simulation[];

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
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

      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-bold">Dossiers</h1>
        <p className="text-sm text-[var(--color-texte-doux)]">
          {simulations.length} demande{simulations.length > 1 ? "s" : ""}
        </p>
      </div>

      {error && <p className="text-sm text-red-700">Erreur de chargement : {error.message}</p>}

      {!error && simulations.length === 0 && (
        <p className="text-[var(--color-texte-doux)]">Aucune demande complétée pour l&apos;instant.</p>
      )}

      <div className="space-y-4">
        {simulations.map((s) => (
          <div key={s.id} className="mdl-card mdl-card__pad grid lg:grid-cols-[1.3fr_1fr_1fr] gap-5">
            <div>
              <p className="font-titres font-bold">
                {s.prenom} {s.nom}
              </p>
              <p className="text-sm text-[var(--color-texte-doux)]">{s.email}</p>
              <p className="text-sm text-[var(--color-texte-doux)]">{s.mobile}</p>
              <p className="text-xs text-[var(--color-texte-doux)] mt-2">{dateFr(s.created_at)}</p>
            </div>

            <div className="text-sm space-y-1">
              <p>
                <span className="text-[var(--color-texte-doux)]">Banque : </span>
                <span className="font-medium">{s.banque_selectionnee || "Non renseignée"}</span>
              </p>
              <p>
                <span className="text-[var(--color-texte-doux)]">Capital : </span>
                <span className="font-medium">{euros(s.capital)}</span>
              </p>
              <p>
                <span className="text-[var(--color-texte-doux)]">Âge(s) : </span>
                <span className="font-medium">{(s.ages_emprunteurs ?? []).join(", ")}</span>
              </p>
              <p>
                <span className="text-[var(--color-texte-doux)]">Économie estimée : </span>
                <span className="font-bold" style={{ color: "var(--color-ambre)" }}>
                  {euros(s.economie_affichee)}
                </span>
              </p>
            </div>

            <LigneSimulation id={s.id} statutInitial={s.statut_dossier} notesInitiales={s.notes_internes} />
          </div>
        ))}
      </div>
    </div>
  );
}
