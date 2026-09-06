# SESSION TODO — SITE-WEB

_Mis à jour le 06/09/2026, après l'audit SEO/IA et la PR #25 (déployée)._

## Ce qui a changé le 06/09 — à connaître avant de décider quoi que ce soit

L'audit du jour a produit **un fait qui commande tout le reste** : Googlebot
re-crawle le blog avec un âge médian de **36 jours** (p75 : 47 j, max : 208 j),
contre **6 jours** pour les landings et les fiches lieux. Sur 6 jours, il a fait
55 passages dont 32 sur `robots.txt` et `sitemap.xml`.

**Conséquences pratiques, non négociables :**

1. Un correctif posé sur le blog met ~2 mois à être vu. Sur une landing ou une
   fiche lieu, une semaine. À priorité égale, corriger là où Google regarde.
2. Les PR #23 et #24 (01/09) n'ont été vues que sur **3 articles sur 284**. Toute
   conclusion sur leur effet avant novembre est prématurée — le « +0,2 position,
   16 gagnent / 16 perdent » mesuré le 06/09 ne mesure pas le correctif, il
   mesure l'absence de re-crawl.
3. Il n'existe **aucune API** pour forcer un re-crawl (l'API Indexing est
   réservée aux `JobPosting` et `BroadcastEvent`). Le seul levier est le lien
   interne depuis une page fraîchement crawlée.

Rapport complet : `_claude_docs/2026-09-06_audit-seo-llm.md`.

## Fait le 06/09

- [x] **97 titres tronqués corrigés** (PR #25, déployé, vérifié en production).
      18 landings, 72 fiches lieux, 4 fiches châteaux, accueil et pages fixes.
- [x] **La règle des 60 caractères est désormais vérifiée**, pas seulement
      écrite : `scripts/verif-titres.mjs` (branché sur `npm run build`, fait
      échouer le déploiement), `assertTitre()` côté agent Camille,
      `AGENT_PROMPT.md` corrigé (il disait « 50-70 caractères »),
      `documentation_systeme/regles-seo-non-negociables.md`.
- [x] Sitemap resoumis à GSC + IndexNow sur les 382 URLs (06/09).
- [x] Accès GSC restauré (`gcloud auth login`, `seminaires@selectchateaux.com`).
      **Il ré-expirera** — c'est le premier réflexe si `gsc.js` échoue.

## À faire — par ordre d'effet

### 1. Maillage vers les 19 articles jamais crawlés (le plus rentable)

Mesuré le 06/09 : **0 des 19 articles « unknown to Google » n'est cité** depuis
une landing ni depuis `internal-link-map.ts`. Ils ne sont atteignables que par la
pagination de `/blog` — dont les pages `/blog/page/2..8` **ne sont même pas au
sitemap**, et dont `/blog` lui-même n'a pas été crawlé depuis le 20/08.

Ces 19 articles sont donc invisibles par construction. Les lier depuis les
landings (crawlées tous les 6 jours) est le seul chemin rapide. Liste dans le
rapport ; plusieurs ont une valeur commerciale directe
(`chantilly-vs-fontainebleau-seminaire-comparatif`,
`seminaire-yvelines-programme-activites-budget-2026`).

À traiter avec les 22 articles « Crawled – currently not indexed ».

### 2. Cannibalisation blog / landing — décision à prendre

Le lien satellite de la PR #24 **fonctionne mais trop lentement** : mesuré le
06/09, la landing remonte de 3 à 10 positions par semaine depuis la cinquantaine
pendant que l'article garde la sienne. Deux à trois mois avant que la hiérarchie
s'inverse, et pendant ce temps les deux pages se disputent la requête.

| requête | article | landing (21/08 → 03/09) |
|---|---|---|
| séminaire yvelines | 25,3 stable | 54,1 → 49,6 |
| séminaire oise | 18,3 stable | 63,8 → 53,4 |
| séminaire chantilly | 23,9 stable | 33,4 → 30,7 |

Cas réussi à l'inverse : sur `team building chantilly`, la landing est entrée à
14,1 et a dépassé l'article déclassé à 17,5 — mais la meilleure position du site
sur cette requête est passée de 10,4 à 14,1.

Trois options, à instruire puis trancher : **fusionner** l'article dans la
landing · poser un **`canonical`** de l'article vers la landing · **assumer
l'article** comme page de destination et lui ajouter le formulaire de devis.

### 3. Pages adossées aux données CRM — le seul angle où les IA nous citent

Les deux seules citations obtenues le 06/09 (Gemini sur le coût d'un séminaire,
ChatGPT sur l'alternative Châteauform') viennent des deux seules pages bâties sur
une donnée que personne d'autre ne détient : l'observatoire des 188 devis et le
comparatif des 68 domaines. Ni les plus longues ni les mieux structurées — les
seules avec un chiffre propriétaire.

`budget-observatoire.ts` permet d'en produire une dizaine d'autres : budget
médian par département, par saison, par format, par taille de groupe, délai de
réservation observé.

### 4. Échéances déjà calées

- [ ] **~11/09** : lire les rapports Marcus, décider du passage en phase 2
      (`update agent_controls set phase=2 where id='marcus'`). Lire les
      citations LLM avec la sonde à 3 états : un ⚪ (moteur qui n'a pas cherché)
      n'est pas un échec de visibilité.
- [ ] **~15/10** : remesurer la corrélation structure ↔ captation IA —
      `node scripts/agent-seo/remesure-captation.mjs <export-gsc-pages.csv>`
      (leçon `marcus_lecons` id 3). L'échéance est la bonne : c'est le temps
      qu'il faut à Googlebot pour repasser sur les 284 articles.
- [ ] **Export manuel** du rapport GSC « Performance on Search Generative AI
      Features » — seule source fiable pour les AI Overviews : ni l'API GSC
      (`searchAppearance` renvoie 0 ligne) ni Bright Data ne les exposent.
      Baseline 01/09 : 444 impressions sur 3 mois, 72 pages.

### 5. Camille — reste EN PAUSE

`agent_controls.camille.enabled = false` depuis le 01/09. L'audit du 06/09
confirme la décision : 170 articles actifs pour 60 clics, et Googlebot ne suit
déjà pas le rythme de publication (19 articles jamais vus). Le corpus n'est pas
le facteur limitant. Le gabarit est prêt (stats réelles, `<h3>`, source externe,
titre borné) — la réactivation reste une décision, pas un oubli.

## Écarté — ne pas reproposer

Décision du 01/09 : **pas de chantiers humains de prospection** (campagne de
liens retour aux 68 lieux, demande de photos, collecte des capacités, inscription
sur les annuaires que Gemini cite). Matériel conservé dans
`_claude_docs/2026-09-01_campagne-liens-et-photos.md` si la décision change.

**Conséquence à connaître, sans y revenir** : le profil de liens reste à
**10 backlinks / 9 domaines référents**, contre 162 pour le plus petit
concurrent du top 10 et 3 540 pour funbooker. C'est ce qui explique les
19 requêtes du panel hors des 3 premières pages. Aucun levier technique ne
compense cela — les points 1 à 3 ci-dessus améliorent le rendement des positions
déjà acquises, pas le classement sur les requêtes disputées.

## Contexte

Marcus (agent SEO/GEO) est autonome : sentinelle 7h15, runs lundi/jeudi 8h30,
rapports par email, alertes Telegram. Détail : `session_2026-08-31.md` et
`documentation_systeme/agent-seo-geo-blueprint.md`.
