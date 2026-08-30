# TODO — prochaine session

## Session du 30 août 2026 — Audit GSC, étude de marché, publication des lieux

10 PR mergées et déployées. Le site passe de 4 à 72 lieux publiés.

### Fait

**Diagnostic (export GSC brut, 16 mois)**
- [x] 20 640 impressions / 310 clics sur 90 j — +156 % d'impressions mais CTR en chute (1,99 % → 1,16 %)
- [x] 77 % des requêtes en page 2+ ; landings services à 0,35 % de CTR
- [x] 66 requêtes cannibalisées, zéro requête de marque
- [x] Requêtes à signature LLM détectées (agents IA, positions p3–p11, 0 clic)

**Étude de marché (Bright Data + autocomplete)**
- [x] 832 requêtes réelles collectées, 632 géolocalisées
- [x] Absence de 86 à 100 % selon le département (Essonne : 100 %)
- [x] 1 seule position sur 200 analysées ; Aleou présent sur 18 SERP sur 20

**Publication**
- [x] 68 fiches lieux depuis le CRM (`scripts/venues/export-venues.mjs`, rejouable)
- [x] 8 landings enrichies — Yvelines 1 → 21 lieux, IdF 4 → 58
- [x] 6 titles réécrits (pages en page 1 à zéro clic)
- [x] `schema.org` EventVenue, bloc réponse directe, `llms.txt` enrichi
- [x] `lastmod` corrigés aux 3 niveaux — ils étaient tous faux
- [x] IndexNow : 384 URLs soumises (Bing → ChatGPT Search)
- [x] Sitemap resoumis : 384 URLs, 0 erreur, crawlé le 30/08 à 15:22

**Sécurité**
- [x] CRM mis en `noindex` + `robots.txt` — `/devis/[token]` et `/partage` exposaient des données client

### À faire

#### Priorité — dans 10 à 14 jours
- [ ] **Relancer l'export GSC** et mesurer : combien de fiches indexées, CTR des titles réécrits, position des landings
- [ ] Référence à battre : 303 pages indexées, CTR 1,16 %, 93 requêtes en page 1, 6 leads/mois

#### Décisions produit en attente
- [ ] **126 photos à demander** aux 21 lieux bloqués (droits Kactus / Google Places) — voir `_claude_docs/2026-08-30_photos-a-demander-21-lieux.md`. Paris Country Club (1 500 pers.) est le plus gros lieu du périmètre et reste absent.
- [ ] **7 départements faux dans le CRM** — voir `_claude_docs/2026-08-30_crm-departements-a-corriger.md`. Experteam et Press Club sont de vrais lieux du secteur, actuellement invisibles.
- [ ] Doublon CRM : Domaine Reine Margot × 2
- [ ] Descriptions CRM : casse et répétitions à nettoyer sur les 68 (décision PO — c'est réécrire des données)

#### Chantiers SEO non commencés
- [ ] **3 landings manquantes : 91, 77, 95** — 357 demandes et 93 devis dans le CRM, aucune page. Elles ont maintenant de la matière (7, 11 et 11 lieux).
- [ ] **7 landings format** — CoDir, kick-off, convention, journée d'étude, résidentiel, soirée, team building. `team building <zone>` pèse 104 déclinaisons, aucune page.
- [ ] **9 pages « alternative Châteauform » locales** — Mareil, Béhoust, Rambouillet, Marne-la-Vallée, Crécy-la-Chapelle, Seine-Port, Guermantes, Cély, Yvelines. `concurrent chateauform` est déjà en position 3,75.
- [ ] **Observatoire des budgets** — 188 devis réels, médiane 379 €/pers. Personne ne publie de prix. ⚠️ Ce sont des prix d'ACHAT : publier en fourchettes agrégées achat + marge, jamais bruts.
- [ ] `/seminaires-soirees-entreprise` — client component, demande un wrapper serveur pour recevoir le bloc lieux
- [ ] `/devis` est en position 26,9 sur 118 impressions, 0 clic

### Points d'attention

- **Règle absolue** : ne jamais publier le vrai nom d'un lieu déjà présent sous alias sur `/chateaux`. 5 ids CRM sont exclus dans `export-venues.mjs`.
- **Photos** : `originUrl` NULL = fourni par le prestataire, publiable. Google Places et Kactus = interdits.
- `staticPagesUpdated` dans `sitemap.ts` est manuel — à remonter à chaque modification des landings.
- PR #2 (export GSC) toujours ouverte, sans effet sur le site.
- Le plan complet : https://claude.ai/code/artifact/9b7035b1-206f-4e7a-bff6-61e23f12e5ac
