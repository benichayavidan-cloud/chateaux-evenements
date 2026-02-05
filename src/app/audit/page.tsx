"use client";

import { useState } from "react";
import {
  Search, Shield, Zap, ImageIcon, BarChart3,
  CheckCircle2, AlertTriangle, XCircle, ChevronRight,
  Globe, Lock, Gauge, Camera, TrendingUp, Smartphone
} from "lucide-react";

/* ─────────────── TYPES ─────────────── */
type Tab = "seo" | "security" | "performance" | "images" | "tracking" | "responsive";
type Status = "ok" | "warning" | "critical";

interface AuditItem {
  label: string;
  status: Status;
  detail: string;
  file?: string;
}

/* ─────────────── DATA ─────────────── */

const tabs: { id: Tab; label: string; icon: React.ReactNode; score: number; color: string }[] = [
  { id: "seo", label: "SEO", icon: <Globe className="w-5 h-5" />, score: 81, color: "#f59e0b" },
  { id: "security", label: "Sécurité", icon: <Lock className="w-5 h-5" />, score: 75, color: "#f59e0b" },
  { id: "performance", label: "Performance", icon: <Gauge className="w-5 h-5" />, score: 66, color: "#ef4444" },
  { id: "images", label: "Images & Alt", icon: <Camera className="w-5 h-5" />, score: 74, color: "#f59e0b" },
  { id: "tracking", label: "GA4 & Ads", icon: <TrendingUp className="w-5 h-5" />, score: 75, color: "#f59e0b" },
  { id: "responsive", label: "Responsive", icon: <Smartphone className="w-5 h-5" />, score: 70, color: "#f59e0b" },
];

/* ─── SEO ─── */
const seoMetadata: AuditItem[] = [
  { label: "Homepage - Titre unique", status: "ok", detail: "57 car. optimisé", file: "src/app/page.tsx:17" },
  { label: "Homepage - Description", status: "ok", detail: "160 car. avec keywords", file: "src/app/page.tsx:18" },
  { label: "Homepage - Open Graph", status: "ok", detail: "Complet (image, titre, desc)", file: "src/app/page.tsx:22" },
  { label: "Châteaux listing - Titre", status: "ok", detail: "74 car. (un peu long)", file: "src/app/chateaux/metadata.ts" },
  { label: "Châteaux listing - Layout écrase metadata.ts", status: "critical", detail: "layout.tsx redéfinit TOUT le metadata → metadata.ts jamais utilisé", file: "src/app/chateaux/layout.tsx:4-50" },
  { label: "Châteaux [slug] - generateMetadata", status: "ok", detail: "Dynamique par château, titres uniques", file: "src/app/chateaux/[slug]/layout.tsx:11" },
  { label: "Séminaires - Metadata complète", status: "ok", detail: "Titre 61 car., desc 154 car., OG complet", file: "src/app/seminaires-soirees-entreprise/metadata.ts" },
  { label: "À propos - Metadata complète", status: "ok", detail: "Titre unique, OG complet", file: "src/app/a-propos/metadata.ts" },
  { label: "Devis - Metadata", status: "ok", detail: "Optimisé conversion, noindex correct", file: "src/app/devis/metadata.ts" },
  { label: "Blog - generateMetadata", status: "ok", detail: "Dynamique par article, type article", file: "src/app/blog/[slug]/layout.tsx:9" },
  { label: "Pages légales - Metadata", status: "ok", detail: "Titres corrects, noindex", file: "src/app/mentions-legales/metadata.ts" },
];

const seoStructure: AuditItem[] = [
  { label: "Heading H1 unique par page", status: "ok", detail: "Vérifié sur toutes les pages" },
  { label: "Hiérarchie H1→H2→H3", status: "ok", detail: "Aucun saut de niveau détecté" },
  { label: "H1 invisible (sr-only) Homepage", status: "warning", detail: "H1 caché en sr-only → OK SEO mais pas optimal UX", file: "src/app/page.tsx:55" },
  { label: "H1 invisible (sr-only) Châteaux", status: "warning", detail: "H1 caché en sr-only → OK SEO mais pas optimal UX", file: "src/app/chateaux/page.tsx:87" },
  { label: "Canonical URLs", status: "ok", detail: "100% - Toutes les pages ont un canonical correct" },
  { label: "Sitemap dynamique", status: "ok", detail: "Pages statiques + châteaux inclus", file: "src/app/sitemap.ts" },
  { label: "Sitemap - Blog exclu", status: "warning", detail: "30+ articles non inclus (blog en noindex)", file: "src/app/sitemap.ts:75" },
  { label: "Conflit robots.txt", status: "critical", detail: "public/robots.txt (restrictif) vs src/app/robots.ts (permissif) → Next.js ignore public/robots.txt", file: "public/robots.txt + src/app/robots.ts" },
];

