# SESSION TODO — SITE-WEB

## Priorités (session du 01/09/2026)

### Mesure
- [ ] **~11/09 : revue des 4 rapports Marcus** → décision phase 2
      (`update agent_controls set phase=2 where id='marcus'`)
      ⚠️ Lire les citations LLM avec la NOUVELLE sonde : le taux est rapporté aux
      réponses où le moteur a réellement cherché. Un ⚪ (sans recherche) n'est pas
      un échec de visibilité.
- [ ] **~15/10 : REMESURER** la corrélation structure ↔ captation IA. Elle n'a
      jamais porté sur un corpus dont le gabarit fonctionne (leçon `marcus_lecons` id 3)
- [ ] **Réactiver Camille** après le verdict : `agent_controls.camille.enabled = true`
      (en pause depuis le 01/09 — gabarit désormais corrigé : stats réelles, h3, source externe)
- [ ] Valider les buckets GSC « explorée/détectée » vers mi-septembre

### Code / données
- [ ] **Cannibalisation** : sur « séminaire chantilly » et « séminaire yvelines »,
      Google classe un article de blog plutôt que la landing commerciale dédiée.
      Traitable par le maillage, sans intervention humaine externe.
- [ ] 34 fiches lieux encore sous 900 mots : le levier est la description, côté CRM
- [ ] Phase 2 Marcus : title-ab (369 titles > 70 car., médiane 83)
- [ ] Hubs de catégorie blog (125 articles à 1 lien entrant) — via Marcus niveau 2
- [ ] `gcloud auth login` (compte `seminaires@selectchateaux.com`) — sans ça
      `SCRIPTS/gsc/gsc.js` est inutilisable, la session est expirée

## Écarté — ne pas reproposer

L'utilisateur a décidé le 01/09 de **ne pas mener les chantiers humains de
prospection**. Sont donc retirés des priorités, définitivement :

- campagne de demande de lien retour aux 68 lieux publiés ;
- demande de photos aux 45 lieux qui ne bloquent que là-dessus ;
- collecte des 47 capacités manquantes (dont 20 extractibles depuis les sites) ;
- inscription sur les plateformes que Gemini cite (eventdrive, keysvenue,
  aleou, kactus, funbooker…).

Le matériel reste disponible si la décision change :
`_claude_docs/2026-09-01_campagne-liens-et-photos.md` et les 3 CSV associés.

**Conséquence à connaître, sans y revenir** : le profil de liens reste à
10 backlinks / 9 domaines. C'est ce qui explique les positions 14 à 53 sur les
requêtes commerciales et les 16 requêtes du panel à 0 clic. Aucun levier
technique ne compense cela — les gains à venir viendront donc du contenu et de
l'indexation, pas du classement sur les requêtes disputées.

## Ce qui a été fait le 01/09 (détail : `session_2026-09-01.md`)

FAQ visible sur 284/284 articles (49 avant), ancres sur 284/284 (1 avant),
médiane 2321 mots, 0 article sous 900 mots, 6 questions par fiche lieu,
note client réelle unique. Prompt de Camille corrigé (il demandait d'inventer
des statistiques). Sonde LLM corrigée (3 états). Tout est en production.

## Contexte
Marcus (agent SEO/GEO) est autonome : sentinelle 7h15, runs lundi/jeudi 8h30,
rapports par email, alertes Telegram. Détail : `session_2026-08-31.md` et
`documentation_systeme/agent-seo-geo-blueprint.md`.
Camille (agent blog) est **EN PAUSE** depuis le 01/09.
