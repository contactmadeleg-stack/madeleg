import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase/serverAuth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (code) {
    const supabase = await getSupabaseAuthServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
}
