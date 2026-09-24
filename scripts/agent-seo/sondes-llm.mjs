/**
 * Capteur C5 — citations LLM (blueprint §4).
 *
 * Pour chaque requête `llm: true` du panel, pose la question EN LANGAGE
 * NATUREL (champ prompt_llm) à deux moteurs de réponse et mesure si
 * selectchateaux est cité, et qui l'est :
 *
 *  - ChatGPT : API Responses d'OpenAI (gpt-5.4-mini), outil web_search
 *    IMPOSÉ par tool_choice, sources = annotations url_citation (~0,03 $/sonde).
 *    Jusqu'au 24/09 : DataForSEO chat_gpt/llm_responses (gpt-4o-mini), qui
 *    laissait le modèle décider de chercher — et dont le crédit était épuisé.
 *    Baseline 31/08/2026 : Select Châteaux cité EN PREMIER sur « meilleure
 *    agence séminaire château IdF ».
 *  - Gemini + Google Search grounding (clé projet GEMINI_API_KEY, quasi
 *    gratuit). La recherche ne peut pas être imposée par l'API : consigne
 *    système + vérification dans groundingMetadata.
 *
 * QUATRE ÉTATS (01/09 puis 24/09/2026). La sonde ne renvoyait qu'un booléen
 * `cite`, ce qui confondait des situations opposées :
 *
 *   'absent'      le moteur a cherché sur le web et ne nous a pas retenus
 *                 -> vrai signal de visibilité, actionnable
 *   'sans_recherche'  le moteur a répondu DE MÉMOIRE, sans rien chercher
 *                 -> ne dit rien de notre visibilité, seulement de sa notoriété
 *   'cite'        cherché ET retenu
 *   'erreur'      aucune réponse exploitable -> ne dit rien du tout
 *
 * Régression du 17/09 : 11 sondes sur 11 « sans recherche » des deux côtés.
 * Faux : aucune réponse n'avait été obtenue (DataForSEO « Payment Required »,
 * Gemini sans clé en CI puis en 503). Les erreurs d'API étaient lues comme des
 * réponses vides, donc comme « n'a pas cherché ». Elles sont désormais
 * comptées à part (chatgpt_erreur, gemini_erreur) et le moteur est FORCÉ à
 * chercher. Tests : sondes-llm.test.mjs.
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

const NOTRE_DOMAINE = 'selectchateaux.com';
const NOTRE_MARQUE = /select\s*ch[âa]teaux|selectchateaux/i;

// ChatGPT : API Responses d'OpenAI, outil web_search IMPOSÉ (tool_choice).
// gpt-5.4-mini, ~0,03 $/sonde mesuré le 24/09 (3 sondes : 0,098 $).
const OPENAI_MODELE = 'gpt-5.4-mini';
const OPENAI_PRIX = { entree: 0.75e-6, sortie: 4.5e-6, recherche: 0.01 }; // $ (estimation)
// Gemini : le grounding Google Search ne peut pas être imposé par l'API (pas de
// tool_choice pour google_search) ; la consigne système le demande et le
// résultat reste vérifié dans groundingMetadata. Mesuré le 24/09 : sans cette
// consigne, gemini-3.8-flash répondait de mémoire.
const GEMINI_MODELES = ['gemini-flash-latest', 'gemini-flash-lite-latest']; // repli si surcharge
const CONSIGNE_RECHERCHE = 'Avant de répondre, effectue OBLIGATOIREMENT une recherche web et appuie ta réponse sur les résultats trouvés. Ne réponds jamais de mémoire.';

/** Hôte d'une URL (ou d'un nom de domaine nu), sans « www. ». */
function hote(u) {
  try { return new URL(/^https?:\/\//.test(u) ? u : `https://${u}`).hostname.replace(/^www\./, '').toLowerCase(); }
  catch { return ''; }
}

/** Notre domaine exact ou un de ses sous-domaines — pas « notselectchateaux.com ». */
export function estNotreDomaine(u) {
  const h = hote(u);
  return h === NOTRE_DOMAINE || h.endsWith(`.${NOTRE_DOMAINE}`);
}

/**
 * Lecture d'une réponse brute de l'API Responses d'OpenAI.
 * a cherché = au moins un appel web_search terminé ; sources = les URL
 * réellement citées (annotations url_citation), pas tout ce qui a été lu.
 */
export function lireOpenAI(brut) {
  if (brut?.error) return { erreur: brut.error.message || JSON.stringify(brut.error).slice(0, 200) };
  const sorties = brut?.output || [];
  const messages = sorties.filter((o) => o.type === 'message').flatMap((o) => o.content || []);
  if (!messages.length) return { erreur: `réponse OpenAI sans message (statut ${brut?.status || '?'})` };
  return {
    texte: messages.map((c) => c.text || '').join(' '),
    sources: messages.flatMap((c) => (c.annotations || []).filter((a) => a.type === 'url_citation').map((a) => a.url)),
    a_cherche: sorties.some((o) => o.type === 'web_search_call' && o.status === 'completed'),
  };
}

/**
 * Lecture d'une réponse brute de Gemini + grounding Google Search.
 * Les URL des chunks sont des redirections vertexaisearch : le domaine de la
 * source est dans `web.domain` ou, à défaut, dans `web.title`.
 */
export function lireGemini(brut) {
  if (brut?.error) return { erreur: brut.error.message || JSON.stringify(brut.error).slice(0, 200) };
  const c = brut?.candidates?.[0];
  if (!c?.content?.parts?.length) return { erreur: `réponse Gemini vide (${c?.finishReason || brut?.promptFeedback?.blockReason || 'aucun candidat'})` };
  const g = c.groundingMetadata || {};
  const chunks = g.groundingChunks || [];
  return {
    texte: c.content.parts.map((p) => p.text || '').join(' '),
    sources: chunks.map((ch) => ch.web?.domain || ch.web?.title || '').filter(Boolean),
    a_cherche: chunks.length > 0 || (g.webSearchQueries || []).length > 0,
  };
}

/**
 * Qualifie une réponse lue — fonction PURE, le cœur du capteur.
 *
 *   'erreur'          pas de réponse exploitable (API en panne, clé absente,
 *                     crédit épuisé) -> ne dit RIEN, ni présence ni absence
 *   'sans_recherche'  réponse de mémoire -> notoriété, pas visibilité
 *   'absent'          a cherché, ne nous a pas retenus -> vrai signal
 *   'cite'            a cherché ET nous a retenus (source ou nom dans le texte)
 *
 * Une mention de mémoire n'est pas une citation : sinon cite > cherche et le
 * taux cite/cherche dépasserait 100 %.
 */
export function analyserReponse(lu) {
  if (lu.erreur) return { cite: false, a_cherche: false, statut: 'erreur', sources: [], erreur: lu.erreur };
  const sources = [...new Set((lu.sources || []).map(hote).filter(Boolean))];
  const aCherche = !!lu.a_cherche;
  const nousCite = aCherche && (sources.some(estNotreDomaine) || NOTRE_MARQUE.test(lu.texte || ''));
  return { cite: nousCite, a_cherche: aCherche, statut: nousCite ? 'cite' : aCherche ? 'absent' : 'sans_recherche', sources };
}

async function sondeChatGPT(prompt) {
  const key = env('OPENAI_API_KEY') || kc('openai-api-key');
  if (!key) return { ...analyserReponse({ erreur: 'clé OpenAI absente (OPENAI_API_KEY)' }), cout: 0 };
  const brut = await (await fetch('https://api.openai.com/v1/responses', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OPENAI_MODELE, input: prompt, reasoning: { effort: 'low' },
      tools: [{ type: 'web_search' }], tool_choice: 'required',
    }),
  })).json();
  const u = brut.usage || {};
  const recherches = (brut.output || []).filter((o) => o.type === 'web_search_call').length;
  const cout = (u.input_tokens || 0) * OPENAI_PRIX.entree + (u.output_tokens || 0) * OPENAI_PRIX.sortie + recherches * OPENAI_PRIX.recherche;
  return { ...analyserReponse(lireOpenAI(brut)), modele: brut.model, cout };
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function sondeGemini(prompt) {
  const key = env('GEMINI_API_KEY') || kc('gemini-select-chateaux');
  if (!key) return { ...analyserReponse({ erreur: 'clé Gemini absente (GEMINI_API_KEY)' }), cout: 0 };
  let lu;
  // Surcharge (503) et quota (429) sont fréquents : on réessaie, puis on
  // bascule sur le modèle léger. Le modèle réellement utilisé est tracé.
  for (const modele of GEMINI_MODELES) {
    for (let essai = 0; essai < 2; essai++) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modele}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: CONSIGNE_RECHERCHE }] },
          contents: [{ parts: [{ text: prompt }] }], tools: [{ google_search: {} }],
        }),
      });
      const brut = await res.json().catch(() => ({ error: { message: `HTTP ${res.status}` } }));
      lu = lireGemini(brut);
      if (!lu.erreur) return { ...analyserReponse(lu), modele: brut.modelVersion || modele, cout: 0 };
      if (![429, 500, 503].includes(res.status)) return { ...analyserReponse(lu), cout: 0 };
      await pause(5000 * (essai + 1));
    }
  }
  return { ...analyserReponse(lu), cout: 0 };
}

