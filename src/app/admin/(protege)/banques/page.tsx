import { getSupabaseServerClient } from "@/lib/supabase/server";
import LigneBanque from "./LigneBanque";
import FormulaireAjoutBanque from "./FormulaireAjoutBanque";

export const dynamic = "force-dynamic";

export default async function PageBanquesAdmin() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("banques").select("*").order("ordre", { ascending: true });

  const banques = data ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Banques</h1>
        <p className="text-sm text-[var(--color-texte-doux)]">
          Logos et ordre d&apos;affichage des cartes banque à l&apos;étape 2 du simulateur. Une banque sans logo
          s&apos;affiche en carte texte seul.
        </p>
      </div>

      <FormulaireAjoutBanque />

      {error && <p className="text-sm text-red-700 mb-4">Erreur de chargement : {error.message}</p>}

      <div className="space-y-3">
        {banques.map((b) => (
          <LigneBanque
            key={b.id}
            id={b.id}
            nomInitial={b.nom}
            logoUrlInitiale={
              b.logo_path
                ? supabase.storage.from("logos-banques").getPublicUrl(b.logo_path).data.publicUrl
                : null
            }
            actifInitial={b.actif}
            ordreInitial={b.ordre}
          />
        ))}
      </div>
    </div>
  );
}
