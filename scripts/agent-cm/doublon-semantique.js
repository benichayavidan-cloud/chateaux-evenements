#!/usr/bin/env node
/**
 * Gate DOUBLON SÉMANTIQUE — Agent Camille
 *
 * Ferme le trou que le gate lexical ne peut pas fermer. Cas d'école mesuré
 * le 31/08/2026 : `seminaire-eco-responsable-rse` et
 * `seminaire-ecoresponsable-chateau-guide-rse-2026` — même sujet, publiés
 * tous les deux, similarité Jaccard 0,27 (seuils à 0,45-0,50). Baisser les
 * seuils lexicaux a été mesuré et écarté : à 0,36 on triple les faux
 * positifs sans attraper ce cas.
 *
 * Ici on demande le verdict à un modèle : le candidat cible-t-il la même
 * requête Google principale qu'un article existant ? Un appel Haiku par
 * publication (~1/jour), coût négligeable.
 *
 * Politique d'échec — assumée et documentée :
 *   - verdict "doublon"        → BLOQUANT (ok: false)
 *   - pas de clé API           → non-bloquant + avertissement (les gates
 *                                lexicaux restent actifs ; un blocage dur
 *                                interdirait toute publication manuelle
 *                                locale, la clé ne vivant qu'en CI)
 *   - erreur API après retries → non-bloquant + avertissement (même raison)
 *
 * Usage module :
 *   const { checkDoublonSemantique } = require('./doublon-semantique');
 *   const v = await checkDoublonSemantique(article, existing);
 *   if (!v.ok) …  // v.slugExistant, v.raison ; v.warning si check sauté
 */
const MODEL = 'claude-haiku-4-5';
const MAX_RETRIES = 2;

/** Construit le prompt de jugement. Exporté pour les tests. */
function buildPrompt(article, existing) {
  const liste = existing
    .map(ex => `- ${ex.slug} :: ${ex.title || ''}`)
    .join('\n');
  return `Tu es le contrôle anti-cannibalisation SEO d'un blog français sur les séminaires d'entreprise en château (Île-de-France).

ARTICLE CANDIDAT :
- slug : ${article.slug}
- title : ${article.title || ''}
- keywords : ${(article.keywords || []).join(', ')}

ARTICLES EXISTANTS (slug :: title) :
${liste}

QUESTION : le candidat cible-t-il la MÊME requête Google principale (même intention de recherche) qu'un des articles existants ?

Critère : DOUBLON si un lecteur ayant lu l'article existant n'apprendrait presque rien du candidat, ou si les deux pages se disputeraient la même requête principale en résultats de recherche. Un simple thème commun (ex : deux articles "team building" sur des activités différentes) n'est PAS un doublon. Une reformulation du même sujet (synonymes, mots soudés/séparés, réordonnancement, même sujet avec/sans année) EST un doublon.

Réponds UNIQUEMENT ce JSON, rien d'autre :
{"doublon": true|false, "slug_existant": "slug-le-plus-proche-ou-null", "raison": "une phrase"}`;
}

/** Appel API par défaut — remplaçable via opts.appel pour les tests. */
async function appelParDefaut(prompt) {
  const Anthropic = require('@anthropic-ai/sdk');
  const client = new Anthropic();
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  });
  return res.content.filter(b => b.type === 'text').map(b => b.text).join('');
}

function parseVerdict(text) {
  const m = String(text).match(/\{[\s\S]*\}/);
  if (!m) throw new Error('réponse sans JSON');
  const v = JSON.parse(m[0]);
  if (typeof v.doublon !== 'boolean') throw new Error('champ "doublon" absent ou non booléen');
  return v;
}

async function checkDoublonSemantique(article, existing, opts = {}) {
  if (!opts.appel && !process.env.ANTHROPIC_API_KEY) {
    return { ok: true, warning: 'Doublon sémantique NON vérifié : ANTHROPIC_API_KEY absente (gates lexicaux seuls).' };
  }
  const appel = opts.appel || appelParDefaut;
  const prompt = buildPrompt(article, existing);
  let lastErr;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const verdict = parseVerdict(await appel(prompt));
      if (verdict.doublon) {
        return {
          ok: false,
          slugExistant: verdict.slug_existant || null,
          raison: verdict.raison || '',
          detail: `Doublon sémantique de "${verdict.slug_existant}" : ${verdict.raison}. Choisir un sujet réellement différent — pas une reformulation.`,
        };
      }
      return { ok: true };
    } catch (err) {
      lastErr = err;
      if (i < MAX_RETRIES) await new Promise(r => setTimeout(r, 2000 * i));
    }
  }
  return { ok: true, warning: `Doublon sémantique NON vérifié : API en échec (${lastErr.message}) — gates lexicaux seuls.` };
}

module.exports = { checkDoublonSemantique, buildPrompt, parseVerdict, MODEL };
