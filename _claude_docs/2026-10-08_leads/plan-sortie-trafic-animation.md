# Plan — Sortir le trafic « murder party » de Google

**Date** : 08/10/2026 · **Décision** : on ne veut pas de ce type de recherche (particuliers), même si ça casse la mesure du 03/11 sur cet article.

---

## Le constat (données fraîches 08/10)

- L'article `/blog/murder-party-chateau-activite-immersive` = **55 clics sur 135** en 28 jours (41 % du site).
- La recherche qui l'alimente : « murder party château » (18 clics sur 90 j). Le mot « entreprise » n'apparaît quasiment jamais.
- Visites depuis le 24/09 : 42 arrivées, 8 qui lisent plus d'une page, **1 demande** (Fabrique Paris, 13 pers).
- Mêmes symptômes, en plus petit : `escape-game-geant-chateau` (10 clics/90 j) et `atelier-cuisine-chef-gastronomie`.

## Pourquoi pas « réécrire pour les entreprises » ou « rediriger »

- **Réécrire** : Google continuera probablement à classer l'article sur « murder party château » — c'est la page la plus pertinente qu'il ait. Résultat incertain.
- **Rediriger (301)** vers /team-building-chateau : Google transfère le classement → les mêmes particuliers arriveraient sur la page team building.
- **Retirer de Google (noindex)** : seul moyen sûr. La page reste en ligne pour ceux qui y arrivent par nos liens internes (entreprises).

---

## Lot 1 — Retirer les 3 articles d'animation de Google

- Nouvelle liste `ARTICLES_HORS_GOOGLE` (src/data) : murder party, escape game, atelier cuisine.
- `src/app/blog/[slug]/page.tsx` : `robots: { index: false, follow: true }` pour ces slugs.
- `src/app/sitemap.ts` : ces slugs exclus.
- Test : un slug de la liste → noindex + absent du sitemap ; un autre article → inchangé.
- Vérif prod après déploiement : balise `noindex` lue sur les 3 URL (sonde HTTP).

## Lot 2 — Empêcher qu'ils reviennent

- Camille : ces 3 slugs interdits en réécriture et comme sujet (elle refuse déjà les nouveaux sujets d'animation depuis le 06/10).
- Retirer ces articles du pilote « lieux sous articles » (`pilote-lieux-articles.ts`) et de `ARTICLES_ANIMATION` (bloc « Où organiser » inutile hors Google).

## Lot 3 — Garder des chiffres honnêtes

- Marcus : retirer « murder party château » du panel suivi (`panel-requetes.json`).
- Bilan du 03/11 (`bilan-plan.mjs`) : la prédiction #8 (« 1 demande via murder party/escape/cuisine ») passe en **annulée** avec la raison.
- marcus_journal : entrée datée du 08/10 — « baisse attendue de ~40 % des clics, volontaire ». Sinon le prochain relevé sonne une fausse alerte.

---

## Ce qui va se passer

| Indicateur | Avant | Après (2-4 semaines) |
|---|---|---|
| Clics Google / 28 j | ~135 | ~75-80 |
| Demandes / mois | 4 à 8 | 4 à 8 (au pire −1) |
| Part des clics « séminaire / lieu » | ~0 % | inchangée, mais enfin lisible |

## Risques

- **On perd peut-être 1 demande par mois** (Fabrique Paris est arrivée par là). Accepté.
- **Le bilan du 03/11 et le pilote du 27/10 perdent leur plus gros article** → on le note dans les deux, on ne compare plus sur ces 3 articles.
- Google met 1 à 4 semaines à retirer une page noindex.

## Exécution

Une branche, 3 lots, relecture par un agent entre chaque lot, fusion, puis sonde de la prod. ~2 h.
