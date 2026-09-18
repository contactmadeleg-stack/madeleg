"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function ErreurSimulation({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[calc(100vh-1px)] flex flex-col">
      <div className="mx-auto max-w-3xl w-full px-4 pt-8 pb-4">
        <Link href="/" className="inline-block no-underline">
          <Logo size={22} tone="ink" />
        </Link>
      </div>

      <div className="mx-auto max-w-3xl w-full px-4 pb-16 flex-1 flex flex-col items-center justify-center text-center gap-4">
        <p style={{ color: "var(--text-muted)" }}>Le simulateur est momentanément indisponible. Réessayez dans un instant.</p>
        <button type="button" onClick={reset} className="mdl-btn mdl-btn--primary mdl-btn--md">
          Réessayer
        </button>
      </div>
    </div>
  );
}
