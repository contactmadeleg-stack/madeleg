import Link from "next/link";
import Reveal, { RevealItem } from "./Reveal";
import { IconeBouclier, IconePoignee, IconeCoche } from "./Icones";

const POINTS = [
  {
    icone: IconeBouclier,
    titre: "Intermédiaire réglementé",
    texte: "Immatriculé à l'ORIAS, contrôlé par l'ACPR.",
  },
  {
    icone: IconePoignee,
    titre: "Sélection sur mesure",
    texte: "Plusieurs assureurs comparés pour trouver le contrat adapté à votre profil, sans exclusivité imposée.",
  },
  {
    icone: IconeCoche,
    titre: "Des réponses claires",
    texte: "Chaque étape expliquée simplement, sans clause illisible.",
  },
];

export default function SectionPourquoi() {
  return (
    <section id="pourquoi" className="mx-auto max-w-6xl px-4 py-16 sm:py-24 scroll-mt-20">
      <Reveal>
        <div
          className="rounded-3xl px-6 py-14 sm:py-18 text-center"
          style={{ background: "var(--emerald-50)" }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Sérieux sur le fond, <span style={{ color: "var(--emerald-600)" }}>simple</span> dans la forme.
          </h2>
          <p className="mt-3" style={{ color: "var(--text-muted)" }}>
            Un intermédiaire réglementé qui vous explique tout, sans jargon ni mauvaise surprise.
          </p>

          <Reveal stagger className="mt-10">
            <div className="flex flex-col sm:flex-row max-w-4xl mx-auto rounded-2xl bg-[var(--surface-card)] shadow-sm overflow-hidden">
              {POINTS.map(({ icone: Icone, titre, texte }, idx) => (
                <RevealItem
                  key={titre}
                  className={`flex-1 p-6 text-left ${
                    idx < POINTS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
                  }`}
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)" }}>
                    <span style={{ color: "var(--emerald-600)" }}>
                      <Icone className="w-5 h-5" />
                    </span>
                  </span>
                  <h3 className="font-titres text-lg font-bold mb-1.5">{titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{texte}</p>
                </RevealItem>
              ))}
            </div>
          </Reveal>

          <Link
            href="/#simulateur"
            className="mdl-btn mdl-btn--primary mdl-btn--md mt-10"
          >
            Estimer mon économie
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
