import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-bordure)] bg-[var(--color-fond-carte)]">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-titres text-2xl font-bold tracking-tight">
          <span style={{ color: "var(--color-texte)" }}>ma</span>
          <span style={{ color: "var(--color-ambre)" }}>deleg</span>
        </Link>
        <a
          href="https://www.orias.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[var(--color-marque)] bg-[var(--color-sauge-clair)] rounded-full px-3 py-1.5 hover:opacity-80"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" fill="var(--color-marque)" />
          </svg>
          ORIAS 20004713
        </a>
      </div>
    </header>
  );
}
