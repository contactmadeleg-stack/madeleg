import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import { formatDateMiseAJour } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Délégation d'assurance emprunteur : comment ça marche | Madeleg",
  description:
    "Remplacer le contrat d'assurance de votre banque par un contrat individuel équivalent, sans changer de banque ni de prêt : le principe de la délégation d'assurance.",
  alternates: { canonical: "/changer-assurance-emprunteur/vos-droits/delegation-assurance" },
};

const DATE_MISE_A_JOUR = "2026-09-19";

export default function PageDelegationAssurance() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <header className="mb-10">
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
          Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          La délégation d&apos;assurance emprunteur, comment ça marche
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Votre banque propose son propre contrat d&apos;assurance au moment du prêt, mais elle ne peut pas vous
          l&apos;imposer. La délégation d&apos;assurance consiste à le remplacer par un contrat individuel, chez
          l&apos;assureur de votre choix, sans toucher au prêt lui-même.
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
          Dernière mise à jour :{" "}
          {formatDateMiseAJour(DATE_MISE_A_JOUR)}.
        </p>
      </header>

      <section className="prose-madeleg space-y-4 mb-12" style={{ color: "var(--text-body)" }}>
        <h2 className="text-2xl font-bold mt-8 mb-3">Le contrat groupe n&apos;est pas obligatoire</h2>
        <p>
          Le contrat d&apos;assurance groupe proposé par la banque mutualise le risque entre tous ses emprunteurs :
          son tarif reflète une moyenne, pas votre profil individuel. La délégation d&apos;assurance vous permet de
          choisir un contrat individuel dont les garanties et le tarif correspondent réellement à votre situation, du
          moment que ces garanties restent équivalentes à celles exigées par la banque.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Avant la signature ou après : deux moments, une même règle</h2>
        <p>
          Vous pouvez déléguer votre assurance dès la constitution du dossier de prêt, avant la signature de
          l&apos;offre. Vous pouvez aussi le faire après, à n&apos;importe quel moment du crédit, grâce à la{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/loi-lemoine" className="underline">
            loi Lemoine
          </Link>
          . Dans les deux cas, la condition est la même : le nouveau contrat doit offrir des garanties équivalentes à
          celles du contrat initial, selon des critères précis que vous pouvez consulter sur notre page{" "}
          <Link href="/changer-assurance-emprunteur/vos-droits/comparer" className="underline">
            comment comparer deux contrats
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">La banque ne peut ni refuser ni pénaliser votre choix</h2>
        <p>
          Si le contrat que vous proposez respecte l&apos;équivalence de garanties exigée, la banque ne peut pas
          refuser la délégation. Elle ne peut pas non plus modifier le taux du prêt ni ses conditions au motif que
          vous n&apos;avez pas souscrit son propre contrat d&apos;assurance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Comment ça se passe, concrètement</h2>
        <p>
          Un conseiller Madeleg identifie un contrat aux garanties équivalentes aux vôtres, prépare le dossier de
          substitution ou de délégation initiale, et suit l&apos;ensemble des échanges avec votre banque jusqu&apos;à
          validation.
        </p>
      </section>

      <section className="mb-12">
        <FAQSchema
          entrees={[
            {
              question: "Déléguer son assurance retarde-t-il l'obtention du prêt ?",
              reponse:
                "Un dossier de délégation bien préparé, avec l'équivalence de garanties déjà vérifiée, ne ralentit pas l'instruction du prêt par la banque.",
            },
            {
              question: "Quelle différence entre délégation d'assurance et substitution d'assurance ?",
              reponse:
                "La délégation intervient avant la signature de l'offre de prêt, la substitution après. Le principe d'équivalence de garanties est identique dans les deux cas.",
            },
          ]}
        />
        <h2 className="text-2xl font-bold mb-5">Questions fréquentes</h2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Déléguer son assurance retarde-t-il l&apos;obtention du prêt ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Un dossier de délégation bien préparé, avec l&apos;équivalence de garanties déjà vérifiée, ne ralentit
              pas l&apos;instruction du prêt par la banque.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-strong)" }}>
              Quelle différence entre délégation d&apos;assurance et substitution d&apos;assurance ?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              La délégation intervient avant la signature de l&apos;offre de prêt, la substitution après. Le principe
              d&apos;équivalence de garanties est identique dans les deux cas.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link href="/#simulateur" className="mdl-btn mdl-btn--primary mdl-btn--lg">
          Estimer mon économie
        </Link>
      </div>
    </div>
  );
}
