"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Fondu + léger déplacement vers le haut au passage dans le viewport.
// Respecte prefers-reduced-motion (état final affiché immédiatement, pas
// d'animation) — cf. skill motion-framer, règle d'accessibilité standard.
export default function Reveal({
  children,
  delai = 0,
  stagger = false,
  className,
}: {
  children: ReactNode;
  delai?: number;
  stagger?: boolean;
  className?: string;
}) {
  const reduitMotion = useReducedMotion();

  const variantsConteneur: Variants = {
    cache: {},
    visible: {
      transition: reduitMotion
        ? { duration: 0 }
        : { staggerChildren: stagger ? 0.12 : 0, delayChildren: delai },
    },
  };

  const variantsItem: Variants = {
    cache: reduitMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduitMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut", delay: stagger ? 0 : delai },
    },
  };

  return (
    <motion.div
      className={className}
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variantsConteneur}
    >
      {stagger ? children : <motion.div variants={variantsItem}>{children}</motion.div>}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduitMotion = useReducedMotion();
  const variants: Variants = {
    cache: reduitMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: reduitMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" } },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
