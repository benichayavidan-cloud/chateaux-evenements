#!/usr/bin/env node
/**
 * IndexNow — notification instantanée Bing/Yandex/Seznam/Naver (et donc ChatGPT Search via l'index Bing).
 *
 * Usage :
 *   node scripts/indexnow-ping.js <url1> <url2> ...     # URLs complètes ou chemins relatifs (/blog/mon-article)
 *
 * Appelé aussi par le pipeline agent-cm après publication d'un article.
 * La clé est prouvée par le fichier public/<KEY>.txt servi à la racine du site.
 */

const HOST = 'www.selectchateaux.com';
const KEY = '0d627a0ffd06b2f2cea480c96cd6d3f3';

async function pingIndexNow(urls) {
  const urlList = urls.map((u) =>
    u.startsWith('http') ? u : `https://${HOST}${u.startsWith('/') ? u : `/${u}`}`
  );

  const invalid = urlList.filter((u) => !u.startsWith(`https://${HOST}/`) && u !== `https://${HOST}`);
  if (invalid.length > 0) {
    throw new Error(`URLs hors domaine ${HOST} : ${invalid.join(', ')}`);
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });

  // 200 = OK, 202 = accepté (clé en cours de validation) — les deux sont des succès
  if (res.status !== 200 && res.status !== 202) {
    const body = await res.text();
    throw new Error(`IndexNow a répondu ${res.status} : ${body}`);
  }

  return { status: res.status, count: urlList.length, urls: urlList };
}

module.exports = { pingIndexNow };

if (require.main === module) {
  const urls = process.argv.slice(2);
  if (urls.length === 0) {
    console.error('Usage : node scripts/indexnow-ping.js <url-ou-chemin> ...');
    process.exit(1);
  }
  pingIndexNow(urls)
    .then(({ status, count, urls }) => {
      console.log(`✅ IndexNow ${status} — ${count} URL(s) soumises :`);
      urls.forEach((u) => console.log(`   ${u}`));
    })
    .catch((err) => {
      console.error(`❌ ${err.message}`);
      process.exit(1);
    });
}
