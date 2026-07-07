# AUDIT GOOGLE ADS — SELECT CHÂTEAUX
## 12 mars 2026 | Budget : 600€/mois | Lun-Jeu horaires bureau

---

## ÉTAT ACTUEL

| Métrique | Valeur | Benchmark B2B |
|---|---|---|
| Impressions | 709 | — |
| Clics | 67 | — |
| CTR | **9,45%** | 3-5% → **EXCELLENT** |
| CPC moyen | ~7€ | 3-8€ → Normal |
| Conversions trackées | **0** | — → **CASSÉ** |
| Lead réel | 1 | Attendu : 1-4 avec 67 clics |
| Quality Ads | Excellente | — → **BIEN** |

**Verdict** : Tes annonces sont bonnes (CTR excellent, quality "Excellente"). Le problème n'est PAS les annonces. Le problème est : **(1) le tracking cassé**, **(2) le budget fragmenté**, et **(3) les landing pages qui ne convertissent pas**.

---

## 🚨 PRIORITÉ 1 — TRACKING CONVERSION (à faire MAINTENANT)

### Problème confirmé : le Consent Mode bloque 100% des conversions

**Recherche effectuée** : En Consent Mode v2 Advanced, quand `ad_storage = denied`, Google envoie des "pings anonymes" pour de la modélisation statistique. MAIS cette modélisation ne s'active qu'à partir de **700 clics sur 7 jours**. Tu as 67 clics en 6 semaines → **la modélisation ne s'active JAMAIS**. Résultat : 100% des conversions sont perdues silencieusement.

**Preuve** : Tu as reçu 1 lead par email, Google Ads affiche 0 conversions, état = "Aucune conversion récente".

### Actions techniques (je peux les coder maintenant) :

**Action 1 — Forcer la conversion Ads sur /devis/merci même sans consentement**
La conversion publicitaire est un signal first-party essentiel. On peut la déclencher indépendamment du consent analytics.

**Action 2 — Ajouter des micro-conversions pour donner des signaux à Google**
Avec 600€/mois tu auras peu de leads. Il faut tracker des signaux intermédiaires :
- `phone_click` → déjà codé, mais pas remonté comme conversion Ads
- `form_start` → quand quelqu'un commence à remplir le formulaire devis
- Configurer `phone_click` en conversion **primaire** dans Google Ads (un appel = un lead potentiel)

**Action 3 — Vérifier l'auto-tagging GCLID**
Dans Google Ads → Paramètres du compte → vérifier que "Auto-tagging" est **activé**. C'est ce qui permet à Google de relier un clic à une conversion.

---

## 🔴 PRIORITÉ 2 — FUSIONNER EN 1 SEULE CAMPAGNE

### Problème : budget fragmenté = Google n'apprend rien

Avec 600€/mois répartis sur 2 campagnes :
- INTENTION_LUXE : ~150€/mois = ~5€/jour = **<1 clic/jour**
- SNIPER_GEO_IDF : ~450€/mois = ~15€/jour = ~2 clics/jour

Google a besoin de données pour optimiser. Avec <1 clic/jour sur une campagne, l'algorithme est aveugle.

### Action : 1 campagne, 2 groupes d'annonces

```
Campagne : SÉMINAIRE CHÂTEAU IDF (budget: 20€/jour = 600€/mois)
├── Groupe 1 : Intention Générale
│   ├── [chateau séminaire ile de france]
│   ├── "location chateau séminaire"
│   ├── [domaine séminaire ile de france]
│   ├── [lieu séminaire château]
│   └── [lieu séminaire proche paris]
└── Groupe 2 : Sniper Géo
    ├── "séminaire chantilly"
    ├── "séminaire 78"
    ├── "séminaire 92"
    ├── [séminaire chevreuse]
    └── [lieu séminaire oise]
```

**Résultat attendu** : ~3-4 clics/jour au lieu de ~1,5 fragmentés. Google accumule de la data 2x plus vite.

---

## 🔴 PRIORITÉ 3 — PASSER EN MANUAL CPC (Enhanced)

