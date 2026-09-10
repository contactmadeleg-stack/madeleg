export const metadata = {
  title: "Politique de confidentialité | Madeleg",
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8 text-[var(--color-texte)]">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Responsable du traitement</h2>
        <p className="text-[var(--color-texte-doux)]">
          Mario Romuald Dos Santos, entrepreneur individuel, 1 Boulevard Auguste Priou, 44120 Vertou, SIRET 814 537
          684 00056. Contact : contact.madeleg@gmail.com.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Données collectées</h2>
        <p className="text-[var(--color-texte-doux)]">
          Lors d&apos;une simulation : capital emprunté, durée restante du prêt, âge. Si vous demandez à être
          rappelé : prénom, nom, email, numéro de mobile, banque prêteuse actuelle (à titre indicatif).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Finalité et base légale</h2>
        <p className="text-[var(--color-texte-doux)]">
          Ces données sont utilisées pour calculer votre estimation d&apos;économie et, si vous en faites la
          demande, pour vous recontacter dans le cadre d&apos;un accompagnement en substitution d&apos;assurance
          emprunteur. Le traitement repose sur votre consentement, exprimé en soumettant le formulaire.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Destinataires et sous-traitants</h2>
        <p className="text-[var(--color-texte-doux)]">
          Vos données ne sont jamais vendues ni cédées à des tiers à des fins commerciales. Elles sont hébergées
          chez Supabase (base de données, région Frankfurt, Union européenne) et transitent par Vercel (hébergement
          de l&apos;application) et Resend (envoi de l&apos;email de confirmation).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Transfert de données hors Union européenne</h2>
        <p className="text-[var(--color-texte-doux)]">
          Vercel (hébergement de l&apos;application) et Resend (envoi d&apos;emails transactionnels) sont des
          sociétés basées aux États-Unis. Ce transfert de données hors Union européenne est encadré par les garanties
          prévues à leurs accords de traitement des données respectifs. Le détail de ces garanties peut être
          communiqué sur demande à contact.madeleg@gmail.com.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Durée de conservation</h2>
        <p className="text-[var(--color-texte-doux)]">
          Les données des demandes de rappel sont conservées 3 ans à compter du dernier contact, conformément aux
          recommandations de la CNIL en matière de prospection commerciale, sauf demande de suppression anticipée
          de votre part.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p className="text-[var(--color-texte-doux)]">
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          d&apos;opposition, de limitation et de portabilité sur vos données. Pour l&apos;exercer, contactez-nous à
          contact.madeleg@gmail.com. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="text-[var(--color-texte-doux)]">
          Ce site n&apos;utilise aucun cookie de mesure d&apos;audience ni traceur publicitaire. Seuls des cookies
          techniques strictement nécessaires à la connexion à l&apos;espace d&apos;administration sont utilisés,
          exemptés de consentement. Aucune donnée de simulation ou de coordonnées personnelles n&apos;est stockée
          dans un cookie ou dans votre navigateur : toutes les données saisies sont transmises directement à notre
          base de données sécurisée.
        </p>
      </section>
    </div>
  );
}
