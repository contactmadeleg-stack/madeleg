import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resoudreTableGrille } from "../_tables";

export async function GET(req: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { table: cle } = await params;
  const table = resoudreTableGrille(cle);
  if (!table) {
    return NextResponse.json({ error: "Grille inconnue" }, { status: 404 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from(table).select("*").order("age_min");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ paliers: data });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { table: cle } = await params;
  const table = resoudreTableGrille(cle);
  if (!table) {
    return NextResponse.json({ error: "Grille inconnue" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const ageMin = Number(body?.ageMin);
  const ageMax = Number(body?.ageMax);
  const tauxAnnuel = Number(body?.tauxAnnuel);

  if (!Number.isFinite(ageMin) || !Number.isFinite(ageMax) || !Number.isFinite(tauxAnnuel)) {
    return NextResponse.json({ error: "Âge min, âge max et taux annuel requis" }, { status: 400 });
  }
  if (ageMin < 0 || ageMax <= ageMin) {
    return NextResponse.json({ error: "Plage d'âge invalide (âge max doit être supérieur à âge min)" }, { status: 400 });
  }
  if (tauxAnnuel <= 0 || tauxAnnuel > 1) {
    return NextResponse.json({ error: "Le taux annuel doit être exprimé en décimal entre 0 et 1 (ex. 0.004 pour 0,4%)" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .insert({ age_min: ageMin, age_max: ageMax, taux_annuel: tauxAnnuel })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ palier: data });
}
