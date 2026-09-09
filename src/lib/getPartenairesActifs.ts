import { getSupabaseServerClient } from "./supabase/server";

export type PartenaireAffiche = { id: string; nom: string; logoUrl: string | null };

export async function getPartenairesActifs(): Promise<PartenaireAffiche[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("partenaires")
    .select("id, nom, logo_path")
    .eq("actif", true)
    .order("ordre", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((p) => ({
    id: p.id,
    nom: p.nom,
    logoUrl: p.logo_path
      ? supabase.storage.from("logos-partenaires").getPublicUrl(p.logo_path).data.publicUrl
      : null,
  }));
}
