import { getSupabaseServerClient } from "./supabase/server";

export type BanqueAffichee = { id: string; nom: string; logoUrl: string | null };

// Banques actives pour le sélecteur de l'étape 2, gérées depuis la
// console admin (/admin/banques). "Ma banque n'est pas dans la liste"
// reste une option fixe côté composant, pas une ligne ici.
export async function getBanquesActives(): Promise<BanqueAffichee[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("banques")
    .select("id, nom, logo_path")
    .eq("actif", true)
    .order("ordre", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((b) => ({
    id: b.id,
    nom: b.nom,
    logoUrl: b.logo_path ? supabase.storage.from("logos-banques").getPublicUrl(b.logo_path).data.publicUrl : null,
  }));
}
