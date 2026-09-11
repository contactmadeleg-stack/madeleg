import { getSupabaseServerClient } from "./supabase/server";

export type BanqueAffichee = { id: string; nom: string; logoUrl: string | null };

// Banques actives pour le sélecteur de l'étape 2, gérées depuis la
// console admin (/admin/banques). "Ma banque n'est pas dans la liste"
// reste une option fixe côté composant, pas une ligne ici.
export async function getBanquesActives(): Promise<BanqueAffichee[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("banques")
    .select("id, nom, logo_path, logo_updated_at")
    .eq("actif", true)
    .order("ordre", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((b) => {
    let logoUrl: string | null = null;
    if (b.logo_path) {
      const { publicUrl } = supabase.storage.from("logos-banques").getPublicUrl(b.logo_path).data;
      // Cache-buster — voir commentaire dans admin/banques/page.tsx : sans
      // lui, un logo remplacé en admin continue de s'afficher tel quel côté
      // visiteur tant que le cache navigateur/CDN n'a pas expiré (~1h).
      const v = b.logo_updated_at ? new Date(b.logo_updated_at).getTime() : 0;
      logoUrl = `${publicUrl}?v=${v}`;
    }
    return { id: b.id, nom: b.nom, logoUrl };
  });
}
