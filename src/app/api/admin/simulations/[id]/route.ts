import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const STATUTS_VALIDES = ["a_joindre", "en_cours", "gagne", "perdu"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const donnees: Record<string, string | number> = {};
  if (body?.statut_dossier !== undefined) {
    if (!STATUTS_VALIDES.includes(body.statut_dossier)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }
    donnees.statut_dossier = body.statut_dossier;
  }
  if (body?.notes_internes !== undefined) {
    donnees.notes_internes = String(body.notes_internes).slice(0, 5000);
  }
  if (body?.ppa !== undefined) {
    const v = Number(body.ppa);
    if (!Number.isFinite(v) || v < 0) return NextResponse.json({ error: "Montant PPA invalide" }, { status: 400 });
    donnees.ppa = v;
  }
  if (body?.frais_distribution !== undefined) {
    const v = Number(body.frais_distribution);
    if (!Number.isFinite(v) || v < 0) {
      return NextResponse.json({ error: "Montant des frais de distribution invalide" }, { status: 400 });
    }
    donnees.frais_distribution = v;
  }

  if (Object.keys(donnees).length === 0) {
    return NextResponse.json({ error: "Rien à mettre à jour" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("simulations").update(donnees).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
