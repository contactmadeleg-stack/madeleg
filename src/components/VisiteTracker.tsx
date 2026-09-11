"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CLE_SESSION = "madeleg-visite-enregistree";

// Enregistre une visite au tout premier chargement de page de la session de
// navigation (onglet), jamais à chaque navigation interne — sessionStorage
// n'est ni un cookie ni un identifiant persistant : il disparaît à la
// fermeture de l'onglet et n'est jamais transmis au serveur. Reste
// cohérent avec la politique de confidentialité ("aucun cookie de mesure
// d'audience ni traceur publicitaire").
export default function VisiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // La console admin n'est pas un visiteur du site : ses propres allers-
    // retours ne doivent pas gonfler le compteur qu'elle affiche elle-même.
    if (pathname?.startsWith("/admin")) return;

    try {
      if (sessionStorage.getItem(CLE_SESSION)) return;
      sessionStorage.setItem(CLE_SESSION, "1");
    } catch {
      // Stockage indisponible (navigation privée stricte, etc.) : on
      // enregistre quand même cette visite, tant pis pour la dédup.
    }

    fetch("/api/visite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
