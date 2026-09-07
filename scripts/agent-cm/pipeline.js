#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ARTICLES_PATH, IMAGES_DIR, CATEGORIES } = require('./config');
const { checkArticle, loadClusters, formatReport, getExistingArticles, prepareExisting } = require('./anti-cannibalisation');
const { checkDoublonSemantique } = require('./doublon-semantique');
const {
  listerArticlesCamille, estConforme,
  assertLongueurSuffisante, assertTitre, assertStructureH3, assertSourceExterne,
} = require('./publish-article');

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

/**
 * MODÈLE ET RATIO — remis d'aplomb le 07/09/2026.
 *
 * Le 06/09, la revue a décidé d'inverser le ratio : 3 RÉÉCRITURES pour
 * 1 création, parce que Googlebot ne lit que ~4 pages/jour sur ce site et que
 * publier du neuf consomme ce budget au lieu de le rentabiliser. La décision a
 * été écrite dans AGENT_PROMPT.md — et nulle part ailleurs. Le code, lui, a
 * continué de demander `TARGET_COUNT = 2` articles NEUFS et n'a jamais su
 * réécrire : publish-article.js ne savait qu'insérer. Camille faisait donc
 * exactement l'inverse de ce qui avait été décidé.
 *
 * Le chemin de réécriture (replaceArticle) existe depuis le 07/09 ; ce module
 * s'en sert. Mesure du même jour sur les 248 articles : AUCUN ne passe les
 * trois garde-fous du site (242 sans <h3>, 0 avec source externe, 215 sous
 * 1 500 mots). Le stock à réécrire est donc le corpus entier.
 */
const MODELE = 'claude-sonnet-5';
const NB_REECRITURES = 3;

/** Schéma commun aux deux usages — la forme d'un article rédigé. */
const CHAMPS_REDACTION = {
  title: { type: 'string' },
  excerpt: { type: 'string' },
  // Pas de minItems/maxItems : l'API refuse toute borne de tableau autre que
  // 0 ou 1 dans un json_schema. Le nombre de mots-clés attendu est demandé
  // dans le socle de consignes à la place.
  keywords: { type: 'array', items: { type: 'string' } },
  readingTime: { type: 'integer' },
  content: { type: 'string' },
  faq: {
    type: 'array',
    items: {
      type: 'object', additionalProperties: false,
      required: ['question', 'answer'],
      properties: { question: { type: 'string' }, answer: { type: 'string' } },
    },
  },
  howTo: {
    type: 'object', additionalProperties: false,
    required: ['name', 'steps'],
    properties: {
      name: { type: 'string' },
      steps: {
        type: 'array',
        items: {
          type: 'object', additionalProperties: false,
          required: ['name', 'text'],
          properties: { name: { type: 'string' }, text: { type: 'string' } },
        },
      },
    },
  },
};

const SCHEMA_REECRITURE = {
  type: 'object', additionalProperties: false,
  required: ['title', 'excerpt', 'keywords', 'readingTime', 'content', 'faq', 'howTo'],
  properties: CHAMPS_REDACTION,
};

const SCHEMA_CREATION = {
  type: 'object', additionalProperties: false,
  required: ['sujetVierge', 'slug', 'title', 'excerpt', 'category', 'keywords', 'readingTime', 'content', 'faq', 'howTo', 'imageAlt', 'imagePrompt'],
  properties: {
    // Le prompt autorise à ne RIEN créer s'il n'existe pas de sujet vierge.
    // Un booléen explicite vaut mieux qu'un tableau vide : le modèle doit
    // pouvoir dire non sans que ce soit indistinguable d'un échec.
    sujetVierge: { type: 'boolean' },
    slug: { type: 'string' },
    category: { type: 'string', enum: CATEGORIES },
    imageAlt: { type: 'string' },
    imagePrompt: { type: 'string' },
    ...CHAMPS_REDACTION,
  },
};

