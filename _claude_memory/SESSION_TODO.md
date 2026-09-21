# TODO — reprise après la session du 20-21/09/2026

## État : TOUT EST DÉPLOYÉ ET VÉRIFIÉ EN PRODUCTION

PR #37 et #38 fusionnées sur `main`. Contrôles passés en prod :
note absente de /cgv, présente sur l'accueil, /a-propos à jour,
301 sur l'ancienne page auteur, 0 persona résiduelle, Anne-Sophie Pic réparée.

Audit : `_claude_docs/2026-09-20_audit-seo-geo.md`
Web : https://claude.ai/code/artifact/b94ea255-6fd4-4045-b874-6b0e027df1dc

## ⚠️ INCIDENT À RETENIR — `main` était cassé depuis le 18/09

Le commit `872ae77` de l'agent Camille a **tronqué `src/data/blog-posts-camille.ts`** :
le fichier s'arrêtait sans sa fermeture `];`. `main` ne compilait plus, donc aucun
déploiement ne pouvait passer pendant deux jours — sans que personne ne le voie.

Réparé au passage. **À FAIRE** : ajouter un contrôle de syntaxe dans le workflow
de Camille AVANT son commit (`node --check` ou `tsc --noEmit` sur le fichier
produit). Un agent qui écrit en base de code sans validation de sortie finira
par recommencer.

## Restant, par ordre d'importance

1. **Auteur des articles encore incohérent.** `blog-posts.ts` code en dur
   `role: "Experte Événementiel"` et `avatar: "SD"` (initiales de la persona
   supprimée) sur 273 articles, au lieu d'utiliser `CANONICAL_AUTHOR`. Et les
   articles typent l'auteur en `Person` là où `/auteurs/equipe` déclare
   `Organization` sur le MÊME `@id` — deux types pour un seul nœud.
2. **Décalage de mise en page sur mobile.** Le retrait de `ssr: false` fait
   pré-rendre 3 cartes d'avis côté serveur, puis le JavaScript repasse à 1 sur
   téléphone. À piloter en CSS plutôt qu'en JavaScript.
3. **`descriptionLieu()` latent.** Un nom de lieu très long fait perdre la ville
   et « Devis sous 48 h ». 0 cas aujourd'hui sur les 62 fiches. Corriger en
   tronquant le NOM, pas la queue — comme le fait déjà `titreLieu()`.
4. **Délai de devis** : « sous 24h » à 161 endroits, « 48h » à 87, l'email
   promet « 24 à 48 heures ». Décision commerciale à prendre.

## Décisions PO du 20/09

- Sophie Durand = persona inventée → signature « L'équipe Select Châteaux ».
- Les 207 citations lui étant attribuées → réattribuées à l'équipe.
- Les ~100 études de cas clients = vrais dossiers anonymisés → NE PAS Y TOUCHER.
- « 15 ans d'expérience » et « 200 entreprises » = VRAIS, remis sur /a-propos.

## Phase 4 — bloquée, ne pas forcer

`/devis` : 0 clic sur 120 impressions. Le blog : 0 demande de devis sur 9 depuis
la pose du marqueur `source_label` le 06/09. Deux semaines = une direction, pas
une preuve. **Recompter début novembre avant de toucher à la conversion.**

## Mesure

Baseline du 20/09 : 25 084 impressions, 300 clics, CTR 1,20 %, position 18,3
(fenêtre 19/06 → 17/09). Refaire `node SCRIPTS/gsc/gsc.js dump 90` à J+30 et
J+60 ; comparer les CLICS et le CTR page par page — pas les impressions, qui
montent seules et ne prouvent rien.

Attendu : +219 clics à position inchangée, +418 si les pages de page 2 remontent.

À relire vers le 20/11 : deux articles de blog rendent leur requête commerciale
aux landings, qui étaient 30ᵉ et 52ᵉ. Pari de moyen terme.

NB : l'accès GSC passe par `gcloud auth login` (seminaires@selectchateaux.com).
La session expire — la refaire si `node gsc.js sites` échoue.