const seoSchemas: AuditItem[] = [
  { label: "Organization Schema", status: "ok", detail: "Complet (nom, email, tel, adresse, areaServed)", file: "src/utils/seo/structured-data.ts:14" },
  { label: "WebSite Schema", status: "ok", detail: "SearchAction configuré", file: "src/utils/seo/structured-data.ts:217" },
  { label: "Service Schema", status: "ok", detail: "4 services dans OfferCatalog", file: "src/utils/seo/structured-data.ts:103" },
  { label: "Place Schema (Châteaux)", status: "ok", detail: "Dynamique: EventVenue + capacité + rating", file: "src/utils/seo/structured-data.ts:59" },
  { label: "FAQ Schema", status: "ok", detail: "Dynamique par château", file: "src/utils/seo/structured-data.ts:164" },
  { label: "Breadcrumb Schema", status: "ok", detail: "Homepage, châteaux, blog", file: "src/utils/seo/structured-data.ts:183" },
  { label: "BlogPosting Schema", status: "ok", detail: "Complet (author, publisher, keywords, wordCount)", file: "src/app/blog/[slug]/layout.tsx:71" },
  { label: "AggregateRating statique", status: "warning", detail: "4.8/5 avec 12 reviews hardcodé → peut être considéré comme faux", file: "src/utils/seo/structured-data.ts:200" },
  { label: "sameAs (réseaux sociaux)", status: "warning", detail: "Commenté dans Organization Schema", file: "src/utils/seo/structured-data.ts:38" },
];

/* ─── SÉCURITÉ ─── */
const secHeaders: AuditItem[] = [
  { label: "Strict-Transport-Security (HSTS)", status: "ok", detail: "max-age=63072000; includeSubDomains; preload", file: "next.config.ts:78" },
  { label: "X-Frame-Options", status: "ok", detail: "SAMEORIGIN", file: "next.config.ts:82" },
  { label: "X-Content-Type-Options", status: "ok", detail: "nosniff", file: "next.config.ts:86" },
  { label: "Referrer-Policy", status: "ok", detail: "strict-origin-when-cross-origin", file: "next.config.ts:94" },
  { label: "Permissions-Policy", status: "ok", detail: "camera=(), microphone=(), geolocation=()", file: "next.config.ts:98" },
  { label: "X-Powered-By supprimé", status: "ok", detail: "poweredByHeader: false", file: "next.config.ts:59" },
  { label: "CSP (Content Security Policy)", status: "warning", detail: "Présente mais 'unsafe-inline' dans script-src et style-src", file: "src/middleware.ts:57" },
  { label: "Duplication CSP", status: "warning", detail: "CSP définie dans middleware.ts ET vercel.json → conflit potentiel", file: "vercel.json:31 + middleware.ts" },
];

