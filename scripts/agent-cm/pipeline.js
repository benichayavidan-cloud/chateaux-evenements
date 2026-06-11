#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ARTICLES_PATH, IMAGES_DIR, CATEGORIES } = require('./config');
const { checkArticle, loadClusters, formatReport, getExistingArticles, prepareExisting } = require('./anti-cannibalisation');

const AGENT_DIR = __dirname;
const SITE_DIR = path.resolve(AGENT_DIR, '../..');

function log(step, msg) {
  console.log(`[Step ${step}] ${msg}`);
}

function logError(step, msg) {
  console.error(`[Step ${step}] ERROR: ${msg}`);
}

// getExistingArticles est importé de ./anti-cannibalisation (source unique —
// les deux modules doivent scanner exactement les mêmes fichiers de données).

function getExistingSlugs() {
  return getExistingArticles().map(a => a.slug);
}

/** Résumé du registre de clusters pour injection dans le system prompt */
function clustersPromptBlock() {
  const clusters = loadClusters();
  const lines = clusters.map(c =>
    `- ${c.canonical} possède : ${c.primaryKeywords.map(k => `"${k}"`).join(', ')}` +
    (c.zoneWords && c.zoneWords.length ? ` | zone : ${c.zoneWords.join(', ')} → lien obligatoire avec ancre "${c.anchorText}"` : '')
  );
  return lines.join('\n');
}

async function step1_gscResearch() {
  log(1, 'Recherche GSC...');
  try {
    const out = execSync('node gsc-pull.js --period 30days --limit 200', {
      cwd: AGENT_DIR, timeout: 30000, env: process.env,
    }).toString();
    log(1, `Données GSC récupérées (${out.length} chars)`);
    return out;
  } catch (err) {
    logError(1, `Échec pull GSC : ${err.message}`);
    return 'Pas de données GSC disponibles — écrire les articles en fonction de la saisonnalité et des opportunités de mots-clés.';
  }
}