/**
 * Un appel Claude à sortie STRUCTURÉE.
 *
 * Remplace le parsing artisanal (5 stratégies de rattrapage en cascade) qui
 * causait 4 des 10 derniers échecs de l'agent : « Unexpected token '\' ». La
 * dernière stratégie remplaçait les sauts de ligne par des \n littéraux y
 * compris HORS des chaînes, ce qui fabriquait le JSON invalide qu'elle était
 * censée réparer. Ici le schéma est contraint côté serveur : la réponse est
 * du JSON valide ou l'appel échoue franchement.
 *
 * Le system prompt est mis en cache : il fait ~30 k tokens et ne change pas
 * entre les 4 appels d'un même run (3 réécritures + 1 création).
 */
async function appelerClaude(client, { system, user, schema, maxTokens = 64000 }) {
  const MAX_TENTATIVES = 3;
  for (let essai = 1; essai <= MAX_TENTATIVES; essai++) {
    try {
      const stream = await client.messages.stream({
        model: MODELE,
        max_tokens: maxTokens,
        system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
        output_config: { format: { type: 'json_schema', schema } },
        messages: [{ role: 'user', content: user }],
      });
      const reponse = await stream.finalMessage();
      if (reponse.stop_reason === 'max_tokens') {
        throw new Error(`réponse tronquée à ${maxTokens} tokens`);
      }
      const texte = reponse.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
      return JSON.parse(texte);
    } catch (err) {
      const surcharge = err.status === 529 || err.status === 429 || /Overloaded/i.test(err.message || '');
      if (surcharge && essai < MAX_TENTATIVES) {
        const attente = essai * 30;
        log(2, `API saturée — nouvelle tentative ${essai}/${MAX_TENTATIVES} dans ${attente}s`);
        await new Promise((r) => setTimeout(r, attente * 1000));
        continue;
      }
      throw err;
    }
  }
}

/**
 * Passe l'article aux MÊMES garde-fous que publish-article.js, mais AVANT
 * l'écriture — et renvoie le motif au lieu de lever.
 *
 * Au premier run réel (07/09), deux réécritures sur trois ont été produites
 * puis REJETÉES à la publication pour « aucune source externe citée » : le
 * travail de rédaction était perdu, et le run entier repartait à zéro. Vérifier
 * ici permet de renvoyer le motif au modèle et de lui laisser une seconde
 * chance, comme le fait déjà la boucle de la création pour le gate
 * anti-cannibalisation.
 */
function motifDeRejet(article) {
  for (const verifier of [assertLongueurSuffisante, assertTitre, assertStructureH3, assertSourceExterne]) {
    try {
      verifier(article);
    } catch (err) {
      return err.message;
    }
  }
  return null;
}

/** Socle de consignes commun aux réécritures et à la création. */
function socleSysteme(gscData) {
  const promptMd = fs.readFileSync(path.join(AGENT_DIR, 'AGENT_PROMPT.md'), 'utf-8');
  const today = new Date().toISOString().split('T')[0];
  const month = new Date().toLocaleString('fr-FR', { month: 'long' });
  return `${promptMd}

DONNÉES GSC (30 derniers jours) :
${gscData.substring(0, 8000)}

MOTS-CLÉS PROTÉGÉS (registre seo-clusters.json — chaque requête appartient à UNE page canonique) :
${clustersPromptBlock()}

CATÉGORIES VALIDES : ${CATEGORIES.join(', ')}
AUJOURD'HUI : ${today}
MOIS EN COURS : ${month}

CONTRAINTES VÉRIFIÉES PAR LE CODE — un article qui les enfreint est REJETÉ :
- au moins 1 500 mots de texte VISIBLE (balises retirées) ;
- au moins 6 sous-titres <h3>, répartis 2 à 4 sous chaque <h2> ;
- OBLIGATOIRE — au moins un lien sortant vers une source publique vérifiable,
  hors selectchateaux.com. C'est la contrainte la plus souvent oubliée : sans
  elle l'article est rejeté et tout le travail de rédaction est perdu. Forme
  attendue, à placer dans le corps du texte :
      <a href='https://www.insee.fr/...' rel='nofollow'>INSEE</a>
  Domaines acceptés : insee.fr, atout-france.fr, unimev.fr, legifrance.gouv.fr,
  service-public.fr, travail-emploi.gouv.fr, entreprises.gouv.fr, ademe.fr,
  les offices de tourisme (…-tourisme.fr) et les sites officiels des lieux.
  Un lien vers selectchateaux.com NE COMPTE PAS ;
- le titre : 42 caractères maximum AVANT le séparateur « : » — au-delà, Google
  coupe la fin dans ses résultats ;
- entre 8 et 12 mots-clés ;
- attributs HTML en guillemets SIMPLES (class='text-primary').`;
}

