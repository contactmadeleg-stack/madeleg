import { Resend } from "resend";

// Adresse d'expédition : tant que madeleg.fr n'est pas acheté et vérifié
// sur Resend, on utilise le domaine de test Resend (onboarding@resend.dev).
// À remplacer par une adresse @madeleg.fr une fois le domaine vérifié.
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS ?? "Madeleg <onboarding@resend.dev>";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export async function envoyerEmailConfirmation(params: {
  prenom: string;
  email: string;
  economieAffichee: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquant — email de confirmation non envoyé.");
    return { sent: false as const };
  }

  const resend = new Resend(apiKey);
  const { prenom, email, economieAffichee } = params;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Votre demande Madeleg est bien reçue",
    html: `
      <p>Bonjour ${prenom},</p>
      <p>Votre demande a bien été reçue. Un conseiller Madeleg vous rappelle sous <strong>24h ouvrées</strong>.</p>
      <p>D'après votre simulation, l'économie estimée sur la durée restante de votre prêt est de :</p>
      <p style="font-size: 28px; font-weight: bold; color: #1c3d5a;">${euros(economieAffichee)}</p>
      <p>Ce montant est une estimation basée sur un taux moyen de marché, avec une marge de sécurité de 25 %. Le montant exact sera confirmé après analyse de votre dossier par votre conseiller.</p>
      <p>À très vite,<br />L'équipe Madeleg</p>
    `,
  });

  if (error) {
    console.error("Erreur envoi email confirmation :", error);
    return { sent: false as const };
  }

  return { sent: true as const };
}
