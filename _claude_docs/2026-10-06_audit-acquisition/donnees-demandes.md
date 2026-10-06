# Demandes de devis du site selectchateaux.com — 19/02 → 05/10/2026

Audit en lecture seule (06/10/2026). Sources : table `demandes_devis_chateaux` (Supabase site) croisée avec les dossiers `Event` du CRM (rôle `marcus_ro`), rapprochement par domaine email. Détail ligne à ligne : `demandes.json` (aucun email, téléphone ni nom de personne).

---

## 🟢 Les chiffres clés

- **57 demandes brutes**, **53 uniques** (doublons < 7 jours retirés), **50 projets prospects** (sans les 2 relances GS1 ni le lieu partenaire).
- **Aucune demande en janvier** : la première date du 19/02.
- **40 des 50 projets** sont arrivés dans le CRM, **28** ont reçu au moins un devis visible, **2 sont signés**.
- Taux de signature : **4 %** des projets, **7 %** des projets ayant reçu des devis.
- **Les 2 seules affaires signées du CRM viennent du site.**

Recoupement avec la mesure du 24/09 : identique (55 lignes au 23/09 ; juin 5, juillet 8, août 4 uniques, septembre 7 uniques au 23).

---

## Série mensuelle

| Mois | Brutes | Uniques | Pub (gclid) | Hors pub certain | Sans gclid pendant la pub |
|---|---|---|---|---|---|
| janv. | 0 | 0 | 0 | 0 | 0 |
| févr. | 1 | 1 | 0 | 0 | 1 |
| mars | 2 | 2 | 2 | 0 | 0 |
| avril | 15 | 15 | 11 | 0 | 4 |
| mai | 10 | 9 | 2 | 3 | 4 |
| juin | 5 | 5 | 0 | 5 | 0 |
| juil. | 8 | 8 | 0 | 8 | 0 |
| août | 5 | 4 | 0 | 4 | 0 |
| sept. | 9 | 7 | 0 | 7 | 0 |
| oct. (1-5) | 2 | 2 | 0 | 2 | 0 |
| **Total** | **57** | **53** | **15** | **29** | **9** |

Règle pub : gclid présent = pub. Après le 15/05 sans gclid = hors pub certain. Avant le 15/05 sans gclid = inconnu (pub sans gclid possible, ou naturel).

Pic d'avril = pub (11 sur 15). Sans pub, le rythme est de **4 à 8 demandes uniques par mois**, stable de juin à septembre.

---

## Canal et page de dépôt

- **Canal mesuré seulement depuis le 24/09** (`origine_canal`) : 2 demandes, toutes deux **Google naturel**.
- Avant : seul indice = gclid (pub). Pas de referer ni d'UTM stockés. Le suivi du CRM (SiteSession) ne commence que le 16/05 et ne relie aucune visite à un lead.
- **Page de dépôt** :
  - févr.-juin : non stockée. Déduction faible : 5 demandes avec un seul château coché = fiche château ; le reste = formulaire général probable.
  - juil.-août : lue dans la note « Lead site web » du CRM → 7 page /devis, 1 fiche château, 1 landing séminaire Île-de-France, 3 inconnues.
  - sept.-oct. : `source_page` → 8 page /devis, 1 landing « séminaire proche Paris », (Terumo : + 2 fiches châteaux le même jour, comptées en doublon).
- **Aucune demande déposée depuis un article de blog ou une fiche /lieux** sur toute la période. Normal du 06/09 au 29/09 (formulaire cassé). Mais les 2 demandes d'octobre **sont arrivées par le blog** puis ont cliqué vers /devis : le blog amène, /devis encaisse.

---

## Devenir dans le CRM (par mois de demande, projets prospects)

| Mois | Projets | Dans le CRM | Envoyés aux lieux | Devis présentés | Signés | Perdus/annulés | En cours |
|---|---|---|---|---|---|---|---|
| févr. | 1 | 1 | 0 | 0 | 0 | 1 | 0 |
| mars | 2 | 1 | 1 | 1 | 0 | 1 | 0 |
| avril | 14 | 10 | 10 | 9 | 0 | 8 | 2 |
| mai | 9 | 6 | 6 | 6 | 1 | 2 | 3 |
| juin | 5 | 5 | 5 | 5 | 0 | 1 | 4 |
| juil. | 8 | 7 | 4 | 3 | 0 | 0 | 7 |
| août | 3 | 2 | 1 | 1 | 1 | 0 | 1 |
| sept. | 6 | 6 | 4 | 2 | 0 | 0 | 6 |
| oct. | 2 | 2 | 1 | 1 | 0 | 0 | 2 |
| **Total** | **50** | **40** | **32** | **28** | **2** | **13** | **25** |

« En cours » inclut 7 dossiers jamais travaillés (statut Nouvelle demande, 0 lieu sollicité).

### Les 2 signatures