/**
 * Choisit les articles à réécrire.
 *
 * Ordre de priorité repris d'AGENT_PROMPT.md §RÉÉCRITURE GEO :
 *   1. articles possédant une requête GSC en position 5-15 (presque page 1) ;
 *   2. idem en position 15-25 ;
 *   3. les plus anciens jamais réécrits.
 * Exclusion : les articles déjà en position 1-4 — on ne touche pas à ce qui
 * fonctionne. Les articles déjà conformes sont écartés en dernier recours
 * seulement, car au 07/09/2026 il n'y en a aucun.
 */
/**
 * Articles réclamés par Marcus — issues ouvertes étiquetées camille-reecriture.
 *
 * Marcus désigne les pages « vues et jamais choisies » (fortes impressions,
 * zéro clic), un signal que la sélection de Camille — fondée sur la position —
 * ne voit pas. Sans cette lecture, l'action de Marcus produirait une issue que
 * personne n'exécute : sa prédiction (« au moins 1 clic sous 28 jours ») serait
 * réfutée faute d'exécutant, pas faute d'être juste. C'est le genre d'action
 * sans effet que la revue du 06/09 a retirée du catalogue.
 */
function commandesDeMarcus() {
  try {
    const brut = execSync(
      'gh issue list --label camille-reecriture --state open --json title,number --limit 10',
      { cwd: SITE_DIR, timeout: 20000, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] },
    ).toString();
    return JSON.parse(brut)
      .map((i) => {
        const m = String(i.title).match(/\/blog\/([^\s/]+)/);
        return m ? { slug: m[1], issue: i.number } : null;
      })
      .filter(Boolean);
  } catch (err) {
    // Non bloquant : sans gh ou sans token, Camille garde sa sélection GSC.
    log(2, `Commandes Marcus illisibles (${String(err.message).split('\n')[0]}) — sélection GSC seule`);
    return [];
  }
}

