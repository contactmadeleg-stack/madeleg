import { z } from "zod";

export const etape1Schema = z.object({
  capital: z.number().int().min(1000).max(2_000_000),
  dureeRestanteAnnees: z.number().int().min(1).max(35),
  // Max 2 : borne alignée sur MAX_EMPRUNTEURS dans Simulateur.tsx (UI plafonnée à 2 co-emprunteurs).
  ages: z.array(z.number().int().min(18).max(85)).min(1).max(2),
  sourceTrafic: z.string().max(200).optional(),
});

export type Etape1Input = z.infer<typeof etape1Schema>;

export const etape2Schema = z.object({
  simulationId: z.string().uuid(),
  prenom: z.string().trim().min(1).max(100),
  nom: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  mobile: z
    .string()
    .trim()
    .regex(/^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/, "Numéro de mobile invalide"),
  banqueSelectionnee: z.string().trim().min(1).max(100),
});

export type Etape2Input = z.infer<typeof etape2Schema>;
