#!/usr/bin/env node
const fs = require('fs');
const { ARTICLES_PATH } = require('./config');
const { checkArticle, formatReport, getExistingArticles } = require('./anti-cannibalisation');

const CAMILLE_FILE_TEMPLATE = `import type { BlogPost } from "./blog-posts";

export const camilleArticles: BlogPost[] = [
];
`;

function ensureCamilleFile() {
  if (!fs.existsSync(ARTICLES_PATH)) {
    fs.writeFileSync(ARTICLES_PATH, CAMILLE_FILE_TEMPLATE, 'utf-8');
    console.log('Created blog-posts-camille.ts');
  }
}

function getNextId() {
  const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');
  const ids = [];
  const regex = /id:\s*(\d+)/g;
  let m;
  while ((m = regex.exec(content)) !== null) ids.push(parseInt(m[1]));
  return ids.length > 0 ? Math.max(...ids) + 1 : 1000;
}

function escapeForTS(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function formatArticleTS(article) {
  const i = '  ';
  const ii = '    ';
  let ts = `${i}{\n`;
  ts += `${ii}id: ${article.id},\n`;
  ts += `${ii}slug: "${escapeString(article.slug)}",\n`;
  ts += `${ii}title: "${escapeString(article.title)}",\n`;
  ts += `${ii}excerpt: "${escapeString(article.excerpt)}",\n`;
  ts += `${ii}category: "${article.category}" as const,\n`;
  ts += `${ii}author: {\n`;
  ts += `${ii}  name: "${escapeString(article.author?.name || 'Sophie Durand')}",\n`;
  ts += `${ii}  role: "${escapeString(article.author?.role || 'Experte Événementiel')}",\n`;
  ts += `${ii}  avatar: "${escapeString(article.author?.avatar || 'SD')}",\n`;
  ts += `${ii}},\n`;
  ts += `${ii}publishedAt: "${article.publishedAt}",\n`;
  ts += `${ii}readingTime: ${article.readingTime || 10},\n`;
  ts += `${ii}image: "${article.image}",\n`;
  ts += `${ii}imageAlt: "${escapeString(article.imageAlt)}",\n`;
  ts += `${ii}keywords: [${article.keywords.map(k => `"${escapeString(k)}"`).join(', ')}],\n`;
  ts += `${ii}content: \`\n${escapeForTS(article.content)}\n${ii}\`,\n`;

  if (article.faq && article.faq.length > 0) {
    ts += `${ii}faq: [\n`;
    for (const faq of article.faq) {
      ts += `${ii}  { question: "${escapeString(faq.question)}", answer: "${escapeString(faq.answer)}" },\n`;
    }
    ts += `${ii}],\n`;
  }

  ts += `${i}},\n`;
  return ts;
}

function publishArticle(article, opts = {}) {
  ensureCamilleFile();
  const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');

  const required = ['slug', 'title', 'excerpt', 'category', 'publishedAt',
    'image', 'imageAlt', 'keywords', 'content'];
  for (const f of required) {
    if (!(f in article)) throw new Error(`Missing required field: ${f}`);
  }
  // Doublon exact de slug — vérifié sur les 4 fichiers de données (pas
  // seulement blog-posts-camille.ts) : deux BlogPost avec le même slug dans
  // des fichiers différents rendraient le routing non-déterministe.
  const existing = getExistingArticles();
  if (existing.some(a => a.slug === article.slug)) {
    throw new Error(`Article with slug "${article.slug}" already exists`);
  }

  // GATE ANTI-CANNIBALISATION — défense en profondeur : ce check couvre TOUS
  // les chemins de publication (pipeline auto + publication manuelle).
  // Bypass conscient uniquement : --force (réécritures validées humainement —
  // les réécritures ne passent pas par ce script d'insertion, elles se valident
  // via `node anti-cannibalisation.js --file … --exclude-slug <slug>`).
  if (!opts.force) {
    const gate = checkArticle(article, existing);
    if (!gate.ok) {
      throw new Error(`Publication bloquée par le gate anti-cannibalisation :\n${formatReport(article.slug, gate)}\n(--force pour bypasser en connaissance de cause)`);
    }
  }

  if (!article.id) {
    article.id = getNextId();
  }

  const marker = 'export const camilleArticles: BlogPost[] = [';
  const idx = content.indexOf(marker);
  if (idx < 0) throw new Error('Could not find camilleArticles array marker');

  const insertAt = idx + marker.length;
  const newContent = content.slice(0, insertAt) + '\n' + formatArticleTS(article) + content.slice(insertAt);
  fs.writeFileSync(ARTICLES_PATH, newContent, 'utf-8');

  return { slug: article.slug, id: article.id, inserted: true };
}

async function main() {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf('--file');

  let input;
  if (fileIdx >= 0) {
    input = fs.readFileSync(args[fileIdx + 1], 'utf-8');
  } else {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    input = Buffer.concat(chunks).toString();
  }

  try {
    const article = JSON.parse(input);
    delete article.imagePrompt;
    const result = publishArticle(article, { force: args.includes('--force') });
    console.log(JSON.stringify(result));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
