import { createClient } from "@supabase/supabase-js";

// Client serveur uniquement — utilise la clé secrète Supabase.
// Ne jamais importer ce fichier depuis un composant client ("use client").
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Variables Supabase manquantes (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY)."
    );
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false },
  });
}
