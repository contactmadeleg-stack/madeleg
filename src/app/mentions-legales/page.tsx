export const metadata = {
  title: "Mentions légales | Madeleg",
};

export default function MentionsLegales() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8 text-[var(--color-texte)]">
      <h1 className="text-3xl font-bold">Mentions légales</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p className="text-[var(--color-texte-doux)]">
          Mario Romuald Dos Santos, entrepreneur individuel (micro-entreprise), profession libérale.
          <br />
          Adresse : 1 Boulevard Auguste Priou, 44120 Vertou.
          <br />
          SIREN : 814 537 684 · SIRET : 814 537 684 00056 · RCS Nantes.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Statut réglementaire</h2>
        <p className="text-[var(--color-texte-doux)]">
          N° ORIAS : 20004713, vérifiable sur{" "}
          <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="underline">
            orias.fr
          </a>
          .
          <br />
          Mandataire d&apos;intermédiaire d&apos;assurance (MIA) du groupe FINSPOT (SIREN 825 077 886, N° ORIAS
          17000916), 42 rue de Paradis, 75010 Paris.
          <br />
          Contrôlé par l&apos;Autorité de Contrôle Prudentiel et de Résolution (ACPR), 4 Place de Budapest, CS 92459,
          75436 Paris Cedex 09.
          <br />
          Madeleg ne détient aucune participation, directe ou indirecte, dans une entreprise d&apos;assurance, et
          aucune entreprise d&apos;assurance ne détient de participation dans Madeleg.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Rémunération</h2>
        <p className="text-[var(--color-texte-doux)]">
          Madeleg est rémunéré par les assureurs partenaires sous forme de commission liée à la conclusion et à la
          gestion des contrats souscrits par son intermédiaire. Le détail de cette rémunération peut être communiqué
          sur simple demande à contact.madeleg@gmail.com.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Assurance de responsabilité civile professionnelle</h2>
        <p className="text-[var(--color-texte-doux)]">
          Madeleg est couvert par une assurance de responsabilité civile professionnelle souscrite auprès de HISCOX
          S.A. (contrat n° HXFRMI000000307), conformément aux articles L. 512-6 et suivants du Code des assurances.
          <br />
          Madeleg n&apos;encaisse aucun fonds pour le compte de tiers ; la garantie financière prévue à l&apos;article
          L. 512-7 du Code des assurances n&apos;est donc pas applicable.
        </p>
      </section>

      <section id="reclamation-mediation" className="space-y-2 scroll-mt-24">
        <h2 className="text-xl font-semibold">Réclamation et médiation</h2>
        <p className="text-[var(--color-texte-doux)]">
          Pour toute réclamation concernant votre dossier, contactez-nous directement à{" "}
          <a href="mailto:contact.madeleg@gmail.com" className="underline">
            contact.madeleg@gmail.com
          </a>
          .
          <br />
          Si le désaccord persiste après notre réponse, vous pouvez saisir gratuitement le Centre de Médiation et
          d&apos;Arbitrage de Paris (CMAP), médiateur de la consommation compétent au titre de notre adhésion à la
          CNCEF, 39 avenue Franklin D. Roosevelt, 75008 Paris.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Directeur de la publication</h2>
        <p className="text-[var(--color-texte-doux)]">Mario Romuald Dos Santos.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p className="text-[var(--color-texte-doux)]">
          Site hébergé par Vercel Inc. (États-Unis).
          <br />
          Base de données hébergée par Supabase, région Frankfurt (Union européenne).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="text-[var(--color-texte-doux)]">
          L&apos;ensemble des contenus présents sur ce site (textes, graphiques, logo) est protégé au titre du droit
          d&apos;auteur. Toute reproduction sans autorisation préalable est interdite.
        </p>
      </section>
    </div>
  );
}
