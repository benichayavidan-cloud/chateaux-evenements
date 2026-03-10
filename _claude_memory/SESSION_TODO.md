# TODO - Prochaine session

## Images — État d'avancement

### Abbaye Vaux de Cernay (id="3") ✅ TERMINÉ
- [x] Hero — 13 images, chambre deluxe en petite image
- [x] Hébergement — 12 images chambres (extraBedroomImages)
- [x] Espaces de travail — 16 images salons (extraMeetingImages)
- [ ] Galerie "Une expérience d'exception" — encore sur Supabase (7 imgPath)

### Mont Royal (id="4") ✅ TERMINÉ
- [x] Hero — chambre premium terrasse en petite image
- [x] Galerie — 11 images locales (remplace 4 Supabase)
- [x] Hébergement — 9 images chambres/suites
- [x] Espaces de travail — 9 images salles

### Reine Margot (id="2") — À FAIRE
- [ ] Hero — toujours sur Supabase (4 imgPath)
- [ ] Espaces de réunion — pas de extraMeetingImages pour "2"
- [x] Galerie — 10 images locales
- [x] Hébergement — 5 images locales (extraBedroomImages)

### Montvillargenne (id="1") ✅ Déjà fait
- Tout en local

## À vérifier post-déploiement
- [ ] Vérifier réception email admin avec nouveau format
- [ ] Tester formulaire depuis chaque type de page

## SEO - Actions manuelles
- [ ] Demander indexation des 6 pages géo dans Google Search Console
- [ ] Resoumettre sitemap dans GSC
- [ ] Implémenter recommandations audit SEO (`_claude_docs/2026-03-08_audit-seo-complet.md`)

## Notes techniques
- Images locales dans `/public/images/`, anciennes sur Supabase via `imgPath()`
- Pattern per-château : `Record<string, string[]>` dans ChateauPageClient.tsx
- Déploiement : `npx vercel --prod`
- Images source Desktop : `/Users/avidanbenichay/Desktop/Image du site/`
