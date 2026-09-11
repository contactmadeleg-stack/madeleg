"use client";

import { useState } from "react";

export default function CoefficientDecote({ valeurInitiale }: { valeurInitiale: number }) {
  const [pourcentage, setPourcentage] = useState(Math.round(valeurInitiale * 100));
  const [enregistre, setEnregistre] = useState(Math.round(valeurInitiale * 100));
  const [enCours, setEnCours] = useState(false);
  const [statut, setStatut] = useState<"idle" | "ok" | "erreur">("idle");
  const [messageErreur, setMessageErreur] = useState<string | null>(null);

  const modifie = pourcentage !== enregistre;

  async function enregistrer() {
    setEnCours(true);
    setStatut("idle");
    setMessageErreur(null);

    try {
      const res = await fetch("/api/admin/parametres-simulation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coefficientDecote: pourcentage / 100 }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatut("erreur");
        setMessageErreur(data?.error ?? "Échec de l'enregistrement.");
        return;
      }

      setEnregistre(pourcentage);
      setStatut("ok");
    } catch {
      setStatut("erreur");
      setMessageErreur("Connexion impossible. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div className="mdl-card mdl-card__pad">
      <h2 className="text-lg font-bold mb-1">Coefficient de décote</h2>
      <p className="text-sm text-[var(--color-texte-doux)] mb-4">
        Marge de sécurité appliquée à l&apos;économie brute avant affichage au visiteur. Actuellement 75&nbsp;% de
        l&apos;économie brute calculée est affichée.
      </p>

      <div className="flex items-end gap-3 flex-wrap">
        <label className="block">
          <span className="block text-sm font-medium mb-1.5">Économie affichée (% de l&apos;économie brute)</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={100}
              value={pourcentage}
              onChange={(e) => {
                setPourcentage(Number(e.target.value));
                setStatut("idle");
              }}
              className="champ-saisie w-28"
            />
            <span className="text-sm font-medium">%</span>
          </div>
        </label>

        <button
          type="button"
          onClick={enregistrer}
          disabled={!modifie || enCours}
          className="mdl-btn mdl-btn--primary mdl-btn--md disabled:opacity-50"
        >
          {enCours ? "Enregistrement…" : "Enregistrer"}
        </button>

        {statut === "ok" && !modifie && (
          <span className="text-sm font-medium" style={{ color: "var(--emerald-600)" }}>
            ✓ Enregistré
          </span>
        )}
        {statut === "erreur" && <span className="text-sm text-red-700">{messageErreur}</span>}
      </div>
    </div>
  );
}
