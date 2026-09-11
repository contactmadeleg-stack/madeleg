"use client";

import { useMemo, useState } from "react";
import LigneSimulation from "./LigneSimulation";
import { IconeRecherche } from "./AdminIcones";

const LABELS_STATUT: Record<string, string> = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  dossier_en_cours: "Dossier en cours",
  gagne: "Gagné",
  perdu: "Perdu",
};

type Simulation = {
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
};

type Tri = "recent" | "ancien" | "economie_desc" | "economie_asc";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function dateFr(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

export default function DossiersTable({ simulations }: { simulations: Simulation[] }) {
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [tri, setTri] = useState<Tri>("recent");

  const resultats = useMemo(() => {
    const requete = recherche.trim().toLowerCase();

    let filtres = simulations.filter((s) => {
      if (filtreStatut !== "tous" && s.statut_dossier !== filtreStatut) return false;
      if (!requete) return true;
      const cible = `${s.prenom ?? ""} ${s.nom ?? ""} ${s.email ?? ""} ${s.banque_selectionnee ?? ""}`.toLowerCase();
      return cible.includes(requete);
    });

    filtres = [...filtres].sort((a, b) => {
      switch (tri) {
        case "ancien":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "economie_desc":
          return b.economie_affichee - a.economie_affichee;
        case "economie_asc":
          return a.economie_affichee - b.economie_affichee;
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtres;
  }, [simulations, recherche, filtreStatut, tri]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="mdl-input flex-1 min-w-[14rem]">
          <IconeRecherche className="w-4 h-4 shrink-0 text-[var(--text-subtle)]" />
          <input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un nom, un email, une banque…"
            className="mdl-input__control"
          />
        </div>

        <div className="mdl-select w-full sm:w-52">
          <select
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
            className="mdl-select__control"
          >
            <option value="tous">Tous les statuts</option>
            {Object.entries(LABELS_STATUT).map(([valeur, label]) => (
              <option key={valeur} value={valeur}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mdl-select w-full sm:w-48">
          <select value={tri} onChange={(e) => setTri(e.target.value as Tri)} className="mdl-select__control">
            <option value="recent">Plus récent</option>
            <option value="ancien">Plus ancien</option>
            <option value="economie_desc">Économie décroissante</option>
            <option value="economie_asc">Économie croissante</option>
          </select>
        </div>

        <p className="text-sm shrink-0" style={{ color: "var(--text-muted)" }}>
          {resultats.length} sur {simulations.length}
        </p>
      </div>

      {resultats.length === 0 && (
        <p className="text-sm py-8 text-center" style={{ color: "var(--text-muted)" }}>
          Aucun dossier ne correspond à cette recherche.
        </p>
      )}

      <div className="space-y-4">
        {resultats.map((s) => (
          <div key={s.id} className="mdl-card mdl-card__pad grid lg:grid-cols-[1.3fr_1fr_1fr] gap-5">
            <div>
              <p className="font-titres font-bold">
                {s.prenom} {s.nom}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {s.email}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {s.mobile}
              </p>
              <p className="text-xs mt-2" style={{ color: "var(--text-subtle)" }}>
                {dateFr(s.created_at)}
              </p>
            </div>

            <div className="text-sm space-y-1">
              <p>
                <span style={{ color: "var(--text-muted)" }}>Banque : </span>
                <span className="font-medium">{s.banque_selectionnee || "Non renseignée"}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Capital : </span>
                <span className="font-medium">{euros(s.capital)}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Âge(s) : </span>
                <span className="font-medium">{(s.ages_emprunteurs ?? []).join(", ")}</span>
              </p>
              <p>
                <span style={{ color: "var(--text-muted)" }}>Économie estimée : </span>
                <span className="font-bold" style={{ color: "var(--amber-500)" }}>
                  {euros(s.economie_affichee)}
                </span>
              </p>
            </div>

            <LigneSimulation id={s.id} statutInitial={s.statut_dossier} notesInitiales={s.notes_internes} />
          </div>
        ))}
      </div>
    </div>
  );
}
