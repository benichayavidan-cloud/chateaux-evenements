# TODO — reprise après la session du 20/09/2026

## Où en est le travail

Branche **`feat/boost-clics-ctr`** — 6 commits, build vert, **rien n'est poussé**.

Audit complet : `_claude_docs/2026-09-20_audit-seo-geo.md`
Version web : https://claude.ai/code/artifact/b94ea255-6fd4-4045-b874-6b0e027df1dc

## À FAIRE EN PREMIER à la reprise

1. **Lire le verdict de la revue de code.** Elle tournait encore à la fermeture
   (agent `ecc:typescript-reviewer` sur `git diff main...HEAD`). Zones qu'elle
   devait examiner : les regex de `src/lib/seo.ts` (état `lastIndex` des regex
   globales), le JSON-LD injecté dans `ReviewsSection.tsx`, et la qualité du
   français produit par le remplacement de 838 occurrences dans
   `blog-posts-camille.ts`. NE PAS POUSSER avant d'avoir ce verdict.
2. **Puis pousser et ouvrir la PR** si la revue est verte.

## Ce qui a été fait

- **Note client** : sortie du gabarit racine, émise par `ReviewsSection` lui-même.
  368 pages → 16. `ssr: false` retiré au passage, les avis sont dans le HTML servi.
- **Descriptions** : 83 pages coupaient en plein milieu d'un fait → 0. Nouveau
  garde-fou `scripts/verif-descriptions.mjs` branché sur `npm run build`.
- **20 balises réécrites** sur les pages qui perdent le plus de clics. Nouveaux
  champs `seoTitle` / `seoDescription` sur `BlogPost`, nouveau `titreLanding()`.
- **Registre de clusters** : 14 → 24 pages. Yvelines et Oise re-ciblées sur leur
  département (elles revendaient les lieux de leurs voisines).
- **Persona Sophie Durand supprimée** (décision PO) : entité à la place, 301 posée.

## Décisions PO du 20/09

- Sophie Durand = persona inventée → signature = « L'équipe Select Châteaux ».
- Les 207 citations lui étant attribuées → réattribuées à l'équipe.
- Les ~100 études de cas clients = vrais dossiers anonymisés → NE PAS Y TOUCHER.
- « 15 ans d'expérience » et « 200 entreprises » = VRAIS, remis sur /a-propos.

## Points ouverts

- **Délai de devis incohérent** : le site dit « sous 24h » à 161 endroits et
  « 48h » à 87, alors que l'email envoyé au client promet « 24 à 48 heures ».
  Seules les balises réécrites ont été alignées sur 48 h. Décision commerciale
  à prendre sur les 161 autres.
- **Passages narratifs du blog** : « Sophie » est devenu « notre consultante »
  par script. La prose a été échantillonnée et se lit bien, mais 248 articles
  n'ont pas été relus un par un.
- **Pari à relire vers le 20/11** : deux articles de blog ont été recentrés sur
  l'informationnel et rendent la requête commerciale aux landings, qui sont
  aujourd'hui 30ᵉ et 52ᵉ. Personne ne récupère ces impressions à court terme.

## Phase 4 — bloquée, ne pas forcer

Conversion : `/devis` fait 0 clic sur 120 impressions, et le blog a produit
0 demande de devis sur 9 depuis la pose du marqueur `source_label` le 06/09.
Échantillon de 2 semaines = une direction, pas une preuve.
**Recompter début novembre avant de toucher quoi que ce soit.**

## Mesure

Baseline Search Console du 20/09 : 25 084 impressions, 300 clics, CTR 1,20 %,
position moyenne 18,3 (fenêtre 19/06 → 17/09).
Refaire `node SCRIPTS/gsc/gsc.js dump 90` à J+30 et J+60, et comparer les CLICS
et le CTR page par page — pas les impressions, qui montent seules et ne prouvent
rien. Gain attendu : +219 clics à position inchangée, +418 si les pages de
page 2 remontent.

NB : l'accès GSC passe par `gcloud auth login` (compte seminaires@selectchateaux.com).
La session expire — la refaire si `node gsc.js sites` échoue.
