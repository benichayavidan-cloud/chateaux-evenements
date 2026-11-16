#!/usr/bin/env node
/**
 * RAPPORT (non bloquant) — remplissage des rubriques des domaines.
 *
 * Affiche, pour chaque château et chaque rubrique (salles, chambres…), ce qui
 * manque par rapport à la cible : photos, chiffres clés, tableau des salles,
 * chiffres sans source notée, paragraphes identiques entre deux domaines.
 *
 * Décision PO du 16/11/2026 : on ne bloque JAMAIS une mise en ligne pour du
 * contenu. Ce script sort toujours avec le code 0, même s'il échoue lui-même.
 *
 *   node scripts/rapport-rubriques.mjs
 */
try {
  const { rapportRemplissage, paragraphesEnDouble } = await import('../src/lib/rubriques.ts');
  const lignes = rapportRemplissage();
  const aCompleter = lignes.filter((l) => l.manques.length > 0);

  console.log(`\n[rubriques] ${lignes.length} page(s) de rubrique, ${aCompleter.length} à enrichir`);
  for (const l of aCompleter) console.log(`  · ${l.slug}/${l.rubrique} : ${l.manques.join(' ; ')}`);
  for (const d of paragraphesEnDouble()) console.log(`  · paragraphe identique — ${d}`);
} catch (e) {
  console.log(`[rubriques] rapport non produit (${e instanceof Error ? e.message : e}) — sans effet sur le build`);
}
process.exit(0);
