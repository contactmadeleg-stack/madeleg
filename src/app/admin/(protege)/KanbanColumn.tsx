"use client";

import { useState } from "react";
import KanbanCard from "./KanbanCard";
import type { Simulation } from "./FicheClient";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export default function KanbanColumn({
  label,
  statutKey,
  simulations,
  carteEnDeplacement,
  onDragStartCarte,
  onDropCarte,
  onCardClick,
}: {
  label: string;
  statutKey: string;
  simulations: Simulation[];
  carteEnDeplacement: string | null;
  onDragStartCarte: (id: string) => void;
  onDropCarte: (id: string, nouveauStatut: string) => void;
  onCardClick: (id: string) => void;
}) {
  const [survole, setSurvole] = useState(false);
  const ca = simulations.reduce((s, x) => s + x.ppa + x.frais_distribution, 0);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!survole) setSurvole(true);
      }}
      onDragLeave={() => setSurvole(false)}
      onDrop={(e) => {
        e.preventDefault();
        setSurvole(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropCarte(id, statutKey);
      }}
      className="flex-1 min-w-[17rem] rounded-xl p-3 transition-colors"
      style={{
        background: survole ? "var(--emerald-50)" : "var(--surface-sunken)",
        outline: survole ? "2px dashed var(--emerald-400)" : "2px dashed transparent",
        outlineOffset: "-2px",
      }}
    >
      <div className="mb-3 px-1">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
        <p className="font-titres text-xl font-extrabold mt-0.5" style={{ color: "var(--text-strong)" }}>
          {euros(ca)}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>
          {simulations.length} dossier{simulations.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-2 min-h-[3rem]">
        {simulations.map((s) => (
          <KanbanCard
            key={s.id}
            simulation={s}
            onClick={() => onCardClick(s.id)}
            onDragStart={onDragStartCarte}
            enTrain={carteEnDeplacement === s.id}
          />
        ))}
      </div>
    </div>
  );
}
