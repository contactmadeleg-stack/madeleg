import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Provisionnement UNIQUE du compte admin (email + mot de passe). Ne compare
// pas de jeton secret : la protection réelle vient du comportement de
// Supabase Auth lui-même, qui refuse de créer un compte pour un email déjà
// existant — donc cette route ne peut réussir qu'une seule fois, la
// première. Une fois utilisée avec succès, elle devient inerte de façon
// permanente (toute tentative suivante échoue avec "déjà provisionné").
// À supprimer une fois le compte confirmé fonctionnel.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const password = req.nextUrl.searchParams.get("password");

  if (req.nextUrl.searchParams.has("debug")) {
    return NextResponse.json({
      adminEmailSet: !!process.env.ADMIN_EMAIL,
      adminEmailMatches: email && process.env.ADMIN_EMAIL ? email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() : null,
    });
  }

  if (!email || !password || email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message, dejaProvisionne: true }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
