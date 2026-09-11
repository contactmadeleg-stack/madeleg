# madeleg — Design System (applied)

Direction: **Fintech startup** × **Financial trust** — moderne, net, chiffré, sans surenchère.

## Sourcing

Le design system est fourni en intégralité dans `/tmp/claude-0/-home-user-madeleg/094bcde5-759e-5958-9caa-bf2c8debe158/scratchpad/` (dossier madeleg_Design_System.zip):
- `tokens/` — Variables CSS complètes (couleurs, typos, espacement, rayons, ombres)
- `css/` — Classes Utility du design system (buttons, forms, surfaces, feedback, navigation)
- `components/` — Tous les composants JSX/documentation
- `guidelines/` — Cartes de couleur, typographie, espacement, iconographie, voix & ton
- `ui_kits/` — Maquettes du site vitrine et espace client

## Palette & sémantique

| Rôle | Couleur | Utilisation |
|------|---------|------------|
| **Encre** | Bleu nuit `#060B14`–`#F3F6FA` | Dominante: texte, actions, sections pleine largeur |
| **Émeraude** | Vert signature `#00784F`–`#D9F5E8` | **SEUL vert de la page**: économie, validation, action primaire |
| **Ambre** | Doré `#D98324`–`#FDF5EC` | Attention, explications, contexte pédagogique |
| **Sable** | Taupe clair `#F6F2EA`–`#FBF9F5` | Fonds de pages longues (marketing, FAQ) vs. blanc |
| **Sémantiques** | Rouge (refus), Bleu (info) | Uniquement pour statut/validation, jamais décoratif |

**Règle critique**: Couplage sémantique émeraude = argent économisé. Un vert décoratif détruit cette promesse.

---

## Typographie

| Rôle | Famille | Usage | Notes |
|-----|---------|-------|-------|
| **Display** | Schibsted Grotesk 700/800 | Titres, chiffres mis en scène | Interlettrage −0.03 à −0.05em |
| **Texte** | Instrument Sans 400/500/600 | Paragraphes, labels, UI | 18px marketing, 16px défaut, 14px interface |
| **Mono** | Geist Mono 400/500 | Références, IBAN, identifiants | Jamais pour montants en grand |

**Montants toujours** en `font-variant-numeric: tabular-nums` (alignement colonne).

---

## Espacement & rayons

| Élément | Valeur |
|---------|--------|
| **Base** | 4px |
| **Gouttière page** | 24px |
| **Rayons micro** | 6–8px |
| **Rayons contrôles** | 10px |
| **Rayons cartes** | 14px |
| **Rayons modales** | 20px |
| **Rayons badges** | Pilule (999px) |
| **Section verticale** | 96px (128px hero, 64px compact) |

Densité application: 16px entre cartes, 24px padding interne.

---

## Ombres

**Toutes teintées encre** `rgba(11,18,32,·)`, jamais noires.

| Niveau | Utilisation |
|--------|------------|
| `--shadow-sm` | Élément flottant au repos |
| `--shadow-md` | Carte cliquable au survol |
| `--shadow-lg` | Élément détaché |
| `--shadow-xl` | Modale |

---

## États

- **Survol**: Un cran plus sombre + fond `--ink-50` sur surfaces claires + bordure `--ink-300`
- **Pression**: Deux crans + `translateY(1px)` + ombre retirée (bouton s'enfonce)
- **Focus**: Anneau émeraude 3px (28 %) — jamais supprimé
- **Désactivé**: Fond `--ink-100` + texte `--ink-400` + curseur interdit
- **Chargement**: Spinner 16px `currentColor` dans le bouton, libellé masqué

---

## Mouvement

- **Contrôle**: 80ms
- **Survol**: 140ms
- **Bascule**: 200ms
- **Entrée modale**: 320ms (`--ease-entrance`)
- **Révélation défilement**: 520ms (fondu + 12px montée, une seule fois)

**Jamais de rebond, ressort, rotation décorative ou animation boucle.** Respecter `prefers-reduced-motion` (0ms sauf changements de couleur).

---

## Composants clés

- **Logo**: Typographique `madeleg` bas de casse (voir `components/core/Logo.jsx`)
- **Button**: Encre 900 primary, émeraude 600 accent, white secondary, ghost border
- **RangeSlider**: Critère du simulateur (curseur pour capital, durée, âge)
- **Stepper**: Parcours linéaire en étapes
- **StatCard/OfferCard**: Objets métier (économie, offre assureur)
- **Icon**: Lucide 0.460.0 via masque CSS, hérité `currentColor`
- **Card**: 14px rayon + 1px bordure subtle + blanc fond

---

## Imagerie & graphiques

- **Photos**: Pas fournies — réserves `.mdl-ph` visibles (sable + libellé). Direction: documentaire, lumière froide, grain fin, pas de stock souriant. Rayon 14px, jamais de dégradé de protection.
- **Graphiques**: Courbes 2px sans remplissage sauf aire unique émeraude 12 %. Grille horizontale. Axes en €. Positif = émeraude, négatif = rouge, neutre = ink-400. Chiffre clé en Display à côté du graphique.

---

## Iconographie

**Lucide 0.460.0** via CDN (masque CSS), teintée `currentColor`.

**Tailles**: 16px buttons/champs, 18px défaut, 24px pédagogie, 32px max étape.

**Vocabulaire récurrent**:
- `shield-check` (garantie)
- `trending-down` (baisse cotisation)
- `piggy-bank` (économie)
- `file-signature` (mandat)
- `calculator` (simulation)
- `building-2` (banque)
- `users` (réseau)
- `lock` (sécurité)

Jamais de couleur décorative — hérite du texte. Exceptions: coche émeraude validation, triangle ambre alerte.

---

## En-tête & navigation

- **Sticky**: 72px, fond blanc opaque + filet bas au défilement (pas de flou — chiffres lisibles derrière)
- **Cible**: Logo + nav principale (texte) + CTA secondaire (bouton)

---

## Conformité

Texte de conformité (`--text-muted`, 13px, Alert tone=neutral) visibilité assumée — ce n'est pas une gêne, c'est un argument de confiance. ORIAS, statut, rémunération, source des performances en pied de page et parcours.

---

## Anti-patterns

❌ Gradients  
❌ Dégradés de fond  
❌ Carte en verre, en-tête translucide  
❌ Animations décoratives en boucle  
❌ Changement d'opacité pour survol  
❌ Ombre noire  
❌ Emoji  
❌ Point d'exclamation hors félicitation  
❌ Superlatif non chiffré  
❌ Urgence artificielle (compte à rebours, « plus que N places »)  
❌ Comparaison nominative défavorable à un assureur
