"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

function IconeInstagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/simulation" || pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-16" style={{ background: "var(--emerald-600)" }}>
      <div className="mx-auto max-w-6xl px-4 py-12 grid sm:grid-cols-3 gap-10">
        <div>
          <Logo size={22} tone="brand" />
          <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-xs">
            Changer d&apos;assurance emprunteur, sans quitter votre banque.
          </p>
          <a
            href="https://www.instagram.com/madeleg.fr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Madeleg sur Instagram"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-white/80 no-underline hover:text-white hover:border-white/60 mt-4"
          >
            <IconeInstagram className="w-4 h-4" />
          </a>
        </div>

        <div>
          <p className="text-xs font-bold text-white/60 uppercase tracking-wide mb-3">Madeleg</p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              Simulateur
            </Link>
            <Link href="/assurance-emprunteur" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              Guide assurance emprunteur
            </Link>
            <Link href="/partenaires" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              Nos partenaires
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold text-white/60 uppercase tracking-wide mb-3">Informations légales</p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/mentions-legales" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/mentions-legales#reclamation-mediation" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              Réclamation et médiation
            </Link>
            <Link href="/cgu" className="font-semibold text-white/80 no-underline hover:text-white hover:underline">
              CGU
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/60">
          N° ORIAS 20004713 · © {new Date().getFullYear()} madeleg.fr · Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
