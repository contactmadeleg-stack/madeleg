import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resoudreTableGrille } from "../../_tables";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { table: cle, id } = await params;
  const table = resoudreTableGrille(cle);
  if (!table) {
    return NextResponse.json({ error: "Grille inconnue" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const donnees: Record<string, number | boolean> = {};

  if (body?.ageMin !== undefined) {
    const v = Number(body.ageMin);
    if (!Number.isFinite(v) || v < 0) return NextResponse.json({ error: "Âge min invalide" }, { status: 400 });
    donnees.age_min = v;
  }
  if (body?.ageMax !== undefined) {
    const v = Number(body.ageMax);
    if (!Number.isFinite(v)) return NextResponse.json({ error: "Âge max invalide" }, { status: 400 });
    donnees.age_max = v;
  }
  if (donnees.age_min !== undefined && donnees.age_max !== undefined && donnees.age_max <= donnees.age_min) {
    return NextResponse.json({ error: "Âge max doit être supérieur à âge min" }, { status: 400 });
  }
  if (body?.tauxAnnuel !== undefined) {
    const v = Number(body.tauxAnnuel);
    if (!Number.isFinite(v) || v <= 0 || v > 1) {
      return NextResponse.json({ error: "Le taux annuel doit être exprimé en décimal entre 0 et 1" }, { status: 400 });
    }
    donnees.taux_annuel = v;
  }
  if (typeof body?.actif === "boolean") donnees.actif = body.actif;

  if (Object.keys(donnees).length === 0) {
    return NextResponse.json({ error: "Rien à mettre à jour" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from(table).update({ ...donnees, updated_at: new Date().toISOString() }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { table: cle, id } = await params;
  const table = resoudreTableGrille(cle);
  if (!table) {
    return NextResponse.json({ error: "Grille inconnue" }, { status: 404 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
