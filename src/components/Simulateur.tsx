"use client";

import { useState, FormEvent } from "react";
import type { PointAnnuel } from "@/lib/calcul/simulation";
import { BANQUES } from "@/lib/banques";
import GraphiquePrimes from "./GraphiquePrimes";

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

function euros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Simulateur() {
  const [etat, setEtat] = useState<Etat>({ phase: "formulaire" });
  const [envoiEtape2, setEnvoiEtape2] = useState(false);
  const [erreurEtape2, setErreurEtape2] = useState<string | null>(null);

  async function soumettreEtape1(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const capital = Number(form.get("capital"));
    const dureeRestanteAnnees = Number(form.get("dureeRestanteAnnees"));
    const age = Number(form.get("age"));

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
        <h2 className="text-2xl font-semibold text-[var(--color-texte)]">
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
      <form onSubmit={soumettreEtape1} className="rounded-2xl border border-[var(--color-bordure)] bg-[var(--color-fond-carte)] p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-3 gap-5">
          <Champ label="Capital emprunté" suffixe="€">
            <input
              type="number"
              name="capital"
              required
              min={1000}
              max={2000000}
              step={1000}
              placeholder="200 000"
              className="champ-saisie"
            />
          </Champ>
          <Champ label="Durée restante" suffixe="ans">
            <input
              type="number"
              name="dureeRestanteAnnees"
              required
              min={1}
              max={35}
              placeholder="18"
              className="champ-saisie"
            />
          </Champ>
          <Champ label="Votre âge" suffixe="ans">
            <input
              type="number"
              name="age"
              required
              min={18}
              max={85}
              placeholder="38"
              className="champ-saisie"
            />
          </Champ>
        </div>

        <button
          type="submit"
          disabled={etat.phase === "chargement"}
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[var(--color-vert)] text-white font-medium hover:bg-[var(--color-vert-fonce)] disabled:opacity-60 transition-colors"
        >
          {etat.phase === "chargement" ? "Calcul en cours…" : "Valider mon estimation"}
        </button>

        {etat.phase === "erreur" && (
          <p className="text-sm text-red-700">{etat.message}</p>
        )}
      </form>

      {etat.phase === "resultat" && (
        <div className="rounded-2xl border border-[var(--color-bordure)] bg-[var(--color-fond-carte)] p-6 sm:p-8 space-y-8">
          <div>
            <p className="text-[var(--color-texte-doux)] mb-1">Votre économie estimée sur la durée restante</p>
            <p className="text-5xl sm:text-6xl font-bold text-[var(--color-vert)]">
              {euros(etat.economieAffichee)}
            </p>
          </div>

          <GraphiquePrimes courbe={etat.courbe} />

          <ul className="text-sm text-[var(--color-texte-doux)] space-y-1">
            <li>Simulation gratuite et sans engagement.</li>
            <li>Assureurs partenaires agréés ACPR.</li>
            <li>Formalités simplifiées possibles selon votre profil.</li>
          </ul>

          <div className="border-t border-[var(--color-bordure)] pt-8">
            <h3 className="text-lg font-semibold text-[var(--color-texte)] mb-1">
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
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[var(--color-texte)] text-white font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
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
