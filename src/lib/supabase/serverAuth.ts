import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client serveur pour l'AUTHENTIFICATION uniquement (cookies de session,
// clé publique) — distinct de getSupabaseServerClient() dans server.ts qui
// utilise la clé secrète pour lire/écrire les données métier. Ne jamais
// utiliser ce client pour accéder aux tables : RLS est activé sans policy,
// tout retournerait vide.
export async function getSupabaseAuthServerClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Appelé depuis un Server Component (lecture seule) — la session
          // sera rafraîchie par le middleware sur la requête suivante.
        }
      },
    },
  });
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Vérifie que l'utilisateur connecté est bien l'unique admin autorisé.
// Retourne l'utilisateur si oui, null sinon (session absente, expirée, ou
// email différent de ADMIN_EMAIL — protection même si un compte Supabase
// Auth existe pour une autre adresse).
export async function getAdminUser() {
  if (!ADMIN_EMAIL) {
    throw new Error("Variable ADMIN_EMAIL manquante.");
  }

  const supabase = await getSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return null;
  }

  return user;
}
