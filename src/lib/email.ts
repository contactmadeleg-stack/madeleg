import { Resend } from "resend";

// Adresse d'expédition : tant que madeleg.fr n'est pas acheté et vérifié
// sur Resend, on utilise le domaine de test Resend (onboarding@resend.dev).
// À remplacer par une adresse @madeleg.fr une fois le domaine vérifié.
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS ?? "Madeleg <onboarding@resend.dev>";

// Adresse recevant la notification d'une nouvelle demande. Marche dès
// maintenant même sans domaine vérifié, car Resend en mode test autorise
// justement l'envoi vers l'adresse du compte Resend.
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? "contact.madeleg@gmail.com";

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function echapperHtml(texte: string) {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getResendOuNull() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquant — email non envoyé.");
    return null;
  }
  return new Resend(apiKey);
}

export async function envoyerEmailConfirmation(params: {
  prenom: string;
  email: string;
  economieAffichee: number;
}) {
  const resend = getResendOuNull();
  if (!resend) return { sent: false as const };

  const { prenom, email, economieAffichee } = params;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Votre demande Madeleg est bien reçue",
    html: `
      <p>Bonjour ${echapperHtml(prenom)},</p>
      <p>Votre demande a bien été reçue. Un conseiller Madeleg va revenir vers vous.</p>
      <p>D'après votre simulation, l'économie estimée sur la durée restante de votre prêt est de :</p>
      <p style="font-size: 28px; font-weight: bold; color: #1c3d5a;">${euros(economieAffichee)}</p>
      <p>Ce montant est une estimation basée sur un taux moyen de marché, avec des garanties complètes (DC, PTIA, IPT, IPP, ITT, MNO, sans condition d'hospitalisation) et une marge de sécurité de 25 %. Le montant exact sera confirmé après analyse de votre dossier par votre conseiller.</p>
      <p>À très vite,<br />L'équipe Madeleg</p>
    `,
  });

  if (error) {
    console.error("Erreur envoi email confirmation :", error);
    return { sent: false as const };
  }

  return { sent: true as const };
}

export async function envoyerEmailAdmin(params: {
  prenom: string;
  nom: string;
  email: string;
  mobile: string;
  banqueSelectionnee: string;
  capital: number;
  dureeRestanteAnnees: number;
  ages: number[];
  economieAffichee: number;
}) {
  const resend = getResendOuNull();
  if (!resend) return { sent: false as const };

  const {
    prenom,
    nom,
    email,
    mobile,
    banqueSelectionnee,
    capital,
    dureeRestanteAnnees,
    ages,
    economieAffichee,
  } = params;

  const ligne = (label: string, valeur: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#4d5b74;">${label}</td><td style="padding:4px 0;font-weight:600;">${echapperHtml(valeur)}</td></tr>`;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `Nouvelle demande Madeleg : ${prenom} ${nom}`,
    html: `
      <p>Nouvelle demande de rappel reçue sur Madeleg.</p>
      <table cellspacing="0" cellpadding="0">
        ${ligne("Prénom", prenom)}
        ${ligne("Nom", nom)}
        ${ligne("Email", email)}
        ${ligne("Mobile", mobile)}
        ${ligne("Banque actuelle (indicatif)", banqueSelectionnee)}
        ${ligne("Capital emprunté", euros(capital))}
        ${ligne("Durée restante", `${dureeRestanteAnnees} ans`)}
        ${ligne(ages.length > 1 ? "Âges emprunteurs" : "Âge", ages.join(", ") + " ans")}
        ${ligne("Économie affichée au prospect", euros(economieAffichee))}
      </table>
    `,
  });

  if (error) {
    console.error("Erreur envoi email admin :", error);
    return { sent: false as const };
  }

  return { sent: true as const };
}
