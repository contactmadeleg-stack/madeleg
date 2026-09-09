import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-bordure)] bg-[var(--color-fond-carte)] mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-[var(--color-texte-doux)] space-y-3">
        <p>
          Madeleg — Mario Romuald Dos Santos, entrepreneur individuel. SIRET 814 537 684 00056 — RCS Nantes.
          Mandataire d&apos;intermédiaire en opérations de banque et services de paiement (MIOBSP) et mandataire
          d&apos;intermédiaire d&apos;assurance (MIA), sous mandat FINSPOT (SIREN 825 077 886). N° ORIAS 20004713,
          vérifiable sur{" "}
          <a
            href="https://www.orias.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--color-texte)]"
          >
            orias.fr
          </a>
          .
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/mentions-legales" className="underline hover:text-[var(--color-texte)]">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="underline hover:text-[var(--color-texte)]">
            Politique de confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}
