"use client";

import { useMemo, useState } from "react";
import LigneBanque from "./LigneBanque";
import { IconeRecherche } from "../AdminIcones";

type Banque = {
  id: string;
  nom: string;
  actif: boolean;
  ordre: number;
  logoUrl: string | null;
};

export default function BanquesTable({ banques }: { banques: Banque[] }) {
  const [recherche, setRecherche] = useState("");

  const resultats = useMemo(() => {
    const requete = recherche.trim().toLowerCase();
    if (!requete) return banques;
    return banques.filter((b) => b.nom.toLowerCase().includes(requete));
  }, [banques, recherche]);

  return (
    <div>
      <div className="mdl-input max-w-sm mb-5">
        <IconeRecherche className="w-4 h-4 shrink-0 text-[var(--text-subtle)]" />
        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher une banque…"
          className="mdl-input__control"
        />
      </div>

      <div className="mdl-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left" style={{ borderColor: "var(--border-subtle)" }}>
              <th className="py-3 pl-6 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>
                Logo
              </th>
              <th className="py-3 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>
                Nom
              </th>
              <th className="py-3 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>
                Ordre
              </th>
              <th className="py-3 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>
                Statut
              </th>
              <th className="py-3 pr-6" />
            </tr>
          </thead>
          <tbody>
            {resultats.map((b) => (
              <LigneBanque
                key={b.id}
                id={b.id}
                nomInitial={b.nom}
                logoUrlInitiale={b.logoUrl}
                actifInitial={b.actif}
                ordreInitial={b.ordre}
              />
            ))}
          </tbody>
        </table>

        {resultats.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: "var(--text-muted)" }}>
            Aucune banque ne correspond à cette recherche.
          </p>
        )}
      </div>
    </div>
  );
}
