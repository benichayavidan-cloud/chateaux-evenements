# Stratégie SEO Complète — Select Châteaux
## 2 juin 2026

---

## 1. Backlinks — Actions immédiates

### Annuaires événementiels (soumettre le site)

| Annuaire | URL | Priorité | Notes |
|----------|-----|----------|-------|
| 1001 Salles | https://www.1001salles.com | HAUTE | Leader annuaire salles événementielles FR |
| Bird Office | https://www.bird-office.com | HAUTE | Spécialisé événements corporate |
| ABC Salles | https://www.abc-salles.com | MOYENNE | Annuaire généraliste salles |
| Eventail | https://www.eventail.com | MOYENNE | Annuaire événementiel |
| Châteaux Events | https://www.chateaux-events.com | HAUTE | Spécialisé châteaux |
| Séminaires Green | https://www.seminaires-green.com | MOYENNE | Focus RSE/éco-responsable |
| Atout France | https://www.atout-france.fr | HAUTE | Institutionnel tourisme FR |
| CCI Oise / CCI Yvelines | Sites locaux | MOYENNE | Référencement local |

### Partenaires prestataires (demander un lien retour)

Vérifier si ces sites partenaires linkent vers selectchateaux.com :
- Sites web des 4 châteaux partenaires (InterContinental, Manoir anglo-normand, Abbaye, MGallery)
- Traiteurs récurrents
- Prestataires team building (escape game, rallye 2CV, etc.)
- Paris Society (6 restaurants à l'Abbaye)

**Template email de demande de lien :**

> Objet : Partenariat Select Châteaux — lien vers votre site
>
> Bonjour [Prénom],
>
> Nous travaillons régulièrement ensemble pour des séminaires d'entreprise dans vos locaux. Nous avons une page dédiée à [nom du château/prestataire] sur notre site : [URL de la page].
>
> Serait-il possible d'ajouter un lien vers Select Châteaux sur votre page [partenaires / lieux recommandés / presse] ? Nous vous linkons déjà depuis notre site.
>
> Voici les informations :
> - Nom : Select Châteaux
> - URL : https://www.selectchateaux.com
> - Description : Organisation de séminaires et événements d'entreprise en château en Île-de-France
>
> Merci et à bientôt,
> [Signature]

### Google Business Profile

L'API GMB n'est pas activée (quota 0). Optimisations à faire manuellement sur https://business.google.com :
- [ ] Vérifier/compléter la description avec mots-clés : "séminaire château", "privatisation château", "événement entreprise Île-de-France"
- [ ] Ajouter catégories secondaires : "Salle de réception", "Organisateur d'événements", "Salle de séminaire"
- [ ] Publier 2-3 posts GMB avec photos châteaux + CTA devis
- [ ] Vérifier que toutes les photos sont de qualité (10+ photos minimum)
- [ ] Répondre à TOUS les avis non répondus
- [ ] Activer la messagerie GMB

### LinkedIn (signaux sociaux)

- Publier 1-2 posts/semaine avec lien vers un article blog ou une page château
- Partager les nouveaux articles de Camille
- Engager avec les DRH, Office Managers, Event Planners dans les commentaires

---

## 2. Agent Camille — Diagnostic et optimisations

### Situation actuelle
- Workflow GitHub Actions : **actif**, tourne toutes les heures
- Schedule : **lundi + jeudi** (jours 1 et 4) à `publish_hour` (défini dans Supabase `agent_controls`)
- Dernier commit : **20 mai 2026** (13 jours sans publication)
- Problème probable : `isSimilarSlug()` rejette les articles (trop proches des 45+ articles existants) ou `publish_hour` ne matche pas

### Actions recommandées
1. Vérifier dans Supabase la table `agent_controls` : valeur de `enabled`, `schedule`, `publish_hour`
2. Augmenter la fréquence : passer de `1,4` à `1,2,3,4,5` (lundi-vendredi) pour 10 articles/semaine
3. Si cannibalisation bloquante : assouplir le seuil de `isSimilarSlug` de 0.7 à 0.8, ou ajouter des sujets de niche non couverts
4. Requêtes GSC prioritaires pour les prochains articles :
   - "séminaire chantilly" (320 imp, pos 24.9)
   - "chateau team building" (74 imp, pos 18)
   - "chateau seminaire oise" (86 imp, pos 17.7)
   - "séminaire yvelines" (~ pos 12)

---

## 3. KPIs et suivi

### Baseline — 2 juin 2026
| Métrique | Valeur |
|----------|--------|
| Impressions / 30j | ~2 750 |
| Clics organiques / 30j | ~50 |
| CTR moyen | 1.8% |
| Sessions organiques / 30j | 21 |
| Position moyenne | 20.3 desktop, 13.4 mobile |

### Points de contrôle
- **J+7** : vérifier que les pages modifiées sont ré-indexées (GSC URL Inspection)
- **J+14** : première mesure CTR post-optimisation
- **J+30** : comparaison complète vs baseline
- **J+90** : évaluation SEO = canal #1 de leads

---

## 4. Récapitulatif des changements on-page effectués (2 juin 2026)

### Fichiers modifiés
1. `src/data/blog-posts.ts` — 3 titles articles blog optimisés (checklist, murder-party, yvelines-78)
2. `src/data/internal-link-map.ts` — ajout règle maillage Chantilly (priorité 10)
3. `src/components/blog/MarkdownRenderer.tsx` — 3 liens internes corrigés (Chevreuse → geo page, Team Building → page dédiée)
4. `src/app/layout.tsx` — title template ajouté ("%s | Select Châteaux")
5. `src/app/page.tsx` — title raccourci, H1 optimisé, 2 sections SEO ajoutées (7 liens géo + 3 articles populaires)
6. `src/data/geo-landing-pages.ts` — 2 titles "Ch." corrigés, 5 descriptions tronquées <155 chars
7. `src/app/team-building-chateau/page.tsx` — title optimisé + 1 FAQ ajoutée
8. `src/components/geo/GeoLandingPage.tsx` — ReviewsSection + AggregateRating ajoutés
9. `src/app/chateaux/[slug]/ChateauPageClient.tsx` — alt texts enrichis avec seoH1
10. 5 metadata.ts — suffixes "| Select Châteaux" retirés (template layout les ajoute)
