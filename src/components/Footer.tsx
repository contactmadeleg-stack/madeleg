import Link from "next/link";

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
  return (
    <footer className="mt-16" style={{ background: "var(--color-marque)" }}>
      <div className="mx-auto max-w-6xl px-4 py-12 grid sm:grid-cols-3 gap-10">
        <div>
          <p className="font-titres text-xl font-bold text-white">
            ma<span style={{ color: "var(--color-ambre)" }}>deleg</span>
          </p>
          <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-xs">
            Rachat et substitution d&apos;assurance emprunteur, sans quitter votre banque.
          </p>
          <a
            href="https://www.instagram.com/madeleg.fr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Madeleg sur Instagram"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/60 mt-4"
          >
            <IconeInstagram className="w-4 h-4" />
          </a>
        </div>

        <div>
          <p className="text-xs font-bold text-white/60 uppercase tracking-wide mb-3">Madeleg</p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="text-white/80 hover:text-white">
              Simulateur
            </Link>
            <Link href="/assurance-emprunteur" className="text-white/80 hover:text-white">
              Guide assurance emprunteur
            </Link>
            <Link href="/partenaires" className="text-white/80 hover:text-white">
              Nos partenaires
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold text-white/60 uppercase tracking-wide mb-3">Informations légales</p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/mentions-legales" className="text-white/80 hover:text-white">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-white/80 hover:text-white">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/60">
          Certifié ORIAS · © {new Date().getFullYear()} madeleg.fr · Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
