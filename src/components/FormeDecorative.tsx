"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Texture de fond abstraite en aplats de la palette de marque — évite le
// fond plat uniforme, sans photo ni illustration externe. Purement
// décoratif (aria-hidden), positionné derrière le contenu. Léger parallax
// au scroll (delta faible, calques décoratifs uniquement, jamais le texte)
// — cf. skill motion-framer / règle "Parallax Scroll, Subtle".
export default function FormeDecorative({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduitMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], reduitMotion ? [0, 0] : [0, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduitMotion ? [0, 0] : [0, -30]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.svg
        className="absolute -top-24 -right-32 w-[36rem] h-[36rem] opacity-[0.35] blur-2xl"
        viewBox="0 0 400 400"
        style={{ y: y1 }}
      >
        <path
          fill="var(--emerald-50)"
          d="M320,120Q360,180,330,240Q300,300,230,320Q160,340,110,290Q60,240,80,170Q100,100,170,70Q240,40,280,60Q320,80,320,120Z"
        />
      </motion.svg>
      <motion.svg
        className="absolute top-40 -left-24 w-[26rem] h-[26rem] opacity-[0.25] blur-2xl"
        viewBox="0 0 400 400"
        style={{ y: y2 }}
      >
        <path
          fill="var(--amber-100)"
          d="M280,90Q330,140,320,200Q310,260,260,300Q210,340,150,310Q90,280,80,210Q70,140,120,100Q170,60,220,60Q270,60,280,90Z"
        />
      </motion.svg>
    </div>
  );
}