function choisirReecritures(gscData, nb, exclure = []) {
  const articles = listerArticlesCamille();
  const parSlug = new Map(articles.map((a) => [a.slug, a]));

  let proprietaires = [];
  let intouchables = new Set();
  try {
    const gsc = JSON.parse(gscData);
    const slugDe = (url) => (String(url).match(/\/blog\/([^/?#]+)/) || [, null])[1];
    for (const q of gsc.topPerformers || []) {
      const s = slugDe(q.ownedBy);
      if (s) intouchables.add(s);
    }
    const vus = new Set();
    for (const q of gsc.rewriteCandidates || []) {
      const s = slugDe(q.ownedBy);
      if (!s || vus.has(s) || !parSlug.has(s)) continue;
      vus.add(s);
      proprietaires.push({
        slug: s,
        position: q.ownerPosition ?? q.position,
        impressions: q.impressions,
        requete: q.query,
      });
    }
  } catch {
    log(2, 'Données GSC illisibles — sélection par ancienneté seule');
  }

  const rang = (p) => (p.position >= 5 && p.position <= 15 ? 0 : 1);
  proprietaires.sort((a, b) => rang(a) - rang(b) || b.impressions - a.impressions);

  const retenus = [];
  const pris = new Set(exclure);

  // Priorité 0 : ce que Marcus a explicitement commandé.
  for (const c of commandesDeMarcus()) {
    if (retenus.length >= nb) break;
    if (!parSlug.has(c.slug) || pris.has(c.slug)) continue;
    pris.add(c.slug);
    retenus.push({ ...parSlug.get(c.slug), motif: `commande de Marcus (issue #${c.issue})` });
  }

  for (const p of proprietaires) {
    if (retenus.length >= nb) break;
    if (intouchables.has(p.slug) || pris.has(p.slug)) continue;
    pris.add(p.slug);
    retenus.push({ ...parSlug.get(p.slug), motif: `GSC : « ${p.requete} » en position ${Math.round(p.position)}, ${p.impressions} impressions` });
  }

  if (retenus.length < nb) {
    const parAnciennete = articles
      .filter((a) => !pris.has(a.slug) && !intouchables.has(a.slug) && !a.updatedAt && !estConforme(a))
      .sort((a, b) => String(a.publishedAt).localeCompare(String(b.publishedAt)));
    for (const a of parAnciennete) {
      if (retenus.length >= nb) break;
      retenus.push({ ...a, motif: `ancienneté : publié le ${a.publishedAt}, jamais réécrit (${a.mots} mots, ${a.h3} <h3>, source externe : ${a.sourceExterne ? 'oui' : 'non'})` });
    }
  }
  return retenus;
}

/** ÉTAPE 2a — les 3 réécritures. Un appel par article : un seul JSON portant
 *  trois articles de 2 500 mots dépasse la fenêtre de sortie et se tronque. */
async function step2_reecritures(client, gscData, nb = NB_REECRITURES, exclure = [], tentes = null) {
  const cibles = choisirReecritures(gscData, nb, exclure);
  for (const c of cibles) tentes?.add(c.slug);
  log(2, `${cibles.length} article(s) à réécrire :`);
  cibles.forEach((c) => log(2, `   ${c.slug} — ${c.motif}`));

  const system = socleSysteme(gscData);
  const reecrits = [];
  for (const cible of cibles) {
    try {
      const user = `RÉÉCRITURE GEO de l'article ci-dessous. Applique la section « RÉÉCRITURE GEO » du prompt.

RAISON DU CHOIX : ${cible.motif}

RÈGLES ABSOLUES :
- le slug ne change pas (${cible.slug}) — l'URL doit rester la même ;
- l'image ne change pas ;
- garde et enrichis les liens internes existants ;
- réécris TOUT le contenu : l'article actuel fait ${cible.mots} mots et ${cible.h3} sous-titres <h3>, il est sous la norme du site.

ARTICLE ACTUEL
title : ${cible.title}
keywords : ${cible.keywords.join(', ')}
publié le : ${cible.publishedAt}

${cible.content}`;

      // Deux tentatives : la seconde reçoit le motif de rejet de la première.
      // Sans cette boucle, une réécriture recalée sur un garde-fou était perdue
      // sèche — c'est ce qui a fait échouer le run du 07/09 (2 sur 3 recalées
      // pour « aucune source externe »).
      let article = null;
      let motif = null;
      for (let essai = 1; essai <= 2 && !article; essai++) {
        const message = essai === 1 ? user : `${user}

TA VERSION PRÉCÉDENTE A ÉTÉ REJETÉE PAR UN GARDE-FOU :
${motif}

Corrige EXACTEMENT ce point et renvoie l'article complet.`;
        const brut = await appelerClaude(client, { system, user: message, schema: SCHEMA_REECRITURE });
        const candidat = {
          ...brut,
          slug: cible.slug,
          category: cible.category,
          image: cible.image,
          imageAlt: cible.imageAlt,
          publishedAt: cible.publishedAt,
          updatedAt: new Date().toISOString().split('T')[0],
        };
        motif = motifDeRejet(candidat);
        if (motif) {
          log(2, `   ↻ ${cible.slug} tentative ${essai} recalée : ${motif.split('\n')[0]}`);
          continue;
        }
        article = candidat;
      }
      if (!article) {
        logError(2, `   ✗ ${cible.slug} : recalé après 2 tentatives — ${motif.split('\n')[0]}`);
        continue;
      }
      reecrits.push(article);
      log(2, `   ✓ ${cible.slug} réécrit (${String(article.content).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length} mots)`);
    } catch (err) {
      // Une réécriture ratée n'annule pas les autres : chacune est indépendante.
      logError(2, `   ✗ ${cible.slug} : ${err.message}`);
    }
  }
  return reecrits;
}

/** ÉTAPE 2b — LE nouvel article, s'il existe un sujet réellement vierge.
 *  C'est l'exception depuis le 06/09, plus la règle : le modèle a le droit
 *  de répondre qu'aucun sujet vierge ne se présente. */
async function step2_creation(client, gscData, existingSlugs) {
  const clusters = loadClusters();
  const baseExisting = prepareExisting(getExistingArticles());
  const system = socleSysteme(gscData);
  const today = new Date().toISOString().split('T')[0];

  const listeExistants = getExistingArticles().map((a) => `- ${a.slug} → ${a.title}`).join('\n');
  let retour = '';

  for (let essai = 1; essai <= 2; essai++) {
    const user = `Propose AU PLUS UN nouvel article, et seulement si un sujet RÉELLEMENT VIERGE existe.

Un sujet vierge est une intention de recherche que ni les landing pages ni AUCUN des ${existingSlugs.length} articles ci-dessous ne couvre. Si tu n'en trouves pas, réponds sujetVierge=false et remplis les autres champs avec des chaînes vides — c'est une réponse ATTENDUE, pas un échec. Depuis le 06/09/2026 la réécriture est la règle et la création l'exception.

Ne doublonne pas un sujet même en changeant l'ordre des mots du slug.

ARTICLES EXISTANTS
${listeExistants}

publishedAt = ${today}${retour}`;

    let candidat;
    try {
      candidat = await appelerClaude(client, { system, user, schema: SCHEMA_CREATION });
    } catch (err) {
      logError(2, `Création : appel en échec (${err.message})`);
      return null;
    }

    if (!candidat.sujetVierge || !candidat.slug) {
      log(2, 'Aucun sujet vierge — pas de création ce run (comportement prévu)');
      return null;
    }
    if (existingSlugs.includes(candidat.slug)) {
      retour = `\n\nTa proposition précédente a été REJETÉE : le slug « ${candidat.slug} » existe déjà.`;
      continue;
    }

    const article = { ...candidat, image: `/images/${candidat.slug}.webp`, publishedAt: today };
    const gate = checkArticle(article, baseExisting, clusters);
    if (!gate.ok) {
      log(2, formatReport(article.slug, gate));
      retour = `\n\nTa proposition précédente a été REJETÉE par le validateur anti-cannibalisation :\n${formatReport(article.slug, gate)}\nChoisis un sujet RADICALEMENT différent.`;
      continue;
    }
    const sem = await checkDoublonSemantique(article, baseExisting);
    if (sem.warning) log(2, `⚠️  ${sem.warning}`);
    if (!sem.ok) {
      log(2, `❌ ${article.slug} : [DOUBLON_SEMANTIQUE] ${sem.detail}`);
      retour = `\n\nTa proposition précédente a été REJETÉE — doublon sémantique : ${sem.detail}`;
      continue;
    }
    log(2, `Nouvel article validé : ${article.slug}`);
    return article;
  }

  log(2, 'Création : aucun sujet valide après 2 tentatives — run en réécriture seule');
  return null;
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

/**
 * Écrit l'article dans le fichier de données.
 *
 * `mode` vaut 'creation' (insertion, chemin historique) ou 'reecriture'
 * (remplacement en place, ajouté le 07/09/2026). On passe toujours par la CLI
 * publish-article.js plutôt que par un require : c'est elle qui porte les
 * garde-fous, et l'appeler garantit qu'aucun chemin de publication ne les
 * contourne — pipeline automatique comme publication manuelle.
 */
function step4_publishArticle(article, mode = 'creation') {
  const verbe = mode === 'reecriture' ? 'Réécriture' : 'Publication';
  log(4, `${verbe} ${article.slug}...`);

  const articleData = { ...article };
  delete articleData.imagePrompt;

  const jsonPath = `/tmp/article-${article.slug}.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(articleData, null, 2));

  try {
    const drapeau = mode === 'reecriture' ? ' --replace' : '';
    const out = execSync(`node publish-article.js --file "${jsonPath}"${drapeau}`, {
      cwd: AGENT_DIR, timeout: 15000,
    }).toString();
    log(4, `${verbe} OK : ${out.trim()}`);
    fs.unlinkSync(jsonPath);
    return true;
  } catch (err) {
    // Le message utile est sur stderr (les garde-fous y écrivent leur motif) ;
    // err.message ne dit que « Command failed », ce qui rendait tout diagnostic
    // impossible dans les logs GitHub Actions.
    const motif = (err.stderr?.toString() || '').trim() || err.message;
    logError(4, `${verbe} échouée pour ${article.slug} : ${motif}`);
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

function step6_logSession(status, slugs, error, failedStep, rewritten = []) {
  log(6, `Log session : ${status}`);
  try {
    const safeError = error ? error.replace(/[^\x20-\x7E]/g, '').substring(0, 200) : '';
    const safeStep = failedStep || '';
    const args = [`--status=${status}`];
    if (slugs.length > 0) args.push(`--articles=${slugs.join(',')}`);
    if (rewritten.length > 0) args.push(`--rewritten=${rewritten.join(',')}`);
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
  if (!SUPABASE_URL || !SUPABASE_KEY) return { run: true };

  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/agent_controls?id=eq.camille&select=enabled,schedule,publish_hour`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    const [row] = await resp.json();
    if (!row) return { run: true };
    if (!row.enabled) { log(0, 'Camille est DÉSACTIVÉE dans agent_controls — sortie'); return { run: false, raison: 'agent désactivé dans agent_controls' }; }

    const schedule = row.schedule || '1,4';
    const parisNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
    const parisDay = parisNow.getDay();
    const parisHour = parisNow.getHours();
    const allowedDays = schedule.split(',').map(Number);
    if (!allowedDays.includes(parisDay)) {
      log(0, `Aujourd'hui (jour ${parisDay}) pas dans le planning [${schedule}] — on passe`);
      return { run: false, raison: `jour ${parisDay} hors planning [${schedule}]` };
    }
    const targetHour = row.publish_hour != null ? Number(row.publish_hour) : 9;
    if (parisHour < targetHour) {
      log(0, `Heure Paris ${parisHour}h < heure cible ${targetHour}h — trop tôt, on passe`);
      return { run: false, raison: `trop tôt (${parisHour}h Paris < ${targetHour}h)` };
    }

    // Vérifier qu'on n'a pas déjà publié aujourd'hui.
    //
    // `parisNow` est une Date construite depuis une chaîne localisée à Paris
    // puis relue comme heure LOCALE : toISOString() la redécale du fuseau de la
    // machine. Sur un runner en UTC le décalage vaut 2 h, donc entre 00h et 02h
    // Paris la date calculée était celle de la VEILLE. On formate côté Paris.
    const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
    try {
      const logsResp = await fetch(`${SUPABASE_URL}/rest/v1/camille_session_logs?created_at=gte.${todayStr}T00:00:00Z&status=eq.success&select=id&limit=1`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      });
      const todayLogs = await logsResp.json();
      if (Array.isArray(todayLogs) && todayLogs.length > 0) {
        log(0, `Déjà passé aujourd'hui (${todayStr}) — on passe`);
        return { run: false, raison: `déjà exécuté aujourd'hui (${todayStr})` };
      }
    } catch {}

    log(0, `Vérification planning OK — jour ${parisDay} dans [${schedule}], heure ${parisHour}h (≥${targetHour}h), pas encore passé`);
    return { run: true };
  } catch (err) {
    log(0, `Vérification planning échouée (${err.message}) — on lance quand même`);
    return { run: true };
  }
}

async function main() {
  const isManualTrigger = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';
  if (!isManualTrigger) {
    // Le motif est celui que checkSchedule a réellement constaté. Il affichait
    // « not a scheduled day » dans TOUS les cas — y compris quand le jour était
    // bon et qu'il était simplement trop tôt, ce qui a fait croire à une panne
    // de planning là où l'agent attendait juste 9 h.
    const planning = await checkSchedule();
    if (!planning.run) {
      console.log(JSON.stringify({ status: 'skipped', reason: planning.raison }));
      return;
    }
  } else {
    log(0, 'Déclenchement manuel (workflow_dispatch) — bypass vérification planning');
  }

  const publishedSlugs = [];
  const rewrittenSlugs = [];
  let failedStep = null;
  let errorMsg = null;

  try {
    const existingSlugs = getExistingSlugs();
    log(0, `${existingSlugs.length} articles existants dans le blog`);

    const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY est requis');

    const gscData = await step1_gscResearch();

    // ── Le cœur du travail : 3 réécritures. Elles ne génèrent PAS d'image —
    // l'article garde la sienne, c'est une règle de la réécriture GEO.
    // `tentes` retient TOUTES les cibles essayées, abouties ou non. Au run du
    // 07/09 la 4ᵉ réécriture a re-choisi un article déjà tenté et recalé, parce
    // que l'exclusion ne portait que sur les slugs effectivement publiés.
    const tentes = new Set();
    const reecrits = await step2_reecritures(client, gscData, NB_REECRITURES, [], tentes);
    for (const article of reecrits) {
      if (step4_publishArticle(article, 'reecriture')) {
        rewrittenSlugs.push(article.slug);
      } else {
        failedStep = `4-reecriture-${article.slug}`;
        errorMsg = `Échec réécriture ${article.slug}`;
      }
    }

    // ── L'exception : au plus 1 création, si un sujet vierge existe.
    const nouveau = await step2_creation(client, gscData, existingSlugs);
    if (!nouveau) {
      // Règle du prompt : sans sujet vierge, on fait une 4ᵉ réécriture plutôt
      // que rien. Le budget de crawl est le même ; autant le dépenser sur une
      // page que Google connaît déjà.
      log(2, 'Aucune création — on convertit le créneau en 4ᵉ réécriture');
      for (const article of await step2_reecritures(client, gscData, 1, [...tentes], tentes)) {
        if (step4_publishArticle(article, 'reecriture')) rewrittenSlugs.push(article.slug);
      }
    }
    if (nouveau) {
      if (await step3_generateImage(nouveau)) {
        if (step4_publishArticle(nouveau, 'creation')) {
          publishedSlugs.push(nouveau.slug);
        } else {
          failedStep = `4-publish-${nouveau.slug}`;
          errorMsg = `Échec publication ${nouveau.slug}`;
        }
      } else {
        log(3, `Image échouée pour ${nouveau.slug} — création abandonnée`);
      }
    }

    step5_validateImages();

    // Un run de RÉÉCRITURE SEULE est un succès : c'est même le régime normal
    // depuis le 06/09. Ne compter que les créations ferait échouer l'agent les
    // jours où il fait exactement ce qu'on lui demande.
    const touches = rewrittenSlugs.length + publishedSlugs.length;
    if (touches === 0) {
      throw new Error('Aucun article réécrit ni publié');
    }

    log('DONE', `${rewrittenSlugs.length} réécriture(s) : ${rewrittenSlugs.join(', ') || '—'} | ${publishedSlugs.length} création(s) : ${publishedSlugs.join(', ') || '—'}`);
    const warnings = [];
    if (rewrittenSlugs.length < NB_REECRITURES) {
      warnings.push(`${rewrittenSlugs.length}/${NB_REECRITURES} réécritures abouties`);
    }
    if (publishedSlugs.length === 0) warnings.push('aucun sujet vierge — réécriture seule');
    if (failedStep) warnings.push(`échec partiel: ${failedStep}`);
    step6_logSession('success', publishedSlugs, warnings.length > 0 ? warnings.join(' | ') : null, null, rewrittenSlugs);

    // `slugs` ne porte QUE les créations : c'est lui que le workflow lit pour
    // décider du ping IndexNow, et une réécriture doit être pingée elle aussi.
    // On expose donc les deux, et le workflow pinge l'union.
    console.log(JSON.stringify({ status: 'success', slugs: publishedSlugs, rewritten: rewrittenSlugs }));
  } catch (err) {
    logError('FATAL', err.message);
    failedStep = failedStep || 'pipeline';
    errorMsg = err.message;
    step6_logSession('failed', publishedSlugs, errorMsg, failedStep);

    console.log(JSON.stringify({ status: 'failed', error: errorMsg, slugs: publishedSlugs }));
    process.exit(1);
  }
}

// Sans ce garde, un simple `require('./pipeline')` déclenchait un run complet —
// appels API et écriture dans le fichier de données compris. C'est le même
// piège que celui déjà corrigé dans publish-article.js.
if (require.main === module) {
  main();
}

module.exports = {
  MODELE,
  NB_REECRITURES,
  SCHEMA_REECRITURE,
  SCHEMA_CREATION,
  appelerClaude,
  socleSysteme,
  choisirReecritures,
  step2_reecritures,
  step2_creation,
  checkSchedule,
};
