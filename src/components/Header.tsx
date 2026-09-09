import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-bordure)] bg-[var(--color-fond-carte)]">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-[var(--color-texte)]">
          Madeleg
        </Link>
        <p className="hidden sm:block text-sm text-[var(--color-texte-doux)]">
          Simulation gratuite, sans engagement
        </p>
      </div>
    </header>
  );
}
