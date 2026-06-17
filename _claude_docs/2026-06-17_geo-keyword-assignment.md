# Assignation keyword plan → pages (renfort) vs contenu à créer — GEO

> Croisement `_claude_docs/2026-06-12_keyword-plan.md` (15 patterns) × `scripts/agent-cm/seo-clusters.json` (12 clusters).
> Règle : une requête possédée → **renforcer** la page propriétaire (maillage interne, jamais de nouvel article). Une intention **vierge** → contenu à créer (pilier blog) puis enregistrer son cluster APRÈS création.
> Date : 2026-06-17.

## A. Matrice d'assignation (15 patterns)

| Pattern | Intention | Propriétaire | Action |
|---|---|---|---|
| P1 séminaire+dépt | transactionnel | landings geo (oise/78/92/idf) | **Renfort** maillage. Déjà au registre. |
| P2 château+séminaire+loc | transactionnel | landings geo + chantilly/chevreuse/proche-paris | **Renfort** maillage. |
| P3 hôtel+séminaire+loc | comparatif | chantilly → `/blog/hotel-seminaire-chantilly-comparatif` (pilier) | **Renfort** pilier. Zones non-Chantilly = intention faible → ne pas créer. |
| P4 nb pax+loc | transactionnel | landings IDF/proche-paris (sections capacité) | **Renfort** ; pax au niveau dépt = volume nul → ignorer. |
| P5 salle de réunion+loc | location urbaine à l'heure | hors-cœur | **Skip** (intention non-château). |
| P6 journée d'étude+loc | semi-transac | *non possédé* | **À créer (P3 backlog)** : pilier journée d'étude. |
| P7 séminaire résidentiel+loc | info+transac | `/blog/seminaire-residentiel-vs-journee` | **Renfort** article existant. |
| P8 soirée entreprise+loc | transactionnel | `/seminaires-soirees-entreprise` | **Renfort**. Déjà au registre. |
| **P9 lieu séminaire+loc** | transactionnel — **590/mo** | landing IDF (head) + landings zone | **Renfort prioritaire** : enregistrer au registre IDF. |
| **P10 séminaire au vert+loc** | transactionnel — Ads-prouvé | *non possédé* | **À CRÉER (backlog #2)** : pilier vierge. |
| P11 salle de séminaire+loc | transactionnel | landings geo (yvelines 34 imp, oise 19 imp) | **Renfort** maillage. |
| **P12 CODIR/COMEX** | premium B2B — **pos 3,7 / 67 imp sans le viser** | *non possédé* | **À CRÉER (backlog #1 — pépite)**. |
| P13 domaine+séminaire | synonyme château/lieu | landings geo (sémantique) | **Renfort** (pas de page dédiée). |
| P14 Rambouillet/Versailles | sous-zones | yvelines (rambouillet déjà zoneWord) | **Renfort** + ajouter zoneWord `versailles`. |
| **P15 Questions GEO** | informationnel — très citable IA | partiel (`checklist-organiser-seminaire`) | **À CRÉER (backlog #3)** : combler les intentions vierges. |

## B. Backlog contenu NEUF (vierge — priorisé)

> Workflow par article : l'agent le rédige (gate en `--force` car il devient lui-même propriétaire), PUIS on enregistre son cluster dans `seo-clusters.json`.

### #1 — Séminaire CODIR / COMEX en château (PÉPITE) — ✅ TRAITÉ 17/06 (CONSOLIDATION, pas création)
- **Découverte** : l'intention n'était PAS vierge — **4 articles CODIR existaient** et se cannibalisaient. La data GSC a tranché : `/blog/seminaire-codir-chateau-privatise` détient `codir château` (**67 imp, pos 3,7**) ; les 3 autres font 0-2 imp.
- **Action réalisée** (au lieu d'un 5ᵉ article) :
  - 301-merge des 3 doublons → le canonique (`merged-redirects.json`).
  - Cluster `codir` enregistré dans `seo-clusters.json` (gate protège le pilier).
  - Upgrade GEO du canonique : titre 2026 + prix, `updatedAt` (dateModified), `howTo` (5 étapes), section `<ol>` + blockquote expert.
  - 11 liens internes repointés vers le canonique (zéro lien vers redirect).
- **À surveiller** : effet sur la position (3,7 → page 1) à S+2/S+4 ; le canonique capte aussi `séminaire codir chenonceaux` (assoc. externe Google, pas une mention interne).

### #2 — Séminaire au vert proche Paris (Ads-prouvé)
- **Slug** : `/blog/seminaire-au-vert-proche-paris-2026`
- **Kw principal** : `séminaire au vert proche paris` · secondaires : au vert IDF, région parisienne
- **Angle GEO** : « se mettre au vert » sans s'éloigner — châteaux 30-45 min de Paris avec parc, distances précises, saisonnalité (printemps/été), `howTo` + tableau distances.
- **Cluster après création** : id `au-vert`, primaryKeywords [seminaire au vert, séminaire au vert proche paris, seminaire au vert ile de france].

### #3 — Contenus info GEO (questions, P15) — 1 à 2 articles
- Intentions vierges très citables : `programme séminaire exemple/modèle`, `cahier des charges organisation séminaire`, `durée idéale séminaire résidentiel`, `privatisation journée d'étude`.
- **Candidat A** : `/blog/programme-seminaire-entreprise-exemple-modele-2026` (modèle de planning J1/J2 + `howTo`, ultra-extractible par IA).
- **Candidat B** : fusionner durée idéale + privatisation dans un Q/R existant si déjà couvert (vérifier avant — sinon court pilier FAQ).
- Vérifier au préalable que `checklist-organiser-seminaire` ne couvre pas déjà → sinon **renfort** plutôt que création.

### #4 (optionnel, plus tard) — Journée d'étude en château IDF (P6)
- Slug `/blog/journee-etude-chateau-ile-de-france` si l'intention se confirme en GSC. Volume modéré → après #1-#3.

## C. Renforts (aucun nouvel article — maillage / registre)

- **P9 lieu séminaire** → enregistrer au cluster `ile-de-france` : `lieu seminaire ile de france`, `lieu de seminaire ile de france`, `lieu seminaire idf`, `lieu de seminaire`. Maillage des satellites avec l'ancre « lieu séminaire en Île-de-France ».
- **P14 Versailles** → ajouter `versailles`, `velizy` aux `zoneWords` du cluster `yvelines`.
- **P11 salle de séminaire** → maillage satellites → landings zone (déjà sous zoneWords).
- **P1/P2/P8/P13** → déjà couverts : maillage interne automatique via `internal-link-map.ts`.

## D. Patterns écartés (rappel)
`atypique/insolite/original`, `nature`, `sportif` — rejetés le 12/06 (cf. plan keywords).
