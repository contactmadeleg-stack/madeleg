"use client";

import { useState, useMemo, FormEvent } from "react";
import {
  calculerSimulation,
  trouverTauxDansGrille,
  type PointAnnuel,
  type TrancheAge,
} from "@/lib/calcul/simulation";
import { BANQUES } from "@/lib/banques";
import { useCompteurAnime } from "@/lib/useCompteurAnime";
import GraphiquePrimes from "./GraphiquePrimes";
import ProgressionEtapes from "./ProgressionEtapes";
import BandeConfiance from "./BandeConfiance";

type Etat =
  | { phase: "formulaire" }
  | { phase: "chargement" }
  | { phase: "erreur"; message: string }
  | {
      phase: "resultat";
      simulationId: string;
      economieAffichee: number;
      courbe: PointAnnuel[];
    }
  | { phase: "confirmation"; prenom: string };

const CAPITAL_MIN = 20_000;
const CAPITAL_MAX = 800_000;
const CAPITAL_PAS = 5_000;
const DUREE_MIN = 1;
const DUREE_MAX = 30;
const AGE_MIN = 18;
const AGE_MAX = 85;

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
}: {
  grillesBanque: TrancheAge[];
  grillesDelegation: TrancheAge[];
}) {
  const [capital, setCapital] = useState(200_000);
  const [dureeRestanteAnnees, setDureeRestanteAnnees] = useState(20);
  const [age, setAge] = useState(35);

  const [etat, setEtat] = useState<Etat>({ phase: "formulaire" });
  const [envoiEtape2, setEnvoiEtape2] = useState(false);
  const [erreurEtape2, setErreurEtape2] = useState<string | null>(null);

  const apercu = useMemo(() => {
    const tauxBanque = trouverTauxDansGrille(grillesBanque, age);
    const tauxDelegation = trouverTauxDansGrille(grillesDelegation, age);
    if (tauxBanque === null || tauxDelegation === null) return null;
    return calculerSimulation({ capital, dureeRestanteAnnees, tauxBanqueMoyen: tauxBanque, tauxDelegation });
  }, [capital, dureeRestanteAnnees, age, grillesBanque, grillesDelegation]);

  const apercuAnime = useCompteurAnime(apercu?.economieAffichee ?? 0, 500);
  const resultatAnime = useCompteurAnime(etat.phase === "resultat" ? etat.economieAffichee : 0, 1200);

  const etapeActive: 1 | 2 | 3 = etat.phase === "resultat" || etat.phase === "confirmation" ? 3 : 1;

  async function soumettreEtape1(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat({ phase: "chargement" });

    try {
      const res = await fetch("/api/simulation-etape1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          capital,
          dureeRestanteAnnees,
          age,
          sourceTrafic: typeof document !== "undefined" ? document.referrer || "direct" : undefined,
        }),
      });

      if (!res.ok) {
        setEtat({
          phase: "erreur",
          message: "Impossible de calculer votre estimation pour le moment. Réessayez dans un instant.",
        });
        return;
      }

      const data = await res.json();
      setEtat({
        phase: "resultat",
        simulationId: data.simulationId,
        economieAffichee: data.economieAffichee,
        courbe: data.courbe,
      });
    } catch {
      setEtat({
        phase: "erreur",
        message: "Une erreur est survenue. Vérifiez votre connexion et réessayez.",
      });
    }
  }

  async function soumettreEtape2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat.phase !== "resultat") return;

    const form = new FormData(e.currentTarget);
    const prenom = String(form.get("prenom") ?? "");
    const nom = String(form.get("nom") ?? "");
    const email = String(form.get("email") ?? "");
    const mobile = String(form.get("mobile") ?? "");
    const banqueSelectionnee = String(form.get("banqueSelectionnee") ?? "");

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

      setEtat({ phase: "confirmation", prenom });
    } catch {
      setErreurEtape2("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
      setEnvoiEtape2(false);
    }
  }

  if (etat.phase === "confirmation") {
    return (
      <div className="rounded-2xl border border-[var(--color-bordure)] bg-[var(--color-fond-carte)] p-8 text-center space-y-3">
        <h2 className="text-2xl font-bold text-[var(--color-marque)]">
          Merci {etat.prenom}, votre demande est bien reçue.
        </h2>
        <p className="text-[var(--color-texte-doux)]">
          Un conseiller Madeleg vous rappelle sous <strong>24h ouvrées</strong>. Vous allez également recevoir un
          email avec le récapitulatif de votre estimation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[var(--color-bordure)] bg-[var(--color-fond-carte)] p-6 sm:p-8">
        <ProgressionEtapes etapeActive={etapeActive} />

        <form onSubmit={soumettreEtape1} className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <Curseur
              label="Capital restant dû"
              valeur={capital}
              affichage={euros(capital)}
              min={CAPITAL_MIN}
              max={CAPITAL_MAX}
              pas={CAPITAL_PAS}
              onChange={setCapital}
            />
            <Curseur
              label="Durée restante"
              valeur={dureeRestanteAnnees}
              affichage={`${dureeRestanteAnnees} an${dureeRestanteAnnees > 1 ? "s" : ""}`}
              min={DUREE_MIN}
              max={DUREE_MAX}
              pas={1}
              onChange={setDureeRestanteAnnees}
            />
          </div>

          <Champ label="Votre âge" suffixe="ans">
            <input
              type="number"
              required
              min={AGE_MIN}
              max={AGE_MAX}
              value={age}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v)) setAge(v);
              }}
              className="champ-saisie sm:max-w-[160px]"
            />
          </Champ>

          {apercu && (
            <div className="text-center py-4 border-y border-[var(--color-bordure)]">
              <p className="text-sm text-[var(--color-texte-doux)] mb-1">Estimation de votre économie</p>
              <p className="font-titres text-4xl sm:text-5xl font-extrabold text-[var(--color-ambre)]">
                {euros(Math.round(apercuAnime))}
              </p>
              <p className="text-xs text-[var(--color-texte-doux)] mt-1">
                sur la durée restante, tarif moyen d&apos;un contrat bancaire*
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={etat.phase === "chargement" || !apercu}
            className="btn-madeleg w-full sm:w-auto px-8 py-3 bg-[var(--color-marque)] text-white hover:bg-[var(--color-marque-clair)] disabled:opacity-60"
          >
            {etat.phase === "chargement" ? "Calcul en cours…" : "Valider mon estimation"}
          </button>

          {etat.phase === "erreur" && (
            <p className="text-sm text-red-700">{etat.message}</p>
          )}
        </form>
      </div>

      {etat.phase === "resultat" && (
        <div className="rounded-2xl border border-[var(--color-bordure)] bg-[var(--color-fond-carte)] p-6 sm:p-8 space-y-8">
          <div>
            <p className="text-[var(--color-texte-doux)] mb-1">Votre économie estimée sur la durée restante</p>
            <p className="font-titres text-5xl sm:text-6xl font-extrabold text-[var(--color-ambre)]">
              {euros(Math.round(resultatAnime))}
            </p>
          </div>

          <GraphiquePrimes courbe={etat.courbe} />

          <BandeConfiance />

          <ul className="text-sm text-[var(--color-texte-doux)] space-y-1">
            <li>*Estimation calculée sur un taux moyen de marché, avec une marge de sécurité de 25 %.</li>
            <li>Assureurs partenaires agréés ACPR.</li>
            <li>Formalités simplifiées possibles selon votre profil.</li>
          </ul>

          <div className="border-t border-[var(--color-bordure)] pt-8">
            <h3 className="font-titres text-lg font-bold text-[var(--color-marque)] mb-1">
              Recevez le détail personnalisé par un conseiller
            </h3>
            <p className="text-sm text-[var(--color-texte-doux)] mb-6">
              Rappel sous 24h ouvrées. Vos coordonnées ne sont utilisées que pour cet appel.
            </p>

            <form onSubmit={soumettreEtape2} className="grid sm:grid-cols-2 gap-5">
              <Champ label="Prénom">
                <input type="text" name="prenom" required maxLength={100} className="champ-saisie" />
              </Champ>
              <Champ label="Nom">
                <input type="text" name="nom" required maxLength={100} className="champ-saisie" />
              </Champ>
              <Champ label="Email">
                <input type="email" name="email" required maxLength={200} className="champ-saisie" />
              </Champ>
              <Champ label="Mobile">
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="06 12 34 56 78"
                  className="champ-saisie"
                />
              </Champ>
              <div className="sm:col-span-2">
                <Champ label="Votre banque actuelle" aide="Information indicative, sans impact sur le montant ci-dessus">
                  <select name="banqueSelectionnee" required defaultValue="" className="champ-saisie">
                    <option value="" disabled>
                      Sélectionnez votre banque
                    </option>
                    {BANQUES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Champ>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={envoiEtape2}
                  className="btn-madeleg w-full sm:w-auto px-8 py-3 bg-[var(--color-marque)] text-white hover:bg-[var(--color-marque-clair)] disabled:opacity-60"
                >
                  {envoiEtape2 ? "Envoi en cours…" : "Valider ma demande"}
                </button>
                {erreurEtape2 && <p className="text-sm text-red-700 mt-3">{erreurEtape2}</p>}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Curseur({
  label,
  valeur,
  affichage,
  min,
  max,
  pas,
  onChange,
}: {
  label: string;
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
        <span className="text-sm font-medium text-[var(--color-texte)]">{label}</span>
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

function Champ({
  label,
  suffixe,
  aide,
  children,
}: {
  label: string;
  suffixe?: string;
  aide?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[var(--color-texte)] mb-1.5">
        {label} {suffixe && <span className="text-[var(--color-texte-doux)] font-normal">({suffixe})</span>}
      </span>
      {children}
      {aide && <span className="block text-xs text-[var(--color-texte-doux)] mt-1">{aide}</span>}
    </label>
  );
}
