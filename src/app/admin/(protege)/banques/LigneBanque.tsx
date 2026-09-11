"use client";

import { useRef, useState } from "react";

export default function LigneBanque({
  id,
  nomInitial,
  logoUrlInitiale,
  actifInitial,
  ordreInitial,
}: {
  id: string;
  nomInitial: string;
  logoUrlInitiale: string | null;
  actifInitial: boolean;
  ordreInitial: number;
}) {
  const [nom, setNom] = useState(nomInitial);
  const [ordre, setOrdre] = useState(ordreInitial);
  const [enregistre, setEnregistre] = useState({ nom: nomInitial, ordre: ordreInitial });
  const [logoUrl, setLogoUrl] = useState(logoUrlInitiale);
  const [actif, setActif] = useState(actifInitial);
  const [enCours, setEnCours] = useState(false);
  const [envoiLogo, setEnvoiLogo] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const inputFichier = useRef<HTMLInputElement>(null);

  const modifie = nom !== enregistre.nom || ordre !== enregistre.ordre;

  async function enregistrer() {
    setEnCours(true);
    setErreur(null);
    try {
      const res = await fetch(`/api/admin/banques/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, ordre }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreur(data?.error ?? "Échec de l'enregistrement.");
        return;
      }
      setEnregistre({ nom, ordre });
    } catch {
      setErreur("Connexion impossible. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  async function basculerActif() {
    const nouvelActif = !actif;
    setActif(nouvelActif);
    setErreur(null);
    const res = await fetch(`/api/admin/banques/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: nouvelActif }),
    }).catch(() => null);
    if (!res || !res.ok) {
      setActif(!nouvelActif);
      setErreur("Échec de la mise à jour du statut.");
    }
  }

  async function televerserLogo(fichier: File) {
    const logoPrecedent = logoUrl;
    // Aperçu immédiat local, avant même que la requête réseau ne parte :
    // le visiteur voit son fichier choisi à l'instant, sans dépendre de la
    // latence d'upload — c'est ce qui manquait et rendait le changement de
    // logo invisible ("rien ne se passe") en attendant la vraie réponse.
    const apercuLocal = URL.createObjectURL(fichier);
    setLogoUrl(apercuLocal);
    setEnvoiLogo(true);
    setErreur(null);

    const form = new FormData();
    form.append("logo", fichier);
    try {
      const res = await fetch(`/api/admin/banques/${id}/logo`, { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setLogoUrl(logoPrecedent);
        setErreur(data?.error ?? "Échec de l'envoi du logo.");
        return;
      }
      setLogoUrl(data.logoUrl);
    } catch {
      setLogoUrl(logoPrecedent);
      setErreur("Connexion impossible pendant l'envoi du logo. Réessayez.");
    } finally {
      setEnvoiLogo(false);
      URL.revokeObjectURL(apercuLocal);
    }
  }

  return (
    <tr className="border-b last:border-0" style={{ borderColor: "var(--border-subtle)" }}>
      <td className="py-3 pl-6 pr-4">
        <button
          type="button"
          onClick={() => inputFichier.current?.click()}
          disabled={envoiLogo}
          title="Changer le logo"
          className="relative w-12 h-12 shrink-0 rounded-lg border flex items-center justify-center overflow-hidden bg-white group"
          style={{ borderColor: "var(--border-default)" }}
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="" className="max-w-full max-h-full object-contain p-1" />
          ) : (
            <span className="text-[9px] text-center px-1" style={{ color: "var(--text-subtle)" }}>
              Aucun logo
            </span>
          )}
          <span
            className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "rgba(11,18,32,0.6)" }}
          >
            {envoiLogo ? "Envoi…" : "Changer"}
          </span>
        </button>
        <input
          ref={inputFichier}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) televerserLogo(f);
            e.target.value = "";
          }}
        />
      </td>

      <td className="py-3 pr-4 min-w-[10rem]">
        <input value={nom} onChange={(e) => setNom(e.target.value)} className="champ-saisie !py-1.5 font-medium" />
      </td>

      <td className="py-3 pr-4">
        <input
          type="number"
          value={ordre}
          onChange={(e) => setOrdre(Number(e.target.value))}
          className="champ-saisie !py-1.5 w-16 text-center"
        />
      </td>

      <td className="py-3 pr-4">
        <button
          type="button"
          onClick={basculerActif}
          className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${
            actif
              ? "border-[var(--color-sauge)] bg-[var(--color-sauge-clair)] text-[var(--color-marque)]"
              : "border-[var(--color-bordure)] text-[var(--color-texte-doux)]"
          }`}
        >
          {actif ? "Actif" : "Masqué"}
        </button>
      </td>

      <td className="py-3 pr-6 text-right">
        <button
          type="button"
          onClick={enregistrer}
          disabled={!modifie || enCours}
          className="mdl-btn mdl-btn--primary mdl-btn--sm disabled:opacity-50"
        >
          {enCours ? "…" : "Enregistrer"}
        </button>
        {erreur && <p className="text-xs text-red-700 mt-1 max-w-[16rem] ml-auto">{erreur}</p>}
      </td>
    </tr>
  );
}
