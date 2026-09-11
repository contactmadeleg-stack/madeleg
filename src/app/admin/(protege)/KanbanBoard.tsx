"use client";

import { useMemo, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import FicheClient, { type Simulation } from "./FicheClient";
import { IconeRecherche } from "./AdminIcones";

const ETAPES: { valeur: string; label: string }[] = [
  { valeur: "a_joindre", label: "À joindre" },
  { valeur: "en_cours", label: "En cours" },
  { valeur: "gagne", label: "Gagné" },
  { valeur: "perdu", label: "Perdu" },
];

export default function KanbanBoard({ simulationsInitiales }: { simulationsInitiales: Simulation[] }) {
  const [simulations, setSimulations] = useState(simulationsInitiales);
  const [recherche, setRecherche] = useState("");
  const [carteEnDeplacement, setCarteEnDeplacement] = useState<string | null>(null);
  const [ficheOuverteId, setFicheOuverteId] = useState<string | null>(null);
  const [erreurDeplacement, setErreurDeplacement] = useState<string | null>(null);

  const resultats = useMemo(() => {
    const requete = recherche.trim().toLowerCase();
    if (!requete) return simulations;
    return simulations.filter((s) =>
      `${s.prenom ?? ""} ${s.nom ?? ""} ${s.email ?? ""} ${s.banque_selectionnee ?? ""}`.toLowerCase().includes(requete)
    );
  }, [simulations, recherche]);

  async function deplacerCarte(id: string, nouveauStatut: string) {
    setCarteEnDeplacement(null);
    const simulation = simulations.find((s) => s.id === id);
    if (!simulation || simulation.statut_dossier === nouveauStatut) return;

    const precedent = simulation.statut_dossier;
    setSimulations((prec) => prec.map((s) => (s.id === id ? { ...s, statut_dossier: nouveauStatut } : s)));
    setErreurDeplacement(null);

    try {
      const res = await fetch(`/api/admin/simulations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut_dossier: nouveauStatut }),
      });
      if (!res.ok) {
        setSimulations((prec) => prec.map((s) => (s.id === id ? { ...s, statut_dossier: precedent } : s)));
        setErreurDeplacement("Échec du déplacement du dossier. Réessayez.");
      }
    } catch {
      setSimulations((prec) => prec.map((s) => (s.id === id ? { ...s, statut_dossier: precedent } : s)));
      setErreurDeplacement("Connexion impossible. Réessayez.");
    }
  }

  function mettreAJourSimulation(id: string, patch: Partial<Simulation>) {
    setSimulations((prec) => prec.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  const ficheOuverte = simulations.find((s) => s.id === ficheOuverteId) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="mdl-input max-w-sm flex-1 min-w-[14rem]">
          <IconeRecherche className="w-4 h-4 shrink-0 text-[var(--text-subtle)]" />
          <input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un nom, un email, une banque…"
            className="mdl-input__control"
          />
        </div>
        {erreurDeplacement && <span className="text-sm text-red-700">{erreurDeplacement}</span>}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {ETAPES.map((etape) => (
          <KanbanColumn
            key={etape.valeur}
            label={etape.label}
            statutKey={etape.valeur}
            simulations={resultats.filter((s) => s.statut_dossier === etape.valeur)}
            carteEnDeplacement={carteEnDeplacement}
            onDragStartCarte={setCarteEnDeplacement}
            onDropCarte={deplacerCarte}
            onCardClick={setFicheOuverteId}
          />
        ))}
      </div>

      {ficheOuverte && (
        <FicheClient
          simulation={ficheOuverte}
          onFermer={() => setFicheOuverteId(null)}
          onMisAJour={(patch) => mettreAJourSimulation(ficheOuverte.id, patch)}
        />
      )}
    </div>
  );
}
