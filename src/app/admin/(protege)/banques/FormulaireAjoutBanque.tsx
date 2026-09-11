"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { IconePlus } from "../AdminIcones";

export default function FormulaireAjoutBanque() {
  const router = useRouter();
  const [ouvert, setOuvert] = useState(false);
  const [nom, setNom] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoiEnCours(true);
    setErreur(null);
    try {
      const res = await fetch("/api/admin/banques", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreur(data?.error ?? "Échec de l'ajout.");
        return;
      }
      setNom("");
      setOuvert(false);
      router.refresh();
    } catch {
      setErreur("Connexion impossible. Réessayez.");
    } finally {
      setEnvoiEnCours(false);
    }
  }

  if (!ouvert) {
    return (
      <button
        type="button"
        onClick={() => setOuvert(true)}
        className="mdl-btn mdl-btn--primary mdl-btn--md"
      >
        <IconePlus className="w-4 h-4" />
        Ajouter une banque
      </button>
    );
  }

  return (
    <form onSubmit={soumettre} className="flex items-start gap-2">
      <div>
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          autoFocus
          placeholder="Nom de la banque"
          className="champ-saisie"
        />
        {erreur && <p className="text-xs text-red-700 mt-1">{erreur}</p>}
      </div>
      <button
        type="submit"
        disabled={envoiEnCours}
        className="mdl-btn mdl-btn--primary mdl-btn--md shrink-0 disabled:opacity-60"
      >
        {envoiEnCours ? "Ajout…" : "Ajouter"}
      </button>
      <button
        type="button"
        onClick={() => {
          setOuvert(false);
          setErreur(null);
        }}
        className="text-sm font-medium px-2 py-2.5"
        style={{ color: "var(--text-muted)" }}
      >
        Annuler
      </button>
    </form>
  );
}
