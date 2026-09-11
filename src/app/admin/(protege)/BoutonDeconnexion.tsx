"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function BoutonDeconnexion({ inverse = false }: { inverse?: boolean }) {
  const router = useRouter();

  async function deconnecter() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={deconnecter}
      className="text-sm font-medium transition-colors"
      style={{ color: inverse ? "var(--ink-300)" : "var(--color-texte-doux)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = inverse ? "var(--white)" : "var(--color-marque)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = inverse ? "var(--ink-300)" : "var(--color-texte-doux)";
      }}
    >
      Se déconnecter
    </button>
  );
}
