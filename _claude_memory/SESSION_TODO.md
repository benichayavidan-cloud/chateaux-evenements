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
- [x] **Menu principal remis sur une seule ligne** (PR #26, déployé). La PR #14
      du 30/08 avait fait passer le premier niveau de 4 à 6 entrées en s'en
      servant comme véhicule de maillage. Sous-menu « Organiser », `nowrap` sur
      les libellés, et point de bascule vers le hamburger porté de 768 à
      **1160 px** — en dessous, le menu centré en position absolue passait sous
      le logo et le CTA.
- [x] **Pied de page restructuré** (PR #27, déployé). La grille avait 4 colonnes
      pour 5 blocs : la 4ᵉ section retombait seule sur une 2ᵉ rangée. La marque
      prend sa propre rangée ; sections rééquilibrées 5/5/6/6 ; 3 doublons
      retirés ; 18 destinations uniques → 22.
- [x] **Maillage vers le blog** (PR #28, déployé) — voir le point 1 ci-dessous.
- [x] **Formulaire de devis sur les 284 articles** + provenance des devis enfin
      stockée (PR #29). `source_page` et `source_label` ajoutées à
      `demandes_devis_chateaux` : « quelle page convertit ? » sera décidable.
- [x] **Observatoire des 188 devis sur les 15 landings** (PR #30) — la donnée
      propriétaire est le seul angle où les IA nous citent.
- [x] **Hero en grille photos** sur les landings de format et de département
      (PR #32), photos cliquables vers les fiches lieux.
- [x] **6 lieux dépubliés** faute de photos exploitables (PR #33) : 68 → 62.
      Le générateur mesure désormais les images et ne les republiera pas.
- [x] Sitemap resoumis à GSC + IndexNow (376 URLs après dépublication).
- [x] Accès GSC restauré (`gcloud auth login`, `seminaires@selectchateaux.com`).
      **Il ré-expirera** — c'est le premier réflexe si `gsc.js` échoue.

## À faire — par ordre d'effet

### 1. ✅ FAIT — Maillage vers le blog (PR #28, déployé)

Le chantier était plus large que prévu. Mesuré sur le HTML produit :
**124 des 284 articles n'avaient qu'un lien entrant, et c'était la pagination
`/blog`** — qui n'est pas au sitemap et n'avait pas été crawlée depuis le 20/08.
Les **72 fiches lieux ne liaient aucun article**. Au total, **16 articles sur
284** étaient atteignables depuis une page fréquemment crawlée.

`src/lib/maillage-blog.ts` répartit désormais le corpus entier sur les 82 pages
fraîches (fiches lieux + landings), de façon déterministe et exhaustive :
**284/284** articles liés hors `/blog`. Vérifié par `scripts/verif-maillage.mjs`
au build ; borné côté agent par `assertMaillage()` (plafond 492 articles).

⚠️ **Correction d'une mesure erronée** : j'avais d'abord annoncé « 284 articles
sur 284 à zéro lien entrant ». Faux — le comptage excluait tout ce qui suit
`<footer>`, or le corps des articles est **streamé après le pied de page** dans
l'ordre du document (Suspense React). Le blog est bien maillé blog↔blog ; ce qui
manquait était le lien depuis les pages fraîches.

### 2. Cannibalisation blog / landing — mesuré, décision à prendre

**L'article gagne les 5 duels tête à tête**, de 14 à 37 places (séminaire
yvelines 17,7 vs 54,1 · oise 17,9 vs 32,1 · chantilly 17,9 vs 32,0 · team
building chantilly 9,1 vs 14,1 · séminaire 78 15,1 vs 52,4). Globalement :
blog 217 pages / pos. 12,5 / CTR 1,57 % contre landings 17 pages / pos. 29,4 /
CTR 0,30 %.

Mais le chevauchement des requêtes distingue **3 vrais doublons** — Yvelines
(98 % de ses impressions sur des requêtes partagées), Chantilly (90 %), Team
Building Chantilly (89 %) — et **5 landings autonomes** : Oise (65 %, possède
« hotel séminaire oise » 91i et « salle séminaire oise » 82i), Team Building
Château (60 %, « team building ile de france » 205i), Île-de-France (59 %),
Proche Paris (**0 %**, 289 imp. propres), Vallée de Chevreuse (**0 %**, 434 imp.
propres).

→ **Fusionner 3, garder 5.** Et ajouter `DevisFormMini` au gabarit d'article :
c'est le seul avantage des landings (formulaire intégré vs simple lien vers
`/devis`), et il profiterait aux 284 articles d'un coup.

**Bloquant à connaître** : la page d'origine d'un devis n'est **jamais stockée**
(`sourceLabel` part dans l'email admin et s'arrête là). « Qui convertit le
mieux » n'est pas mesurable aujourd'hui, et ne le sera pas tant qu'on n'ajoute
pas la colonne à `demandes_devis_chateaux`. 46 devis en base, 18 sur 90 jours.

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

### 5. Camille — RÉACTIVÉE le 06/09, avec un ratio inversé

`agent_controls.camille.enabled = true` depuis le 06/09
(`updated_by = revue-2026-09-06`). Elle reprend du lundi au vendredi à 9 h.

**Nouveau ratio : 3 réécritures pour 1 création** (c'était 2 créations pour
1 réécriture), et la création seulement si un sujet réellement vierge existe.
Motif écrit dans son prompt avec ses chiffres : Googlebot lit ~4 pages/jour,
l'âge médian du dernier crawl est de 36 jours sur le blog, 19 articles n'avaient
jamais été vus. Réécrire un article déjà indexé ne consomme pas de budget de
découverte ; en publier un neuf en consomme.

**Ce qui la borde désormais** : `assertTitre()` (42 caractères avant le « : »),
`assertMaillage()` (plafond de 492 articles), plus les garde-fous de build
`verif-titres.mjs` et `verif-maillage.mjs` qui font échouer le déploiement.

**À surveiller à sa première exécution** (lundi 07/09, 9 h) : qu'elle produise
bien 3 réécritures et au plus 1 création, et qu'aucun gate ne la bloque à tort.

### 6. Marcus — PHASE 2 depuis le 06/09

`agent_controls.marcus.phase = 2`. Il peut désormais agir, avec un catalogue
**réduit à deux actions** (PR #34) :

- `ping-indexnow` — gratuit, alimente Bing et donc ChatGPT Search
- `commande-reecriture` — ouvre une issue pour Camille

Deux actions ont été supprimées à la revue :
- **`inspection-google`** était un PLACEBO : l'API URL Inspection est en lecture
  seule, elle ne déclenche aucune indexation.
- **`title-ab`** est SANS OBJET : les titres sont bornés et verrouillés par
  `verif-titres.mjs` depuis le 06/09.

Rappel de la Loi 2 : toute action exécutée écrit une entrée dans
`marcus_journal` avec sa prédiction chiffrée et son échéance. `marcus_journal`
était vide jusqu'ici — c'est là qu'il faudra regarder pour juger la phase 2.

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