const secVulns: AuditItem[] = [
  { label: "XSS dans MarkdownRenderer", status: "critical", detail: "dangerouslySetInnerHTML sans sanitization + innerHTML mutation directe", file: "src/components/blog/MarkdownRenderer.tsx:86" },
  { label: "Protection CSRF absente", status: "critical", detail: "API /api/devis sans vérification Origin/Referer → faux devis possibles", file: "src/app/api/devis/route.ts" },
  { label: "Rate limiting insuffisant", status: "warning", detail: "200 req/15min trop permissif + stockage mémoire (perdu au redémarrage)", file: "src/middleware.ts:4" },
  { label: "Validation Zod stricte", status: "ok", detail: "Toutes les entrées API validées avec schemas Zod", file: "src/app/api/devis/route.ts:7" },
  { label: "0 vulnérabilités npm", status: "ok", detail: "573 packages audités, aucune vulnérabilité" },
  { label: "Secrets serveur séparés", status: "ok", detail: "SMTP, Service Role Key non exposés côté client" },
  { label: "Aucune fuite .env dans Git", status: "ok", detail: ".gitignore correct, .env.local jamais commité" },
  { label: "Consent Mode v2 RGPD", status: "ok", detail: "Mode Advanced, opt-in, 5 régions", file: "src/lib/consent-mode.ts" },
  { label: "Pas de CAPTCHA formulaire", status: "warning", detail: "Aucun CAPTCHA → spam possible via faux devis", file: "src/app/api/devis/route.ts" },
  { label: "Révocation consentement", status: "warning", detail: "Pas de lien 'Gérer les cookies' dans le footer" },
];

/* ─── PERFORMANCE ─── */
const perfScores = [
  { page: "Homepage", perf: 76, seo: 100, fcp: "1.9s", lcp: "3.9s", tbt: "300ms", cls: "0" },
  { page: "Châteaux", perf: 71, seo: 69, fcp: "1.3s", lcp: "4.3s", tbt: "420ms", cls: "0" },
  { page: "Devis", perf: 70, seo: 69, fcp: "1.1s", lcp: "3.6s", tbt: "800ms", cls: "0" },
];

const perfIssues: AuditItem[] = [
  { label: "Framer Motion sur 27 fichiers", status: "critical", detail: "~45KB gzipped chargé sur TOUTES les pages → principal frein TBT", file: "27 composants" },
  { label: "35 composants 'use client'", status: "critical", detail: "Trop de JS côté navigateur → TBT élevé", file: "35 fichiers" },
  { label: "ChateauPageClient = 714 lignes", status: "critical", detail: "Composant client monolithique → à split en Server+Client", file: "src/app/chateaux/[slug]/ChateauPageClient.tsx" },
  { label: "DevisForm = 730 lignes client", status: "critical", detail: "Formulaire monolithique → lazy-load les étapes", file: "src/components/DevisForm/index.tsx" },
  { label: "Seulement 2 dynamic imports", status: "warning", detail: "ReviewsSection et CookieConsent uniquement → beaucoup plus à lazy-loader" },
  { label: "CSS double (Bootstrap + Tailwind)", status: "warning", detail: "~64KB CSS total → Bootstrap grid encore utilisé par Footer", file: "src/styles/design-system.css" },
  { label: "Fonts optimisées (swap)", status: "ok", detail: "Cormorant + Inter, display:swap, preconnect", file: "src/app/layout.tsx:12" },
  { label: "Images AVIF + WebP", status: "ok", detail: "Formats modernes activés dans next.config", file: "next.config.ts" },
  { label: "Middleware léger", status: "ok", detail: "Rate limiting /api uniquement, assets exclus" },
  { label: "Scripts GA afterInteractive", status: "ok", detail: "Non-bloquant, chargé après hydration", file: "src/components/Analytics.tsx" },
];

/* ─── IMAGES ─── */
const imageStats = {
  total: 58,
  altCorrect: 50,
  altManquant: 8,
  sizesPresent: 43,
  sizesMissing: 15,
  qualitySet: 23,
  qualityMissing: 35,
  priorityCorrect: 57,
  webpFiles: 31,
  jpgFiles: 31,
};

