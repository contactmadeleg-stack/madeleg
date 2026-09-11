import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/serverAuth";
import AdminSidebar from "./AdminSidebar";

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
    <div className="flex min-h-screen" style={{ background: "var(--surface-sunken)" }}>
      <AdminSidebar email={user.email ?? ""} />
      <main className="flex-1 min-w-0 px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
