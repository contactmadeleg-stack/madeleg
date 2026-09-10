import { getSupabaseServerClient } from "@/lib/supabase/server";
import LigneSimulation from "./LigneSimulation";

export const dynamic = "force-dynamic";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
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
  const { data, error } = await supabase
    .from("simulations")
    .select(
      "id, created_at, prenom, nom, email, mobile, banque_selectionnee, economie_affichee, ages_emprunteurs, capital, statut_dossier, notes_internes"
    )
    .not("etape2_completed_at", "is", null)
    .order("created_at", { ascending: false });

  const simulations = (data ?? []) as Simulation[];

  return (
    <div>
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
          <div key={s.id} className="carte-madeleg p-5 grid lg:grid-cols-[1.3fr_1fr_1fr] gap-5">
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
