# SESSION TODO — SITE-WEB

## Session du 25/08/2026 — Audit SEO/LLM + corrections complètes

### ✅ Fait (mergé sur main, commit 33b2f3c)
- Audit SEO + visibilité LLM complet (rapport : `_claude_docs/2026-08-25_audit-seo-llm.md` + artifact)
- P1 : `/chateaux` refondu en Server Component (891 mots servis vs 165, H1 + 4 châteaux visibles des bots IA)
- P2 : dé-cannibalisation home (→ « location de château pour séminaire ») ↔ zone IDF + ancre exacte + lien article tarifs
- P3 : pagination blog 36/page (`/blog/page/2-9`, tri date desc, vrais 404 via dynamicParams=false)
- P4 : meta descriptions tronquées à 155 car. (garde-fou `lib/seo.ts`, 240/291 articles concernés), title /a-propos, AggregateRating Organization supprimé partout
- Agent Camille RÉPARÉ : image `gemini-3.1-flash-image` (Imagen retiré de l'API ~17/08 = cause de l'arrêt), tables `agent_controls`/`camille_session_logs` créées sur Supabase select-chateaux (planning lun-ven 9h), secrets GitHub SUPABASE_* corrigés

### ✅ Vague 3 (soir) — E-E-A-T, preuve sociale, perf
- Auteur unique Sophie Durand + page /auteurs/sophie-durand (schema Person)
- Faux avis remplacés par les 6 vrais avis GMB + sameAs fiche Google Business
- Page /references : 6 études de cas extraites du CRM (Eiffage réalisé -17%, Safran 280p, LCL, Boston Scientific…)
- Team building : title recentré Île-de-France + FAQ Hauts-de-Seine/Issy (GSC pos 56 → à suivre)
- Perf : chunk client 5,8 Mo éliminé (Chantilly 53→82, /blog TBT 2330→410ms)
- Workflows : gsc-audit.yml + llm-citations.yml (baseline 6/7 citations LLM)

### ⏳ À faire (prochaines sessions)
- [ ] Vérifier le run Camille déclenché manuellement (32824461520) a bien publié + les runs planifiés des prochains jours
- [ ] Vérifier le déploiement Vercel de main (33b2f3c) → re-scraper /chateaux en prod (bdata) pour confirmer les 891 mots servis
- [ ] PO : inscrire les 4 châteaux sur Kactus, Aleou, 1001salles, Funbooker (leads + backlinks + citations LLM)
- [ ] PO : campagne d'avis Google Business post-événement (objectif 30+)
- [ ] Suivi mensuel : re-lancer les 7 requêtes SERP de l'audit + tests citation ChatGPT/Perplexity
- [ ] Optionnel : `npx unlighthouse --site https://www.selectchateaux.com` (Core Web Vitals toutes pages)
- [ ] Décider si le planning Camille (lun-ven 9h, réglé dans agent_controls) doit être piloté depuis /admin/agents du CRM
