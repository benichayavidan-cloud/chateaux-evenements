#!/usr/bin/env node
/**
 * Vérification des fichiers de données AVANT le commit de Camille.
 *
 * Compare chaque fichier blog-posts*.ts à sa version du dernier commit :
 *   - il doit rester du TypeScript syntaxiquement valide ;
 *   - il ne doit perdre AUCUN article (une création en ajoute un, une
 *     réécriture n'en change pas le nombre).
 *
 * Deuxième ligne de défense, indépendante du code qui écrit : le 18/09/2026
 * un commit de Camille a laissé blog-posts-camille.ts sans sa fermeture `];`
 * et `main` n'a plus compilé pendant deux jours, sans alerte. Le workflow
 * lance ensuite `tsc --noEmit` sur tout le site ; si l'une ou l'autre étape
 * échoue, le commit n'a pas lieu.
 *
 * Usage : node verif-donnees.js   (code de sortie 1 au moindre problème)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { SITE_DIR, DATA_DIR, FICHIERS_DONNEES } = require('./config');
const { analyser, erreursSyntaxe } = require('./donnees-blog');

/** Problèmes de `apres` par rapport à `avant` (liste vide = sain). */
function comparerVersions(avant, apres, nom) {
  const problemes = [];
  const syntaxe = erreursSyntaxe(apres, nom);
  if (syntaxe.length) problemes.push(`${nom} : syntaxe invalide — ${syntaxe.slice(0, 3).join(' | ')}`);
  const slugsAvant = analyser(avant, nom).map((a) => a.slug);
  const slugsApres = new Set(analyser(apres, nom).map((a) => a.slug));
  if (slugsApres.size < slugsAvant.length) {
    problemes.push(`${nom} : ${slugsApres.size} article(s) au lieu d'au moins ${slugsAvant.length}`);
  }
  const perdus = slugsAvant.filter((s) => !slugsApres.has(s));
  if (perdus.length) problemes.push(`${nom} : article(s) disparu(s) — ${perdus.slice(0, 5).join(', ')}`);
  return problemes;
}

function versionCommitee(fichier) {
  try {
    return execFileSync('git', ['show', `HEAD:src/data/${fichier}`], {
      cwd: SITE_DIR, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null; // fichier nouveau : rien à comparer
  }
}

if (require.main === module) {
  const problemes = [];
  for (const fichier of FICHIERS_DONNEES) {
    const chemin = path.join(DATA_DIR, fichier);
    if (!fs.existsSync(chemin)) { problemes.push(`${fichier} : fichier absent`); continue; }
    const apres = fs.readFileSync(chemin, 'utf-8');
    const avant = versionCommitee(fichier);
    if (avant === apres) continue;
    problemes.push(...comparerVersions(avant ?? '', apres, fichier));
  }
  if (problemes.length) {
    console.error(`Fichiers de données ABÎMÉS — commit annulé :\n- ${problemes.join('\n- ')}`);
    process.exit(1);
  }
  console.log('Fichiers de données sains (syntaxe valide, aucun article perdu)');
}

module.exports = { comparerVersions };
