# Plan — Ramener le trafic vers l'intention « lieu et organisation de séminaire »

**Date** : 06/10/2026 · **Statut** : v2, après tes annotations · **Complexité** : moyenne
**Règle** : uniquement du code et des données mesurées. Chaque constat cite sa source.

**Ce qui change par rapport à la v1**
- On démarre **tout de suite**, sans attendre le 08/10.
- Toutes les requêtes en concurrence sont traitées d'un coup, sans pilote.
- **Plus de fusion qui risque de perdre une place** : on garde la page que Google préfère, et c'est elle qu'on rend commerciale.
- Le trafic « animation » n'est pas sacrifié : il est **réorienté** vers des lieux et un devis.
- L'agent choisit ses sujets d'après les recherches qui ont **réellement** donné des demandes.

---

## 1. Le constat, vérifié

| # | Constat | Mesure | Source |
|---|---|---|---|
| C1 | Un seul article fait 39 % des clics | murder party : 122 clics sur 311 (29/05→27/08) | Search Console, export du 30/08 |
| C2 | Google nous montre surtout sur l'intention cible, mais trop bas | « lieu de séminaire » = **62 % des apparitions** visibles, place moyenne **24**, **2 clics** · « animation » = 6,6 % des apparitions, **13 clics** | Search Console, requêtes classées par intention |
| C3 | Sur nos requêtes cibles, **nos articles passent devant nos pages commerciales** | articles à la place **17,5**, pages commerciales entre la **28ᵉ et la 50ᵉ** | Search Console, couples requête × page |
| C4 | 2 à 4 de nos pages se disputent la même requête | « séminaire yvelines » : article 24,7, page derrière · « séminaire oise » : article 20, page 31,9 · « séminaire chantilly » : 4 pages | `gsc-audit` 30 j (06/09→06/10) |
| C5 | L'agent de rédaction **renforce** ces concurrents | le garde-fou ne tourne qu'à la création (`pipeline.js:527`), pas à la réécriture (`step2_reecritures`, l.410). L'article Yvelines a été réécrit le 01/10 | code + test du 06/10 : le garde-fou **refuse** les 3 articles |
| C6 | Les visiteurs du blog repartent sans voir l'offre | depuis le 24/09 : 57 visites Google entrent par le blog → **46 ne voient qu'une page**, **2 atteignent /devis** | traceur CRM, lecture seule |
| C7 | Sur les requêtes cibles, Google veut un **catalogue de lieux** | top 10 : Funbooker, Kactus, Aleou, Chateauform, Homanie, Alfred Meeting, et des sites de lieux | `bdata search --country fr` (06/10) |
| C8 | **Les recherches qui ont donné des demandes sont connues** | en pub (mars-avril) : « séminaire proche paris » 4 demandes · « domaine séminaire île de france » 5 · « séminaire chantilly » 3 · « séminaire 78 » 1 · « lieu séminaire chantilly » 1. Sans résultat : « au vert », « atypique », « résidentiel » | audits Google Ads du 14, 19 et 23/04 (`_claude_docs/`) |
| C9 | Les pages commerciales perdantes ne rapportent presque rien | page Yvelines : 1 clic en 90 j · page Oise : 2 · page Chantilly : 0 | Search Console 29/05→27/08 |

**Ce que ça veut dire**
- On sait ce qui convertit (C8). Ce sont les requêtes « séminaire + lieu géographique ».
- Sur ces requêtes, on se bat contre nous-mêmes (C3, C4), et l'agent aggrave la situation (C5).
- La page qui perd ne rapporte rien (C9). La redistribuer ne coûte rien.

**Non mesuré, non supposé** : l'autorité du domaine (10 liens externes venant de 9 domaines au 31/08, le netlinking est écarté depuis le 01/09) et les ~90 % de clics que Google ne détaille pas.

---

## 2. Le plan

### Lot 0 — Mesure *(jour 1)*

| Tâche | Fichier | Validation |
|---|---|---|
| 0.1 ✅ Search Console reconnectée le 06/10 | — | septembre lu en direct : 143 clics, 11 089 apparitions |
| 0.2 **Photo « avant »** : pour chaque requête cible, place et clics de chaque page, au jour près sur les 28 derniers jours. C'est la référence du bilan. | `scripts/agent-seo/intention.mjs` | fichier daté dans `_claude_docs/` |
| 0.3 Classement des requêtes par intention, ajouté au relevé hebdomadaire de Marcus | même script + test | 20 requêtes réelles étiquetées à la main |

### Lot 1 — Bloquer l'agent *(jour 1, petit correctif)*

| Tâche | Fichier | Validation |
|---|---|---|
| 1.1 Le garde-fou s'applique aussi aux **réécritures**. Si une réécriture est refusée, l'article garde son texte. | `scripts/agent-cm/pipeline.js` (`step2_reecritures`) | test dans `reecriture.test.mjs` |
| 1.2 Les pages transformées au lot 2 sortent de la file de réécriture de l'agent | `pipeline.js` (`listerArticlesReecrivables`) + `seo-clusters.json` | test |

> Indispensable : l'agent réécrit 3 articles par jour, il défairait le lot 2.

### Lot 2 — Une seule page par requête, celle que Google préfère *(jours 2 à 4)*

**Règle, appliquée par un script et non à la main** :
pour chaque requête en concurrence (C4), on garde l'URL **la mieux placée** dans la Search Console, sur 28 jours. Puis :

