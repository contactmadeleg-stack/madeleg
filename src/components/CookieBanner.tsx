"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "madeleg-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Lecture du consentement uniquement possible côté client (SSR n'a pas
    // accès à localStorage) : le bandeau ne peut donc s'afficher qu'après montage.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- dépend de localStorage, indisponible côté serveur
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // navigateur bloquant localStorage : on n'affiche pas le bandeau plutôt que de planter
    }
  }, []);

  function repondre(valeur: "accepte" | "refuse") {
    try {
      localStorage.setItem(CONSENT_KEY, valeur);
    } catch {
      // ignorer si localStorage indisponible
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-bordure)] bg-[var(--color-fond-carte)] shadow-[0_-2px_12px_rgba(26,39,64,0.08)]">
      <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-sm text-[var(--color-texte-doux)] flex-1">
          Ce site utilise des cookies de mesure d&apos;audience pour comprendre comment le simulateur est utilisé.
          Aucune donnée de simulation ou de coordonnées n&apos;est stockée dans un cookie. Voir notre{" "}
          <a href="/politique-de-confidentialite" className="underline hover:text-[var(--color-texte)]">
            politique de confidentialité
          </a>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => repondre("refuse")}
            className="px-4 py-2 text-sm rounded-md border border-[var(--color-bordure)] text-[var(--color-texte)] hover:bg-[var(--color-fond)]"
          >
            Refuser
          </button>
          <button
            onClick={() => repondre("accepte")}
            className="px-4 py-2 text-sm rounded-md bg-[var(--color-texte)] text-white hover:opacity-90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