export async function sondesLLM(panel) {
  const probes = [...panel.requetes, ...panel.decouvertes].filter((p) => p.llm && p.prompt_llm);
  const resultats = {};
  let cout = 0;
  const n = { gpt: { cite: 0, cherche: 0, erreur: 0 }, gem: { cite: 0, cherche: 0, erreur: 0 } };
  // Un moteur qui n'a pas cherché ne dit rien de notre visibilité : il est
  // compté à part, jamais comme un échec.
  // Une erreur non plus : elle est comptée à part ET signalée.
  const ICONE = { cite: '🟢', absent: '🔴', sans_recherche: '⚪', erreur: '❌' };

  for (const p of probes) {
    const [gpt, gem] = await Promise.all([
      sondeChatGPT(p.prompt_llm).catch((e) => ({ erreur: e.message, statut: 'erreur' })),
      sondeGemini(p.prompt_llm).catch((e) => ({ erreur: e.message, statut: 'erreur' })),
    ]);
    cout += gpt.cout || 0;
    for (const [cle, r] of [['gpt', gpt], ['gem', gem]]) {
      if (r.a_cherche) n[cle].cherche++;
      if (r.cite) n[cle].cite++;
      if (r.statut === 'erreur') n[cle].erreur++;
    }
    resultats[p.q] = {
      chatgpt: { cite: !!gpt.cite, statut: gpt.statut, a_cherche: !!gpt.a_cherche, sources: gpt.sources || [], modele: gpt.modele, erreur: gpt.erreur },
      gemini: { cite: !!gem.cite, statut: gem.statut, a_cherche: !!gem.a_cherche, sources: gem.sources || [], modele: gem.modele, erreur: gem.erreur },
    };
    console.log(`   ${ICONE[gpt.statut] || '❌'} ChatGPT  ${ICONE[gem.statut] || '❌'} Gemini   ${p.q}`);
    for (const [nom, r] of [['ChatGPT', gpt], ['Gemini', gem]]) if (r.erreur) console.log(`      ↳ ${nom} en erreur : ${r.erreur}`);
  }

  /** Taux de citation rapporté aux seules réponses documentées — le vrai indicateur. */
  const taux = (c) => (c.cherche ? Math.round((c.cite / c.cherche) * 100) : null);

  return {
    resultats,
    synthese: {
      sondes: probes.length,
      chatgpt_cite: n.gpt.cite, chatgpt_cherche: n.gpt.cherche, chatgpt_taux: taux(n.gpt), chatgpt_erreur: n.gpt.erreur,
      gemini_cite: n.gem.cite, gemini_cherche: n.gem.cherche, gemini_taux: taux(n.gem), gemini_erreur: n.gem.erreur,
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
