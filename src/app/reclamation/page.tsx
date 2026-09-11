import type { Metadata } from "next";
import { EDITEUR, MEDIATEUR, ACPR } from "@/lib/identite";

export const metadata: Metadata = {
  title: "Réclamation et médiation | Madeleg",
  description: "Comment adresser une réclamation à Madeleg, nos délais de traitement et les coordonnées du médiateur.",
};

// Page dédiée exigée par la recommandation ACPR 2024-R-02 : accessible sans
// identification préalable, avec modalités, délais et médiateur compétent.
export default function PageReclamation() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8 text-[var(--color-texte)]">
      <h1 className="text-3xl font-bold">Réclamation et médiation</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Comment nous adresser une réclamation</h2>
        <p className="text-[var(--color-texte-doux)]">
          Une réclamation est l&apos;expression d&apos;un mécontentement envers {EDITEUR.nomCommercial}. Vous pouvez
          nous l&apos;adresser gratuitement :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-[var(--color-texte-doux)]">
          <li>
            par e-mail :{" "}
            <a href={`mailto:${EDITEUR.email}`} className="underline">
              {EDITEUR.email}
            </a>{" "}
            (objet : « Réclamation ») ;
          </li>
          <li>
            par courrier : {EDITEUR.nomCommercial} – {EDITEUR.nomLegal}, {EDITEUR.adresse}.
          </li>
        </ul>
        <p className="text-[var(--color-texte-doux)]">
          Merci d&apos;indiquer vos nom, prénom, coordonnées et l&apos;objet précis de votre réclamation.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Nos délais de traitement</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--color-texte-doux)]">
          <li>Accusé de réception sous 10 jours ouvrables maximum à compter de l&apos;envoi de votre réclamation (sauf si la réponse vous est apportée dans ce délai) ;</li>
          <li>Réponse sur le fond sous 2 mois maximum à compter de l&apos;envoi de votre réclamation.</li>
        </ul>
        <p className="text-[var(--color-texte-doux)]">
          Si votre réclamation porte sur le contrat d&apos;assurance lui-même (garanties, prise en charge d&apos;un
          sinistre), nous la transmettons à l&apos;assureur concerné et vous en informons.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Médiation</h2>
        <p className="text-[var(--color-texte-doux)]">
          Si notre réponse ne vous satisfait pas, ou en l&apos;absence de réponse dans un délai de 2 mois, vous
          pouvez saisir gratuitement le médiateur de la consommation compétent au titre de notre adhésion à la CNCEF :
        </p>
        <p className="text-[var(--color-texte-doux)]">
          {MEDIATEUR.nom}
          <br />
          {MEDIATEUR.adresse}
          <br />
          <a href={MEDIATEUR.site} target="_blank" rel="noopener noreferrer" className="underline">
            www.cmap.fr
          </a>
        </p>
        <p className="text-[var(--color-texte-doux)]">
          La saisine du médiateur suppose que vous ayez d&apos;abord adressé une réclamation écrite à{" "}
          {EDITEUR.nomCommercial}, et doit intervenir dans un délai d&apos;un an à compter de cette réclamation.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Autorité de contrôle</h2>
        <p className="text-[var(--color-texte-doux)]">
          {ACPR.nom}, {ACPR.adresse}.
        </p>
      </section>
    </div>
  );
}
