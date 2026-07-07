# Baseline tunnel de conversion (CRO) — 2026-06-11

Snapshot AVANT optimisation CRO. Sert de point de comparaison pour mesurer l'impact à S+2 / S+4.
Source : GA4 (Data API), fenêtre **90 jours** glissants au 2026-06-11.

## Trafic global (90j)
| Métrique | Valeur |
|---|---|
| Utilisateurs | 357 |
| Sessions | 435 |
| Pages vues | 829 |
| Durée moy. session | 153 s |
| Taux de rebond | 51,0 % |
| Sessions engagées | 213 |

## Tunnel de conversion (events GA4, 90j)
| Étape | Events | Users |
|---|---|---|
| view_item (vue château) | 66 | 38 |
| **form_start** | 57 | 26 |
| **form_submit** | 24 | 21 |
| **generate_lead** | 50 | 21 |
| phone_click | 6 | 4 |

## Pages clés (90j)
| Page | Vues | Users | Rebond |
|---|---|---|---|
| `/` | 258 | 171 | 44 % |
| `/devis` | 54 | 36 | 20 % |
| `/seminaire-chateau-ile-de-france` | 52 | 27 | **6,7 %** |
| `/team-building-chateau` | 50 | 17 | 8 % |
| `/devis/merci` | 24 | 21 | — |

## KPI nord (baseline)
- **Taux de complétion formulaire** (`form_submit` / `form_start`, events) : **24 / 57 = 42 %** → ~58 % d'abandon.
- **Atteinte de `/devis`** : 36 / 357 users = **10 %** du trafic.
- **Leads** (`generate_lead` users) : **21 / 90j ≈ 7 leads/mois**.

## Fuites identifiées
1. **Haut de tunnel** : seulement 10 % du trafic atteint le formulaire.
2. **Abandon formulaire** : ~58 % — cause racine = dates fermes obligatoires (décideurs B2B en recherche).

## Changements déployés le 2026-06-11 (à mesurer)
- **Axe 1** — `DevisFormMini` : micro-rassurance sous le bouton + auto-remplissage date départ = date arrivée. (commit `1630760`)
  - Itérations dates (toggle → case optionnelle → retrait) puis **état final** : dates arrivée+départ **obligatoires** + case **« Ces dates ne sont pas encore définitives »** = simple drapeau (ajoute « ⚠️ Dates NON DÉFINITIVES » au commentaire devis, ne change pas l'obligation). (commit `826effa`)
- **Axe 2** — `StickyCtaBar` ajoutée sur **homepage** + **team-building** (pages à fort trafic qui en manquaient ; geo/chateaux l'avaient déjà). CTA persistant Appeler + Devis Gratuit → `/devis#formulaire`. (commit `6977753`)
- **Formulaire intelligent** — participants en chiffre précis + aide ; autofill natif (`autocomplete`) ; entreprise auto-déduite du domaine email pro ; date départ = date arrivée ; ✓ vert email/tél. (commit `36eb3fe`)
- **Fix autofill** — déduction entreprise + ✓ vert désormais déclenchés par la valeur (effet + dérivé), compatibles autofill navigateur. (commit `cf40183`)
- **Visiteur de retour** — coordonnées (Nom/Entreprise/Email/Tél) mémorisées en localStorage (`sc_devis_contact`) et pré-remplies au retour. (commit `938cdc7`)
- Déploiements via `vercel --prod` (auto-deploy Git→Vercel inactif). Restauration : tag `pre-cro-2026-06-11` ou rollback Vercel.

## Prochaines mesures
- **S+2 (2026-06-25)** et **S+4 (2026-07-09)** : re-relever les mêmes events, comparer taux de complétion + leads/mois.
- Vérifier la répartition exact vs flexible des soumissions (champ `dates_souhaitees` en base : valeurs sans `|` = mode flexible).
