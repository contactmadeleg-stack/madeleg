"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function BoutonDeconnexion() {
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
      className="text-sm font-medium text-[var(--color-texte-doux)] hover:text-[var(--color-marque)]"
    >
      Se déconnecter
    </button>
  );
}
