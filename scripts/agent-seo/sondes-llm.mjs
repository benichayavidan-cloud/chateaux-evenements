/**
 * Capteur C5 — citations LLM (blueprint §4).
 *
 * Pour chaque requête `llm: true` du panel, pose la question EN LANGAGE
 * NATUREL (champ prompt_llm) à deux moteurs de réponse et mesure si
 * selectchateaux est cité, et qui l'est :
 *
 *  - ChatGPT (via DataForSEO chat_gpt/llm_responses, gpt-4o-mini + web_search,
 *    ~0,03 $/sonde). Baseline 31/08/2026 : Select Châteaux cité EN PREMIER
 *    sur « meilleure agence séminaire château IdF » — le canal Bing/ChatGPT
 *    fonctionne (IndexNow + quota Bing y contribuent).
 *  - Gemini + Google Search grounding (clé projet, quasi gratuit).
 *    Baseline 31/08/2026 : NON cité — Châteauform/Neovent/Homanie/Kactus
 *    occupent le terrain. C'est le chantier GEO côté Google.
 *
 * Capteur PUR : mesure, n'agit jamais. Actif dès la Phase 1 (observation).
 */
import { env, kc } from './lib.mjs';

const NOTRE_DOMAINE = 'selectchateaux';

function domaines(urls) {
  const d = {};
  for (const u of urls) {
    try { const h = new URL(u).hostname.replace(/^www\./, ''); d[h] = (d[h] || 0) + 1; } catch {}
  }
  return Object.keys(d);
}

async function sondeChatGPT(prompt) {
  const auth = 'Basic ' + Buffer.from((env('DATAFORSEO_LOGIN') || kc('dataforseo-login')) + ':' + (env('DATAFORSEO_PASSWORD') || kc('dataforseo-password'))).toString('base64');
  const r = await (await fetch('https://api.dataforseo.com/v3/ai_optimization/chat_gpt/llm_responses/live', {
    method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify([{ user_prompt: prompt, model_name: 'gpt-4o-mini', web_search: true }]),
  })).json();
  const t = r.tasks?.[0] || {};
  const secs = t.result?.[0]?.items?.[0]?.sections || [];
  const texte = secs.map((s) => s.text || '').join(' ');
  const urls = secs.flatMap((s) => (s.annotations || []).map((a) => a.url || ''));
  return {
    cite: texte.toLowerCase().includes(NOTRE_DOMAINE) || /select châteaux/i.test(texte) || urls.some((u) => u.includes(NOTRE_DOMAINE)),
    sources: domaines(urls),
    cout: t.cost || 0,
  };
}

async function sondeGemini(prompt) {
  const key = env('GEMINI_API_KEY') || kc('gemini-select-chateaux');
  const r = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], tools: [{ google_search: {} }] }),
  })).json();
  const c = r.candidates?.[0] || {};
  const texte = (c.content?.parts || []).map((p) => p.text || '').join(' ');
  const titres = (c.groundingMetadata?.groundingChunks || []).map((ch) => ch.web?.title || '');
  return {
    cite: texte.toLowerCase().includes(NOTRE_DOMAINE) || /select châteaux/i.test(texte) || titres.some((t) => t.includes(NOTRE_DOMAINE)),
    sources: [...new Set(titres)].filter(Boolean),
    cout: 0,
  };
}

export async function sondesLLM(panel) {
  const probes = [...panel.requetes, ...panel.decouvertes].filter((p) => p.llm && p.prompt_llm);
  const resultats = {};
  let cout = 0, citesGpt = 0, citesGem = 0;
  for (const p of probes) {
    const [gpt, gem] = await Promise.all([
      sondeChatGPT(p.prompt_llm).catch((e) => ({ erreur: e.message })),
      sondeGemini(p.prompt_llm).catch((e) => ({ erreur: e.message })),
    ]);
    cout += gpt.cout || 0;
    if (gpt.cite) citesGpt++;
    if (gem.cite) citesGem++;
    resultats[p.q] = { chatgpt: { cite: !!gpt.cite, sources: gpt.sources || [], erreur: gpt.erreur }, gemini: { cite: !!gem.cite, sources: gem.sources || [], erreur: gem.erreur } };
    console.log(`   ${gpt.cite ? '🟢' : '⚪'} ChatGPT  ${gem.cite ? '🟢' : '⚪'} Gemini   ${p.q}`);
  }
  return { resultats, synthese: { sondes: probes.length, chatgpt_cite: citesGpt, gemini_cite: citesGem }, cout };
}

// CLI : node sondes-llm.mjs [n]  → sonde les n premières (défaut toutes)
if (process.argv[1]?.endsWith('sondes-llm.mjs')) {
  const fs = await import('node:fs');
  const panel = JSON.parse(fs.readFileSync(new URL('./panel-requetes.json', import.meta.url)));
  const n = +(process.argv[2] || 99);
  panel.requetes = panel.requetes.filter((p) => p.llm).slice(0, n);
  panel.decouvertes = n < 99 ? [] : panel.decouvertes;
  const r = await sondesLLM(panel);
  console.log(JSON.stringify(r.synthese), '· coût', r.cout.toFixed(3), '$');
}
