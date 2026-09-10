"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-fond)" }}>
      <div className="carte-madeleg p-8 w-full max-w-sm">
        <p className="font-titres text-xl font-bold text-center mb-1">
          <span style={{ color: "var(--color-texte)" }}>ma</span>
          <span style={{ color: "var(--color-ambre)" }}>deleg</span>
        </p>
        <p className="text-center text-sm text-[var(--color-texte-doux)] mb-6">Console admin</p>

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
            className="btn-madeleg w-full px-6 py-2.5 bg-[var(--color-marque)] text-white hover:bg-[var(--color-marque-clair)] disabled:opacity-60"
          >
            {envoiEnCours ? "Connexion…" : "Se connecter"}
          </button>
          {erreur && <p className="text-sm text-red-700 text-center">{erreur}</p>}
        </form>
      </div>
    </div>
  );
}
