// Personnages inventés du blog — `npx tsx --test src/data/personnages-blog.test.ts`
// (tsx et non node : blog-posts.ts importe sans extension).
//
// 19/11/2026 : l'ancien agent rédacteur avait mis dans les articles des experts
// maison et des clients qui n'existent pas. Décision du PO : experts remplacés
// par l'équipe réelle (equipe.ts), clients par de vraies demandes du CRM
// anonymisées (cas-demandes.ts).
//
// Garde-fou : plus aucun personnage inventé dans les articles servis (29 nettoyés le 19/11/2026).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blogPosts } from './blog-posts';
import { CAS_DEMANDES, casDemande } from './cas-demandes';
import { EQUIPE } from './equipe';

/** Experts inventés connus + motif « Prénom X. » des faux clients. */
const PERSONNAGE_INVENTE =
  /Sophie Durand|Thomas Lef[eè]vre|Claire Martin|Antoine Moreau|\b[A-ZÉ][a-zéèëï]+ [A-Z]\.(?=[\s,)<’'])/;

/** Vrais noms de nos châteaux (blind booking) : jamais dans un cas ni un article. */
const VRAIS_NOMS = /Montvillargenne|Mont[- ]Royal|Vaux[- ]de[- ]Cernay|Reine Margot|Jeanne and the Forest|InterContinental/i;

const texte = (p: (typeof blogPosts)[number]) =>
  [p.title, p.seoTitle ?? '', p.excerpt, p.content, JSON.stringify(p.faq ?? [])].join('\n');

test('aucun personnage inventé dans les articles', () => {
  const fautifs = blogPosts
    .flatMap((p) => {
      const m = texte(p).match(PERSONNAGE_INVENTE);
      return m ? [`${p.slug} : « ${m[0]} »`] : [];
    });
  assert.deepEqual(fautifs, []);
});

test('chaque cas cité existe et ses chiffres sont ceux du CRM', () => {
  const erreurs: string[] = [];
  for (const p of blogPosts) {
    for (const m of p.content.matchAll(/class="cas-demande cas-(D\d+)"[^>]*>([\s\S]*?)<\/(?:p|div|blockquote|aside)>/g)) {
      const cas = casDemande(m[1]);
      if (!cas) { erreurs.push(`${p.slug} : cas ${m[1]} inconnu`); continue; }
      if (!m[2].includes(`${cas.participants}`)) erreurs.push(`${p.slug} : cas ${m[1]} sans son effectif (${cas.participants})`);
    }
  }
  assert.deepEqual(erreurs, []);
});

test('blind booking : aucun vrai nom de château dans les cas ni dans les articles', () => {
  for (const c of CAS_DEMANDES) assert.doesNotMatch(JSON.stringify(c), VRAIS_NOMS, c.id);
  for (const p of blogPosts) assert.doesNotMatch(texte(p), VRAIS_NOMS, p.slug);
});

test('les citations sont signées par une vraie personne de l’équipe', () => {
  const noms = EQUIPE.map((m) => m.prenom);
  const erreurs: string[] = [];
  for (const p of blogPosts) {
    for (const m of p.content.matchAll(/class="citation-equipe"[^>]*>([\s\S]*?)<\/blockquote>/g)) {
      if (!noms.some((n) => m[1].includes(n))) erreurs.push(p.slug);
    }
  }
  assert.deepEqual(erreurs, []);
});