const imageIssues: AuditItem[] = [
  { label: "Card.tsx - Composant réutilisable", status: "critical", detail: "Pas de prop sizes ni quality → affecte toutes les cards du site", file: "src/components/ui-v2/Card.tsx:104" },
  { label: "Step3 Devis - Sélection châteaux", status: "critical", detail: "Alt générique (juste nom), pas de sizes, pas de quality", file: "src/components/DevisForm/Step3ChateauSelection.tsx:71" },
  { label: "LogoCarousel (2 versions)", status: "critical", detail: "Pas de sizes, width/height statiques au lieu de fill", file: "src/components/LogoCarousel.tsx + home/LogoCarousel.tsx" },
  { label: "Galerie Château - Alt générique", status: "warning", detail: "Alt = 'Image 1, 2, 3...' au lieu de descriptions", file: "src/app/chateaux/[slug]/ChateauPageClient.tsx:549" },
  { label: "Lightbox - Alt 'Image agrandie'", status: "warning", detail: "Devrait utiliser le même alt que l'image source", file: "src/app/chateaux/[slug]/ChateauPageClient.tsx:707" },
  { label: "Blog Featured Post sans priority", status: "warning", detail: "Image above-the-fold sans priority={true}", file: "src/app/blog/page.tsx:144" },
  { label: "31 fichiers JPG à convertir", status: "warning", detail: "Gain estimé 2-3 MB si convertis en WebP" },
  { label: "Photos équipe = Unsplash", status: "warning", detail: "Photos temporaires, remplacer par vraies photos", file: "src/app/a-propos/page.tsx:357" },
  { label: "Heros - priority + quality", status: "ok", detail: "Tous les heros ont priority + quality optimisé" },
  { label: "Fonctions generateChateauAlt()", status: "ok", detail: "Excellente pratique : alt dynamiques SEO-friendly", file: "src/components/ChateauxSection.tsx" },
  { label: "Lazy loading par défaut", status: "ok", detail: "95% des images below-fold correctement lazy" },
];

/* ─── GA4 & ADS ─── */
const trackingItems: AuditItem[] = [
  { label: "GA4 chargé en production", status: "ok", detail: "G-TRWZDPNN9E via gtag.js, afterInteractive", file: "src/components/Analytics.tsx" },
  { label: "Google Ads configuré", status: "ok", detail: "AW-17912491834, tag chargé avec GA4", file: "src/components/Analytics.tsx" },
  { label: "Consent Mode v2 Advanced", status: "ok", detail: "Script inline AVANT gtag.js, 4 params v2, 5 régions", file: "src/app/layout.tsx:113" },
  { label: "Conversion Ads sur /devis/merci", status: "ok", detail: "send_to correct, value 1€, transaction_id unique", file: "src/app/devis/merci/MerciContent.tsx:14" },
  { label: "Événement generate_lead (GA4)", status: "ok", detail: "Tracké sur /devis/merci après soumission", file: "src/app/devis/merci/MerciContent.tsx:28" },
  { label: "Page views SPA", status: "ok", detail: "usePathname + useSearchParams → tracking navigation client", file: "src/components/Analytics.tsx" },
  { label: "Remarketing Ads activé", status: "ok", detail: "Automatique via gtag config AW-*" },
  { label: "Clic téléphone tracké", status: "ok", detail: "Événement phone_click sur Footer", file: "src/components/sections-v2/Footer.tsx:141" },
  { label: "Mise à jour consentement", status: "ok", detail: "gtag consent update sur accepter/refuser", file: "src/components/CookieConsent.tsx" },
  { label: "Transaction ID non persisté", status: "warning", detail: "ID aléatoire non stocké en BDD → pas de réconciliation CRM", file: "src/app/devis/merci/MerciContent.tsx" },
  { label: "trackFormSubmit() non utilisé", status: "warning", detail: "Fonction disponible mais jamais appelée dans DevisForm", file: "src/components/Analytics.tsx:144" },
  { label: "trackChateauView() non utilisé", status: "warning", detail: "Fonction disponible mais jamais appelée sur pages châteaux", file: "src/components/Analytics.tsx:171" },
  { label: "Pas de tracking progression form", status: "warning", detail: "Pas d'événements form_step_1, form_step_2, etc." },
  { label: "Pas de tracking scroll depth", status: "warning", detail: "Impossible de mesurer l'engagement scroll" },
  { label: "GTM non configuré", status: "warning", detail: "Composant existe mais NEXT_PUBLIC_GTM_ID absent", file: "src/components/Analytics.tsx:93" },
  { label: "Pas de cookie banner granulaire", status: "warning", detail: "Pas de choix séparé Analytics vs Ads" },
];

