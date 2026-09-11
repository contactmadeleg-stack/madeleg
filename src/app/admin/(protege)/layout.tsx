import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import Logo from "@/components/Logo";
import BoutonDeconnexion from "./BoutonDeconnexion";

const LIENS_NAV = [
  { href: "/admin", label: "Dossiers" },
  { href: "/admin/grilles", label: "Grilles de taux" },
  { href: "/admin/banques", label: "Banques" },
];

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
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex items-baseline gap-2 shrink-0">
              <Logo size={18} tone="ink" />
              <span className="text-[var(--color-texte-doux)] font-normal text-sm">Admin</span>
            </div>
            <nav className="flex items-center gap-5">
              {LIENS_NAV.map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className="text-sm font-medium no-underline text-[var(--color-texte-doux)] hover:text-[var(--color-marque)]"
                >
                  {lien.label}
                </Link>
              ))}
            </nav>
          </div>
          <BoutonDeconnexion />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
