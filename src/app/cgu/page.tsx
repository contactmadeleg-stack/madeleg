export const metadata = {
  title: "Conditions générales d'utilisation | Madeleg",
};

export default function ConditionsGeneralesUtilisation() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8 text-[var(--color-texte)]">
      <h1 className="text-3xl font-bold">Conditions générales d&apos;utilisation</h1>
      <p className="text-[var(--color-texte-doux)]">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}.</p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Objet</h2>
        <p className="text-[var(--color-texte-doux)]">
          Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;usage du site
          madeleg.fr, édité par Mario Romuald Dos Santos (voir{" "}
          <a href="/mentions-legales" className="underline">
            mentions légales
          </a>
          ). L&apos;utilisation du site implique l&apos;acceptation pleine et entière des présentes CGU.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Accès au site</h2>
        <p className="text-[var(--color-texte-doux)]">
          Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à internet. Tous les frais
          nécessaires pour y accéder (matériel, connexion internet, etc.) sont à la charge de l&apos;utilisateur.
          Madeleg met tout en œuvre pour assurer un accès de qualité au site, sans obligation d&apos;y parvenir, et se
          réserve le droit d&apos;interrompre le site pour maintenance ou mise à jour.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Le simulateur</h2>
        <p className="text-[var(--color-texte-doux)]">
          Le simulateur d&apos;économie proposé sur le site fournit une estimation indicative, calculée à partir des
          informations saisies par l&apos;utilisateur et de grilles de taux moyens. Cette estimation ne constitue ni
          une offre de contrat, ni un engagement contractuel de la part de Madeleg ou d&apos;un assureur, ni une
          garantie du montant réel de l&apos;économie réalisable.
        </p>
        <p className="text-[var(--color-texte-doux)]">
          Le montant définitif de l&apos;économie, les garanties applicables et les conditions du nouveau contrat
          d&apos;assurance ne sont arrêtés qu&apos;après étude individuelle du dossier par un conseiller Madeleg et
          acceptation de l&apos;assureur retenu.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Déroulement de la prestation</h2>
        <p className="text-[var(--color-texte-doux)]">
          La demande de rappel effectuée sur le site n&apos;emporte aucune obligation d&apos;achat ni de souscription.
          Elle permet à un conseiller Madeleg de vous recontacter pour affiner votre dossier. La prestation de
          courtage (constitution du dossier, sélection de l&apos;assureur, suivi avec votre banque) fait
          l&apos;objet d&apos;un accord distinct entre vous et Madeleg, formalisé en dehors du site, préalablement à
          toute démarche.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="text-[var(--color-texte-doux)]">
          L&apos;ensemble des éléments du site (textes, mise en page, logo, charte graphique) est protégé par le
          droit de la propriété intellectuelle. Toute reproduction, représentation ou exploitation, totale ou
          partielle, sans autorisation préalable de Madeleg est interdite.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Responsabilité</h2>
        <p className="text-[var(--color-texte-doux)]">
          Madeleg s&apos;efforce de fournir des informations aussi précises que possible, mais ne saurait être tenu
          responsable des omissions, inexactitudes ou carences dans la mise à jour, qu&apos;elles soient de son fait
          ou du fait des tiers partenaires qui lui fournissent ces informations.
        </p>
        <p className="text-[var(--color-texte-doux)]">
          Madeleg ne pourra être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation
          du site, d&apos;une indisponibilité temporaire, ou de l&apos;impossibilité d&apos;y accéder, quelle qu&apos;en
          soit la cause.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Liens vers des sites tiers</h2>
        <p className="text-[var(--color-texte-doux)]">
          Le site peut contenir des liens vers des sites tiers. Madeleg n&apos;exerce aucun contrôle sur ces sites
          et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Données personnelles</h2>
        <p className="text-[var(--color-texte-doux)]">
          Le traitement de vos données personnelles est décrit dans notre{" "}
          <a href="/politique-de-confidentialite" className="underline">
            politique de confidentialité
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Modification des CGU</h2>
        <p className="text-[var(--color-texte-doux)]">
          Madeleg se réserve le droit de modifier les présentes CGU à tout moment, notamment pour se conformer à
          toute évolution législative, réglementaire ou technique. La version applicable est celle en vigueur à la
          date de consultation du site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Droit applicable et litiges</h2>
        <p className="text-[var(--color-texte-doux)]">
          Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera recherchée
          avant toute action judiciaire, notamment via le dispositif de médiation décrit dans nos{" "}
          <a href="/mentions-legales#reclamation-mediation" className="underline">
            mentions légales
          </a>
          . À défaut d&apos;accord amiable, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-[var(--color-texte-doux)]">
          Pour toute question relative aux présentes CGU, contactez-nous à{" "}
          <a href="mailto:contact.madeleg@gmail.com" className="underline">
            contact.madeleg@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