### Problème : "Maximiser les clics" envoie du trafic de basse qualité

Toutes les sources confirment : avec moins de 30 conversions/mois et un budget <2000€/mois, **Manual CPC avec Enhanced CPC** est la meilleure stratégie.

- "Maximiser les clics" → Google cherche le clic le moins cher, PAS le clic qui convertit
- "Maximiser les conversions" → impossible, 0 données de conversion
- **Manual CPC (eCPC)** → tu contrôles le CPC max, Google ajuste de ±30% quand il détecte une chance de conversion

### Action dans Google Ads :
1. Paramètres campagne → Stratégie d'enchères → **CPC manuel**
2. Cocher **"Ajustement des enchères pour les conversions (eCPC)"**
3. Fixer un CPC max par mot-clé :
   - Mots-clés haute intention ("location chateau séminaire", "chateau séminaire ile de france") : **6-7€**
   - Mots-clés géo ("séminaire chantilly", "séminaire 78") : **4-5€**
   - Mots-clés informationnels ("lieu séminaire") : **3-4€**

**Résultat attendu** : +30% de clics à budget égal (CPC moyen passe de 7€ à 5€).

---

## 🔴 PRIORITÉ 4 — RÉDUIRE À 10-15 MOTS-CLÉS MAX

### Problème : trop de mots-clés = budget dilué

Actuellement ~30+ mots-clés dont beaucoup avec 0 impression. Avec 600€/mois, chaque mot-clé doit rapporter.

### Mots-clés à GARDER (haute intention, prouvés) :

| Mot-clé | Type | Impr. | Clics | CTR | Garder ? |
|---|---|---|---|---|---|
| "location chateau séminaire" | Phrase | 120 | 4 | 3,3% | ✅ OUI (gros volume) |
| [domaine séminaire ile de france] | Exact | 21 | 4 | 19% | ⭐ OUI (excellent CTR) |
| "séminaire chantilly" | Phrase | 18 | 4 | 22% | ⭐ OUI (meilleur CTR) |
| "séminaire 78" | Phrase | 41 | 5 | 12% | ⭐ OUI (bon volume) |
| [chateau séminaire ile de france] | Exact | 9 | 2 | 22% | ✅ OUI |
| "séminaire 92" | Phrase | 24 | 1 | 4% | ✅ OUI (à surveiller) |
| "séminaire oise" | Phrase | 36 | 3 | 8% | ✅ OUI |
| [lieu séminaire au vert paris] | Exact | 18 | 1 | 5,6% | ✅ OUI |
| [lieu séminaire proche paris] | Exact | 20 | 1 | 5% | ✅ OUI |
| [salle séminaire chateau] | Exact | 6 | 1 | 17% | ✅ OUI |

### Mots-clés à SUPPRIMER (0 impression ou 0 clic) :
- [séminaire résidentiel chateau] → 0 impression
- [domaine séminaire yvelines] → 0 impression
- [organisation séminaire yvelines] → 0 impression
- [lieu séminaire 78] → 0 impression
- [séminaire hauts de seine] → 0 impression
- [séminaire résidentiel yvelines] → 0 impression
- [séminaire vallée de chevreuse] → 1 impression, 0 clic
- [salle réunion hauts de seine] → 2 impressions, 0 clic
- [soirée entreprise chateau] → 8 impressions, 0 clic
- [lieu séminaire haut de gamme] → 5 impressions, 0 clic
- [séminaire au vert proche paris] → 7 impressions, 0 clic

### Mots-clés à AJOUTER (manquants) :
- [château événement entreprise] → intention forte
- [location château entreprise] → transactionnel
- "séminaire résidentiel ile de france" → phrase match, volume potentiel

---

## 🟡 PRIORITÉ 5 — LANDING PAGES

### Problème : les gens cliquent mais ne convertissent pas

Avec un CTR de 9,45%, les annonces fonctionnent. Le problème est APRÈS le clic.

