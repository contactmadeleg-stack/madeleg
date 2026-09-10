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
          Si le désaccord persiste après notre réponse, un médiateur de la consommation compétent en matière
          d&apos;assurance peut être saisi gratuitement, conformément à la réglementation en vigueur.
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
