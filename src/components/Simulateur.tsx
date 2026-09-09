"use client";

import { useState, useMemo, FormEvent } from "react";
import { calculerSimulationGroupe, type TrancheAge } from "@/lib/calcul/simulation";
import { useCompteurAnime } from "@/lib/useCompteurAnime";
import type { BanqueAffichee } from "@/lib/getBanquesActives";
import SelecteurBanque from "./SelecteurBanque";
import { IconeEuro, IconeCalendrier, IconePersonne, IconeCoche, IconeChrono } from "./Icones";

type Etat =
  | { vue: "estimation"; phase: "formulaire" | "chargement" | "erreur"; message?: string }
  | { vue: "coordonnees"; simulationId: string; economieAffichee: number }
  | { vue: "confirmation"; prenom: string };

const CAPITAL_MIN = 20_000;
const CAPITAL_MAX = 800_000;
const CAPITAL_PAS = 5_000;
const DUREE_MIN = 1;
const DUREE_MAX = 30;
const AGE_MIN = 18;
const AGE_MAX = 85;
const MAX_EMPRUNTEURS = 2;

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Simulateur({
  grillesBanque,
  grillesDelegation,
  banques,
}: {
  grillesBanque: TrancheAge[];
  grillesDelegation: TrancheAge[];
  banques: BanqueAffichee[];
}) {
  const [capital, setCapital] = useState(200_000);
  const [dureeRestanteAnnees, setDureeRestanteAnnees] = useState(20);
  const [ages, setAges] = useState<number[]>([AGE_MIN]);
  const [banqueSelectionnee, setBanqueSelectionnee] = useState("");

  const [etat, setEtat] = useState<Etat>({ vue: "estimation", phase: "formulaire" });
  const [envoiEtape2, setEnvoiEtape2] = useState(false);
  const [erreurEtape2, setErreurEtape2] = useState<string | null>(null);

  const apercu = useMemo(
    () =>
      calculerSimulationGroupe({ capital, dureeRestanteAnnees, ages, grillesBanque, grillesDelegation }),
    [capital, dureeRestanteAnnees, ages, grillesBanque, grillesDelegation]
  );

  const apercuAnime = useCompteurAnime(apercu?.economieAffichee ?? 0, 500);
  const resultatAnime = useCompteurAnime(etat.vue === "coordonnees" ? etat.economieAffichee : 0, 1200);

  function modifierAge(index: number, valeur: number) {
    setAges((prec) => prec.map((a, i) => (i === index ? valeur : a)));
  }

  function ajouterEmprunteur() {
    setAges((prec) => (prec.length < MAX_EMPRUNTEURS ? [...prec, AGE_MIN] : prec));
  }

  function retirerEmprunteur(index: number) {
    setAges((prec) => prec.filter((_, i) => i !== index));
  }

  async function soumettreEtape1(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat({ vue: "estimation", phase: "chargement" });

    try {
      const res = await fetch("/api/simulation-etape1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          capital,
          dureeRestanteAnnees,
          ages,
          sourceTrafic: typeof document !== "undefined" ? document.referrer || "direct" : undefined,
        }),
      });

      if (!res.ok) {
        setEtat({
          vue: "estimation",
          phase: "erreur",
          message: "Impossible de calculer votre estimation pour le moment. Réessayez dans un instant.",
        });
        return;
      }

      const data = await res.json();
      setEtat({
        vue: "coordonnees",
        simulationId: data.simulationId,
        economieAffichee: data.economieAffichee,
      });
    } catch {
      setEtat({
        vue: "estimation",
        phase: "erreur",
        message: "Une erreur est survenue. Vérifiez votre connexion et réessayez.",
      });
    }
  }

  async function soumettreEtape2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat.vue !== "coordonnees") return;

    const form = new FormData(e.currentTarget);
    const prenom = String(form.get("prenom") ?? "");
    const nom = String(form.get("nom") ?? "");
    const email = String(form.get("email") ?? "");
    const mobile = String(form.get("mobile") ?? "");

    if (!banqueSelectionnee) {
      setErreurEtape2("Sélectionnez votre banque actuelle.");
      return;
    }

    setEnvoiEtape2(true);
    setErreurEtape2(null);

    try {
      const res = await fetch("/api/simulation-etape2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          simulationId: etat.simulationId,
          prenom,
          nom,
          email,
          mobile,
          banqueSelectionnee,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErreurEtape2(
          data?.details
            ? "Vérifiez les champs du formulaire (email et mobile notamment)."
            : "Impossible d'enregistrer votre demande pour le moment. Réessayez."
        );
        setEnvoiEtape2(false);
        return;
      }

      setEtat({ vue: "confirmation", prenom });
    } catch {
      setErreurEtape2("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
      setEnvoiEtape2(false);
    }
  }

  if (etat.vue === "confirmation") {
    return (
      <div className="carte-madeleg p-8 text-center space-y-3">
        <h2 className="text-2xl font-bold">Merci {etat.prenom}, votre demande est bien reçue.</h2>
        <p className="text-[var(--color-texte-doux)]">
          Un conseiller Madeleg vous rappelle sous <strong>24h ouvrées</strong>. Vous allez également recevoir un
          email avec le récapitulatif de votre estimation.
        </p>
      </div>
    );
  }

  if (etat.vue === "coordonnees") {
    return (
      <div className="carte-madeleg p-6 sm:p-8 space-y-7">
        <button
          type="button"
          onClick={() => setEtat({ vue: "estimation", phase: "formulaire" })}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-texte-doux)] hover:text-[var(--color-marque)]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Modifier mon estimation
        </button>

        <div className="text-center">
          <p className="text-xs font-bold text-[var(--color-sauge)] uppercase tracking-wide mb-2">
            Estimation validée
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-5">Prêt à passer à l&apos;action ?</h2>

          <div className="lueur-ambre inline-flex items-baseline gap-2 rounded-full bg-[var(--color-sauge-clair)] px-6 py-3">
            <span className="font-titres text-3xl sm:text-4xl font-extrabold text-[var(--color-ambre)]">
              {euros(Math.round(resultatAnime))}
            </span>
            <span className="text-sm font-semibold text-[var(--color-marque)]">d&apos;économies estimées</span>
          </div>

          <p className="text-sm text-[var(--color-texte-doux)] mt-4">
            Renseignez vos coordonnées pour valider votre demande.
          </p>

          <div className="flex items-center justify-center gap-5 mt-4 text-xs font-medium text-[var(--color-texte-doux)]">
            <span className="inline-flex items-center gap-1.5">
              <IconeCoche className="w-4 h-4 text-[var(--color-sauge)]" /> Analyse gratuite
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconeChrono className="w-4 h-4 text-[var(--color-sauge)]" /> 2 min
            </span>
          </div>
        </div>

        <form onSubmit={soumettreEtape2} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Champ label="Prénom">
              <input type="text" name="prenom" required maxLength={100} placeholder="Jean" className="champ-saisie" />
            </Champ>
            <Champ label="Nom">
              <input type="text" name="nom" required maxLength={100} placeholder="Dupont" className="champ-saisie" />
            </Champ>
            <Champ label="Email">
              <input type="email" name="email" required maxLength={200} placeholder="jean@exemple.fr" className="champ-saisie" />
            </Champ>
            <Champ label="Mobile">
              <input type="tel" name="mobile" required placeholder="06 12 34 56 78" className="champ-saisie" />
            </Champ>
          </div>

          <SelecteurBanque valeur={banqueSelectionnee} onChange={setBanqueSelectionnee} banques={banques} />

          <div className="flex flex-col items-center pt-2">
            <button
              type="submit"
              disabled={envoiEtape2}
              className="btn-madeleg btn-madeleg-principal px-8 py-3 text-white disabled:opacity-60"
            >
              {envoiEtape2 ? "Envoi en cours…" : "Valider ma demande"}
            </button>
            {erreurEtape2 && <p className="text-sm text-red-700 mt-3">{erreurEtape2}</p>}

            <p className="text-xs text-[var(--color-texte-doux)] mt-4 text-center max-w-md">
              En soumettant ce formulaire, vous acceptez que Madeleg (contact.madeleg@gmail.com) traite vos
              données pour vous recontacter dans le cadre de votre simulation. Données conservées 3 ans.{" "}
              <a href="/politique-de-confidentialite" className="underline">
                Politique de confidentialité
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="carte-madeleg p-6 sm:p-8">
      <form onSubmit={soumettreEtape1} className="space-y-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <Curseur
            label="Capital restant"
            icone={<IconeEuro className="w-4 h-4" />}
            valeur={capital}
            affichage={euros(capital)}
            min={CAPITAL_MIN}
            max={CAPITAL_MAX}
            pas={CAPITAL_PAS}
            onChange={setCapital}
          />
          <Curseur
            label="Durée restante"
            icone={<IconeCalendrier className="w-4 h-4" />}
            valeur={dureeRestanteAnnees}
            affichage={`${dureeRestanteAnnees} an${dureeRestanteAnnees > 1 ? "s" : ""}`}
            min={DUREE_MIN}
            max={DUREE_MAX}
            pas={1}
            onChange={setDureeRestanteAnnees}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {ages.map((age, i) => (
            <div key={i}>
              <span className="block text-xs font-semibold text-[var(--color-texte-doux)] uppercase tracking-wide mb-1.5">
                Âge emprunteur {i + 1}
              </span>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-marque)] pointer-events-none">
                    <IconePersonne className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    required
                    min={AGE_MIN}
                    max={AGE_MAX}
                    value={age}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!Number.isNaN(v)) modifierAge(i, v);
                    }}
                    className="champ-saisie !pl-10"
                  />
                </div>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => retirerEmprunteur(i)}
                    aria-label="Retirer cet emprunteur"
                    className="shrink-0 w-9 h-9 rounded-full border border-[var(--color-bordure)] text-[var(--color-texte-doux)] hover:border-[var(--color-marque)] hover:text-[var(--color-marque)]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}

          {ages.length < MAX_EMPRUNTEURS && (
            <button
              type="button"
              onClick={ajouterEmprunteur}
              className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-bordure)] text-sm text-[var(--color-marque)] font-medium py-3 hover:border-[var(--color-marque)]"
            >
              + Ajouter un co-emprunteur
            </button>
          )}
        </div>

        {apercu && (
          <div className="lueur-ambre text-center py-4 border-y border-[var(--color-bordure)]">
            <p className="text-sm text-[var(--color-texte-doux)] mb-1">Estimation de votre économie</p>
            <p className="font-titres text-4xl sm:text-5xl font-extrabold text-[var(--color-ambre)]">
              {euros(Math.round(apercuAnime))}
            </p>
            <p className="text-xs text-[var(--color-texte-doux)] mt-1">
              sur la durée restante, tarif moyen d&apos;un contrat bancaire*
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={etat.phase === "chargement" || !apercu}
            className="btn-madeleg btn-madeleg-principal px-8 py-3 text-white disabled:opacity-60"
          >
            {etat.phase === "chargement" ? "Calcul en cours…" : "Valider mon estimation"}
          </button>
        </div>

        {etat.phase === "erreur" && <p className="text-sm text-red-700 text-center">{etat.message}</p>}

        <p className="text-xs text-[var(--color-texte-doux)] text-center">
          *Estimation avec garanties complètes (DC, PTIA, IPT, IPP, ITT, MNO, sans condition d&apos;hospitalisation).
        </p>
      </form>
    </div>
  );
}

function Curseur({
  label,
  icone,
  valeur,
  affichage,
  min,
  max,
  pas,
  onChange,
}: {
  label: string;
  icone: React.ReactNode;
  valeur: number;
  affichage: string;
  min: number;
  max: number;
  pas: number;
  onChange: (v: number) => void;
}) {
  const pourcentage = ((valeur - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-texte)]">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] shrink-0">
            {icone}
          </span>
          {label}
        </span>
        <span className="font-titres text-lg font-bold text-[var(--color-marque)]">{affichage}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={pas}
        value={valeur}
        onChange={(e) => onChange(Number(e.target.value))}
        className="curseur-madeleg"
        style={{ ["--pourcentage" as string]: `${pourcentage}%` }}
        aria-label={label}
      />
    </div>
  );
}

function Champ({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[var(--color-texte)] mb-1.5">{label}</span>
      {children}
    </label>
  );
}
