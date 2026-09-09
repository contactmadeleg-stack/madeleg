import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { etape2Schema } from "@/lib/validation";
import { envoyerEmailConfirmation, envoyerEmailAdmin } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = etape2Schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { simulationId, prenom, nom, email, mobile, banqueSelectionnee } = parsed.data;

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("simulations")
    .update({
      prenom,
      nom,
      email,
      mobile,
      banque_selectionnee: banqueSelectionnee,
      etape2_completed_at: new Date().toISOString(),
      email_capte_sans_rdv: true,
    })
    .eq("id", simulationId)
    .select("economie_affichee, capital, duree_restante_annees, age")
    .single();

  if (error || !data) {
    console.error("Erreur mise à jour simulation :", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer votre demande." },
      { status: 500 }
    );
  }

  const economieAffichee = Number(data.economie_affichee);

  const [{ sent }] = await Promise.all([
    envoyerEmailConfirmation({ prenom, email, economieAffichee }),
    envoyerEmailAdmin({
      prenom,
      nom,
      email,
      mobile,
      banqueSelectionnee,
      capital: Number(data.capital),
      dureeRestanteAnnees: data.duree_restante_annees,
      age: data.age,
      economieAffichee,
    }),
  ]);

  return NextResponse.json({ ok: true, emailSent: sent });
}
