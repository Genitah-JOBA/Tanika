# Tanika — Atelier de céramique

Site vitrine monopage de **Tanika**, atelier de céramique contemporain à Antananarivo (Madagascar) — projet de démonstration. « La terre, guidée par la main. »

## Sommaire

- [Démarrage](#démarrage)
- [Structure](#structure)
- [Sections](#sections)
- [Personnalisation](#personnalisation)
- [Images](#images)
- [Licence](#licence)

## Démarrage

Aucune dépendance ni build : ouvrez `index.html` dans un navigateur, ou servez le dossier avec n'importe quel serveur statique.

```bash
# ex. avec Python
python -m http.server 8000
# ou avec Node
npx serve .
```

## Structure

```
Site_cafe/
├── index.html          # Page unique (sémantique, fr, JSON-LD)
├── assets/
│   ├── css/style.css   # Style système (variables, sections, responsive)
│   ├── js/main.js      # Interactions vanilla : nav, reveal, compteurs, courbe
│   └── img/            # Photographies (Pexels) + sceau + texture velin
├── robots.txt
└── sitemap.xml         # https://www.tanika.mg/
```

## Sections

1. **Hero** — split desktop (texte sur fond crème / image à droite), plein écran en mobile avec voile dégradé.
2. **Chiffres** — compteurs animés (`data-count`, années calculées depuis 2018).
3. **La Maison** — histoire de l'atelier, 3 valeurs (icônes ligne SVG).
4. **Le Savoir** — étapes de l'argile, courbe de cuisson dessinée au scroll (`#roastPath`), 4 argiles.
5. **La Boutique** — 6 produits + 3 coffrets en ariary (grille `.shop-grid`).
6. **Les Ateliers** — 3 formules (initiation, modelage, privatisation).
7. **FAQ** — `<details>`/`<summary>`, données riches JSON-LD.
8. **Venir & Contact** — adresse, horaires, accès, carte SVG du quartier, boutons mail/tél.

### Icônes

Sprite SVG inline en `<head>` de `index.html` (`<symbol id="i-*">`), utilisées via `<use href="#i-…">`. Style : trait 1.8, `currentColor`, arrondi. Ajoutez un symbole au sprite puis référencez-le dans le balisage.

### Courbe de cuisson

`main.js` observe la section `#savoir` et anime `#roastPath` (classe `.is-drawn`). Désactivée avec `prefers-reduced-motion`.

## Personnalisation

- **Couleurs / typographie / rayons** : variables CSS en tête de `style.css` (`:root`, palette terre terracotta).
- **Coordonnées** : adresse, téléphone, e-mail présents dans `index.html` (header, hero, contact, footer) et dans les données structurées.
- **Produits** : cartes dans `.shop-grid` (nom, description, prix en `Ar`).
- **Domaine** : `https://www.tanika.mg/` (canonical, `robots.txt`, `sitemap.xml`).

## Images

Toutes les photographies proviennent de **Pexels** (licence libre) et sont stockées localement dans `assets/img/`. Le sceau (`seal.png` / symbole SVG `#seal`) et la texture de fond (`velin.jpg`) sont des éléments du design.

## Licence

Site de **démonstration** : l'établissement, les produits, l'atelier et les coordonnées sont fictifs. Typographies : Cormorant Garamond, EB Garamond, Jost (Google Fonts). Photos : Pexels.