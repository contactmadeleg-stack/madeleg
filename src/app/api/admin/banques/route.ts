import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function slugifier(nom: string) {
  return nom
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { nom } = await req.json().catch(() => ({ nom: undefined }));
  if (typeof nom !== "string" || !nom.trim()) {
    return NextResponse.json({ error: "Nom requis" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("banques")
    .insert({ nom: nom.trim(), slug: slugifier(nom) })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ banque: data });
}
