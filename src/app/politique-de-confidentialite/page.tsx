import Link from "next/link";
import { EDITEUR, MANDANT, GROSSISTE } from "@/lib/identite";

export const metadata = {
  title: "Politique de confidentialité | Madeleg",
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8 text-[var(--color-texte)]">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
      <p className="text-[var(--color-texte-doux)]">Dernière mise à jour : septembre 2026.</p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Responsable du traitement</h2>
        <p className="text-[var(--color-texte-doux)]">
          {EDITEUR.nomLegal} (nom commercial {EDITEUR.nomCommercial}), {EDITEUR.adresse}, SIRET {EDITEUR.siret}.
          Contact : {EDITEUR.email}.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Données collectées</h2>
        <p className="text-[var(--color-texte-doux)]">
          Lors d&apos;une simulation : capital restant, durée restante du prêt, âge du ou des emprunteurs. Ces données
          ne comportent ni nom ni coordonnées et ne permettent pas, à elles seules, de vous identifier.
        </p>
        <p className="text-[var(--color-texte-doux)]">
          Si vous demandez à être recontacté : prénom, nom, e-mail, numéro de mobile et banque prêteuse actuelle,
          associés à votre simulation.
        </p>
        <p className="text-[var(--color-texte-doux)]">
          Aucune donnée de santé n&apos;est collectée sur ce site. Le questionnaire de santé éventuellement exigé pour
          un nouveau contrat est complété auprès de l&apos;assureur, selon ses propres modalités.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Finalités et bases légales</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--color-texte-doux)]">
          <li>
            Calculer votre estimation d&apos;économie : mesures précontractuelles prises à votre demande (art. 6.1.b
            du RGPD).
          </li>
          <li>
            Vous recontacter, étudier votre dossier et vous accompagner dans la substitution de votre assurance
            emprunteur : mesures précontractuelles prises à votre demande, puis exécution du contrat (art. 6.1.b du
            RGPD).
          </li>
          <li>
            Conserver les éléments de votre dossier pour répondre à nos obligations d&apos;intermédiaire
            d&apos;assurance (devoir de conseil, traitement des réclamations) : obligation légale (art. 6.1.c du RGPD).
          </li>
          <li>
            Mesurer la fréquentation du site de façon anonyme : intérêt légitime (art. 6.1.f du RGPD).
          </li>
        </ul>
        <p className="text-[var(--color-texte-doux)]">
          Nous ne vous adressons aucune prospection commerciale par e-mail ou SMS sans votre consentement préalable.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Destinataires</h2>
        <p className="text-[var(--color-texte-doux)]">
          Vos données ne sont jamais vendues ni cédées à des fins commerciales. Elles sont destinées à{" "}
          {EDITEUR.nomCommercial} et, uniquement si vous poursuivez la démarche, transmises dans la mesure
          nécessaire à : {MANDANT.raisonSociale} ({MANDANT.marque}), notre mandant ; {GROSSISTE.nom},{" "}
          {GROSSISTE.role} ; l&apos;assureur sollicité pour votre devis ; et votre banque prêteuse, pour la demande
          de substitution.
        </p>
        <p className="text-[var(--color-texte-doux)]">
          Nos sous-traitants techniques : Supabase (base de données, serveurs à Francfort, Union européenne), Vercel
          (hébergement du site) et Resend (envoi des e-mails de confirmation).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Transferts de données hors Union européenne</h2>
        <p className="text-[var(--color-texte-doux)]">
          Vercel et Resend sont des sociétés établies aux États-Unis ; Supabase Inc. est une société américaine, même
          si vos données sont stockées dans l&apos;Union européenne. Les transferts éventuels vers ces sociétés sont
          encadrés par les clauses contractuelles types adoptées par la Commission européenne et, pour les sociétés
          certifiées, par le cadre de protection des données UE–États-Unis (Data Privacy Framework). Une copie de ces
          garanties peut être obtenue sur demande à {EDITEUR.email}.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Durée de conservation</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--color-texte-doux)]">
          <li>Demandes de rappel sans suite : 3 ans à compter du dernier contact.</li>
          <li>
            Clients : pendant toute la durée de la relation, puis 5 ans à compter de sa fin (délai de prescription
            légale).
          </li>
          <li>Simulations sans demande de rappel : données non identifiantes, conservées à des fins statistiques.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p className="text-[var(--color-texte-doux)]">
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition, de limitation et de portabilité de vos données, ainsi
          que du droit de définir des directives relatives à leur sort après votre décès. Pour les exercer, écrivez à{" "}
          {EDITEUR.email} ; nous vous répondons dans un délai d&apos;un mois. Vous pouvez également introduire une
          réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline">
            cnil.fr
          </a>
          ).
        </p>
        <p className="text-[var(--color-texte-doux)]">
          Pour une réclamation portant sur nos services d&apos;intermédiation, consultez notre page{" "}
          <Link href="/reclamation" className="underline">
            Réclamation et médiation
          </Link>
          .
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
        <p className="text-[var(--color-texte-doux)]">
          Un compteur de fréquentation interne enregistre, à chaque visite, la date et la page consultée, sans
          cookie ni identifiant permettant de vous reconnaître d&apos;une visite à l&apos;autre. Ces informations,
          strictement statistiques, ne sont utilisées que par {EDITEUR.nomCommercial} pour suivre l&apos;activité du
          site.
        </p>
      </section>
    </div>
  );
}
