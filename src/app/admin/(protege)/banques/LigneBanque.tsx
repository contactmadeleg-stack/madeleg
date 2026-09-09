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
  const [logoUrl, setLogoUrl] = useState(logoUrlInitiale);
  const [actif, setActif] = useState(actifInitial);
  const [ordre, setOrdre] = useState(ordreInitial);
  const [envoiLogo, setEnvoiLogo] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const inputFichier = useRef<HTMLInputElement>(null);

  async function patch(donnees: Record<string, unknown>) {
    await fetch(`/api/admin/banques/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donnees),
    });
  }

  async function televerserLogo(fichier: File) {
    setEnvoiLogo(true);
    setErreur(null);
    const form = new FormData();
    form.append("logo", fichier);
    const res = await fetch(`/api/admin/banques/${id}/logo`, { method: "POST", body: form });
    const data = await res.json().catch(() => null);
    setEnvoiLogo(false);
    if (!res.ok) {
      setErreur(data?.error ?? "Échec de l'envoi");
      return;
    }
    setLogoUrl(data.logoUrl);
  }

  return (
    <div className="carte-madeleg p-4 flex items-center gap-4">
      <div className="w-16 h-16 shrink-0 rounded-lg border border-[var(--color-bordure)] flex items-center justify-center overflow-hidden bg-white">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt="" className="max-w-full max-h-full object-contain p-1.5" />
        ) : (
          <span className="text-[10px] text-[var(--color-texte-doux)] text-center px-1">Aucun logo</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          onBlur={() => patch({ nom })}
          className="champ-saisie !py-1.5 font-medium"
        />
        {erreur && <p className="text-xs text-red-700 mt-1">{erreur}</p>}
      </div>

      <label className="text-xs font-medium text-[var(--color-texte-doux)] flex items-center gap-1.5 shrink-0">
        Ordre
        <input
          type="number"
          value={ordre}
          onChange={(e) => setOrdre(Number(e.target.value))}
          onBlur={() => patch({ ordre })}
          className="champ-saisie !py-1.5 w-16"
        />
      </label>

      <button
        type="button"
        onClick={() => {
          setActif((v) => !v);
          patch({ actif: !actif });
        }}
        className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${
          actif
            ? "border-[var(--color-sauge)] bg-[var(--color-sauge-clair)] text-[var(--color-marque)]"
            : "border-[var(--color-bordure)] text-[var(--color-texte-doux)]"
        }`}
      >
        {actif ? "Actif" : "Masqué"}
      </button>

      <input
        ref={inputFichier}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) televerserLogo(f);
        }}
      />
      <button
        type="button"
        onClick={() => inputFichier.current?.click()}
        disabled={envoiLogo}
        className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-[var(--color-marque)] text-[var(--color-marque)] disabled:opacity-60"
      >
        {envoiLogo ? "Envoi…" : "Changer le logo"}
      </button>
    </div>
  );
}