1. **On la rend commerciale sur place, sans changer d'adresse.** Elle reçoit les blocs qui existent déjà sur les pages départements :
   - la liste des lieux du secteur, tirée de `venues.ts` ;
   - le budget observé dans le CRM ;
   - le formulaire de devis (`DevisFormMini`) ;
   - le balisage `ItemList`.

   Son texte actuel reste en place.
2. **On redirige (301) la page perdante vers la gagnante.** Elle ne rapporte presque rien (C9).

| Requête | Gagnante (mesurée) | Perdante → redirigée |
|---|---|---|
| séminaire yvelines | /blog/seminaire-yvelines-78-luxe-proximite (24,7) | /seminaire-chateau-yvelines-78 |
| séminaire oise | /blog/seminaire-oise-nature-prestige-paris (20) | /seminaire-chateau-oise-60 |
| team building chantilly | /blog/seminaire-chantilly-activites-team-building (18,6) | /team-building-chantilly |
| les 11 autres (C4) | calculé par le script, jour 2 | calculé |

- **Pourquoi c'est mieux qu'une fusion vers la page commerciale** : on ne déplace pas la page qui a la place. On change ce qu'elle contient, pas son adresse.
- **Ce qui est réversible** : retirer la redirection et les blocs.
- **Garde-fou** : la règle reste « une seule page par requête ». `seo-clusters.json` est mis à jour pour désigner la gagnante comme page propriétaire, et le garde-fou de l'agent suit.
- **Validation technique** : sonde en production (301 → 200, une seule redirection, sitemap à jour). Formulaire testé sur chaque gagnante avec une adresse @example.com.

### Lot 3 — Réorienter le trafic « animation » sans le perdre *(jours 2 à 3)*

Mesure : 46 visiteurs du blog sur 57 ne voient qu'une page (C6). Le pilote actuel affiche 3 lieux **en bas** de 21 articles.

| Tâche | Détail |
|---|---|
| 3.1 **Bloc « Où l'organiser »** placé **après l'introduction** des articles d'animation (murder party, escape game, activités…) | lieux de `venues.ts` filtrés sur des données réelles (capacité, département), lien vers /team-building-chateau |
| 3.2 **Devis prérempli** dans ce bloc : « Recevoir des lieux pour votre murder party », activité déjà remplie | composant `DevisFormMini` existant, champ activité prérempli depuis l'article |
| 3.3 **Mesure** | suivi `CLICK_CTA` déjà en place (libellé `article-lieux:<slug>`) + `origine_page` des demandes |

- **Conséquence assumée** : la murder party et les articles pilotes étaient dans le test du 30/09. Ce test s'arrête. Le bilan se fera par comparaison avant / après sur ces articles.
- **On ne touche pas au texte de ces articles** : leur place dans Google reste intacte.

### Lot 4 — L'agent choisit ses sujets d'après les données de demande *(jours 4 à 6)*

**Trois sources de données réelles, aucune intuition :**

1. **Ce qui a converti** : les mots-clés de la pub avec leurs demandes (C8), versionnés dans le dépôt comme liste de référence.
2. **Ce que Google considère comme « transactionnel »** : pour chaque sujet candidat, l'agent interroge la recherche Google réelle (Bright Data). Si le top 10 est dominé par des catalogues de lieux ou des sites de lieux, c'est une intention « lieu ». Si ce sont des blogs ou des guides, c'est une intention « information ». Le calcul se fait sur la liste des domaines, il est mesurable.
3. **La demande réelle** : apparitions dans la Search Console sur ce sujet.

**Ce que l'agent produit** :
- en priorité, des pages **« lieu + critère »** construites sur les champs réels de `venues.ts` : capacité, département, ville, salles de réunion, équipements. Exemple : « séminaire proche Paris », qui a donné 4 demandes en pub.
- un critère n'est retenu que si les sources 2 et 3 le confirment ;
- plus aucun nouveau sujet « animation pure ».

**Validation** : test unitaire. Un sujet « escape game » est écarté. « séminaire proche paris » est retenu, parce que son top 10 est fait de catalogues et de lieux.

---

## 3. Ordre

```
Jour 1   : Lot 0 (photo avant) + Lot 1 (agent bloqué)
Jours 2-4: Lot 2 (une page par requête)  ║  Lots 3 (bloc lieux + devis)
Jours 4-6: Lot 4 (sujets guidés par la donnée)
J+14, J+28 : bilan avant / après, requête par requête
```

## 4. Risques

| Risque | Probabilité | Parade |
|---|---|---|
| Sans témoin, on ne peut pas séparer notre effet d'une mise à jour Google | moyenne | comparaison avant / après requête par requête, et suivi des requêtes qu'on n'a pas touchées |
| Des blocs commerciaux sur un article font baisser sa place | faible à moyenne | texte inchangé, blocs ajoutés seulement. Retrait si la place baisse de plus de 5 rangs à J+14 |
| La page redirigée avait une valeur non visible | faible | C9 : 0 à 2 clics en 90 jours. Redirection réversible |
| Trop peu de demandes pour conclure (4 à 8 par mois) | élevée | juger d'abord sur les places et les clics des requêtes C8, puis sur les demandes par page d'arrivée |

## 5. Hors plan

- Netlinking, annuaires, Google Business : décision du 01/09.
- Pages gelées de Marcus (`/`, `/devis`) : aucune modification.
