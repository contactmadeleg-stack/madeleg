// Calcul simplifié de l'économie sur substitution d'assurance emprunteur
// (voir spec Madeleg — formule à une seule étape, marge de sécurité 25%).
//
// Prime banque annuelle = Capital × taux_banque_moyen (constante, ne baisse pas)
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
