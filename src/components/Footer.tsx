import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16" style={{ background: "var(--color-marque)" }}>
      <div className="mx-auto max-w-5xl px-4 py-10 grid sm:grid-cols-[auto_1fr] gap-8 sm:gap-16">
        <div>
          <p className="font-titres text-xl font-bold text-white">
            ma<span style={{ color: "var(--color-ambre-clair)" }}>deleg</span>
          </p>
          <nav className="flex flex-col gap-1.5 mt-3 text-sm">
            <Link href="/mentions-legales" className="text-white/80 hover:text-white underline underline-offset-2">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-white/80 hover:text-white underline underline-offset-2"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">
          Madeleg — Mario Romuald Dos Santos, entrepreneur individuel. SIRET 814 537 684 00056 — RCS Nantes.
          Mandataire d&apos;intermédiaire en opérations de banque et services de paiement (MIOBSP) et mandataire
          d&apos;intermédiaire d&apos;assurance (MIA), sous mandat FINSPOT (SIREN 825 077 886). N° ORIAS 20004713,
          vérifiable sur{" "}
          <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="underline text-white/85 hover:text-white">
            orias.fr
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
