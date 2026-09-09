import { getSupabaseServerClient } from "@/lib/supabase/server";
import LignePartenaire from "./LignePartenaire";
import FormulaireAjoutPartenaire from "./FormulaireAjoutPartenaire";

export const dynamic = "force-dynamic";

export default async function PagePartenairesAdmin() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("partenaires").select("*").order("ordre", { ascending: true });

  const partenaires = data ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Partenaires</h1>
        <p className="text-sm text-[var(--color-texte-doux)]">
          Assureurs partenaires affichés sur la page publique /partenaires (liée en footer). Un partenaire sans logo
          s&apos;affiche en carte texte seul.
        </p>
      </div>

      <FormulaireAjoutPartenaire />

      {error && <p className="text-sm text-red-700 mb-4">Erreur de chargement : {error.message}</p>}

      <div className="space-y-3">
        {partenaires.map((p) => (
          <LignePartenaire
            key={p.id}
            id={p.id}
            nomInitial={p.nom}
            logoUrlInitiale={
              p.logo_path
                ? supabase.storage.from("logos-partenaires").getPublicUrl(p.logo_path).data.publicUrl
                : null
            }
            actifInitial={p.actif}
            ordreInitial={p.ordre}
          />
        ))}
        {partenaires.length === 0 && !error && (
          <p className="text-sm text-[var(--color-texte-doux)]">Aucun partenaire ajouté pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
