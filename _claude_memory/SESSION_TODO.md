# SESSION TODO — SITE-WEB

## Priorités (session du 01/09/2026)

### Débloquer des fiches — le plus rentable, sans contacter personne
- [ ] **Extraire les 20 capacités manquantes** depuis les sites des lieux (méthode
      grounded déjà éprouvée sur 69 fiches en août). Débloque jusqu'à 20 fiches.
      Liste : `_claude_docs/2026-09-01_lieux-capacite-a-collecter.csv`
      ⚠️ La capacité n'est PAS dérivable des salles (2 lieux sur 47 en ont de décrites) — mesuré.

### Autorité — le seul vrai plafond (10 backlinks / 9 domaines)
- [ ] **Campagne lien retour aux 68 lieux publiés**, tous joignables par email.
      La contrepartie est déjà livrée : leur fiche est en ligne.
      Emails types + listes : `_claude_docs/2026-09-01_campagne-liens-et-photos.md`
- [ ] **Photos** : 45 lieux bloqués uniquement là-dessus (remplace l'ancienne liste des 21)

### Mesure
- [ ] **~11/09 : revue des 4 rapports Marcus** → décision phase 2
      (`update agent_controls set phase=2 where id='marcus'`)
- [ ] **~15/10 : REMESURER** la corrélation structure ↔ captation IA. Elle n'a
      jamais porté sur un corpus dont le gabarit fonctionne (leçon `marcus_lecons` id 3)
- [ ] **Réactiver Camille** après le verdict : `agent_controls.camille.enabled = true`
      (mis en pause le 01/09 pour mesurer sans bruit — gabarit désormais corrigé)
- [ ] Valider les buckets GSC « explorée/détectée » vers mi-septembre

### Reste de dette
- [ ] `gcloud auth login` (compte `seminaires@selectchateaux.com`) — sans ça
      `SCRIPTS/gsc/gsc.js` est inutilisable, la session est expirée
- [ ] 34 fiches lieux encore sous 900 mots : le levier est la description, côté CRM
- [ ] **Cannibalisation** : sur « séminaire chantilly » et « séminaire yvelines »,
      Google classe un article de blog plutôt que la landing commerciale dédiée
- [ ] Phase 2 Marcus : title-ab (369 titles > 70 car., médiane 83)
- [ ] Hubs de catégorie blog (125 articles à 1 lien entrant) — via Marcus niveau 2

## Ce qui a été fait le 01/09 (détail : `session_2026-09-01.md`)

FAQ visible sur 284/284 articles (49 avant), ancres sur 284/284 (1 avant),
médiane 2321 mots, 0 article sous 900 mots, 6 questions par fiche lieu,
note client réelle unique. Prompt de Camille : interdiction des stats inventées,
h3 obligatoires, source externe exigée. Tout est en production.

## Indicateur qui compte

**Citations Gemini : 0 sur 18 requêtes.** ChatGPT cite déjà le site en 1ʳᵉ position ;
Gemini jamais — et c'est Gemini qui alimente les AI Overviews de Google.

## Contexte
Marcus (agent SEO/GEO) est autonome : sentinelle 7h15, runs lundi/jeudi 8h30,
rapports par email, alertes Telegram. Détail : `session_2026-08-31.md` et
`documentation_systeme/agent-seo-geo-blueprint.md`.
Camille (agent blog) est **EN PAUSE** depuis le 01/09.
