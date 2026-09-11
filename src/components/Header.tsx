"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LIENS_NAV = [
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/assurance-emprunteur", label: "Assurance emprunteur" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const pathname = usePathname();

  if (pathname === "/simulation") return null;

  return (
    <header
      className="sticky top-0 z-50 border-b bg-white"
      style={{
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo: madeleg (all lowercase, design-system serif) */}
        <Link
          href="/"
          className="shrink-0 font-bold tracking-tight"
          style={{
            font: "700 24px/1.2 var(--font-display)",
            color: "var(--text-strong)",
            letterSpacing: "-0.03em",
          }}
        >
          madeleg
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {LIENS_NAV.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-link)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                {lien.label}
              </a>
            ))}
          </nav>

          {/* CTA and mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/#simulateur"
              className="mdl-btn mdl-btn--primary mdl-btn--md hidden sm:inline-flex"
            >
              Estimer mon économie
            </Link>
            <button
              type="button"
              onClick={() => setMenuOuvert((v) => !v)}
              aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOuvert}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-strong)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-sunken)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                {menuOuvert ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOuvert && (
        <nav
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4 bg-white"
          style={{
            borderColor: "var(--border-subtle)",
          }}
        >
          {LIENS_NAV.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={() => setMenuOuvert(false)}
              className="text-sm font-medium"
              style={{
                color: "var(--text-strong)",
              }}
            >
              {lien.label}
            </a>
          ))}
          <Link
            href="/#simulateur"
            onClick={() => setMenuOuvert(false)}
            className="mdl-btn mdl-btn--primary mdl-btn--md mdl-btn--block mt-2"
          >
            Estimer mon économie
          </Link>
        </nav>
      )}
    </header>
  );
}
