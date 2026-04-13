# TODO - Prochaine session

## Session 14 avril 2026 — Design flip cards

### ✅ Fait cette session

#### Flip Cards Team Building — Centrage
- [x] Bouton "Devis gratuit" : ajout display inline-flex + alignItems center + justifyContent center
- [x] Bouton : hauteur fixe 36px + lineHeight 36px pour centrage vertical parfait
- [x] Footer carte : restructuré en colonne centrée (durée + bouton empilés, centrés)
- [x] Tout le dos de la carte centré : catégorie, titre, description, tags, footer
- [x] Tags : justifyContent center ajouté
- [x] Déployé en prod (3 déploiements successifs)
- [x] Commit : a6c6de3

#### Scrollbar flip cards
- [x] Diagnostic : `overflowY: 'auto'` sur la description → scrollbar visible sur Windows, masquée sur macOS
- [x] Décision : on ne touche pas (pas de modification)

### ⏳ À faire prochaine session

#### URGENT — Indexation GSC
- [ ] Demander indexation pour : seminaire-chateau-chantilly-guide-2026
- [ ] Demander indexation pour : seminaire-residentiel-vs-non-residentiel-choisir

#### Google Ads — Suivi CPA cible
- [ ] Vérifier si les impressions sont revenues après ajout du CPA cible 963₪
- [ ] Si toujours 0 impression → revenir à TARGET_SPEND
- [ ] Surveiller le CPA réel vs cible 963₪

#### Re-audit Ads complet (~22 avril)
- [ ] Vérifier impact MAXIMIZE_CONVERSIONS + CPA cible (2 semaines d'apprentissage)
- [ ] Comparer : impressions/jour, clics/jour, CPC moyen, conversions
- [ ] Si les 22 mots-clés dormants n'ont toujours rien → les couper
- [ ] Vérifier que GA4 capte maintenant les sessions et conversions Ads

#### SEO — Priorités
- [ ] Backlinks : contacter Conseils-Tourisme.com (2 articles → 3 liens dofollow)
- [ ] Publier 3 articles Medium + 1 article LinkedIn
- [ ] Pitcher Ô Mon Château + Voyages en Patrimoine
- [ ] Pitcher Républik Event + Écho Touristique
- [ ] Commander Top 5 Boosterlink (154€)
- [ ] Contacter offices de tourisme Oise, Yvelines, Chantilly
- [ ] Optimiser meta descriptions des pages à fort potentiel (hotel seminaire chantilly = 156 imp, pos 48)

#### Reporté
- [ ] Nettoyage fichiers _claude_docs (12 fichiers non trackés)
- [ ] LinkedIn : logo, couverture, services
- [ ] CRM : Pusher Vercel, auto-sélection prestataires IA

## Notes
- Scrollbar flip cards : visible sur Windows (overflowY auto), masquée sur macOS — décision de ne pas modifier
- Stratégie Ads : MAXIMIZE_CONVERSIONS + tCPA 963₪ (depuis 9 avril)
- Budget Ads : 350₪/jour (inchangé)
- 5 conversions historiques
- CPA cible ajouté le 9 avril — vérifier résultats ~22 avril