| Affaire | Origine | Chiffres |
|---|---|---|
| EIFFAGE ÉNERGIE SYSTÈMES (demande 12/05, 50 pers.) | Google Ads (gclid) | Mode commission. Devis lieu 24 625 € HT, base facture finale 38 864,73 € HT, **commission 3 886,47 € HT (10 %)** — facture **en retard, 0 € encaissé** (échéance 20/08) |
| GROUPE AXTOM (demande 18/08, 50 pers.) | Hors pub, page /devis | Mode agence. Achat 27 787 € HT, vente 29 732,62 € HT, **marge 1 945,62 € HT (6,5 %)** — événement le 07/10 |

**Revenu Select Châteaux généré par le site : ≈ 5 832 € HT**, dont 0 € encaissé à ce jour.

### Entonnoir pub vs hors pub (projets prospects)

| Origine | Projets | Devis présentés | Signés |
|---|---|---|---|
| Pub (gclid) | 15 | 11 | 1 |
| Hors pub certain | 27 | 13 | 1 |
| Inconnu (pendant la pub) | 8 | 4 | 0 |

Perdus ou annulés (13) : concurrent 6, pas de réponse 3, événement annulé 2, budget 1, annulé sans motif 1 (Chanel).

---

## Profil des demandes (50 projets)

- **Taille** : médiane 48 participants, moyenne 64. <20 : 11 · 20-49 : 14 · 50-99 : 12 · 100-199 : 9 · 200+ : 4. Jusqu'en juillet le formulaire proposait des tranches (20/50/100/200), les valeurs sont approximatives.
- **Type** : le site enregistre « séminaire » pour 100 % des demandes (champ figé). Requalifié dans le CRM : 33 séminaires résidentiels, 6 journées d'étude, 1 soirée.
- **Budget** : renseigné 1 fois sur le site ; 14 fois par les commerciaux dans le CRM (de 3 500 € HT à 40 000 € TTC, ou 200-470 €/pers.).
- **Durée** : « 1 jour » pour 49 sur 50 (valeur par défaut probable, peu fiable).
- **Qui** : 41 entreprises, 4 agences événementielles (1788 L'agence, Antidote, Premium Events, La Fabrique Événementielle), 1 plateforme concurrente (Jurnee), 4 webmails/particuliers. 1 lieu partenaire (Abbaye des Vaux-de-Cernay, prestataire du CRM) écarté.
- **Récurrents** : très peu. Dentsu (2 projets distincts, mai et juin), Yamazaki Mazak (2e projet ouvert à la main). **GS1 n'est pas un client récurrent** : même contact, mêmes dates (juin 2027), renvoyé en juillet, août et septembre — c'est une relance du même projet, toujours sans devis visible.

---

## Demandes depuis le 24/09 (origine exacte)

| Date | Société | Canal | Page d'arrivée | Référent | Déposée sur | Devenir CRM |
|---|---|---|---|---|---|---|
| 01/10 08:48 | La Fabrique Événementielle (agence) | Google naturel | /blog/murder-party-chateau-activite-immersive | www.google.com | /devis (5 min après l'arrivée) | Nouvelle demande, 0 lieu sollicité |
| 01/10 19:02 | OTIS | Google naturel | /blog/alternative-chateauform-ile-de-france | www.google.com | /devis (4 min après l'arrivée) | En cours, 35 lieux sollicités, 3 devis présentés, événement le 14/10 |

Aucune demande du 24 au 30/09, ni du 02 au 05/10.

---

## Autres canaux d'entrée (hors formulaire)

- **44 dossiers dans le CRM** : 40 issus du formulaire, 1 doublon (Dentsu créé deux fois le 24/06), **3 hors formulaire** :
  - Yamazaki Mazak, 2e projet (client déjà venu par le site) ;
  - LCL, créé à la main le 09/07, même budget que Pacifica (groupe Crédit Agricole) : bouche-à-oreille interne au groupe probable ;
  - YOYO (webmail, 17/09), perdu, origine non tracée.
- **Part du site : ~93 % des dossiers, 100 % des signatures.** Aucun appel ni email entrant n'est journalisé comme source dans le CRM (pas de champ source sur les dossiers). Clics téléphone mesurés : 1 en octobre (suivi trop récent pour conclure).

---

## Limites

- Pas de canal fiable avant le 24/09 : hors gclid, on ne sait pas si une demande vient de Google naturel, d'un lien ou d'une IA.
- Rapprochement site ↔ CRM par domaine email (pas d'identifiant commun). Les 4 webmails sont rapprochés par la date.
- 10 projets n'ont jamais été saisis dans le CRM (dont 8 avant juillet, avant le pont automatique ; Premium Events le 06/07 et un webmail le 07/08 après).
- « Devis présenté » = au moins un devis visible côté client ; le CRM ne trace pas si le client l'a vraiment lu.
- Montants : une seule commission facturée (non payée) et une marge agence calculée devis vs vente ; pas de factures client enregistrées (EventInvoice vide).
- Taille, type, durée et budget du formulaire sont en grande partie des valeurs par défaut.
