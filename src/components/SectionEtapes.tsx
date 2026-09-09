import Reveal, { RevealItem } from "./Reveal";
import { IconeEuro, IconeDossier, IconePoignee, IconeBouclier } from "./Icones";

const ETAPES = [
  {
    numero: "1",
    icone: IconeEuro,
    titre: "Simulez",
    texte: "Capital, durée restante, âge : votre estimation d'économie s'affiche en direct, en 30 secondes.",
  },
  {
    numero: "2",
    icone: IconeDossier,
    titre: "Envoyez vos documents",
    texte: "Un conseiller vous indique les pièces nécessaires et sécurise la transmission de votre dossier.",
  },
  {
    numero: "3",
    icone: IconePoignee,
    titre: "On négocie pour vous",
    texte: "Madeleg sélectionne l'assureur adapté à votre profil et gère les échanges avec votre banque.",
  },
  {
    numero: "4",
    icone: IconeBouclier,
    titre: "Vous économisez",
    texte: "Dès l'accord de votre banque, la nouvelle assurance prend le relais — mêmes garanties, mensualité optimisée.",
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">4 étapes, zéro paperasse pour vous</h2>
        </div>
      </Reveal>

      <Reveal stagger>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ETAPES.map(({ numero, icone: Icone, titre, texte }) => (
            <RevealItem key={numero} className="carte-madeleg p-6 relative">
              <span className="font-titres absolute top-4 right-5 text-3xl font-extrabold text-[var(--color-bordure)]">
                {numero}
              </span>
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
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
