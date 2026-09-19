import type { ComponentType } from "react";
import type { MetaArticle } from "./types";

export type ModuleArticle = {
  meta: MetaArticle;
  default: ComponentType;
};

// Registre du silo /articles/[slug]/, distinct de /assurance-emprunteur/
// (pages guides evergreen), meme separation que Pretto entre /guide/ et
// /media/. Vide au lancement (aucun article encore ecrit, voir spec,
// processus de contenu : veille, brouillon, apport personnel obligatoire,
// validation manuelle). Chaque futur article s'ajoute ici, ex. :
//   "resilier-assurance-emprunteur-banque-sans-frais": () =>
//     import("./articles/resilier-assurance-emprunteur-banque-sans-frais"),
export const registreArticles: Record<string, () => Promise<ModuleArticle>> = {};

export function slugsArticles(): string[] {
  return Object.keys(registreArticles);
}
