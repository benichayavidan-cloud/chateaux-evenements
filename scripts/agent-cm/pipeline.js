#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ARTICLES_PATH, IMAGES_DIR, CATEGORIES } = require('./config');

const AGENT_DIR = __dirname;
const SITE_DIR = path.resolve(AGENT_DIR, '../..');

function log(step, msg) {
  console.log(`[Step ${step}] ${msg}`);
}

function logError(step, msg) {
  console.error(`[Step ${step}] ERROR: ${msg}`);
}

function getExistingArticles() {
  const articles = [];
  const dataDir = path.join(SITE_DIR, 'src/data');
  const files = ['blog-posts.ts', 'blog-posts-seo-2026.ts', 'blog-posts-niches-2026.ts', 'blog-posts-camille.ts'];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      const slugRegex = /slug:\s*["']([^"']+)["']/g;
      const titleRegex = /title:\s*["']([^"']+)["']/g;
      const slugs = [];
      const titles = [];
      let m;
      while ((m = slugRegex.exec(content)) !== null) slugs.push(m[1]);
      while ((m = titleRegex.exec(content)) !== null) titles.push(m[1]);
      for (let i = 0; i < slugs.length; i++) {
        articles.push({ slug: slugs[i], title: titles[i] || slugs[i] });
      }
    } catch {}
  }
  return articles;
}

function getExistingSlugs() {
  return getExistingArticles().map(a => a.slug);
}

function slugWords(slug) {
  return new Set(slug.split('-').filter(w => w.length > 2));
}

function isSimilarSlug(newSlug, existingSlugs) {
  const newWords = slugWords(newSlug);
  for (const existing of existingSlugs) {
    const existingWords = slugWords(existing);
    const common = [...newWords].filter(w => existingWords.has(w));
    const similarity = common.length / Math.max(newWords.size, existingWords.size);
    if (similarity >= 0.7) return existing;
  }
  return null;
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
  "imagePrompt": "Prompt détaillé pour Imagen (château français, lumière dorée, pas de texte/logo)"
}

Pour le champ content : c'est une SEULE chaîne HTML (pas un array). Utiliser des guillemets simples pour les attributs HTML (class='text-primary') pour éviter les problèmes d'échappement.

Réponds avec UNIQUEMENT le tableau JSON.`;

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 32000,
    system: systemPrompt,
    messages: [{ role: 'user', content: 'Génère 2 articles de blog SEO en français pour Select Châteaux. Retourne UNIQUEMENT du JSON valide — un seul tableau avec 2 objets. Utilise des guillemets simples pour les attributs HTML. Vérifie que ton JSON est valide avant de répondre.' }],
  });

  const response = await stream.finalMessage();
  const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('');
  log(2, `Réponse Claude : ${text.length} chars`);

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

  for (const a of articles) {
    if (!a.slug || !a.title || !a.content) {
      throw new Error(`Article incomplet, champs manquants : ${JSON.stringify(Object.keys(a))}`);
    }
    if (existingSlugs.includes(a.slug)) {
      throw new Error(`Slug dupliqué exact : ${a.slug}`);
    }
    const similar = isSimilarSlug(a.slug, existingSlugs);
    if (similar) {
      throw new Error(`Slug trop similaire à un article existant : "${a.slug}" ressemble à "${similar}" (mêmes mots réordonnés). Cannibalization SEO bloquée.`);
    }
  }

  log(2, `${articles.length} articles parsés : ${articles.map(a => a.slug).join(', ')}`);
  return articles;
}

async function step3_generateImage(article) {
  log(3, `Génération image pour ${article.slug}...`);
  const prompt = article.imagePrompt || `Professional editorial photo of a prestigious French château seminar venue, golden hour, French gardens, stone architecture, no text, no logos`;
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
    if (parisHour !== targetHour) {
      log(0, `Heure Paris ${parisHour}h ≠ heure cible ${targetHour}h — on passe`);
      return false;
    }
    log(0, `Vérification planning OK — jour ${parisDay} dans [${schedule}], heure ${parisHour}h`);
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

    const articles = await step2_claudeGenerate(gscData, existingSlugs);

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
    step6_logSession('success', publishedSlugs, null, null);

    console.log(JSON.stringify({ status: 'success', slugs: publishedSlugs }));
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
