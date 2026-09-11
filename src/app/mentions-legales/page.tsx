import Link from "next/link";
import { EDITEUR, MANDANT, ACPR } from "@/lib/identite";

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
          {EDITEUR.nomCommercial} est le nom commercial de {EDITEUR.nomLegal}, {EDITEUR.forme}.
          <br />
          Adresse : {EDITEUR.adresse}.
          <br />
          SIREN : {EDITEUR.siren} · SIRET : {EDITEUR.siret} · Immatriculé au Registre national des entreprises (RNE).
          <br />
          E-mail :{" "}
          <a href={`mailto:${EDITEUR.email}`} className="underline">
            {EDITEUR.email}
          </a>
          {EDITEUR.telephone && (
            <>
              <br />
              Téléphone : {EDITEUR.telephone}
            </>
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Statut réglementaire</h2>
        <p className="text-[var(--color-texte-doux)]">
          Mandataire d&apos;intermédiaire d&apos;assurance (MIA), immatriculé à l&apos;ORIAS sous le n° {EDITEUR.orias},
          vérifiable sur{" "}
          <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="underline">
            orias.fr
          </a>
          .
          <br />
          Mandaté par {MANDANT.raisonSociale} ({MANDANT.marque}), {MANDANT.categorie}, SIREN {MANDANT.siren}, N° ORIAS{" "}
          {MANDANT.orias}, {MANDANT.adresse}.
          <br />
          Activité placée sous le contrôle de l&apos;{ACPR.nom}, {ACPR.adresse}.
          <br />
          {EDITEUR.nomCommercial} ne détient aucune participation, directe ou indirecte, dans une entreprise
          d&apos;assurance, et aucune entreprise d&apos;assurance ne détient de participation dans {EDITEUR.nomCommercial}.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Assureurs partenaires et base du conseil</h2>
        <p className="text-[var(--color-texte-doux)]">
          Notre conseil ne repose pas sur une analyse impartiale et personnalisée de l&apos;ensemble du marché. Les
          contrats proposés sont ceux des entreprises d&apos;assurance listées sur la page{" "}
          <Link href="/partenaires" className="underline">
            Nos partenaires
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Rémunération</h2>
        <p className="text-[var(--color-texte-doux)]">
          {EDITEUR.nomCommercial} est rémunéré par les assureurs partenaires sous forme de commission liée à la
          conclusion et à la gestion des contrats souscrits par son intermédiaire ; cette commission est incluse dans
          la cotisation d&apos;assurance. Des frais de distribution peuvent également être facturés au client ; le cas
          échéant, leur montant est indiqué sur le devis remis avant toute souscription.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Assurance de responsabilité civile professionnelle</h2>
        <p className="text-[var(--color-texte-doux)]">
          {EDITEUR.nomCommercial} est couvert par une assurance de responsabilité civile professionnelle souscrite
          auprès de HISCOX S.A. (contrat n° HXFRMI000000307), conformément aux articles L. 512-6 et suivants du Code
          des assurances.
          <br />
          {EDITEUR.nomCommercial} n&apos;encaisse aucun fonds pour le compte de tiers ; la garantie financière prévue à
          l&apos;article L. 512-7 du Code des assurances n&apos;est donc pas applicable.
        </p>
      </section>

      <section id="reclamation-mediation" className="space-y-2 scroll-mt-24">
        <h2 className="text-xl font-semibold">Réclamation et médiation</h2>
        <p className="text-[var(--color-texte-doux)]">
          Les modalités de réclamation, nos délais de traitement et les coordonnées du médiateur sont détaillés sur
          notre page{" "}
          <Link href="/reclamation" className="underline">
            Réclamation et médiation
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Directeur de la publication</h2>
        <p className="text-[var(--color-texte-doux)]">Mario Romuald Dos Santos.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p className="text-[var(--color-texte-doux)]">
          Site hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis ·{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline">
            vercel.com
          </a>{" "}
          · privacy@vercel.com.
          <br />
          Base de données hébergée par Supabase Inc. (
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
            supabase.com
          </a>{" "}
          · privacy@supabase.com), sur des serveurs situés à Francfort (Union européenne).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="text-[var(--color-texte-doux)]">
          L&apos;ensemble des contenus présents sur ce site (textes, graphiques, logo) est protégé au titre du droit
          d&apos;auteur. Toute reproduction sans autorisation préalable est interdite. Les noms des assureurs et des
          contrats cités sont la propriété de leurs détenteurs respectifs.
        </p>
      </section>
    </div>
  );
}
