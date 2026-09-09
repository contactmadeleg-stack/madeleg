import Reveal, { RevealItem } from "./Reveal";
import { IconeCoche, IconeBouclier, IconePersonne, IconeBanque } from "./Icones";

const POINTS = [
  {
    icone: IconeCoche,
    titre: "Sans engagement",
    texte: "Résiliable à tout moment grâce à la loi Lemoine, sans frais ni justification.",
  },
  {
    icone: IconeBouclier,
    titre: "Garanties équivalentes",
    texte: "DC, PTIA, IPT, IPP, ITT, MNO — sans condition d'hospitalisation.",
  },
  {
    icone: IconePersonne,
    titre: "Suivi par un humain",
    texte: "Un conseiller Madeleg, courtier certifié ORIAS, gère votre dossier de bout en bout.",
  },
  {
    icone: IconeBanque,
    titre: "Votre banque ne change pas",
    texte: "Vous gardez votre prêt et votre banque actuelle : seule l'assurance est remplacée.",
  },
];

export default function SectionPourquoi() {
  return (
    <section id="pourquoi" className="bg-[var(--color-fond-carte)] border-y border-[var(--color-bordure)] scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
              Pourquoi Madeleg
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ce qui change vraiment pour vous</h2>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POINTS.map(({ icone: Icone, titre, texte }) => (
              <RevealItem key={titre} className="text-center sm:text-left">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
                  <Icone className="w-5 h-5" />
                </span>
                <h3 className="font-titres text-lg font-bold mb-1.5">{titre}</h3>
                <p className="text-sm text-[var(--color-texte-doux)] leading-relaxed">{texte}</p>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
