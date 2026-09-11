import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Enregistrement d'une visite pour le compteur "visites du jour" du
// dashboard admin — appelé une fois par session de navigation (voir
// VisiteTracker.tsx, dédupliqué côté client via sessionStorage). Endpoint
// public volontairement minimal : ni IP, ni identifiant, ni user-agent.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const path = typeof body?.path === "string" ? body.path.slice(0, 200) : "/";

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("page_views").insert({ path });

  if (error) {
    // Non bloquant pour le visiteur : un compteur analytique qui échoue ne
    // doit jamais dégrader l'expérience du site.
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