/* ─── RESPONSIVE ─── */
const responsiveItems: AuditItem[] = [
  { label: "Viewport meta tag (auto Next.js)", status: "ok", detail: "Ajouté automatiquement par Next.js" },
  { label: "Overflow-x hidden", status: "ok", detail: "Protection scroll horizontal sur html + body", file: "src/app/globals.css" },
  { label: "Menu mobile hamburger", status: "ok", detail: "State isOpen, icônes Menu/X, slide-in", file: "src/components/sections-v2/Navigation.tsx" },
  { label: "Images responsive (next/image)", status: "ok", detail: "Sizes responsive sur 74% des images" },
  { label: "Clamp() pour typography", status: "ok", detail: "Font-sizes fluides avec clamp()", file: "src/app/globals.css" },
  { label: "Approche mixte mobile/desktop-first", status: "warning", detail: "17 media queries max-width (desktop-first) + classes Tailwind min-width (mobile-first)", file: "src/app/globals.css" },
  { label: "Bootstrap Grid + Tailwind Grid", status: "warning", detail: "2 systèmes de grid coexistent → overhead CSS", file: "src/styles/design-system.css + globals.css" },
  { label: "Largeurs fixes en px", status: "warning", detail: "Plusieurs width: Xpx détectés (400px, 1200px, 1400px)", file: "src/app/globals.css" },
  { label: "Font-sizes en px (non responsive)", status: "warning", detail: "11 occurrences de font-size en px au lieu de rem/clamp", file: "src/app/globals.css" },
  { label: "Navigation desktop centrage absolu", status: "warning", detail: "position:absolute pour centrer le menu desktop → fragile", file: "src/components/sections-v2/Navigation.tsx" },
  { label: "Formulaires mobile", status: "ok", detail: "Inputs responsive, steps adaptés" },
  { label: "Grilles cartes adaptive", status: "ok", detail: "grid-cols-1 → 2 → 3 → 4 selon breakpoints" },
];

/* ─────────────── HELPERS ─────────────── */

function StatusIcon({ status }: { status: Status }) {
  if (status === "ok") return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
  if (status === "warning") return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
  return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
}

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 90 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }} />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fill={color}
        fontSize={size * 0.3} fontWeight="bold" transform={`rotate(90 ${size / 2} ${size / 2})`}>
        {score}
      </text>
    </svg>
  );
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-16 text-right">{value}/{max}</span>
    </div>
  );
}

