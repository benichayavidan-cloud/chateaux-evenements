# 🚀 Campagnes Google Ads - Select Châteaux

## ✅ 4 FICHIERS EXCEL SIMPLES

### 📊 Fichiers disponibles

1. **1_campagnes.csv** - Les 2 campagnes
2. **2_groupes_annonces.csv** - Les 8 groupes d'annonces
3. **3_mots_cles.csv** - Les 41 mots-clés
4. **4_mots_cles_negatifs.csv** - Les 48 mots-clés à exclure

**Format** : CSV (s'ouvre directement dans Excel)

---

## 📁 1_campagnes.csv (3 lignes)

### Colonnes
- Nom de la campagne
- Type
- Budget par jour (€)
- Langue
- Pays

### Contenu
```
Search_Seminaire_IDF → 13€/jour
Search_Seminaire_Oise → 7€/jour
```

---

## 📁 2_groupes_annonces.csv (9 lignes)

### Colonnes
- **Campagne** (à quelle campagne appartient le groupe)
- Nom du groupe d'annonces

### Contenu
**7 groupes dans Search_Seminaire_IDF** :
- Seminaire_78_Yvelines
- Seminaire_77_Seine_Marne
- Seminaire_91_Essonne
- Seminaire_92_Hauts_de_Seine
- Seminaire_94_Val_de_Marne
- Seminaire_95_Val_d_Oise
- Seminaire_Ile_de_France

**1 groupe dans Search_Seminaire_Oise** :
- Seminaire_60_Oise

---

## 📁 3_mots_cles.csv (42 lignes)

### Colonnes
- **Campagne** (dans quelle campagne)
- **Groupe d'annonces** (dans quel groupe)
- Mot-clé
- Type de correspondance
- Enchère max (€)

### Contenu
**41 mots-clés** répartis dans les 8 groupes d'annonces

Type de correspondance : **Expression** (Phrase Match)
Enchère max : **1.00€**

Exemples :
```
Search_Seminaire_IDF → Seminaire_78_Yvelines → "séminaire entreprise 78"
Search_Seminaire_IDF → Seminaire_78_Yvelines → "château séminaire Yvelines"
Search_Seminaire_Oise → Seminaire_60_Oise → "séminaire entreprise 60"
```

---

## 📁 4_mots_cles_negatifs.csv (49 lignes)

### Colonnes
- **Campagne** (à quelle campagne appartient l'exclusion)
- Mot-clé à exclure
- Type de correspondance

### Contenu
**48 mots-clés négatifs** au niveau des campagnes

Type de correspondance : **Large** (Broad Match)

**34 exclusions pour Search_Seminaire_IDF** :
mariage, wedding, anniversaire, fête, party, baptême, gratuit, pas cher, tourisme, visite, vacances, team building, restaurant, hotel, particulier, famille, enfant, etc.

**14 exclusions pour Search_Seminaire_Oise** :
mariage, wedding, anniversaire, fête, party, gratuit, pas cher, tourisme, visite, vacances, team building, restaurant, particulier

---

## 📊 Vue d'ensemble

### Structure complète

```
CAMPAGNE: Search_Seminaire_IDF (13€/jour)
├─ Groupe: Seminaire_78_Yvelines
│  ├─ 5 mots-clés (séminaire entreprise 78, château séminaire Yvelines, etc.)
├─ Groupe: Seminaire_77_Seine_Marne
│  ├─ 5 mots-clés
├─ Groupe: Seminaire_91_Essonne
│  ├─ 5 mots-clés
├─ Groupe: Seminaire_92_Hauts_de_Seine
│  ├─ 5 mots-clés
├─ Groupe: Seminaire_94_Val_de_Marne
│  ├─ 5 mots-clés
├─ Groupe: Seminaire_95_Val_d_Oise
│  ├─ 5 mots-clés
├─ Groupe: Seminaire_Ile_de_France
│  ├─ 5 mots-clés
└─ 34 mots-clés négatifs (niveau campagne)

CAMPAGNE: Search_Seminaire_Oise (7€/jour)
├─ Groupe: Seminaire_60_Oise
│  ├─ 6 mots-clés
└─ 14 mots-clés négatifs (niveau campagne)
```

---

## 📊 Statistiques

| Fichier | Lignes | Éléments |
|---------|--------|----------|
| 1_campagnes.csv | 3 | 2 campagnes |
| 2_groupes_annonces.csv | 9 | 8 groupes |
| 3_mots_cles.csv | 42 | 41 mots-clés |
| 4_mots_cles_negatifs.csv | 49 | 48 exclusions |
| **TOTAL** | **103** | **99 éléments** |

**Budget mensuel** : ~600€ (20€/jour × 30 jours)

---

## 🎯 Utilisation

### Ouvrir dans Excel
1. Double-cliquer sur chaque fichier .csv
2. Excel s'ouvre automatiquement
3. Les données sont déjà organisées en colonnes

### Modifier les données
- **Campagnes** : Modifier budget, nom, etc.
- **Groupes** : Ajouter/supprimer des groupes d'annonces
- **Mots-clés** : Ajouter/modifier des mots-clés par groupe
- **Négatifs** : Ajouter/supprimer des exclusions

### Import dans Google Ads
Utiliser ces fichiers comme référence pour créer vos campagnes dans Google Ads Editor ou l'interface web.

---

## ✅ Avantages

✔️ **4 fichiers séparés** : facile à comprendre
✔️ **Format Excel** : s'ouvre directement
✔️ **Colonnes claires** : Campagne, Groupe d'annonces toujours indiqués
✔️ **Organisation simple** : un type de données par fichier
✔️ **Modification facile** : ouvrir avec Excel et modifier

---

**Date** : 28 janvier 2026
**Statut** : ✅ **4 FICHIERS EXCEL PRÊTS**
**Version** : 12.0 - Format simple et clair pour Excel
