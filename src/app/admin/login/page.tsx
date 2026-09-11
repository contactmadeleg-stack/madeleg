"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function PageLoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoiEnCours(true);
    setErreur(null);

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });

    setEnvoiEnCours(false);
    if (error) {
      setErreur("Email ou mot de passe incorrect.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--surface-sunken)" }}>
      <div className="mdl-card mdl-card__pad w-full max-w-sm">
        <div className="flex justify-center mb-1">
          <Logo size={22} tone="ink" />
        </div>
        <p className="text-center text-sm mb-6" style={{ color: "var(--text-muted)" }}>Console admin</p>

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
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Mot de passe</span>
            <input
              type="password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="champ-saisie"
            />
          </label>
          <button
            type="submit"
            disabled={envoiEnCours}
            className="mdl-btn mdl-btn--primary mdl-btn--md mdl-btn--block disabled:opacity-60"
          >
            {envoiEnCours ? "Connexion…" : "Se connecter"}
          </button>
          {erreur && <p className="text-sm text-red-700 text-center">{erreur}</p>}
        </form>
      </div>
    </div>
  );
}
