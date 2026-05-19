#!/usr/bin/env node
const fs = require('fs');
const { ARTICLES_PATH } = require('./config');

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

function publishArticle(article) {
  ensureCamilleFile();
  const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');

  const required = ['slug', 'title', 'excerpt', 'category', 'publishedAt',
    'image', 'imageAlt', 'keywords', 'content'];
  for (const f of required) {
    if (!(f in article)) throw new Error(`Missing required field: ${f}`);
  }
  if (content.includes(`slug: "${article.slug}"`)) {
    throw new Error(`Article with slug "${article.slug}" already exists`);
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
    const result = publishArticle(article);
    console.log(JSON.stringify(result));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
