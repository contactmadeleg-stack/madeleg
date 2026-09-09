import Link from "next/link";
import Reveal, { RevealItem } from "./Reveal";
import { IconeBouclier, IconePoignee, IconeCoche } from "./Icones";

const POINTS = [
  {
    icone: IconeBouclier,
    titre: "Certifiés ORIAS",
    texte: "Intermédiaire en assurance certifié ORIAS, contrôlé par l'ACPR.",
  },
  {
    icone: IconePoignee,
    titre: "100% indépendants",
    texte: "Nous travaillons avec un large panel d'assureurs, jamais liés à une seule banque.",
  },
  {
    icone: IconeCoche,
    titre: "Zéro jargon",
    texte: "Des explications simples, sans clause illisible ni promesse floue.",
  },
];

export default function SectionPourquoi() {
  return (
    <section id="pourquoi" className="mx-auto max-w-6xl px-4 py-16 sm:py-24 scroll-mt-20">
      <Reveal>
        <div
          className="rounded-3xl px-6 py-14 sm:py-18 text-center"
          style={{ background: "var(--color-sauge-clair)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl mx-auto">
            L&apos;exigence d&apos;un pro, <span className="text-[var(--color-marque)]">sans la paperasse</span>.
          </h2>
          <p className="text-[var(--color-texte-doux)] mt-3">
            On ne transige ni avec la loi, ni avec votre confiance.
          </p>

          <Reveal stagger className="mt-10">
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {POINTS.map(({ icone: Icone, titre, texte }) => (
                <RevealItem key={titre} className="carte-madeleg p-6 text-left">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
                    <Icone className="w-5 h-5" />
                  </span>
                  <h3 className="font-titres text-lg font-bold mb-1.5">{titre}</h3>
                  <p className="text-sm text-[var(--color-texte-doux)] leading-relaxed">{texte}</p>
                </RevealItem>
              ))}
            </div>
          </Reveal>

          <Link
            href="/#simulateur"
            className="btn-madeleg btn-madeleg-principal inline-block mt-10 px-8 py-3 text-white"
          >
            Démarrer mon analyse gratuite
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
