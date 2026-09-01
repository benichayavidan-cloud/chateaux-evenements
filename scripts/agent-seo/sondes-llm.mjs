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
 *
 * TROIS ÉTATS, PAS DEUX (correctif du 01/09/2026). La sonde ne renvoyait qu'un
 * booléen `cite`, ce qui confondait deux situations opposées :
 *
 *   'absent'      le moteur a cherché sur le web et ne nous a pas retenus
 *                 -> vrai signal de visibilité, actionnable
 *   'sans_recherche'  le moteur a répondu DE MÉMOIRE, sans rien chercher
 *                 -> ne dit rien de notre visibilité, seulement de sa notoriété
 *   'cite'        cherché ET retenu
 *
 * Mesuré le 01/09 : 8 des 9 prompts du panel n'ont déclenché AUCUNE recherche
 * côté Gemini. La baseline « Gemini : 0 citation » comptait donc des réponses
 * de mémoire comme des échecs de visibilité. Le taux qui compte est
 * `gemini_cite / gemini_cherche`, jamais `/ sondes`.
 *
 * À ne pas confondre non plus : l'API Gemini n'est pas les AI Overviews de
 * Google. L'export GSC « AI Features » du 01/09 montrait 444 impressions en
 * réponses IA sur 3 mois, en forte hausse — le site n'est pas absent de l'IA
 * de Google, quoi que dise cette sonde.
 *
 * Capteur PUR : mesure, n'agit jamais. Actif dès la Phase 1 (observation).
 */
import { env, kc } from './lib.mjs';

const NOTRE_DOMAINE = 'selectchateaux';

/**
 * Qualifie une réponse : a-t-il cherché ? nous a-t-il retenus ?
 * `cite` reste exposé en booléen pour les consommateurs existants.
 */
function qualifier(texte, sources) {
  const nousCite = texte.toLowerCase().includes(NOTRE_DOMAINE)
    || /select ch[âa]teaux/i.test(texte)
    || sources.some((s) => s.toLowerCase().includes(NOTRE_DOMAINE));
  const aCherche = sources.length > 0;
  return {
    cite: nousCite,
    a_cherche: aCherche,
    statut: nousCite ? 'cite' : aCherche ? 'absent' : 'sans_recherche',
    sources,
  };
}

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
  return { ...qualifier(texte, domaines(urls)), cout: t.cost || 0 };
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
  return { ...qualifier(texte, [...new Set(titres)].filter(Boolean)), cout: 0 };
}

export async function sondesLLM(panel) {
  const probes = [...panel.requetes, ...panel.decouvertes].filter((p) => p.llm && p.prompt_llm);
  const resultats = {};
  let cout = 0;
  const n = { gpt: { cite: 0, cherche: 0 }, gem: { cite: 0, cherche: 0 } };
  // Un moteur qui n'a pas cherché ne dit rien de notre visibilité : il est
  // compté à part, jamais comme un échec.
  const ICONE = { cite: '🟢', absent: '🔴', sans_recherche: '⚪' };

  for (const p of probes) {
    const [gpt, gem] = await Promise.all([
      sondeChatGPT(p.prompt_llm).catch((e) => ({ erreur: e.message, statut: 'erreur' })),
      sondeGemini(p.prompt_llm).catch((e) => ({ erreur: e.message, statut: 'erreur' })),
    ]);
    cout += gpt.cout || 0;
    for (const [cle, r] of [['gpt', gpt], ['gem', gem]]) {
      if (r.a_cherche) n[cle].cherche++;
      if (r.cite) n[cle].cite++;
    }
    resultats[p.q] = {
      chatgpt: { cite: !!gpt.cite, statut: gpt.statut, a_cherche: !!gpt.a_cherche, sources: gpt.sources || [], erreur: gpt.erreur },
      gemini: { cite: !!gem.cite, statut: gem.statut, a_cherche: !!gem.a_cherche, sources: gem.sources || [], erreur: gem.erreur },
    };
    console.log(`   ${ICONE[gpt.statut] || '❌'} ChatGPT  ${ICONE[gem.statut] || '❌'} Gemini   ${p.q}`);
  }

  /** Taux de citation rapporté aux seules réponses documentées — le vrai indicateur. */
  const taux = (c) => (c.cherche ? Math.round((c.cite / c.cherche) * 100) : null);

  return {
    resultats,
    synthese: {
      sondes: probes.length,
      chatgpt_cite: n.gpt.cite, chatgpt_cherche: n.gpt.cherche, chatgpt_taux: taux(n.gpt),
      gemini_cite: n.gem.cite, gemini_cherche: n.gem.cherche, gemini_taux: taux(n.gem),
    },
    cout,
  };
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
