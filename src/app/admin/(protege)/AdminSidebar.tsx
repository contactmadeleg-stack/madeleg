"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import { IconeTableauDeBord, IconeReglages, IconeBanqueSidebar, IconeDeconnexion, IconeReplier } from "./AdminIcones";
import BoutonDeconnexion from "./BoutonDeconnexion";

const LIENS_NAV = [
  { href: "/admin", label: "Tableau de bord", Icone: IconeTableauDeBord },
  { href: "/admin/grilles", label: "Grilles de taux", Icone: IconeReglages },
  { href: "/admin/banques", label: "Banques", Icone: IconeBanqueSidebar },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [replie, setReplie] = useState(false);

  return (
    <aside
      className={`shrink-0 h-screen sticky top-0 flex flex-col border-r transition-[width] duration-200 ${
        replie ? "w-[72px]" : "w-64"
      }`}
      style={{ background: "var(--ink-900)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="h-16 flex items-center px-5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {replie ? (
          <span className="text-white font-bold text-lg font-titres">m.</span>
        ) : (
          <Logo size={20} tone="inverse" />
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {LIENS_NAV.map(({ href, label, Icone }) => {
          const actif = href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={replie ? label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors"
              style={{
                background: actif ? "rgba(255,255,255,0.1)" : "transparent",
                color: actif ? "var(--white)" : "var(--ink-300)",
              }}
            >
              <Icone className="w-5 h-5 shrink-0" />
              {!replie && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {!replie && (
          <div className="px-3 pb-2">
            <p className="text-xs truncate" style={{ color: "var(--ink-300)" }}>
              {email}
            </p>
          </div>
        )}
        <div className="flex items-center gap-3 px-3 py-2 text-sm" style={{ color: "var(--ink-300)" }}>
          <IconeDeconnexion className="w-5 h-5 shrink-0" />
          {!replie && <BoutonDeconnexion inverse />}
        </div>
        <button
          type="button"
          onClick={() => setReplie((v) => !v)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
          style={{ color: "var(--ink-300)" }}
        >
          <IconeReplier className={`w-4 h-4 shrink-0 transition-transform ${replie ? "rotate-180" : ""}`} />
          {!replie && <span>Réduire</span>}
        </button>
      </div>
    </aside>
  );
}
