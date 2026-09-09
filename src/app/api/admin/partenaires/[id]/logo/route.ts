import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const TYPES_ACCEPTES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

const TAILLE_MAX = 2 * 1024 * 1024; // 2 Mo

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const form = await req.formData().catch(() => null);
  const fichier = form?.get("logo");

  if (!(fichier instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (!(fichier.type in TYPES_ACCEPTES)) {
    return NextResponse.json({ error: "Format non supporté (PNG, JPG, WebP ou SVG uniquement)" }, { status: 400 });
  }
  if (fichier.size > TAILLE_MAX) {
    return NextResponse.json({ error: "Fichier trop volumineux (2 Mo max)" }, { status: 400 });
  }

  const extension = TYPES_ACCEPTES[fichier.type];
  const chemin = `${id}/logo.${extension}`;

  const supabase = getSupabaseServerClient();
  const { error: erreurUpload } = await supabase.storage
    .from("logos-partenaires")
    .upload(chemin, fichier, { upsert: true, contentType: fichier.type });

  if (erreurUpload) {
    return NextResponse.json({ error: erreurUpload.message }, { status: 500 });
  }

  const { error: erreurMaj } = await supabase.from("partenaires").update({ logo_path: chemin }).eq("id", id);
  if (erreurMaj) {
    return NextResponse.json({ error: erreurMaj.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("logos-partenaires").getPublicUrl(chemin);

  return NextResponse.json({ ok: true, logoUrl: `${publicUrl}?v=${Date.now()}` });
}
