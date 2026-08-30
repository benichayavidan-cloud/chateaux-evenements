# TODO — prochaine session

## Session 2 du 30 août 2026 — 9 landings créées

PR #13 et #14 mergées et déployées. Le site passe de 39 à 117 pages.

### Fait

**Vérification des chantiers annoncés** — deux étaient mal chiffrés :
- [x] « 7 landings format » était faux : `/team-building-chateau` et
      `/seminaires-soirees-entreprise` existaient déjà. C'était 5.
- [x] « 104 déclinaisons team building » trompeur : 56 dans le périmètre,
      41 Paris intra-muros (aucune offre, aucun dossier).
- [x] « alternative Châteauform » survendu : `concurrent chateauform` est bien
      en p3,75 mais sur **12 impressions**. Toute la marque pèse 133 impressions
      en 16 mois.
- [x] Le chantier « lieu/salle/hôtel + département » (1 912 impressions)
      s'appuyait sur des données antérieures à la publication de `/lieux` —
      écarté jusqu'à la mesure.

**9 landings créées**, design identique à `/lieux` par construction :
- [x] `/seminaire-chateau-essonne-91` · `-seine-et-marne-77` · `-val-d-oise-95`
- [x] `/team-building-chantilly` (1 504 impressions, p12)
- [x] `/team-building-hauts-de-seine-92` · `/team-building-val-d-oise-95`
- [x] `/journee-etude-seminaire` (562 impressions, + programme type)
- [x] `/budget-seminaire-entreprise` — 188 devis réels, 3 tableaux
- [x] `/alternative-chateauform` — une seule page, pas neuf (voir plus bas)

**Maillage** — 7 des 9 pages étaient orphelines :
- [x] `DEPARTMENT_LANDING` étendu au 91, 77, 95 (24 lieux)
- [x] `/lieux` → landings départementales
- [x] menu : sous-menus Par département et Team building
- [x] pied de page : rubrique Guides et comparatifs
- [x] auto-liens blog : Essonne, Seine-et-Marne, Val-d'Oise, journée d'étude,
      budget, Châteauform
- [x] résultat : 0 → 105 pages entrantes par landing

**Refactor** — briques partagées dans `@/components/lieux`. La carte lieu était
dupliquée à trois endroits, elle est unique. Toute évolution du design se
propage partout.

### À faire

#### Priorité — 9 au 13 septembre
- [ ] **Relancer l'export GSC**. Référence figée : 303 pages indexées, CTR 1,16 %,
      93 requêtes en page 1, 15 995 impressions / 48 clics sur 16 mois, ~6 leads/mois.
- [ ] Mesurer : indexation des 68 fiches + 9 landings, CTR des titles réécrits,
      position des landings enrichies.
- [ ] **Décider alors** du chantier « lieu/salle/hôtel + département »
      (1 912 impressions, 0 clic) — les landings ont gagné 21 lieux, il est
      possible qu'il soit déjà réglé.

#### Décisions produit toujours en attente
- [ ] **126 photos** aux 21 lieux bloqués — Paris Country Club (1 500 pers.)
      absent. Voir `_claude_docs/2026-08-30_photos-a-demander-21-lieux.md`
- [ ] **7 départements faux en base** — Experteam (92) et Press Club (75) sont de
      vrais lieux du secteur, invisibles. Voir
      `_claude_docs/2026-08-30_crm-departements-a-corriger.md`
- [ ] Doublon CRM Domaine Reine Margot
- [ ] Search Console : demander l'indexation de `/seminaire-chateau-essonne-91`
      (quota épuisé le 30/08)

#### Chantiers non commencés
- [ ] `/seminaires-soirees-entreprise` — client component, wrapper serveur requis
      pour recevoir le bloc lieux
- [ ] `/devis` est en position 26,9 sur 118 impressions, 0 clic
- [ ] 5 formats restants : CoDir, kick-off, convention, résidentiel, soirée
      (soirée et team building existent déjà)

### Points d'attention

- **Ne jamais publier le nom réel** d'un lieu déjà sous alias sur `/chateaux`.
  5 ids CRM exclus dans `export-venues.mjs`.
- **Budgets : marge de 10 %**, appliquée aux prix d'achat. Publier en médianes
  avec les effectifs, jamais de montant brut.
- **Une seule page Châteauform** : 133 impressions ne justifient pas 9 pages,
  qui se cannibaliseraient avec l'article de blog déjà en p6,5.
- `staticPagesUpdated` dans `sitemap.ts` est manuel — à remonter à chaque
  modification des landings.
- Photos : `originUrl` NULL = fourni par le prestataire, publiable.
  Google Places et Kactus = interdits.
- Plan complet : https://claude.ai/code/artifact/9b7035b1-206f-4e7a-bff6-61e23f12e5ac
