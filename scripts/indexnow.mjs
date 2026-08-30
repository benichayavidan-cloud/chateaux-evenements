#!/usr/bin/env node
/**
 * Soumission IndexNow — Bing, Yandex, Seznam (pas Google, qui n'y participe pas).
 *
 * Utile ici pour deux raisons : Bing indexe nettement plus vite que Google sur
 * des URLs neuves, et c'est lui qui alimente ChatGPT Search — donc c'est le
 * chemin le plus court vers la citation par un moteur de réponse.
 *
 * Google a supprimé son endpoint de ping sitemap en 2023 : il n'existe plus
 * d'équivalent côté Google, seule la Search Console permet de forcer un crawl.
 *
 *   node scripts/indexnow.mjs            -> soumet toutes les URLs du sitemap
 *   node scripts/indexnow.mjs u1 u2 ...  -> soumet les URLs données
 */
const KEY = 'aef2376bcc7b85f1a86f1e92e8fd3bbe';
const HOST = 'www.selectchateaux.com';

async function urlsFromSitemap() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

const urlList = process.argv.slice(2).length ? process.argv.slice(2) : await urlsFromSitemap();
console.log(`${urlList.length} URLs à soumettre`);

// IndexNow plafonne à 10 000 URLs par requête ; on reste large sous la limite.
for (let i = 0; i < urlList.length; i += 1000) {
  const lot = urlList.slice(i, i + 1000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: lot }),
  });
  // 200 = accepté, 202 = accepté mais clé pas encore vérifiée (elle le sera au crawl).
  console.log(`lot ${i / 1000 + 1} : ${lot.length} URLs -> HTTP ${res.status} ${res.status === 200 || res.status === 202 ? '✓' : await res.text()}`);
}
