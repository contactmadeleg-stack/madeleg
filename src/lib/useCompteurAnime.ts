import { useEffect, useRef, useState } from "react";

// Anime la valeur affichée de son ancienne à sa nouvelle cible (ease-out
// cubique) au lieu de sauter directement — donne l'effet "révélation du
// chiffre" du playbook, aussi bien au premier calcul qu'en bougeant les curseurs.
export function useCompteurAnime(cible: number, dureeMs = 600): number {
  const [valeurAffichee, setValeurAffichee] = useState(cible);
  const depart = useRef(cible);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const debut = performance.now();
    const valeurDepart = depart.current;
    const delta = cible - valeurDepart;

    if (frameId.current !== null) cancelAnimationFrame(frameId.current);

    function tick(maintenant: number) {
      const progression = Math.min((maintenant - debut) / dureeMs, 1);
      const easing = 1 - Math.pow(1 - progression, 3);
      setValeurAffichee(valeurDepart + delta * easing);
      if (progression < 1) {
        frameId.current = requestAnimationFrame(tick);
      } else {
        depart.current = cible;
      }
    }

    frameId.current = requestAnimationFrame(tick);
    return () => {
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    };
  }, [cible, dureeMs]);

  return valeurAffichee;
}
