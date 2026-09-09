import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { calculerSimulation } from "@/lib/calcul/simulation";
import { getTauxBanqueMoyen, getTauxDelegation } from "@/lib/calcul/parametres";
import { etape1Schema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = etape1Schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { capital, dureeRestanteAnnees, age, sourceTrafic } = parsed.data;

  let tauxBanqueMoyen: number;
  let tauxDelegation: number;
  try {
    [tauxBanqueMoyen, tauxDelegation] = await Promise.all([
      getTauxBanqueMoyen(age),
      getTauxDelegation(age),
    ]);
  } catch (e) {
    console.error("Paramètres de calcul indisponibles :", e);
    return NextResponse.json(
      { error: "Simulation momentanément indisponible. Réessayez dans un instant." },
      { status: 503 }
    );
  }

  const resultat = calculerSimulation({
    capital,
    dureeRestanteAnnees,
    tauxBanqueMoyen,
    tauxDelegation,
  });

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("simulations")
    .insert({
      capital,
      duree_restante_annees: dureeRestanteAnnees,
      age,
      taux_banque_moyen: resultat.tauxBanqueMoyen,
      taux_delegation: resultat.tauxDelegation,
      prime_banque_annuelle: resultat.primeBanqueAnnuelle,
      prime_delegation_annuelle: resultat.primeDelegationAnnuelle,
      economie_brute: resultat.economieBrute,
      economie_affichee: resultat.economieAffichee,
      source_trafic: sourceTrafic ?? null,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Erreur insertion simulation :", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer la simulation." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    simulationId: data.id,
    economieAffichee: resultat.economieAffichee,
    primeBanqueAnnuelle: resultat.primeBanqueAnnuelle,
    primeDelegationAnnuelle: resultat.primeDelegationAnnuelle,
    courbe: resultat.courbe,
  });
}
