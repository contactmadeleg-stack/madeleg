"use client";

import { createBrowserClient } from "@supabase/ssr";

// Client navigateur — clé publique uniquement, utilisé pour l'auth de la
// console admin (lien magique). Aucune donnée métier ne transite par ce
// client : RLS est activé sans policy sur toutes les tables, donc ce
// client ne peut de toute façon rien lire/écrire — seul le serveur (clé
// secrète) accède aux données, comme partout ailleurs sur le site.
export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
