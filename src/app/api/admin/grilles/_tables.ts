// Liste blanche des tables de grilles accessibles via l'API admin — le
// segment d'URL [table] ne doit jamais être interpolé tel quel dans une
// requête Supabase (le client JS échappe déjà les valeurs, mais le nom de
// table lui-même passe par .from(), donc autant fermer la porte au niveau
// route plutôt que de faire confiance à l'appelant).
export const TABLES_GRILLES = {
  banque: "grille_taux_banque_moyen",
  delegation: "grille_taux_delegation",
} as const;

export type CleTableGrille = keyof typeof TABLES_GRILLES;

export function resoudreTableGrille(cle: string): string | null {
  return cle in TABLES_GRILLES ? TABLES_GRILLES[cle as CleTableGrille] : null;
}
