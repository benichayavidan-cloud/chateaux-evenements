#!/usr/bin/env node
/**
 * RAPPORT (non bloquant) — remplissage des rubriques des domaines.
 *
 * Affiche, pour chaque château et chaque rubrique (salles, chambres…), ce qui
 * manque par rapport à la cible : photos, chiffres clés, tableau des salles,
 * chiffres sans source notée, paragraphes identiques entre deux domaines,
 * sections de fiche hors sujet (spa dans l'hébergement…),
 * mots bannis (vocabulaire « bon marché » ou « particuliers », décision PO du 16/11/2026).
 *
 * Décision PO du 16/11/2026 : on ne bloque JAMAIS une mise en ligne pour du
 * contenu. Ce script sort toujours avec le code 0, même s'il échoue lui-même.
 *
 *   node scripts/rapport-rubriques.mjs
 */
try {
  const { rapportRemplissage, paragraphesEnDouble, motsBannis } = await import('../src/lib/rubriques.ts');
  const lignes = rapportRemplissage();
  const aCompleter = lignes.filter((l) => l.manques.length > 0);

  console.log(`\n[rubriques] ${lignes.length} page(s) de rubrique, ${aCompleter.length} à enrichir`);
  for (const l of aCompleter) console.log(`  · ${l.slug}/${l.rubrique} : ${l.manques.join(' ; ')}`);
  for (const d of paragraphesEnDouble()) console.log(`  · paragraphe identique — ${d}`);
  for (const m of motsBannis()) console.log(`  · mot banni — ${m}`);

  // Fiches château : une section = un sujet (décision PO du 17/11/2026).
  const { rapportHorsSujet, rapportAngleSeminaire } = await import('../src/lib/fiche-sections.ts');
  const { chateaux } = await import('../src/data/chateaux.ts');
  const parSlug = Object.fromEntries(chateaux.map((c) => [c.slug, c]));
  const horsSujet = rapportHorsSujet(parSlug);
  console.log(`[fiches] ${horsSujet.length} section(s) hors sujet`);
  for (const h of horsSujet) console.log(`  · hors sujet — ${h}`);
  for (const a of rapportAngleSeminaire(parSlug)) console.log(`  · trop descriptif — ${a}`);
} catch (e) {
  console.log(`[rubriques] rapport non produit (${e instanceof Error ? e.message : e}) — sans effet sur le build`);
}
process.exit(0);
