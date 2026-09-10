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
    <header className="sticky top-0 z-50 border-b border-[var(--color-bordure)] bg-[var(--color-fond-carte)]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-titres text-2xl font-bold tracking-tight shrink-0">
          <span style={{ color: "var(--color-texte)" }}>ma</span>
          <span style={{ color: "var(--color-ambre)" }}>deleg</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            {LIENS_NAV.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="text-sm font-bold text-[var(--color-texte-doux)] hover:text-[var(--color-marque)]"
              >
                {lien.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#simulateur"
              className="btn-madeleg btn-madeleg-principal hidden sm:inline-block px-5 py-2.5 text-sm text-white"
            >
              Estimer mon économie
            </Link>
            <button
              type="button"
              onClick={() => setMenuOuvert((v) => !v)}
              aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOuvert}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--color-bordure)] text-[var(--color-texte)] shrink-0"
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

      {menuOuvert && (
        <nav className="md:hidden border-t border-[var(--color-bordure)] px-4 py-4 flex flex-col gap-3 bg-[var(--color-fond-carte)]">
          {LIENS_NAV.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={() => setMenuOuvert(false)}
              className="text-sm font-bold text-[var(--color-texte)]"
            >
              {lien.label}
            </a>
          ))}
          <Link
            href="/#simulateur"
            onClick={() => setMenuOuvert(false)}
            className="btn-madeleg btn-madeleg-principal text-center px-5 py-2.5 text-sm text-white mt-1"
          >
            Estimer mon économie
          </Link>
        </nav>
      )}
    </header>
  );
}
