"use client";

import type { Simulation } from "./FicheClient";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export default function KanbanCard({
  simulation,
  onClick,
  onDragStart,
  enTrain,
}: {
  simulation: Simulation;
  onClick: () => void;
  onDragStart: (id: string) => void;
  enTrain: boolean;
}) {
  const ca = simulation.ppa + simulation.frais_distribution;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", simulation.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(simulation.id);
      }}
      onClick={onClick}
      className="mdl-card mdl-card--interactive mdl-card__pad--sm cursor-grab active:cursor-grabbing select-none"
      style={{ opacity: enTrain ? 0.4 : 1 }}
    >
      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-strong)" }}>
        {simulation.prenom} {simulation.nom}
      </p>
      <p className="text-sm font-bold mt-1" style={{ color: ca > 0 ? "var(--emerald-600)" : "var(--text-subtle)" }}>
        {euros(ca)}
      </p>
    </div>
  );
}
