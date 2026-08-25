#!/usr/bin/env node
/**
 * Suivi des citations LLM — interroge Claude avec recherche web sur les
 * requêtes cibles du site et vérifie si selectchateaux.com est cité dans
 * les sources ou mentionné dans la réponse. Lancé mensuellement par le
 * workflow « LLM — Suivi des citations » (llm-citations.yml).
 *
 * Sortie : JSON sur stdout ({date, results[], citedCount}).
 */
const Anthropic = require('@anthropic-ai/sdk');

const DOMAIN = 'selectchateaux.com';
const BRAND = /select\s*ch[âa]teaux/i;

const QUERIES = [
  'Quel est le meilleur château pour un séminaire d\'entreprise en Île-de-France ?',
  'Je cherche un château à louer pour un séminaire proche de Paris, lequel me recommandes-tu ?',
  'Location de château pour séminaire d\'entreprise : quelles sont les meilleures options en France ?',
  'Où organiser un team building en château près de Paris ?',
  'Quel lieu recommandes-tu pour un séminaire à Chantilly ?',
  'Combien coûte un séminaire en château en Île-de-France par personne ?',
  'Quelle agence peut organiser un séminaire résidentiel en château pour 100 personnes en Île-de-France ?',
];

const client = new Anthropic();

function extractSources(content) {
  const domains = new Set();
  for (const block of content) {
    if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.url) {
          try { domains.add(new URL(r.url).hostname.replace(/^www\./, '')); } catch { /* URL invalide */ }
        }
      }
    }
    if (block.type === 'text' && Array.isArray(block.citations)) {
      for (const c of block.citations) {
        if (c.url) {
          try { domains.add(new URL(c.url).hostname.replace(/^www\./, '')); } catch { /* URL invalide */ }
        }
      }
    }
  }
  return [...domains];
}

async function checkQuery(query) {
  const response = await client.messages.create({
    model: 'claude-opus-5',
    max_tokens: 2048,
    tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 3 }],
    messages: [{ role: 'user', content: `${query}\n\nRéponds en citant tes sources.` }],
  });

  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n');
  const sources = extractSources(response.content);

  return {
    query,
    citedInSources: sources.some((d) => d.includes(DOMAIN)),
    mentionedInText: BRAND.test(text),
    sources,
    answerExcerpt: text.slice(0, 300),
  };
}

async function main() {
  const results = [];
  for (const query of QUERIES) {
    try {
      results.push(await checkQuery(query));
    } catch (err) {
      results.push({ query, error: err.message });
    }
  }
  const citedCount = results.filter((r) => r.citedInSources || r.mentionedInText).length;
  console.log(JSON.stringify({ date: new Date().toISOString().split('T')[0], citedCount, total: QUERIES.length, results }, null, 2));
}

main();