async function step2_claudeGenerate(gscData, existingSlugs) {
  log(2, 'Appel API Claude pour génération d\'articles...');

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY env var is required');
  }

  const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });
  const promptMd = fs.readFileSync(path.join(AGENT_DIR, 'AGENT_PROMPT.md'), 'utf-8');

  const today = new Date().toISOString().split('T')[0];
  const month = new Date().toLocaleString('fr-FR', { month: 'long' });

  const systemPrompt = `${promptMd}

DONNÉES GSC (30 derniers jours) :
${gscData.substring(0, 8000)}

ARTICLES EXISTANTS (${existingSlugs.length} articles — INTERDICTION de doublonner un sujet même avec un slug différent) :
${getExistingArticles().map(a => `- ${a.slug} → ${a.title}`).join('\n')}

RÈGLE ANTI-DOUBLON CRITIQUE :
Ne JAMAIS écrire un article sur un sujet déjà couvert, même si tu changes l'ordre des mots du slug.
Exemple interdit : "team-building-chantilly-activites-domaines" existe → "team-building-chantilly-domaines-activites" est un DOUBLON.
Choisis des sujets TOTALEMENT DIFFÉRENTS de la liste ci-dessus.

MOTS-CLÉS PROTÉGÉS (registre seo-clusters.json — chaque requête appartient à UNE page canonique) :
${clustersPromptBlock()}

RÈGLES DE PROPRIÉTÉ DES MOTS-CLÉS (appliquées par un validateur de code AVANT publication — toute violation = article REJETÉ) :
1. INTERDIT d'écrire un article dont le title ou le slug cible un mot-clé protégé ci-dessus. Ces requêtes appartiennent aux pages canoniques.
2. Dans les données GSC, chaque requête a un champ "ownedBy" (la page qui ranke déjà dessus). Une requête possédée n'est JAMAIS un sujet de nouvel article — c'est la page propriétaire qu'il faut renforcer.
3. Si ton article mentionne une zone géographique (Chantilly, Yvelines, Oise, Chevreuse...), il DOIT contenir un lien vers la page canonique de la zone avec l'ancre indiquée, dans le premier tiers du contenu. L'article est un SATELLITE qui pousse sa landing page.
4. Les nouveaux articles couvrent des sujets VIERGES : intentions de recherche que NI les landing pages NI les articles existants ne couvrent.

CATÉGORIES VALIDES : ${CATEGORIES.join(', ')}

AUJOURD'HUI : ${today}
MOIS EN COURS : ${month}

FORMAT DE SORTIE CRITIQUE :
Tu DOIS répondre avec UNIQUEMENT un tableau JSON valide contenant exactement 2 objets article.
Pas de markdown, pas de code fences, pas d'explication — UNIQUEMENT le JSON brut commençant par [ et finissant par ].

RÈGLES JSON IMPORTANTES :
- Toutes les chaînes DOIVENT utiliser des guillemets doubles
- Échapper les guillemets doubles dans le HTML avec \\"
- Échapper les retours à la ligne dans les chaînes avec \\n
- Pas de virgule finale
- Pas de commentaires

Chaque objet article doit avoir ces champs :
{
  "slug": "kebab-case-slug-seo",
  "title": "Titre Article (50-70 chars, inclure année)",
  "excerpt": "1-2 phrases d'accroche avec mot-clé",
  "category": "organisation | lieux | team-building",
  "author": { "name": "Sophie Durand", "role": "Experte Événementiel", "avatar": "SD" },
  "publishedAt": "${today}",
  "readingTime": 10,
  "image": "/images/{slug}.webp",
  "imageAlt": "Texte alt descriptif avec mot-clé et lieu",
  "keywords": ["mot-clé-1", "mot-clé-2", "...8-12 keywords"],
  "content": "<h2>Section 1</h2><p>Contenu HTML riche monobloc...</p><h2>Section 2</h2><p>...</p>",
  "faq": [{"question": "Question FAQ ?", "answer": "Réponse FAQ."}],
  "imagePrompt": "Bright conference room inside a prestigious French château, stone walls, tall windows overlooking formal gardens, business people in smart casual attire, golden hour warm light, no text, no words, no letters, no logos, no watermarks"
}

Pour le champ content : c'est une SEULE chaîne HTML (pas un array). Utiliser des guillemets simples pour les attributs HTML (class='text-primary') pour éviter les problèmes d'échappement.

Réponds avec UNIQUEMENT le tableau JSON.`;

  async function callClaude(userMessage) {
    const MAX_RETRIES = 3;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const stream = await client.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 32000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        });
        return await stream.finalMessage();
      } catch (apiError) {
        const isOverloaded = apiError.status === 529 || apiError.message?.includes('Overloaded') || apiError.error?.type === 'overloaded_error';
        const isRateLimit = apiError.status === 429;
        if ((isOverloaded || isRateLimit) && attempt < MAX_RETRIES) {
          const delay = attempt * 30;
          log(2, `API ${isOverloaded ? 'overloaded' : 'rate limited'} — retry ${attempt}/${MAX_RETRIES} dans ${delay}s`);
          await new Promise(r => setTimeout(r, delay * 1000));
          continue;
        }
        throw apiError;
      }
    }
  }

  const TARGET_COUNT = 2;
  const baseUserMessage = 'Génère 2 articles de blog SEO en français pour Select Châteaux. Retourne UNIQUEMENT du JSON valide — un seul tableau avec 2 objets. Utilise des guillemets simples pour les attributs HTML. Vérifie que ton JSON est valide avant de répondre.';

  // GATE ANTI-CANNIBALISATION : jusqu'à 2 tentatives de génération.
  // Les violations de la tentative 1 sont renvoyées à Claude en feedback.
  // Données chargées UNE fois (les data files font ~1,6 Mo — pas de re-scan par candidat).
  const clusters = loadClusters();
  const baseExisting = prepareExisting(getExistingArticles());

  let validArticles = [];
  let lastViolationsFeedback = '';
  let gateRejectionCount = 0;
  for (let genAttempt = 1; genAttempt <= 2; genAttempt++) {
    const acceptedNote = validArticles.length > 0
      ? `\n\nARTICLE(S) DÉJÀ ACCEPTÉ(S) DANS CE RUN (ne PAS recouvrir ces sujets) :\n${validArticles.map(a => `- ${a.slug} → ${a.title}`).join('\n')}\nGénère uniquement ${TARGET_COUNT - validArticles.length} article(s) sur un sujet TOTALEMENT différent.`
      : '';
    const userMessage = genAttempt === 1
      ? baseUserMessage
      : `${baseUserMessage}

ATTENTION — ta tentative précédente a été REJETÉE par le validateur anti-cannibalisation :
${lastViolationsFeedback}

Choisis des sujets RADICALEMENT différents : ni les mots-clés protégés, ni les sujets des articles existants. Et inclus les liens canoniques obligatoires si une zone est mentionnée.${acceptedNote}`;

    // Une tentative qui échoue (API ou parsing) ne doit JAMAIS jeter les
    // articles déjà validés à la tentative précédente.
    let articles;
    try {
      const response = await callClaude(userMessage);
      const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('');
      log(2, `Réponse Claude (tentative ${genAttempt}) : ${text.length} chars`);
      articles = parseArticlesJSON(text);
    } catch (err) {
      logError(2, `Tentative ${genAttempt} échouée (${err.message})`);
      if (validArticles.length > 0) break; // on garde l'acquis
      throw err;
    }

    // Validation structurelle + gate anti-cannibalisation.
    // CRITIQUE : chaque candidat est aussi comparé aux articles ACCEPTÉS dans ce
    // run (batch + tentative précédente) — sinon 2 articles du même run peuvent
    // se cannibaliser entre eux sans que le gate ne voie rien.
    const feedbacks = [];
    for (const a of articles) {
      if (validArticles.length >= TARGET_COUNT) break; // cap strict
      if (!a.slug || !a.title || !a.content) {
        feedbacks.push(`- Article incomplet, champs manquants : ${JSON.stringify(Object.keys(a))}`);
        continue;
      }
      if (existingSlugs.includes(a.slug) || validArticles.some(v => v.slug === a.slug)) {
        feedbacks.push(`- Slug dupliqué exact : ${a.slug}`);
        continue;
      }
      const existingPlusRun = baseExisting.concat(
        prepareExisting(validArticles.map(v => ({ slug: v.slug, title: v.title })))
      );
      const gate = checkArticle(a, existingPlusRun, clusters);
      if (!gate.ok) {
        gateRejectionCount++;
        log(2, formatReport(a.slug, gate));
        feedbacks.push(formatReport(a.slug, gate));
        continue;
      }
      validArticles.push(a);
    }

    if (feedbacks.length === 0 || validArticles.length >= TARGET_COUNT) break;
    lastViolationsFeedback = feedbacks.join('\n');
    if (genAttempt === 2) {
      log(2, `Tentative 2 : ${validArticles.length} article(s) valide(s) au total, violations restantes ignorées — on publie uniquement les valides.`);
    }
  }

  if (validArticles.length === 0) {
    throw new Error('Gate anti-cannibalisation : aucun article valide après 2 tentatives. Aucune publication (comportement voulu — mieux vaut 0 article qu\'un article cannibalisant).');
  }

  log(2, `${validArticles.length} article(s) validé(s) : ${validArticles.map(a => a.slug).join(', ')} (${gateRejectionCount} rejet(s) gate)`);
  return { articles: validArticles, gateRejectionCount };
}

