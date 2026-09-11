"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { IconeChevronBas } from "./Icones";

const QUESTIONS = [
  {
    q: "Qu'est-ce que la loi Lemoine ?",
    r: "Depuis juin 2022, la loi Lemoine vous permet de résilier votre assurance de prêt immobilier à tout moment, sans frais ni justification, pour la remplacer par un contrat aux garanties équivalentes.",
  },
  {
    q: "Est-ce vraiment gratuit ?",
    r: "La simulation est gratuite et sans engagement. Le détail d'un éventuel coût d'accompagnement, s'il y en a un, vous est communiqué clairement par votre conseiller avant toute démarche.",
  },
  {
    q: "Dois-je changer de banque ou de prêt ?",
    r: "Non. Votre prêt et votre banque restent identiques : seule votre assurance de prêt change d'assureur.",
  },
  {
    q: "Quelles garanties dois-je retrouver dans le nouveau contrat ?",
    r: "La loi impose une équivalence de garanties avec votre contrat actuel : DC, PTIA, IPT, IPP, ITT, MNO, sans condition d'hospitalisation dans notre sélection.",
  },
  {
    q: "Quel est le délai pour changer d'assurance ?",
    r: "Une fois votre dossier complet transmis à votre banque, celle-ci dispose d'un délai légal pour vous répondre. Madeleg suit l'ensemble des échanges jusqu'à validation, sans que vous ayez à relancer qui que ce soit.",
  },
  {
    q: "Combien puis-je économiser ?",
    r: "Cela dépend de votre capital restant dû, de la durée restante et de votre âge. Utilisez le simulateur en haut de page pour une estimation personnalisée en 30 secondes.",
  },
];

export default function SectionFAQ() {
  const [ouvert, setOuvert] = useState<number | null>(0);
  const reduitMotion = useReducedMotion();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:py-24 scroll-mt-20">
      <Reveal>
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
            Questions fréquentes
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Tout ce qu&apos;on nous demande</h2>
        </div>
      </Reveal>

      <div className="space-y-3">
        {QUESTIONS.map(({ q, r }, i) => {
          const estOuvert = ouvert === i;
          return (
            <div key={q} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden">
              <button
                type="button"
                onClick={() => setOuvert(estOuvert ? null : i)}
                aria-expanded={estOuvert}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium transition-colors hover:bg-[var(--surface-sunken)]"
              >
                <span>{q}</span>
                <span
                  className="shrink-0 transition-transform duration-200"
                  style={{ color: "var(--emerald-600)", transform: estOuvert ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <IconeChevronBas className="w-4 h-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {estOuvert && (
                  <motion.div
                    key="contenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduitMotion ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{r}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
