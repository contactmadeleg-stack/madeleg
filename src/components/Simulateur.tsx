"use client";

import { useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import { calculerSimulationGroupe, type TrancheAge } from "@/lib/calcul/simulation";
import { useCompteurAnime } from "@/lib/useCompteurAnime";
import type { BanqueAffichee } from "@/lib/getBanquesActives";
import SelecteurBanque from "./SelecteurBanque";
import { IconeEuro, IconeCalendrier, IconePersonne, IconeCoche, IconeChrono, IconeBouclier } from "./Icones";

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
const AGE_DEFAUT = 35;
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
  const [ages, setAges] = useState<number[]>([AGE_DEFAUT]);
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
    setAges((prec) => (prec.length < MAX_EMPRUNTEURS ? [...prec, AGE_DEFAUT] : prec));
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
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 text-center space-y-3">
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-strong)" }}>Merci {etat.prenom}, votre demande est bien reçue.</h2>
        <p style={{ color: "var(--text-muted)" }}>
          Un conseiller Madeleg va revenir vers vous. Vous allez également recevoir un email avec le récapitulatif de
          votre estimation.
        </p>
      </div>
    );
  }

  if (etat.vue === "coordonnees") {
    return (
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-7">
        <button
          type="button"
          onClick={() => setEtat({ vue: "estimation", phase: "formulaire" })}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-link)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--emerald-600)" }}>
            Estimation validée
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-5">Prêt à passer à l&apos;action ?</h2>

          <div className="lueur-ambre inline-flex items-baseline gap-2 rounded-full px-6 py-3" style={{ backgroundColor: "var(--emerald-50)" }}>
            <span className="font-titres text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--amber-500)" }}>
              {euros(Math.round(resultatAnime))}
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--emerald-600)" }}>d&apos;économies estimées</span>
          </div>

          <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
            Renseignez vos coordonnées pour valider votre demande.
          </p>

          <div className="flex items-center justify-center gap-5 mt-4 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            <span className="inline-flex items-center gap-1.5">
              <span style={{ color: "var(--emerald-600)" }}>
                <IconeCoche className="w-4 h-4" />
              </span>
              Analyse gratuite
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span style={{ color: "var(--emerald-600)" }}>
                <IconeChrono className="w-4 h-4" />
              </span>
              2 min
            </span>
          </div>
        </div>

        <form onSubmit={soumettreEtape2} className="space-y-5">
          <div className="space-y-5">
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
              className="mdl-btn mdl-btn--primary mdl-btn--md disabled:opacity-60"
            >
              {envoiEtape2 ? "Envoi en cours…" : "Valider ma demande"}
            </button>
            {erreurEtape2 && <p className="text-sm text-red-700 mt-3">{erreurEtape2}</p>}

            <p className="text-xs mt-4 text-center max-w-md" style={{ color: "var(--text-muted)" }}>
              En validant ce formulaire, vous acceptez la{" "}
              <a href="/politique-de-confidentialite" className="underline">
                politique de confidentialité
              </a>{" "}
              et vous acceptez d&apos;être recontacté par un expert dans le cadre de cette estimation.
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8">
      <form onSubmit={soumettreEtape1} className="space-y-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <Curseur
            label="Capital restant"
            icone={<IconeEuro className="w-4 h-4" />}
            valeur={Math.min(capital, CAPITAL_MAX)}
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

        {capital >= CAPITAL_MAX && (
          <div>
            <span className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>
              Capital supérieur à {euros(CAPITAL_MAX)} ? Saisissez le montant exact
            </span>
            <input
              type="number"
              min={CAPITAL_MAX}
              step={CAPITAL_PAS}
              placeholder="Ex : 950 000"
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v) && v > 0) setCapital(v);
              }}
              className="w-full px-4 py-3 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--text-body)",
                "--tw-ring-color": "var(--emerald-600)"
              } as React.CSSProperties}
            />
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {ages.map((age, i) => (
            <div key={i}>
              <span className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                Âge emprunteur {i + 1}
              </span>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--emerald-600)" }}>
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
                    className="w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-body)",
                      "--tw-ring-color": "var(--emerald-600)"
                    } as React.CSSProperties}
                  />
                </div>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => retirerEmprunteur(i)}
                    aria-label="Retirer cet emprunteur"
                    className="shrink-0 w-9 h-9 rounded-full border transition-colors"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-muted)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--emerald-600)";
                      e.currentTarget.style.color = "var(--emerald-600)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
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
              className="flex items-center justify-center gap-2 rounded-xl border border-dashed text-sm font-medium py-3 transition-colors"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--emerald-600)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--emerald-600)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              + Ajouter un co-emprunteur
            </button>
          )}
        </div>

        {apercu && (
          <div className="lueur-ambre text-center py-4 border-y" style={{ borderColor: "var(--border-subtle)" }}>
            <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>Estimation de votre économie</p>
            <p className="font-titres text-4xl sm:text-5xl font-extrabold" style={{ color: "var(--amber-500)" }}>
              {euros(Math.round(apercuAnime))}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Estimation indicative de l&apos;économie par rapport au tarif moyen d&apos;un contrat bancaire*
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={etat.phase === "chargement" || !apercu}
            className="mdl-btn mdl-btn--primary mdl-btn--lg disabled:opacity-60"
          >
            {etat.phase === "chargement" ? "Calcul en cours…" : "Valider mon estimation"}
          </button>
        </div>

        {etat.phase === "erreur" && <p className="text-sm text-center" style={{ color: "#dc2626" }}>{etat.message}</p>}

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
          <span className="inline-flex items-center gap-1.5">
            <span style={{ color: "var(--emerald-600)" }}>
              <IconeEuro className="w-4 h-4" />
            </span>
            Gratuit
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span style={{ color: "var(--emerald-600)" }}>
              <IconeCoche className="w-4 h-4" />
            </span>
            Sans engagement
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span style={{ color: "var(--emerald-600)" }}>
              <IconeChrono className="w-4 h-4" />
            </span>
            30 secondes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span style={{ color: "var(--emerald-600)" }}>
              <IconeBouclier className="w-4 h-4" />
            </span>
            Données confidentielles
          </span>
        </div>
        <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
          *
          <Link href="/assurance-emprunteur#garanties" className="underline">
            Voir le détail des garanties
          </Link>
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
        <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-body)" }}>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: "var(--emerald-50)", color: "var(--emerald-600)" }}>
            {icone}
          </span>
          {label}
        </span>
        <span className="font-titres text-lg font-bold" style={{ color: "var(--emerald-600)" }}>{affichage}</span>
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
      <span className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-body)" }}>{label}</span>
      {children}
    </label>
  );
}