/** Parse la réponse JSON de Claude avec stratégies de fallback */
function parseArticlesJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

  let articles;
  try {
    articles = JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        articles = JSON.parse(jsonMatch[0]);
      } catch {
        const fixed = jsonMatch[0]
          .replace(/,\s*([}\]])/g, '$1')
          .replace(/([{,]\s*)"?(\w+)"?\s*:/g, '$1"$2":')
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t');
        try {
          articles = JSON.parse(fixed);
        } catch (e3) {
          const objects = [];
          const re = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
          let m;
          while ((m = re.exec(cleaned)) !== null) {
            try {
              const obj = JSON.parse(m[0]);
              if (obj.slug && obj.title && obj.content) objects.push(obj);
            } catch {}
          }
          if (objects.length > 0) {
            log(2, `Fallback : ${objects.length} articles extraits individuellement`);
            articles = objects;
          } else {
            fs.writeFileSync('/tmp/camille-raw-response.txt', text);
            throw new Error(`Échec parsing JSON après toutes les stratégies. Brut sauvé dans /tmp/camille-raw-response.txt. Erreur : ${e3.message}`);
          }
        }
      }
    } else {
      fs.writeFileSync('/tmp/camille-raw-response.txt', text);
      throw new Error('Aucun tableau JSON trouvé dans la réponse Claude. Brut sauvé dans /tmp/camille-raw-response.txt');
    }
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error('Claude a retourné une réponse vide ou non-tableau');
  }

  return articles;
}

