"use client";

import { useState } from "react";

export type Simulation = {
  id: string;
  created_at: string;
  prenom: string | null;
  nom: string | null;
  email: string | null;
  mobile: string | null;
  banque_selectionnee: string | null;
  economie_affichee: number;
  ages_emprunteurs: number[];
  capital: number;
  statut_dossier: string;
  notes_internes: string | null;
  ppa: number;
  frais_distribution: number;
};

const ETAPES: { valeur: string; label: string }[] = [
  { valeur: "a_joindre", label: "À joindre" },
  { valeur: "en_cours", label: "En cours" },
  { valeur: "gagne", label: "Gagné" },
  { valeur: "perdu", label: "Perdu" },
];

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function dateFr(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

export default function FicheClient({
  simulation,
  onFermer,
  onMisAJour,
}: {
  simulation: Simulation;
  onFermer: () => void;
  onMisAJour: (patch: Partial<Simulation>) => void;
}) {
  const [statut, setStatut] = useState(simulation.statut_dossier);
  const [statutEnCours, setStatutEnCours] = useState(false);

  const [ppa, setPpa] = useState(simulation.ppa);
  const [fraisDistribution, setFraisDistribution] = useState(simulation.frais_distribution);
  const [notes, setNotes] = useState(simulation.notes_internes ?? "");
  const [enregistre, setEnregistre] = useState({
    ppa: simulation.ppa,
    frais_distribution: simulation.frais_distribution,
    notes: simulation.notes_internes ?? "",
  });
  const [enCours, setEnCours] = useState(false);
  const [statutSauvegarde, setStatutSauvegarde] = useState<"idle" | "ok" | "erreur">("idle");
  const [erreur, setErreur] = useState<string | null>(null);

  const modifie = ppa !== enregistre.ppa || fraisDistribution !== enregistre.frais_distribution || notes !== enregistre.notes;

  async function changerStatut(nouveauStatut: string) {
    const precedent = statut;
    setStatut(nouveauStatut);
    setStatutEnCours(true);
    try {
      const res = await fetch(`/api/admin/simulations/${simulation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut_dossier: nouveauStatut }),
      });
      if (!res.ok) {
        setStatut(precedent);
        setStatutSauvegarde("erreur");
        return;
      }
      onMisAJour({ statut_dossier: nouveauStatut });
      setStatutSauvegarde("ok");
      setTimeout(() => setStatutSauvegarde("idle"), 1500);
    } catch {
      setStatut(precedent);
      setStatutSauvegarde("erreur");
    } finally {
      setStatutEnCours(false);
    }
  }

  async function enregistrer() {
    setEnCours(true);
    setErreur(null);
    try {
      const res = await fetch(`/api/admin/simulations/${simulation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ppa, frais_distribution: fraisDistribution, notes_internes: notes }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreur(data?.error ?? "Échec de l'enregistrement.");
        return;
      }
      setEnregistre({ ppa, frais_distribution: fraisDistribution, notes });
      onMisAJour({ ppa, frais_distribution: fraisDistribution, notes_internes: notes });
    } catch {
      setErreur("Connexion impossible. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div
      className="mdl-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onFermer();
      }}
    >
      <div className="mdl-dialog" style={{ maxWidth: "640px" }}>
        <div className="mdl-dialog__head">
          <div>
            <p className="mdl-dialog__title">
              {simulation.prenom} {simulation.nom}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Simulation du {dateFr(simulation.created_at)}
            </p>
          </div>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--surface-sunken)]"
            style={{ color: "var(--text-muted)" }}
          >
            ✕
          </button>
        </div>

        <div className="mdl-dialog__body space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Étape kanban */}
          <div>
            <span className="mdl-overline block mb-2">Étape</span>
            <div className="flex flex-wrap gap-2">
              {ETAPES.map((e) => (
                <button
                  key={e.valeur}
                  type="button"
                  onClick={() => changerStatut(e.valeur)}
                  disabled={statutEnCours}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors disabled:opacity-60"
                  style={
                    statut === e.valeur
                      ? { borderColor: "var(--emerald-500)", background: "var(--emerald-50)", color: "var(--emerald-700)" }
                      : { borderColor: "var(--border-default)", color: "var(--text-muted)" }
                  }
                >
                  {e.label}
                </button>
              ))}
              {statutSauvegarde === "ok" && (
                <span className="text-xs self-center" style={{ color: "var(--emerald-600)" }}>
                  ✓ Enregistré
                </span>
              )}
              {statutSauvegarde === "erreur" && <span className="text-xs self-center text-red-700">Échec, réessayez</span>}
            </div>
          </div>

          {/* Résumé de la simulation */}
          <div>
            <span className="mdl-overline block mb-2">Simulation</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <p>
                <span style={{ color: "var(--text-muted)" }}>Email : </span>
                <span className="font-medium">{simulation.email}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Mobile : </span>
                <span className="font-medium">{simulation.mobile}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Banque actuelle : </span>
                <span className="font-medium">{simulation.banque_selectionnee || "Non renseignée"}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Âge(s) : </span>
                <span className="font-medium">{(simulation.ages_emprunteurs ?? []).join(", ")}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Capital : </span>
                <span className="font-medium">{euros(simulation.capital)}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Économie estimée : </span>
                <span className="font-bold" style={{ color: "var(--amber-500)" }}>
                  {euros(simulation.economie_affichee)}
                </span>
              </p>
            </div>
          </div>

          {/* CA généré */}
          <div>
            <span className="mdl-overline block mb-2">CA généré</span>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                  PPA (€)
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={ppa}
                  onChange={(e) => setPpa(Number(e.target.value))}
                  className="champ-saisie"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                  Frais de distribution (€)
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={fraisDistribution}
                  onChange={(e) => setFraisDistribution(Number(e.target.value))}
                  className="champ-saisie"
                />
              </label>
            </div>
            <p className="text-sm mt-2">
              <span style={{ color: "var(--text-muted)" }}>Total : </span>
              <span className="font-bold" style={{ color: "var(--emerald-600)" }}>
                {euros(ppa + fraisDistribution)}
              </span>
            </p>
          </div>

          {/* Notes */}
          <div>
            <span className="mdl-overline block mb-2">Notes internes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Notes sur ce dossier…"
              className="champ-saisie resize-y"
            />
          </div>
        </div>

        <div className="mdl-dialog__foot items-center">
          {erreur && <span className="text-sm text-red-700 mr-auto">{erreur}</span>}
          <button type="button" onClick={onFermer} className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Fermer
          </button>
          <button
            type="button"
            onClick={enregistrer}
            disabled={!modifie || enCours}
            className="mdl-btn mdl-btn--primary mdl-btn--md disabled:opacity-50"
          >
            {enCours ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
