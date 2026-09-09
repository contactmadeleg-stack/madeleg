import type { ComponentType } from "react";
import type { MetaArticle } from "./types";

export type ModuleArticle = {
  meta: MetaArticle;
  default: ComponentType;
};

// Registre du silo /assurance-emprunteur/[slug]/.
// Vide au lancement (aucun article encore écrit — voir spec, processus de
// contenu : veille → brouillon → apport personnel obligatoire → validation
// manuelle). Chaque futur article s'ajoute ici, ex. :
//   "resilier-assurance-emprunteur-banque-sans-frais": () =>
//     import("./articles/resilier-assurance-emprunteur-banque-sans-frais"),
export const registreArticles: Record<string, () => Promise<ModuleArticle>> = {};

export function slugsArticles(): string[] {
  return Object.keys(registreArticles);
}
