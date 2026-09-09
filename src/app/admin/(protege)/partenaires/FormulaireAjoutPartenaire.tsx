"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function FormulaireAjoutPartenaire() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoiEnCours(true);
    await fetch("/api/admin/partenaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom }),
    });
    setEnvoiEnCours(false);
    setNom("");
    router.refresh();
  }

  return (
    <form onSubmit={soumettre} className="flex gap-2 mb-6">
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
        placeholder="Nom de l'assureur partenaire"
        className="champ-saisie flex-1"
      />
      <button
        type="submit"
        disabled={envoiEnCours}
        className="btn-madeleg px-5 py-2 bg-[var(--color-marque)] text-white shrink-0 disabled:opacity-60"
      >
        Ajouter
      </button>
    </form>
  );
}
