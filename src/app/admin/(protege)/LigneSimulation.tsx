"use client";

import { useState } from "react";

const LABELS_STATUT: Record<string, string> = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  dossier_en_cours: "Dossier en cours",
  gagne: "Gagné",
  perdu: "Perdu",
};

const COULEURS_STATUT: Record<string, string> = {
  nouveau: "var(--color-ambre)",
  contacte: "var(--color-marque)",
  dossier_en_cours: "var(--color-marque)",
  gagne: "var(--color-sauge)",
  perdu: "#b3413e",
};

export default function LigneSimulation({
  id,
  statutInitial,
  notesInitiales,
}: {
  id: string;
  statutInitial: string;
  notesInitiales: string | null;
}) {
  const [statut, setStatut] = useState(statutInitial);
  const [notes, setNotes] = useState(notesInitiales ?? "");
  const [enregistrement, setEnregistrement] = useState<"idle" | "cours" | "fait">("idle");

  async function sauvegarder(patch: Record<string, string>) {
    setEnregistrement("cours");
    const res = await fetch(`/api/admin/simulations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setEnregistrement(res.ok ? "fait" : "idle");
    if (res.ok) setTimeout(() => setEnregistrement("idle"), 1500);
  }

  return (
    <div className="grid gap-2">
      <select
        value={statut}
        onChange={(e) => {
          setStatut(e.target.value);
          sauvegarder({ statut_dossier: e.target.value });
        }}
        className="champ-saisie !py-1.5 text-sm font-semibold"
        style={{ color: COULEURS_STATUT[statut] }}
      >
        {Object.entries(LABELS_STATUT).map(([valeur, label]) => (
          <option key={valeur} value={valeur}>
            {label}
          </option>
        ))}
      </select>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={() => sauvegarder({ notes_internes: notes })}
        placeholder="Notes internes…"
        rows={2}
        className="champ-saisie text-sm resize-y"
      />
      {enregistrement !== "idle" && (
        <span className="text-xs text-[var(--color-texte-doux)]">
          {enregistrement === "cours" ? "Enregistrement…" : "Enregistré ✓"}
        </span>
      )}
    </div>
  );
}
