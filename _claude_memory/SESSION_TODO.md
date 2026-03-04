# TODO - Prochaine session

## Vérifier post-déploiement (session 2026-03-04)
- [ ] Tester le mini-formulaire devis sur une page château en production (soumission + insertion Supabase)
- [ ] Vérifier redirection vers `/devis/merci` et que le conversion tracking Google Ads fire
- [ ] Tester responsive mobile : CTA hero, bandeau chiffres clés, formulaire inline, sticky bar à 300px
- [ ] Tag Assistant : confirmer que `trackFormSubmit("devis-express")` et `trackDevisRequest` remontent

## Enhanced Conversions Google Ads (session 2026-03-01)
- [ ] Attendre 24-48h puis vérifier Google Ads → Diagnostics des conversions améliorées
- [ ] Faire un test de soumission formulaire via un clic Google Ads réel
- [ ] Vérifier dans Supabase qu'un GCLID est bien stocké après un clic Ads

## SEO - Actions manuelles
- [ ] Demander l'indexation des 6 pages géo dans Google Search Console
- [ ] Resoumettre le sitemap dans GSC
- [ ] Demander l'indexation des 7 pages "Détectée, non indexée"

## SEO - Améliorations futures
- [ ] Créer des images hero spécifiques par région (toutes partagent la même actuellement)
- [ ] Créer des images OG uniques par page géo (1200x630px)
- [ ] Stratégie backlinks : Google Business Profile, annuaires (ALEOU, Kactus, 1001 Salles)
- [ ] Ajouter section "Nos régions" sur la page d'accueil

## A traiter séparément
- [ ] Optimiser la page catalogue `/chateaux` (responsive + conversion)
- [ ] Ajouter témoignages filtrés par château (actuellement mélangés)

## Performance
- [ ] LCP reste > 2.5s : envisager CDN dédié pour les images

## Points d'attention
- Le mini-form envoie `entreprise: "-"` et `budget: ""` → l'API accepte mais les emails admin recevront ces valeurs placeholder
- Le champ `nombreChambres` est hardcodé à 1 dans le mini-form
- Images château en 404 en local (normal) — fonctionne en production via Supabase
- Déploiement auto Vercel parfois "Canceled" — utiliser npx vercel --prod si besoin
