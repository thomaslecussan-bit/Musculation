# Forge — carnet de musculation

Appli web perso pour suivre ses séances de musculation : séances, poids, séries, répétitions, notes, records et pesées.
Un seul fichier (`Khilliann.html`), sans serveur, sans compte : les données restent **sur le téléphone** (stockage du navigateur).

Adresse : `https://thomaslecussan-bit.github.io/Musculation/Khilliann.html`

- **Recherche d'exercice** : en mode Modifier, touche le nom de l'exercice → fenêtre avec barre de recherche en haut (accents ignorés, filtre aussi par muscle ou matériel).

## Fonctionnalités (V3)

- Code à 4 chiffres choisi à la première ouverture (stocké sur l'appareil)
- **8 séances** (chiffres néon 1 à 8 : Haut A, Bas A, Haut B, Bas B, Haut C, Bas C, Haut D, Bas D)
- Catalogue de **168 exercices** : machines Technogym, haltères, barre, poulies, classés par muscle
- Saisie **poids / séries / reps**, pré-remplie avec la dernière séance, enregistrement ligne par ligne (✓)
- **Notes** sur chaque exercice (bulle), visibles dans l'historique
- **Records (PR)** : puce dorée quand on bat son meilleur poids
- Historique filtrable + **courbe de progression** par exercice
- Suivi du **poids de corps** (courbe, moyenne mobile, objectif)
- Chrono de repos (réglable), alerte sonore et vibration
- **Export / import** de sauvegarde (JSON)
- **Tutoriel** à la première ouverture (désactivable, relançable depuis le bas de page)
- **Installable** sur l'écran d'accueil et utilisable **hors ligne**

## Fichiers à mettre dans le dépôt (tous au même niveau)

| Fichier | Rôle |
|---|---|
| `Khilliann.html` | l'application |
| `manifest.webmanifest` | informations d'installation (nom, icônes, plein écran) |
| `sw.js` | fonctionnement hors ligne |
| `icon-192.png`, `icon-512.png` | icônes de l'appli |
| `arcane-duo.jpg.png` | image de fond (optionnelle ; si elle est absente, le fond reste uni) |
| `README.md` | ce fichier |

## Mettre à jour

1. Sur GitHub : **Add file → Upload files**, déposer les fichiers modifiés (ils remplacent les anciens), puis **Commit changes**.
2. Attendre 1 à 2 minutes (GitHub Pages republie), puis rouvrir l'appli. La page se recharge depuis GitHub dès qu'il y a du réseau.
3. Les données (séances, poids, programme) ne sont **jamais** touchées par une mise à jour : elles dépendent de l'adresse, pas du fichier.

Si l'appli semble « figée » sur une ancienne version, change le numéro `VERSION` en haut de `sw.js` (ex. `forge-v3-2` → `forge-v3-3`) et recharge.

## Tester sans risque

Ajoute `?test` à l'adresse : `…/Khilliann.html?test`.
L'appli utilise alors un espace **totalement séparé** (son propre code, ses propres données), avec un bandeau « MODE TEST ».
Deux boutons : « Copier mes vraies données ici » (pour tester avec ton historique réel) et « Vider le test ».
Les vraies données ne sont jamais lues ni modifiées en mode test.

## Sauvegarde

Les données ne sont que sur l'appareil. Exporte un fichier de secours régulièrement (bas de page → « Exporter mes données »),
surtout avant de changer de téléphone ou de vider les données du navigateur. L'import remplace toutes les données de l'appareil.

## Partager avec un collègue

Chaque téléphone a ses propres données et son propre code : il suffit de lui donner l'adresse.
(Sur iPhone, l'appli installée sur l'écran d'accueil garde ses données à part de celles de Safari : choisir l'un ou l'autre.)

## Technique

HTML/CSS/JavaScript pur, aucune dépendance (hors polices Google : Oswald et Inter). Stockage : `localStorage`.
