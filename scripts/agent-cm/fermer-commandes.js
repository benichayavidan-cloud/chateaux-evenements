#!/usr/bin/env node
/**
 * Ferme les demandes de réécriture de Marcus que le run vient de traiter.
 *
 * Lancé par le workflow APRÈS le push, jamais avant : si la vérification des
 * fichiers de données ou le push échoue, la réécriture n'est pas publiée et la
 * demande doit rester ouverte pour être reprise au passage suivant.
 *
 * Avant le 24/09/2026 rien ne fermait ces demandes : une seule demande ouverte
 * aurait fait réécrire le même article à chaque passage.
 *
 * Usage : node fermer-commandes.js /tmp/pipeline-result.json
 */
const fs = require('fs');
const { execFileSync } = require('child_process');

/** Dernière ligne JSON de la sortie du pipeline (les logs la précèdent). */
function lireResultat(texte) {
  const ligne = String(texte || '').split('\n').filter((l) => l.startsWith('{')).pop();
  if (!ligne) return null;
  try { return JSON.parse(ligne); } catch { return null; }
}

/**
 * `exec` reçoit la commande et ses arguments SÉPARÉS : aucun shell, donc un
 * commentaire contenant `$(…)` ou des backticks reste du texte.
 * Un échec sur une demande n'empêche pas de fermer les suivantes.
 */
function fermerCommandes(resultat, exec = execFileSync) {
  let fermees = 0;
  for (const { numero, commentaire } of resultat?.issuesAFermer || []) {
    try {
      exec('gh', ['issue', 'close', String(numero), '--comment', String(commentaire || 'Close par Camille.')], { stdio: 'inherit' });
      fermees++;
    } catch (err) {
      console.error(`Demande #${numero} non fermée : ${String(err.message).split('\n')[0]}`);
    }
  }
  return fermees;
}

if (require.main === module) {
  const fichier = process.argv[2] || '/tmp/pipeline-result.json';
  let texte = '';
  try { texte = fs.readFileSync(fichier, 'utf-8'); } catch { /* pas de run */ }
  const resultat = lireResultat(texte);
  const total = (resultat?.issuesAFermer || []).length;
  const n = fermerCommandes(resultat);
  console.log(`${n}/${total} demande(s) de réécriture fermée(s)`);
}

module.exports = { lireResultat, fermerCommandes };
