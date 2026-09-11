import { getSupabaseServerClient } from "@/lib/supabase/server";
import KanbanBoard from "../KanbanBoard";
import type { Simulation } from "../FicheClient";

export const dynamic = "force-dynamic";

export default async function PageClientsAdmin() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("simulations")
    .select(
      "id, created_at, prenom, nom, email, mobile, banque_selectionnee, economie_affichee, ages_emprunteurs, capital, statut_dossier, notes_internes, ppa, frais_distribution"
    )
    .not("etape2_completed_at", "is", null)
    .order("created_at", { ascending: false });

  const simulations = (data ?? []) as Simulation[];

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Clients</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Suivi des dossiers, de la prise de contact à la signature.
          </p>
        </div>
        <p className="text-sm shrink-0" style={{ color: "var(--text-muted)" }}>
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