async function step3_generateImage(article) {
  log(3, `Génération image pour ${article.slug}...`);
  let prompt = article.imagePrompt || `Professional editorial photo of a prestigious French château seminar venue, golden hour, French gardens, stone architecture, no text, no logos, no words, no letters, no watermarks`;
  // Strip structured labels that Imagen renders as visible text
  prompt = prompt.replace(/\b(Editorial_photography|Location|Lighting|Gender_mix|Gender_composition|Elements_to_avoid|Focus|Composition|Style|Setting|Mood|Atmosphere)[:\s_]/gi, '');
  prompt = prompt.replace(/\[.*?\]/g, '');
  if (!/no text/i.test(prompt)) prompt += ', no text, no words, no letters, no logos, no watermarks';
  const tmpPng = `/tmp/${article.slug}.png`;
  const finalWebp = path.join(IMAGES_DIR, `${article.slug}.webp`);

  try {
    execSync(
      `node imagen-generate.js --prompt "${prompt.replace(/"/g, '\\"')}" --output "${tmpPng}"`,
      { cwd: AGENT_DIR, timeout: 120000, env: process.env }
    );

    if (!fs.existsSync(tmpPng)) throw new Error('imagen-generate n\'a produit aucun fichier');

    const cityMatch = article.slug.match(/chantilly|fontainebleau|versailles|rambouillet|senlis|dampierre|chevreuse|vincennes|sceaux|compiegne/);
    const city = cityMatch ? cityMatch[0] : 'ile-de-france';
    execSync(
      `node image-optimize.js --input "${tmpPng}" --output "${finalWebp}" --city ${city}`,
      { cwd: AGENT_DIR, timeout: 30000, env: process.env }
    );

    const result = execSync(`file "${finalWebp}"`, { encoding: 'utf-8' });
    if (!result.includes('RIFF') && !result.includes('Web/P')) {
      throw new Error(`Validation image échouée : ${result.trim()}`);
    }

    log(3, `Image OK : ${article.slug}.webp`);
    try { fs.unlinkSync(tmpPng); } catch {}
    return true;
  } catch (err) {
    logError(3, `Génération image échouée pour ${article.slug} : ${err.message}`);
    try { fs.unlinkSync(tmpPng); } catch {}
    return false;
  }
}

function step4_publishArticle(article) {
  log(4, `Publication ${article.slug}...`);

  const articleData = { ...article };
  delete articleData.imagePrompt;

  const jsonPath = `/tmp/article-${article.slug}.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(articleData, null, 2));

  try {
    const out = execSync(`node publish-article.js --file "${jsonPath}"`, {
      cwd: AGENT_DIR, timeout: 10000,
    }).toString();
    log(4, `Publié : ${out.trim()}`);
    fs.unlinkSync(jsonPath);
    return true;
  } catch (err) {
    logError(4, `Publication échouée pour ${article.slug} : ${err.message}`);
    try { fs.unlinkSync(jsonPath); } catch {}
    return false;
  }
}

function step5_validateImages() {
  log(5, 'Validation de toutes les images blog...');
  try {
    const out = execSync('node validate-images.js', {
      cwd: AGENT_DIR, timeout: 30000,
    }).toString();
    log(5, `Validation : ${out.trim()}`);
    return true;
  } catch (err) {
    logError(5, `Validation images échouée : ${err.message}`);
    return false;
  }
}

function step6_logSession(status, slugs, error, failedStep) {
  log(6, `Log session : ${status}`);
  try {
    const safeError = error ? error.replace(/[^\x20-\x7E]/g, '').substring(0, 200) : '';
    const safeStep = failedStep || '';
    const args = [`--status=${status}`];
    if (slugs.length > 0) args.push(`--articles=${slugs.join(',')}`);
    if (safeError) args.push(`--error=${safeError}`);
    if (safeStep) args.push(`--step=${safeStep}`);

    execSync(`node log-session.js ${args.map(a => `'${a.replace(/'/g, "'\\''")}'`).join(' ')}`, {
      cwd: AGENT_DIR, timeout: 10000, env: process.env,
    });
    log(6, 'Session loggée dans Supabase');
  } catch (err) {
    logError(6, `Log session échoué (non-fatal) : ${err.stderr?.toString().substring(0, 200) || err.message}`);
  }
}

async function checkSchedule() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) return true;

  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/agent_controls?id=eq.camille&select=enabled,schedule,publish_hour`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    const [row] = await resp.json();
    if (!row) return true;
    if (!row.enabled) { log(0, 'Camille est DÉSACTIVÉE dans agent_controls — sortie'); return false; }

    const schedule = row.schedule || '1,4';
    const parisNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
    const parisDay = parisNow.getDay();
    const parisHour = parisNow.getHours();
    const allowedDays = schedule.split(',').map(Number);
    if (!allowedDays.includes(parisDay)) {
      log(0, `Aujourd'hui (jour ${parisDay}) pas dans le planning [${schedule}] — on passe`);
      return false;
    }
    const targetHour = row.publish_hour != null ? Number(row.publish_hour) : 9;
    if (parisHour < targetHour) {
      log(0, `Heure Paris ${parisHour}h < heure cible ${targetHour}h — trop tôt, on passe`);
      return false;
    }

    // Vérifier qu'on n'a pas déjà publié aujourd'hui
    const todayStr = parisNow.toISOString().split('T')[0];
    try {
      const logsResp = await fetch(`${SUPABASE_URL}/rest/v1/camille_session_logs?created_at=gte.${todayStr}T00:00:00Z&status=eq.success&select=id&limit=1`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      });
      const todayLogs = await logsResp.json();
      if (Array.isArray(todayLogs) && todayLogs.length > 0) {
        log(0, `Déjà publié aujourd'hui (${todayStr}) — on passe`);
        return false;
      }
    } catch {}

    log(0, `Vérification planning OK — jour ${parisDay} dans [${schedule}], heure ${parisHour}h (≥${targetHour}h), pas encore publié`);
    return true;
  } catch (err) {
    log(0, `Vérification planning échouée (${err.message}) — on lance quand même`);
    return true;
  }
}