**Actuellement** : le trafic arrive sur `/chateaux` (page listing) ou sur les pages châteaux individuelles. Ces pages sont longues, le formulaire est loin, il faut scroller.

### Action recommandée :

**Option A (rapide)** : Changer l'URL finale des annonces vers `/devis` au lieu de `/chateaux`. Le visiteur arrive directement sur le formulaire.

**Option B (idéale)** : Créer une landing page dédiée Google Ads avec :
- ZERO menu de navigation (pas de lien sortant = pas de fuite)
- Le numéro de téléphone cliquable en haut
- 3-4 photos des châteaux
- 3 chiffres clés ("4 châteaux", "à 30 min de Paris", "500+ événements")
- Le formulaire COURT (5 champs max) directement visible
- 2-3 témoignages

**Les landing pages dédiées convertissent 2 à 4x mieux** que les pages de site classiques (source : Instapage B2B study 2025).

---

## 🟡 PRIORITÉ 6 — EXTENSIONS D'ANNONCES

Chaque extension augmente le CTR de 10-15% et ne coûte rien de plus.

### Vérifier que tout est actif :
- ✅ **Liens annexes** : Nos 4 Châteaux, Devis 24H, Séminaire Résidentiel, Journée d'Étude → OK
- ✅ **Accroches** : Lieux d'exception, Séminaires au vert, etc. → OK
- ✅ **Appel** : 07 57 99 11 46 → OK
- ✅ **Extraits structurés** : Destinations → OK
- ✅ **Images** : plusieurs → OK
- ✅ **Logo** : OK

### À ajouter :
- **Call tracking** : Configurer un numéro de transfert Google pour mesurer les appels comme conversions. Un appel >60 secondes = 1 conversion. **Les appels convertissent 10x mieux que les clics web en B2B.**

---

## 🟡 PRIORITÉ 7 — CIBLAGE GÉO

### Vérification importante :
Dans Google Ads → Paramètres → Emplacements → **Options avancées** :
- S'assurer que c'est sur **"Présence : personnes situées dans vos zones ciblées"**
- PAS "Présence ou intérêt" (défaut Google, qui cible aussi des gens hors zone)

---

## 🟢 PRIORITÉ 8 — AUDIENCES EN OBSERVATION

Ajouter dans Google Ads → Audiences → mode **"Observation"** (ne restreint pas, donne des données) :
- In-Market : "Event Planning Services", "Business Services"
- Affinité : "Business Professionals"

Après 4-6 semaines, augmenter les enchères de +20% sur les audiences qui performent.

---

## PLAN D'ACTION SEMAINE PAR SEMAINE

| Semaine | Action | Où | Temps |
|---|---|---|---|
| **S1** | Fixer le conversion tracking (je code ça) | Site web | 1h |
| **S1** | Fusionner en 1 campagne + Manual CPC 5€ | Google Ads | 30min |
| **S1** | Réduire à 10-15 mots-clés (supprimer les 0 impr.) | Google Ads | 20min |
| **S1** | Vérifier ciblage géo "Présence uniquement" | Google Ads | 5min |
| **S1** | Vérifier auto-tagging GCLID activé | Google Ads | 2min |
| **S2** | Ajouter micro-conversions (phone_click, form_start) | Google Ads + Site | 1h |
| **S2** | Activer call tracking sur extension d'appel | Google Ads | 15min |
| **S3-S4** | Créer landing page dédiée Ads (option B) | Site web | 3h |
| **S5+** | Analyser audiences, ajuster enchères | Google Ads | 15min/sem |

---

## RÉSULTATS ATTENDUS (réalistes)

| Métrique | Actuel | Après optimisation (M+2) |
|---|---|---|
| Clics/mois | ~30 | 80-120 |
| CPC moyen | 7€ | 4-5€ |
| Taux conversion | 0% (cassé) | 3-5% |
| Leads/mois | ~0 | 3-6 |
| Coût/lead | ∞ | 100-200€ |

Avec un panier moyen séminaire de 5 000-50 000€, même **1 lead converti/mois = ROI massif**.
