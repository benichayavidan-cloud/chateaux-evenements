// Personnages inventés du blog — `npx tsx --test src/data/personnages-blog.test.ts`
// (tsx et non node : blog-posts.ts importe sans extension).
//
// 19/11/2026 : l'ancien agent rédacteur avait mis dans les articles des experts
// maison et des clients qui n'existent pas. Décision du PO : experts remplacés
// par l'équipe réelle (equipe.ts), clients par de vraies demandes du CRM
// anonymisées (cas-demandes.ts).
//
// Garde-fou : plus aucun personnage inventé ni fausse preuve d'expérience dans
// les articles servis (nettoyés le 19/11/2026).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blogPosts } from './blog-posts';
import { CAS_DEMANDES, casDemande } from './cas-demandes';
import { EQUIPE, signature } from './equipe';
import { MOTS_BANNIS, sansAccents } from '../lib/rubriques';

/** Experts inventés connus + motif « Prénom X. » des faux clients. */
const PERSONNAGE_INVENTE =
  /Sophie Durand|Thomas Lef[eè]vre|Claire Martin|Antoine Moreau|\b[A-ZÉ][a-zéèëï]+ [A-Z]\.(?=[\s,)<’'])/;

/**
 * Domaine des Hauts-de-Seine : ni commune ni métro (PR #137, 18/11/2026) — y compris les
 * communes voisines qui le situent (relecture SEO du 19/11/2026).
 */
/** Tournures qui visent les particuliers (pas de trafic de particuliers, PR #61). */
const PARTICULIERS = /public familial|volet familial/;

const LOCALISATION_92 = /Sceaux|Châtenay|Garches|Malmaison|arrêts? de métro|accessible en métro/;

/** Vrais noms de nos châteaux (blind booking) : jamais dans un cas ni un article. */
const VRAIS_NOMS = /Montvillargenne|Mont[- ]Royal|Vaux[- ]de[- ]Cernay|Reine Margot|Jeanne and the Forest|InterContinental|MGallery/i;

const texte = (p: (typeof blogPosts)[number]) =>
  [p.title, p.seoTitle ?? '', p.excerpt, p.content, JSON.stringify(p.faq ?? []), (p.keywords ?? []).join(' '), p.imageAlt ?? ''].join('\n');

/**
 * Fausses preuves d'expérience (19/11/2026) : le CRM compte 55 demandes depuis
 * avril 2026, aucun historique avant. « 47 séminaires organisés depuis 2021 »,
 * « 24 AG coordonnées », « NPS +42 », « notre consultante depuis 6 ans » étaient inventés.
 */
const FAUSSE_PREUVE =
  /[Nn]otre consultante|[Nn]os consultants|que nous avons (?:organisé|coordonné|accompagné)|(?:nous|organis\w*|coordonn\w*|accompagn\w*|observ\w*)[^.]{0,40}depuis 20(?:1|2)\d|depuis \d+ ans|baromètre|notre suivi|\bNPS\b|budget moyen constaté|[Oo]bservatoire|devis reçus|plébiscité|par nos clients|\d+ AG\b|\d+\+? (?:séminaires|soirées|ateliers|sessions) (?:que nous|organisé|coordonné)/;

const fautifs = (motif: RegExp) =>
  blogPosts.flatMap((p) => {
    const m = texte(p).match(motif);
    return m ? [`${p.slug} : « ${m[0]} »`] : [];
  });

test('aucun personnage inventé dans les articles', () => {
  assert.deepEqual(fautifs(PERSONNAGE_INVENTE), []);
});

test('aucune fausse preuve d’expérience dans les articles', () => {
  assert.deepEqual(fautifs(FAUSSE_PREUVE), []);
});

test('chaque cas cité existe et ses chiffres sont ceux du CRM', () => {
  const erreurs: string[] = [];
  for (const p of blogPosts) {
    for (const m of p.content.matchAll(/class="cas-demande cas-(D\d+)"[^>]*>([\s\S]*?)<\/(?:p|div|blockquote|aside)>/g)) {
      const cas = casDemande(m[1]);
      if (!cas) { erreurs.push(`${p.slug} : cas ${m[1]} inconnu`); continue; }
      if (!new RegExp(`(?<!\\d)(?<!\\d[  ])${cas.participants}(?!\\d)(?![  ]\\d{3})`).test(m[2])) erreurs.push(`${p.slug} : cas ${m[1]} sans son effectif (${cas.participants})`);
    }
  }
  assert.deepEqual(erreurs, []);
});

test('blind booking : aucun vrai nom de château dans les cas ni dans les articles', () => {
  for (const c of CAS_DEMANDES) assert.doesNotMatch(JSON.stringify(c), VRAIS_NOMS, c.id);
  for (const p of blogPosts) assert.doesNotMatch(texte(p), VRAIS_NOMS, p.slug);
});

test('les citations portent la signature exacte d’une vraie personne de l’équipe', () => {
  const signatures = EQUIPE.map((m) => `— ${signature(m)}`);
  const erreurs: string[] = [];
  for (const p of blogPosts) {
    for (const m of p.content.matchAll(/class="citation-equipe"[^>]*>([\s\S]*?)<\/blockquote>/g)) {
      if (!signatures.some((s) => m[1].includes(s))) erreurs.push(p.slug);
    }
  }
  assert.deepEqual(erreurs, []);
});

test('blind booking : le domaine des Hauts-de-Seine n’est pas localisé', () => {
  assert.deepEqual(fautifs(LOCALISATION_92), []);
});

test('mots bannis (src/lib/rubriques.ts) absents des articles', () => {
  const erreurs: string[] = [];
  for (const p of blogPosts) {
    const t = sansAccents(texte(p));
    // « familial » vise la « chambre familiale » des fiches ; au blog, « contraintes
    // familiales » ou « SARL familiale » sont légitimes : contrôlé par PARTICULIERS.
    for (const mot of MOTS_BANNIS.filter((m) => m !== 'familial')) {
      if (new RegExp(`(^|[^a-z0-9])${sansAccents(mot)}`).test(t)) erreurs.push(`${p.slug} : ${mot}`);
    }
  }
  assert.deepEqual(erreurs, []);
});

test('pas de tournure qui vise les particuliers', () => {
  assert.deepEqual(fautifs(PARTICULIERS), []);
});

/**
 * 19/11/2026 (PO) : une même demande racontée dans 3 ou 4 articles, presque mot pour
 * mot, se voyait. Chaque cas sert dans 2 articles au plus, et deux récits d'un même
 * cas ne partagent aucune suite de MOTS_COMMUNS_MAX + 1 mots.
 */
const ARTICLES_PAR_CAS_MAX = 2;
const MOTS_COMMUNS_MAX = 6;

const recitsParCas = () => {
  const parCas = new Map<string, { slug: string; texte: string }[]>();
  for (const p of blogPosts) {
    for (const m of p.content.matchAll(/class="cas-demande cas-(D\d+)"[^>]*>([\s\S]*?)<\/(?:p|div|blockquote|aside)>/g)) {
      parCas.set(m[1], [...(parCas.get(m[1]) ?? []), { slug: p.slug, texte: m[2] }]);
    }
  }
  return parCas;
};

/** Désignations fixes des châteaux (blind booking) : elles se répètent forcément, ce n'est pas de la formulation. */
const DESIGNATIONS = /manoir anglo normand en foret de chantilly|chateau 5 etoiles en foret de chantilly|abbaye (?:du xiie siecle en|cistercienne de la) vallee de chevreuse|domaine historique aux portes de paris/g;

const suites = (t: string, n: number) => {
  const mots = sansAccents(t.replace(/<[^>]+>/g, ' ')).replace(/[^a-z0-9€]+/g, ' ').replace(DESIGNATIONS, '·').match(/[a-z0-9€·]+/g) ?? [];
  return new Set(mots.slice(0, Math.max(0, mots.length - n + 1)).map((_, i) => mots.slice(i, i + n).join(' ')));
};

test('une même demande sert dans 2 articles au plus', () => {
  const trop = [...recitsParCas()].flatMap(([id, r]) => {
    const slugs = new Set(r.map((x) => x.slug));
    return slugs.size > ARTICLES_PAR_CAS_MAX ? [`${id} : ${[...slugs].join(', ')}`] : [];
  });
  assert.deepEqual(trop, []);
});

test('deux récits d’une même demande ne sont pas formulés pareil', () => {
  const n = MOTS_COMMUNS_MAX + 1;
  const erreurs: string[] = [];
  for (const [id, r] of recitsParCas()) {
    for (let i = 0; i < r.length; i++) {
      for (let j = i + 1; j < r.length; j++) {
        const a = suites(r[i].texte, n);
        const commune = [...suites(r[j].texte, n)].find((s) => a.has(s));
        if (commune) erreurs.push(`${id} (${r[i].slug} / ${r[j].slug}) : « ${commune} »`);
      }
    }
  }
  assert.deepEqual(erreurs, []);
});
