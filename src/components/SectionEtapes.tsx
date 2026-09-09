import Reveal, { RevealItem } from "./Reveal";
import { IconeEuro, IconeTelephone, IconePoignee } from "./Icones";

function IconeVacances({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className={`${className} flex items-center justify-center text-base leading-none`} aria-hidden>
      🏖️
    </span>
  );
}

const ETAPES = [
  {
    numero: "1",
    icone: IconeEuro,
    titre: "Vous estimez en ligne",
    texte: "Capital, durée restante, âge : votre estimation d'économie s'affiche en direct, en 30 secondes.",
  },
  {
    numero: "2",
    icone: IconeTelephone,
    titre: "Un conseiller affine votre dossier",
    texte:
      "Vous transmettez votre offre de prêt et votre tableau d'amortissement : un expert affine votre simulation avec vous, par téléphone, en quelques minutes.",
  },
  {
    numero: "3",
    icone: IconePoignee,
    titre: "Vous validez, on s'occupe de tout",
    texte: "Dès votre accord sur la proposition définitive, Madeleg change votre assurance — vous n'avez rien à faire.",
  },
  {
    numero: "4",
    icone: IconeVacances,
    titre: "Vous profitez de vos économies",
    texte: "Votre mensualité baisse, votre budget respire — de quoi enfin réserver ces vacances.",
  },
];

export default function SectionEtapes() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-4 py-16 sm:py-24 scroll-mt-20">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">4 étapes, on s&apos;occupe du reste</h2>
        </div>
      </Reveal>

      <Reveal stagger>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            aria-hidden
            className="hidden lg:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-[var(--color-bordure)] -z-10"
          />
          {ETAPES.map(({ numero, icone: Icone, titre, texte }) => (
            <RevealItem
              key={numero}
              className="carte-madeleg p-6 relative transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <span className="font-titres absolute top-4 right-5 text-3xl font-extrabold text-[var(--color-bordure)]">
                {numero}
              </span>
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-sauge-clair)] to-[var(--color-ambre-clair)] text-[var(--color-marque)] mb-4 shadow-sm">
                <Icone className="w-5 h-5" />
              </span>
              <h3 className="font-titres text-lg font-bold mb-1.5">{titre}</h3>
              <p className="text-sm text-[var(--color-texte-doux)] leading-relaxed">{texte}</p>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