function AuditList({ items }: { items: AuditItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
          item.status === "critical" ? "bg-red-50 border-red-200" :
          item.status === "warning" ? "bg-amber-50 border-amber-200" :
          "bg-emerald-50 border-emerald-200"
        }`}>
          <StatusIcon status={item.status} />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900">{item.label}</div>
            <div className="text-xs text-gray-600 mt-0.5">{item.detail}</div>
            {item.file && (
              <div className="text-xs text-gray-400 mt-0.5 font-mono truncate">{item.file}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">{children}</h3>;
}

/* ─────────────── SECTIONS ─────────────── */

function SEOSection() {
  const ok = [...seoMetadata, ...seoStructure, ...seoSchemas].filter(i => i.status === "ok").length;
  const warn = [...seoMetadata, ...seoStructure, ...seoSchemas].filter(i => i.status === "warning").length;
  const crit = [...seoMetadata, ...seoStructure, ...seoSchemas].filter(i => i.status === "critical").length;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-2xl p-5 text-center border border-emerald-200">
          <div className="text-3xl font-bold text-emerald-600">{ok}</div>
          <div className="text-sm text-emerald-700 font-medium">OK</div>
        </div>
        <div className="bg-amber-50 rounded-2xl p-5 text-center border border-amber-200">
          <div className="text-3xl font-bold text-amber-600">{warn}</div>
          <div className="text-sm text-amber-700 font-medium">À améliorer</div>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 text-center border border-red-200">
          <div className="text-3xl font-bold text-red-600">{crit}</div>
          <div className="text-sm text-red-700 font-medium">Critique</div>
        </div>
      </div>

      <div>
        <SectionTitle><Search className="w-5 h-5 text-blue-600" /> Metadata par page</SectionTitle>
        <AuditList items={seoMetadata} />
      </div>

      <div>
        <SectionTitle><Globe className="w-5 h-5 text-purple-600" /> Structure & Indexation</SectionTitle>
        <AuditList items={seoStructure} />
      </div>

      <div>
        <SectionTitle><BarChart3 className="w-5 h-5 text-orange-600" /> Structured Data (JSON-LD)</SectionTitle>
        <AuditList items={seoSchemas} />
      </div>

      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200">
        <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <XCircle className="w-5 h-5" /> Actions critiques
        </h4>
        <ul className="space-y-2 text-sm text-red-700">
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Supprimer public/robots.txt</strong> — Garder uniquement src/app/robots.ts</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Corriger duplication metadata /chateaux</strong> — layout.tsx écrase metadata.ts</li>
        </ul>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
          <div className="text-2xl font-bold text-emerald-600 mb-1">0 vulnérabilités</div>
          <div className="text-sm text-emerald-700">573 packages npm audités</div>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
          <div className="text-2xl font-bold text-emerald-600 mb-1">8 headers</div>
          <div className="text-sm text-emerald-700">Sécurité HTTP configurés</div>
        </div>
      </div>

      <div>
        <SectionTitle><Shield className="w-5 h-5 text-blue-600" /> Headers HTTP</SectionTitle>
        <AuditList items={secHeaders} />
      </div>

      <div>
        <SectionTitle><Lock className="w-5 h-5 text-red-600" /> Vulnérabilités & Protection</SectionTitle>
        <AuditList items={secVulns} />
      </div>

      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200">
        <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <XCircle className="w-5 h-5" /> Actions critiques
        </h4>
        <ul className="space-y-2 text-sm text-red-700">
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Sanitizer MarkdownRenderer</strong> — Installer dompurify, sanitizer dangerouslySetInnerHTML</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Protection CSRF sur /api/devis</strong> — Vérifier header Origin</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Ajouter CAPTCHA</strong> — Cloudflare Turnstile sur formulaire devis</li>
        </ul>
      </div>
    </div>
  );
}

function PerformanceSection() {
  return (
    <div className="space-y-8">
      {/* Lighthouse Scores Table */}
      <div>
        <SectionTitle><Zap className="w-5 h-5 text-yellow-500" /> Scores Lighthouse (Phase 1)</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 rounded-tl-xl font-semibold">Page</th>
                <th className="text-center p-3 font-semibold">Perf</th>
                <th className="text-center p-3 font-semibold">SEO</th>
                <th className="text-center p-3 font-semibold">FCP</th>
                <th className="text-center p-3 font-semibold">LCP</th>
                <th className="text-center p-3 font-semibold">TBT</th>
                <th className="text-center p-3 rounded-tr-xl font-semibold">CLS</th>
              </tr>
            </thead>
            <tbody>
              {perfScores.map((row, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-medium">{row.page}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-xs ${
                      row.perf >= 90 ? "bg-emerald-500" : row.perf >= 70 ? "bg-amber-500" : "bg-red-500"
                    }`}>{row.perf}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-xs ${
                      row.seo >= 90 ? "bg-emerald-500" : row.seo >= 70 ? "bg-amber-500" : "bg-red-500"
                    }`}>{row.seo}</span>
                  </td>
                  <td className="p-3 text-center font-mono text-xs">{row.fcp}</td>
                  <td className="p-3 text-center font-mono text-xs">
                    <span className={parseFloat(row.lcp) > 2.5 ? "text-red-600 font-bold" : "text-emerald-600"}>
                      {row.lcp}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-xs">
                    <span className={parseInt(row.tbt) > 200 ? "text-red-600 font-bold" : "text-emerald-600"}>
                      {row.tbt}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-xs text-emerald-600">{row.cls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
          <span>Cible LCP : <strong>&lt; 2.5s</strong></span>
          <span>Cible TBT : <strong>&lt; 200ms</strong></span>
          <span>Cible CLS : <strong>&lt; 0.1</strong></span>
        </div>
      </div>

      <div>
        <SectionTitle><Gauge className="w-5 h-5 text-red-500" /> Problèmes détectés</SectionTitle>
        <AuditList items={perfIssues} />
      </div>

      {/* Bundle weight */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-800 mb-4">Poids des dépendances critiques</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1"><span>framer-motion (~45KB gz)</span><span className="text-red-600 font-bold">CRITIQUE</span></div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{ width: "90%" }} /></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span>CSS total (~64KB)</span><span className="text-amber-600 font-bold">MOYEN</span></div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: "60%" }} /></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span>Google Analytics (~30KB)</span><span className="text-gray-500">Normal</span></div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gray-400 rounded-full" style={{ width: "30%" }} /></div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200">
        <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Actions prioritaires Phase 2
        </h4>
        <ul className="space-y-2 text-sm text-red-700">
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Lazy-load framer-motion</strong> — next/dynamic sur composants non-critiques (-30% TBT)</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Split ChateauPageClient</strong> — Extraire sections statiques en Server Components</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Migrer Bootstrap → Tailwind grid</strong> — Supprimer 8KB CSS inutile</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> <strong>Convertir 31 JPG → WebP</strong> — Gain 2-3 MB</li>
        </ul>
      </div>
    </div>
  );
}

function ImagesSection() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 text-center border border-gray-200 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">{imageStats.total}</div>
          <div className="text-xs text-gray-500 mt-1">Images totales</div>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center border border-gray-200 shadow-sm">
          <div className="text-3xl font-bold text-emerald-600">{imageStats.webpFiles}</div>
          <div className="text-xs text-gray-500 mt-1">Fichiers WebP</div>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center border border-gray-200 shadow-sm">
          <div className="text-3xl font-bold text-amber-600">{imageStats.jpgFiles}</div>
          <div className="text-xs text-gray-500 mt-1">Fichiers JPG</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-5">
        <h4 className="font-bold text-gray-800 mb-2">Couverture des attributs</h4>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Alt text descriptif</span><span className="font-mono">{imageStats.altCorrect}/{imageStats.total}</span></div>
          <ProgressBar value={imageStats.altCorrect} max={imageStats.total} color="#10b981" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Attribut sizes</span><span className="font-mono">{imageStats.sizesPresent}/{imageStats.total}</span></div>
          <ProgressBar value={imageStats.sizesPresent} max={imageStats.total} color="#f59e0b" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Quality explicite</span><span className="font-mono">{imageStats.qualitySet}/{imageStats.total}</span></div>
          <ProgressBar value={imageStats.qualitySet} max={imageStats.total} color="#ef4444" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Priority (above-fold)</span><span className="font-mono">{imageStats.priorityCorrect}/{imageStats.total}</span></div>
          <ProgressBar value={imageStats.priorityCorrect} max={imageStats.total} color="#10b981" />
        </div>
      </div>

      <div>
        <SectionTitle><ImageIcon className="w-5 h-5 text-purple-600" /> Détail par composant</SectionTitle>
        <AuditList items={imageIssues} />
      </div>
    </div>
  );
}

function TrackingSection() {
  const events = [
    { name: "page_view", status: "ok" as Status, where: "Toutes pages", when: "Navigation SPA auto" },
    { name: "conversion (Ads)", status: "ok" as Status, where: "/devis/merci", when: "Après soumission" },
    { name: "generate_lead (GA4)", status: "ok" as Status, where: "/devis/merci", when: "Après soumission" },
    { name: "phone_click", status: "ok" as Status, where: "Footer", when: "Clic téléphone" },
    { name: "form_submit", status: "warning" as Status, where: "—", when: "Fonction dispo mais PAS utilisée" },
    { name: "view_item (château)", status: "warning" as Status, where: "—", when: "Fonction dispo mais PAS utilisée" },
    { name: "form_step_N", status: "warning" as Status, where: "—", when: "NON implémenté" },
    { name: "scroll_depth", status: "warning" as Status, where: "—", when: "NON implémenté" },
    { name: "cta_click", status: "warning" as Status, where: "—", when: "NON implémenté" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-2xl p-5 text-center border border-blue-200">
          <div className="text-xl font-bold text-blue-700">G-TRWZDPNN9E</div>
          <div className="text-xs text-blue-600 mt-1">GA4 Measurement ID</div>
        </div>
        <div className="bg-purple-50 rounded-2xl p-5 text-center border border-purple-200">
          <div className="text-xl font-bold text-purple-700">AW-17912491834</div>
          <div className="text-xs text-purple-600 mt-1">Google Ads ID</div>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-5 text-center border border-emerald-200">
          <div className="text-xl font-bold text-emerald-700">Consent v2</div>
          <div className="text-xs text-emerald-600 mt-1">Mode Advanced RGPD</div>
        </div>
      </div>

      {/* Events table */}
      <div>
        <SectionTitle><BarChart3 className="w-5 h-5 text-blue-600" /> Événements trackés</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 rounded-tl-xl font-semibold">Événement</th>
                <th className="text-center p-3 font-semibold">Statut</th>
                <th className="text-left p-3 font-semibold">Où</th>
                <th className="text-left p-3 rounded-tr-xl font-semibold">Quand</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-mono text-xs font-medium">{ev.name}</td>
                  <td className="p-3 text-center"><StatusIcon status={ev.status} /></td>
                  <td className="p-3 text-xs text-gray-600">{ev.where}</td>
                  <td className="p-3 text-xs text-gray-600">{ev.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <SectionTitle><TrendingUp className="w-5 h-5 text-green-600" /> Détail configuration</SectionTitle>
        <AuditList items={trackingItems} />
      </div>
    </div>
  );
}

function ResponsiveSection() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">17</div>
          <div className="text-xs text-gray-500 mt-1">Media queries CSS</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-amber-600">max-width</div>
          <div className="text-xs text-gray-500 mt-1">Approche desktop-first</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-xs text-gray-500 mt-1">Systèmes grid</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-amber-600">11</div>
          <div className="text-xs text-gray-500 mt-1">Font-sizes en px</div>
        </div>
      </div>

      <div>
        <SectionTitle><Smartphone className="w-5 h-5 text-indigo-600" /> Points d&apos;audit</SectionTitle>
        <AuditList items={responsiveItems} />
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-3">Recommandations responsive</h4>
        <ul className="space-y-2 text-sm text-amber-700">
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> Migrer les 17 media queries <code className="bg-amber-100 px-1 rounded">max-width</code> vers Tailwind <code className="bg-amber-100 px-1 rounded">min-width</code></li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> Supprimer Bootstrap grid, utiliser Tailwind grid partout</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> Remplacer les 11 <code className="bg-amber-100 px-1 rounded">font-size: Xpx</code> par <code className="bg-amber-100 px-1 rounded">rem</code> ou <code className="bg-amber-100 px-1 rounded">clamp()</code></li>
          <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" /> Remplacer les largeurs fixes par <code className="bg-amber-100 px-1 rounded">max-w-*</code> Tailwind</li>
        </ul>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState<Tab>("seo");
  const globalScore = Math.round(tabs.reduce((a, t) => a + t.score, 0) / tabs.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" style={{ padding: "48px 20px 32px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ScoreRing score={globalScore} size={140} />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Audit Complet du Site</h1>
              <p className="text-gray-300 text-lg">selectchateaux.com — {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p className="text-gray-400 text-sm mt-2">Next.js 16.1.6 &bull; App Router &bull; Vercel</p>
            </div>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl p-4 text-center transition-all duration-300 border-2 ${
                  activeTab === tab.id
                    ? "bg-white/15 border-white/40 scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex justify-center mb-2 opacity-80">{tab.icon}</div>
                <div className="text-2xl font-bold" style={{ color: tab.color }}>{tab.score}</div>
                <div className="text-xs text-gray-300 mt-1">{tab.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab navigation mobile */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ padding: "12px 20px" }}
                className={`flex items-center gap-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#a37e2c] text-[#a37e2c]"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  tab.score >= 90 ? "bg-emerald-100 text-emerald-700" :
                  tab.score >= 70 ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>{tab.score}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto" style={{ padding: "32px 20px 80px" }}>
        {activeTab === "seo" && <SEOSection />}
        {activeTab === "security" && <SecuritySection />}
        {activeTab === "performance" && <PerformanceSection />}
        {activeTab === "images" && <ImagesSection />}
        {activeTab === "tracking" && <TrackingSection />}
        {activeTab === "responsive" && <ResponsiveSection />}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 text-center text-sm text-gray-500" style={{ padding: "24px 20px" }}>
        Rapport généré le {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} par Claude Code &bull; Audit automatisé
      </div>
    </div>
  );
}
