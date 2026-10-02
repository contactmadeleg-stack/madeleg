# Vidéo « Le parcours avec un courtier »

Motion design de 15 s, format vertical 1080×1920 (Reels, TikTok, Stories, Shorts), 60 i/s,
H.264 + AAC 48 kHz, sonie −14 LUFS. Fichiers livrés : `parcours-courtier-9x16.mp4` et
`couverture-9x16.png` (image de couverture pour les Reels).

## Déroulé

| Temps | Étape | Ce qu'on voit |
|---|---|---|
| 0 – 1 s | Ouverture | Titre « Le parcours avec un courtier » qui devient l'en-tête, maison dessinée au trait, stepper 1→7 |
| 1 – 2,5 s | 1. Premier rendez-vous | Carte calendrier (date en défilement), vous + votre courtier, validation |
| 2,5 – 4 s | 2. Attestation de financement | Le calendrier bascule en attestation, capacité d'achat 350 000 €, tampon « Budget validé » |
| 4 – 5,75 s | 3. Visites, puis offre d'achat | Carrousel de biens, coup de cœur, offre à 320 000 €, clic sur « Envoyer » |
| 5,75 – 7,5 s | 4. Offre acceptée, compromis signé | Notification d'acceptation, bascule en compromis, double signature au stylo |
| 7,5 – 10,5 s | 5. Négociation avec les banques | Le compromis est remis au courtier, qui relance trois banques ; les taux baissent, tampon « Accord de prêt », la carte devient l'offre de prêt |
| 10,5 – 12,5 s | 6. Acte signé, clés récupérées | L'acte authentique se pose sur l'offre, signature, sceau, chute du trousseau |
| 12,5 – 15 s | 7. Champagne ! | Passage par le trou de la clé, bouteille, bouchon, confettis, phrase de fin |

Les montants et les taux (350 000 €, 320 000 €, 3,20 % sur 25 ans) sont illustratifs.

## Reconstruire

```bash
cd video/parcours-courtier
npm ci                      # GSAP et Playwright
npx playwright install chromium   # si aucun Chromium n'est disponible
pip install numpy scipy
./build.sh                  # images → bande-son → parcours-courtier-9x16.mp4 (~4 min)
```

Itérations rapides :

```bash
node render.mjs --stills 3.5,9.4,14.9   # images fixes + planche contact dans out/
node render.mjs --preview               # 30 i/s sans flou de mouvement, ~20 s
node render.mjs --stills 0.76 --cover   # image de couverture (stepper figé)
```

## Où modifier

- **Textes et timing** : `scene.js`. Les repères de chaque étape sont dans `const T`, les titres
  dans les appels `headline([...])`, les montants dans les odomètres (`s2Digits`, `offerDigits`,
  `bankDefs`).
- **Son** : `audio.py` (musique 120 BPM en fa majeur, effets placés sur les repères exportés
  par la scène dans `out/cues.json`). Tout est synthétisé, aucun échantillon externe.
- **Rendu** : `render.mjs` (`--fps`, `--samples` pour le flou de mouvement, `--from/--to`).

La scène est une fonction pure du temps : chaque image est rendue indépendamment, ce qui
permet le rendu parallèle et le flou de mouvement par sur-échantillonnage temporel.

## Marque et conformité

La vidéo ne porte pas le logo madeleg : `PRODUCT.md` rappelle que madeleg n'est pas courtier
et ne doit pas être présenté comme tel. Elle reprend seulement la palette et la typographie du
design system. Pour la publier sous une marque habilitée (courtier ou mandataire IOBSP), il
faut ajouter un carton de fin et les mentions réglementaires de cette marque.

## Licences

- Polices Schibsted Grotesk et Instrument Sans : SIL Open Font License 1.1 (`fonts/OFL-*.txt`).
- Icônes : tracés Lucide (licence ISC) recopiés dans `scene.js`.
- GSAP : licence standard gratuite de GreenSock/Webflow.
- Musique et bruitages : générés par `audio.py`.
