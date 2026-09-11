import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function PATCH(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const coefficientDecote = Number(body?.coefficientDecote);

  if (!Number.isFinite(coefficientDecote) || coefficientDecote <= 0 || coefficientDecote > 1) {
    return NextResponse.json(
      { error: "Le coefficient doit être un nombre entre 0 et 1 (ex. 0.75 pour 75%)" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("parametres_simulation")
    .update({ coefficient_decote: coefficientDecote, updated_at: new Date().toISOString() })
    .eq("id", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
