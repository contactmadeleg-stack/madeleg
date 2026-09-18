"use client";

export default function ErreurAccueil({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 flex flex-col items-center justify-center text-center gap-4">
      <p style={{ color: "var(--text-muted)" }}>Le simulateur est momentanément indisponible. Réessayez dans un instant.</p>
      <button type="button" onClick={reset} className="mdl-btn mdl-btn--primary mdl-btn--md">
        Réessayer
      </button>
    </div>
  );
}
