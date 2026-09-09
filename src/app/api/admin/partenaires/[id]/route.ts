import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const donnees: Record<string, string | number | boolean> = {};
  if (typeof body?.nom === "string" && body.nom.trim()) donnees.nom = body.nom.trim();
  if (typeof body?.actif === "boolean") donnees.actif = body.actif;
  if (typeof body?.ordre === "number") donnees.ordre = body.ordre;

  if (Object.keys(donnees).length === 0) {
    return NextResponse.json({ error: "Rien à mettre à jour" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("partenaires").update(donnees).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
