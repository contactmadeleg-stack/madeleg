import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase/serverAuth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({ email: undefined }));

  // Réponse identique que l'email corresponde ou non — évite de révéler
  // si une adresse est l'admin (énumération). Seul l'email autorisé
  // déclenche réellement l'envoi du lien.
  if (!ADMIN_EMAIL || typeof email !== "string" || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await getSupabaseAuthServerClient();
  const origin = req.nextUrl.origin;

  await supabase.auth.signInWithOtp({
    email: ADMIN_EMAIL,
    options: { emailRedirectTo: `${origin}/admin/auth/callback` },
  });

  return NextResponse.json({ ok: true });
}
