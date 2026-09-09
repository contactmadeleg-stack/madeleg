"use client";

import { useState, FormEvent } from "react";

export default function PageLoginAdmin() {
  const [email, setEmail] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoiEnCours(true);
    await fetch("/api/admin/auth/request-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setEnvoiEnCours(false);
    setEnvoye(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-fond)" }}>
      <div className="carte-madeleg p-8 w-full max-w-sm">
        <p className="font-titres text-xl font-bold text-center mb-1">
          <span style={{ color: "var(--color-texte)" }}>ma</span>
          <span style={{ color: "var(--color-ambre)" }}>deleg</span>
        </p>
        <p className="text-center text-sm text-[var(--color-texte-doux)] mb-6">Console admin</p>

        {envoye ? (
          <p className="text-center text-sm text-[var(--color-texte)]">
            Si cette adresse est autorisée, un lien de connexion vient de vous être envoyé par email. Cliquez dessus
            pour accéder à la console.
          </p>
        ) : (
          <form onSubmit={soumettre} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                className="champ-saisie"
              />
            </label>
            <button
              type="submit"
              disabled={envoiEnCours}
              className="btn-madeleg w-full px-6 py-2.5 bg-[var(--color-marque)] text-white hover:bg-[var(--color-marque-clair)] disabled:opacity-60"
            >
              {envoiEnCours ? "Envoi…" : "Recevoir le lien de connexion"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