async function main() {
  const isManualTrigger = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';
  if (!isManualTrigger) {
    const shouldRun = await checkSchedule();
    if (!shouldRun) {
      console.log(JSON.stringify({ status: 'skipped', reason: 'not a scheduled day' }));
      return;
    }
  } else {
    log(0, 'Déclenchement manuel (workflow_dispatch) — bypass vérification planning');
  }

  const publishedSlugs = [];
  let failedStep = null;
  let errorMsg = null;

  try {
    const existingSlugs = getExistingSlugs();
    log(0, `${existingSlugs.length} articles existants dans le blog`);

    const gscData = await step1_gscResearch();

    const { articles, gateRejectionCount } = await step2_claudeGenerate(gscData, existingSlugs);

    for (const article of articles) {
      const imageOk = await step3_generateImage(article);

      if (!imageOk) {
        log(3, `Image échouée après toutes les tentatives pour ${article.slug} — article ignoré`);
        continue;
      }

      const published = step4_publishArticle(article);
      if (published) {
        publishedSlugs.push(article.slug);
      } else {
        failedStep = `4-publish-${article.slug}`;
        errorMsg = `Échec publication ${article.slug}`;
      }
    }

    step5_validateImages();

    if (publishedSlugs.length === 0) {
      throw new Error('Aucun article n\'a été publié');
    }

    log('DONE', `${publishedSlugs.length} articles publiés : ${publishedSlugs.join(', ')}`);
    // Signal de monitoring : les rejets gate et les échecs partiels de publication
    // sont tracés même en succès — sinon une dérive du registre de clusters
    // (qui rejetterait la majorité des articles) resterait invisible pendant des semaines.
    const warnings = [];
    if (gateRejectionCount > 0) warnings.push(`${gateRejectionCount} rejet(s) gate anti-cannibalisation`);
    if (failedStep) warnings.push(`échec partiel: ${failedStep}`);
    step6_logSession('success', publishedSlugs, warnings.length > 0 ? warnings.join(' | ') : null, null);

    console.log(JSON.stringify({ status: 'success', slugs: publishedSlugs, gateRejections: gateRejectionCount }));
  } catch (err) {
    logError('FATAL', err.message);
    failedStep = failedStep || 'pipeline';
    errorMsg = err.message;
    step6_logSession('failed', publishedSlugs, errorMsg, failedStep);

    console.log(JSON.stringify({ status: 'failed', error: errorMsg, slugs: publishedSlugs }));
    process.exit(1);
  }
}

main();
