"use client";

import { useState } from "react";

type Palier = {
  id: string;
  age_min: number;
  age_max: number;
  taux_annuel: number;
  actif: boolean;
};

function LignePalier({
  table,
  palier,
  onSupprime,
}: {
  table: "banque" | "delegation";
  palier: Palier;
  onSupprime: (id: string) => void;
}) {
  const [ageMin, setAgeMin] = useState(palier.age_min);
  const [ageMax, setAgeMax] = useState(palier.age_max);
  // Le taux est stocké en décimal (0.004) mais édité en pourcentage (0.40) —
  // plus lisible et moins sujet à erreur de frappe qu'un décimal à 3-4
  // chiffres après la virgule.
  const [tauxPourcent, setTauxPourcent] = useState(palier.taux_annuel * 100);
  const [actif, setActif] = useState(palier.actif);
  const [enregistre, setEnregistre] = useState({ ageMin, ageMax, tauxPourcent, actif });
  const [enCours, setEnCours] = useState(false);
  const [suppressionEnCours, setSuppressionEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const modifie =
    ageMin !== enregistre.ageMin || ageMax !== enregistre.ageMax || tauxPourcent !== enregistre.tauxPourcent;

  async function enregistrer() {
    setEnCours(true);
    setErreur(null);
    try {
      const res = await fetch(`/api/admin/grilles/${table}/${palier.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ageMin, ageMax, tauxAnnuel: tauxPourcent / 100 }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreur(data?.error ?? "Échec de l'enregistrement.");
        return;
      }
      setEnregistre({ ageMin, ageMax, tauxPourcent, actif });
    } catch {
      setErreur("Connexion impossible. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  async function basculerActif() {
    const nouvelActif = !actif;
    setActif(nouvelActif);
    setErreur(null);
    try {
      const res = await fetch(`/api/admin/grilles/${table}/${palier.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actif: nouvelActif }),
      });
      if (!res.ok) {
        setActif(!nouvelActif);
        setErreur("Échec de la mise à jour.");
      }
    } catch {
      setActif(!nouvelActif);
      setErreur("Connexion impossible.");
    }
  }

  async function supprimer() {
    if (!confirm(`Supprimer le palier ${ageMin}-${ageMax} ans ?`)) return;
    setSuppressionEnCours(true);
    setErreur(null);
    try {
      const res = await fetch(`/api/admin/grilles/${table}/${palier.id}`, { method: "DELETE" });
      if (!res.ok) {
        setErreur("Échec de la suppression.");
        setSuppressionEnCours(false);
        return;
      }
      onSupprime(palier.id);
    } catch {
      setErreur("Connexion impossible.");
      setSuppressionEnCours(false);
    }
  }

  return (
    <div className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="flex items-center gap-1.5 text-sm">
        <input
          type="number"
          value={ageMin}
          onChange={(e) => setAgeMin(Number(e.target.value))}
          className="champ-saisie !py-1.5 w-16 text-center"
          aria-label="Âge minimum"
        />
        <span className="text-[var(--color-texte-doux)]">–</span>
        <input
          type="number"
          value={ageMax}
          onChange={(e) => setAgeMax(Number(e.target.value))}
          className="champ-saisie !py-1.5 w-16 text-center"
          aria-label="Âge maximum"
        />
        <span className="text-xs text-[var(--color-texte-doux)] ml-1">ans</span>
      </div>

      <div className="flex items-center gap-1.5 text-sm">
        <input
          type="number"
          step="0.01"
          value={tauxPourcent}
          onChange={(e) => setTauxPourcent(Number(e.target.value))}
          className="champ-saisie !py-1.5 w-20 text-center"
          aria-label="Taux annuel en pourcentage"
        />
        <span className="text-xs text-[var(--color-texte-doux)]">% / an</span>
      </div>

      <button
        type="button"
        onClick={basculerActif}
        className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${
          actif
            ? "border-[var(--color-sauge)] bg-[var(--color-sauge-clair)] text-[var(--color-marque)]"
            : "border-[var(--color-bordure)] text-[var(--color-texte-doux)]"
        }`}
      >
        {actif ? "Actif" : "Masqué"}
      </button>

      <div className="flex-1" />

      {erreur && <span className="text-xs text-red-700">{erreur}</span>}

      <button
        type="button"
        onClick={enregistrer}
        disabled={!modifie || enCours}
        className="mdl-btn mdl-btn--primary mdl-btn--sm disabled:opacity-50"
      >
        {enCours ? "…" : "Enregistrer"}
      </button>

      <button
        type="button"
        onClick={supprimer}
        disabled={suppressionEnCours}
        className="shrink-0 text-xs font-semibold text-red-700 hover:underline disabled:opacity-50"
      >
        Supprimer
      </button>
    </div>
  );
}

export default function GrilleEditable({
  table,
  paliersInitiaux,
}: {
  table: "banque" | "delegation";
  paliersInitiaux: Palier[];
}) {
  const [paliers, setPaliers] = useState(paliersInitiaux);
  const [ajoutOuvert, setAjoutOuvert] = useState(false);
  const [nouvelAgeMin, setNouvelAgeMin] = useState("");
  const [nouvelAgeMax, setNouvelAgeMax] = useState("");
  const [nouveauTaux, setNouveauTaux] = useState("");
  const [ajoutEnCours, setAjoutEnCours] = useState(false);
  const [erreurAjout, setErreurAjout] = useState<string | null>(null);

  async function ajouterPalier() {
    setAjoutEnCours(true);
    setErreurAjout(null);
    try {
      const res = await fetch(`/api/admin/grilles/${table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ageMin: Number(nouvelAgeMin),
          ageMax: Number(nouvelAgeMax),
          tauxAnnuel: Number(nouveauTaux) / 100,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreurAjout(data?.error ?? "Échec de l'ajout.");
        return;
      }
      setPaliers((prec) => [...prec, data.palier].sort((a, b) => a.age_min - b.age_min));
      setNouvelAgeMin("");
      setNouvelAgeMax("");
      setNouveauTaux("");
      setAjoutOuvert(false);
    } catch {
      setErreurAjout("Connexion impossible.");
    } finally {
      setAjoutEnCours(false);
    }
  }

  return (
    <div className="mdl-card mdl-card__pad">
      {paliers.length === 0 && (
        <p className="text-sm text-[var(--color-texte-doux)] py-3">Aucun palier configuré.</p>
      )}

      {paliers.map((p) => (
        <LignePalier
          key={p.id}
          table={table}
          palier={p}
          onSupprime={(id) => setPaliers((prec) => prec.filter((x) => x.id !== id))}
        />
      ))}

      {ajoutOuvert ? (
        <div className="flex items-end gap-3 flex-wrap pt-4">
          <label className="block">
            <span className="block text-xs font-medium mb-1">Âge min</span>
            <input
              type="number"
              value={nouvelAgeMin}
              onChange={(e) => setNouvelAgeMin(e.target.value)}
              className="champ-saisie !py-1.5 w-20"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium mb-1">Âge max</span>
            <input
              type="number"
              value={nouvelAgeMax}
              onChange={(e) => setNouvelAgeMax(e.target.value)}
              className="champ-saisie !py-1.5 w-20"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium mb-1">Taux annuel (%)</span>
            <input
              type="number"
              step="0.01"
              value={nouveauTaux}
              onChange={(e) => setNouveauTaux(e.target.value)}
              className="champ-saisie !py-1.5 w-24"
            />
          </label>
          <button
            type="button"
            onClick={ajouterPalier}
            disabled={ajoutEnCours || !nouvelAgeMin || !nouvelAgeMax || !nouveauTaux}
            className="mdl-btn mdl-btn--primary mdl-btn--sm disabled:opacity-50"
          >
            {ajoutEnCours ? "Ajout…" : "Ajouter"}
          </button>
          <button
            type="button"
            onClick={() => setAjoutOuvert(false)}
            className="text-sm font-medium text-[var(--color-texte-doux)]"
          >
            Annuler
          </button>
          {erreurAjout && <span className="text-xs text-red-700 w-full">{erreurAjout}</span>}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAjoutOuvert(true)}
          className="mt-4 text-sm font-semibold"
          style={{ color: "var(--emerald-600)" }}
        >
          + Ajouter un palier
        </button>
      )}
    </div>
  );
}
