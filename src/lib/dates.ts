// Formatte une date de derniere mise a jour figee dans le code (voir DATE_MISE_A_JOUR
// en tete de chaque page). Ne jamais utiliser new Date() pour cet affichage : la date
// doit refleter la derniere modification reelle du contenu, pas le moment du rendu.
export function formatDateMiseAJour(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
}
