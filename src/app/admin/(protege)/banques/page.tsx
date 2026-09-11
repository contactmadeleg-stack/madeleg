import { getSupabaseServerClient } from "@/lib/supabase/server";
import BanquesTable from "./BanquesTable";
import FormulaireAjoutBanque from "./FormulaireAjoutBanque";

export const dynamic = "force-dynamic";

export default async function PageBanquesAdmin() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("banques").select("*").order("ordre", { ascending: true });

  const banques = (data ?? []).map((b) => {
    let logoUrl: string | null = null;
    if (b.logo_path) {
      const { publicUrl } = supabase.storage.from("logos-banques").getPublicUrl(b.logo_path).data;
      // Cache-buster dérivé de logo_updated_at : l'URL ne change que quand
      // le logo change vraiment, donc le cache reste utile entre deux
      // logos identiques mais se rafraîchit à coup sûr après un remplacement
      // (cf. migration 0013 — sans ça le CDN/navigateur sert l'ancien
      // fichier indéfiniment puisque le chemin de stockage est stable).
      const v = b.logo_updated_at ? new Date(b.logo_updated_at as string).getTime() : 0;
      logoUrl = `${publicUrl}?v=${v}`;
    }
    return {
      id: b.id as string,
      nom: b.nom as string,
      actif: b.actif as boolean,
      ordre: b.ordre as number,
      logoUrl,
    };
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-1">Banques</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Logos et ordre d&apos;affichage des cartes banque à l&apos;étape 2 du simulateur. Une banque sans logo
            s&apos;affiche en carte texte seul.
          </p>
        </div>
        <FormulaireAjoutBanque />
      </div>

      {error && <p className="text-sm text-red-700 mb-4">Erreur de chargement : {error.message}</p>}

      {!error && <BanquesTable banques={banques} />}
    </div>
  );
}
