import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import BoutonDeconnexion from "./BoutonDeconnexion";

export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  // Double vérification : le middleware protège déjà /admin, mais /admin/login
  // et /admin/auth/callback passent par ce même layout sans garde middleware.
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-fond)" }}>
      <header className="border-b border-[var(--color-bordure)] bg-[var(--color-fond-carte)]">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <p className="font-titres text-lg font-bold">
            <span style={{ color: "var(--color-texte)" }}>ma</span>
            <span style={{ color: "var(--color-ambre)" }}>deleg</span>
            <span className="text-[var(--color-texte-doux)] font-normal text-sm ml-2">Admin</span>
          </p>
          <BoutonDeconnexion />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
