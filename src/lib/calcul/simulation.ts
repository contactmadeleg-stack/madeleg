// Calcul simplifié de l'économie sur substitution d'assurance emprunteur
// (voir spec Madeleg — formule à une seule étape, marge de sécurité 25%).
//
// Prime banque annuelle = Capital × taux_banque_moyen(âge) — moyenne de
// plusieurs grilles banque par tranche d'âge, pas de lookup par banque
// précise ; ne baisse pas avec les années (assise sur le capital initial)
// CRD(n) = Capital × (durée_restante - n) / durée_restante   (amortissement linéaire)
// Prime délégation annuelle(n) = CRD(n) × taux_delegation
// Économie brute = somme sur les années n = 0..durée_restante-1 de
//                  (prime banque annuelle - prime délégation annuelle(n))
// Économie affichée = Économie brute × 0.75

export type PointAnnuel = {
  annee: number; // 1-indexé, année du prêt à partir de maintenant
  primeBanque: number;
  primeDelegation: number;
};

export type ResultatSimulation = {
  tauxBanqueMoyen: number;
  tauxDelegation: number;
  primeBanqueAnnuelle: number;
  primeDelegationAnnuelle: number; // première année
  economieBrute: number;
  economieAffichee: number;
  courbe: PointAnnuel[];
};

const MARGE_SECURITE = 0.75;

export function calculerCrd(capital: number, dureeRestante: number, n: number): number {
  return capital * (dureeRestante - n) / dureeRestante;
}

export type TrancheAge = { ageMin: number; ageMax: number; tauxAnnuel: number };

// Lookup pur, sans dépendance réseau — utilisable côté client pour le
// recalcul instantané au curseur, avec les grilles chargées une fois au
// chargement de la page (voir src/lib/calcul/parametres.ts côté serveur).
export function trouverTauxDansGrille(grille: TrancheAge[], age: number): number | null {
  const tranche = grille.find((t) => age >= t.ageMin && age <= t.ageMax);
  return tranche ? tranche.tauxAnnuel : null;
}

export function calculerSimulation(params: {
  capital: number;
  dureeRestanteAnnees: number;
  tauxBanqueMoyen: number;
  tauxDelegation: number;
}): ResultatSimulation {
  const { capital, dureeRestanteAnnees, tauxBanqueMoyen, tauxDelegation } = params;

  const primeBanqueAnnuelle = capital * tauxBanqueMoyen;

  const courbe: PointAnnuel[] = [];
  let economieBrute = 0;

  for (let n = 0; n < dureeRestanteAnnees; n++) {
    const crd = calculerCrd(capital, dureeRestanteAnnees, n);
    const primeDelegation = crd * tauxDelegation;
    courbe.push({
      annee: n + 1,
      primeBanque: primeBanqueAnnuelle,
      primeDelegation,
    });
    economieBrute += primeBanqueAnnuelle - primeDelegation;
  }

  const economieAffichee = economieBrute * MARGE_SECURITE;

  return {
    tauxBanqueMoyen,
    tauxDelegation,
    primeBanqueAnnuelle,
    primeDelegationAnnuelle: courbe[0]?.primeDelegation ?? 0,
    economieBrute,
    economieAffichee,
    courbe,
  };
}
