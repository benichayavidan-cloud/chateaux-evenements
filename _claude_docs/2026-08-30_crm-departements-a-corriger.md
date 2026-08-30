# 7 lieux avec un département faux en base

Le `departmentCode` contredit le code postal. Ces lieux sont écartés de la
publication par le garde-fou de `scripts/venues/export-venues.mjs`, mais ils
restent faux dans le CRM — donc faux aussi dans le moteur de recherche interne
et dans les filtres par zone du générateur de devis.

| Lieu | Ville | CP | Déclaré | Devrait être |
|---|---|---|---|---|
| MAS SAINT ANTOINE | Bourg-Saint-Andéol | 07700 | 77 | **07** Ardèche |
| CHATEAU DE CHISSAY | Chissay-en-Touraine | 41400 | 91 | **41** Loir-et-Cher |
| DOMAINE DE LA BESSE | Camon | 09500 | 95 | **09** Ariège |
| HAMEAUX DES LACS | Monclar-de-Quercy | 82230 | 91 | **82** Tarn-et-Garonne |
| HÔTEL DU PALAIS | Biarritz | 64200 | 95 | **64** Pyrénées-Atlantiques |
| EXPERTEAM | Nanterre | 92000 | 77 | **92** Hauts-de-Seine |
| PRESS CLUB DE FRANCE | Issy-les-Moulineaux | 75015 | 92 | **75** Paris |

**Le motif est clair** : les deux premiers chiffres du code postal ont été lus à
l'envers ou tronqués (07 → 77, 41 → 91, 09 → 95, 82 → 91, 64 → 95). Probablement
un bug d'import ou de saisie, pas des erreurs isolées.

Deux cas sont de vraies erreurs de secteur et non des inversions : EXPERTEAM
(Nanterre, bien en 92 mais rattaché au 77) et PRESS CLUB (Issy affiché, mais code
postal parisien — l'adresse elle-même est peut-être fausse).

**À corriger dans le CRM.** Une fois corrigés, EXPERTEAM et PRESS CLUB pourront
réintégrer la publication ; les cinq autres sortiront naturellement du périmètre.
