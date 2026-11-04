/**
 * Bloc « Source de la demande » de l'email d'admin.
 *
 * Toute valeur vient du navigateur (le mot-clé est lu dans l'adresse de la page,
 * n'importe qui peut y écrire du code) : le HTML sort uniquement par `blocSourceHtml`,
 * qui échappe chaque libellé et chaque valeur.
 */

import { canalOrigine, LIBELLE_CANAL } from './origine.ts';
import type { CanalOrigine, ClicAds, ConsentementPub, PremierContact } from './origine.ts';

export type LigneSource = [libelle: string, valeur: string];

interface SourceDemande {
  canal: CanalOrigine;
  premierContact: PremierContact | null;
  /** Clic en cours de validité, null hors Ads. */
  clic: ClicAds | null;
  consentement: ConsentementPub;
}

const NON_RENSEIGNE = 'Non renseigné';

// Clés d'objet choisies par le navigateur : Object.hasOwn écarte `constructor` & co.
const lire = (table: Record<string, string>, cle: string | null): string | null =>
  cle && Object.hasOwn(table, cle) ? table[cle] : null;

const CAMPAGNES: Record<string, string> = {
  'oise-chantilly': 'Oise - Chantilly',
  'yvelines-chevreuse': 'Yvelines - Chevreuse',
};
const ANNONCES: Record<string, string> = {
  'palais-royal-foret-chantilly': 'Palais Royal',
  'manoir-anglo-normand-chantilly': 'Manoir anglo-normand',
  'abbaye-millenaire-vallee-chevreuse': 'Abbaye (organisation)',
  'seminaire-vallee-de-chevreuse': 'Abbaye (déconnexion)',
};
const CORRESPONDANCES: Record<string, string> = { e: 'exact', p: 'expression', b: 'large' };
const APPAREILS: Record<string, string> = { m: 'Mobile', t: 'Tablette', c: 'Ordinateur' };
const CONSENTEMENTS: Record<ConsentementPub, string> = { oui: 'Oui', non: 'Non', inconnu: 'Inconnu' };

export const echapperHtml = (v: string): string =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function partiesParis(iso: string): Record<string, string> {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(iso));
  return Object.fromEntries(parts.map((p) => [p.type, p.value]));
}

const jourParis = (iso: string): string => {
  const p = partiesParis(iso);
  return `${p.day}/${p.month}/${p.year}`;
};

const jourHeureParis = (iso: string): string => {
  const p = partiesParis(iso);
  return `${jourParis(iso)} à ${p.hour}:${p.minute}`;
};

function libelleAnnonce(clic: ClicAds): string {
  const segment = clic.page.split('/').filter(Boolean).pop() ?? null;
  const nom = lire(ANNONCES, segment);
  const numero = clic.annonceId ? `n° ${clic.annonceId}` : null;
  if (nom) return numero ? `${nom} (${numero})` : nom;
  return numero ?? NON_RENSEIGNE;
}

function libelleMotCle(clic: ClicAds): string {
  if (clic.correspondance === 'a') return 'sans mot-clé (AI Max)';
  if (!clic.motCle) return NON_RENSEIGNE;
  const type = lire(CORRESPONDANCES, clic.correspondance) ?? clic.correspondance;
  return type ? `${clic.motCle} (${type})` : clic.motCle;
}

export function lignesSourceDemande({ canal, premierContact, clic, consentement }: SourceDemande): LigneSource[] {
  if (!clic) {
    return [
      ['Canal', LIBELLE_CANAL[canal]],
      ["Page d'arrivée", premierContact?.page ?? 'Inconnue'],
      ['Première visite', premierContact ? jourParis(premierContact.date) : 'Inconnue'],
    ];
  }
  const lignes: LigneSource[] = [
    ['Canal', LIBELLE_CANAL[canal]],
    ['Campagne', lire(CAMPAGNES, clic.campagne) ?? clic.campagne ?? NON_RENSEIGNE],
    ['Annonce', libelleAnnonce(clic)],
    ['Mot-clé', libelleMotCle(clic)],
    ['Appareil', lire(APPAREILS, clic.appareil) ?? NON_RENSEIGNE],
    ["Page d'arrivée", clic.page],
    ['Clic du', jourHeureParis(clic.clicLe)],
    ['Première visite', premierContact
      ? `${jourParis(premierContact.date)}, ${LIBELLE_CANAL[canalOrigine(premierContact)]}`
      : 'Inconnue'],
  ];
  if (clic.gclid) lignes.push(['GCLID', clic.gclid]);
  if (clic.gbraid) lignes.push(['GBRAID', clic.gbraid]);
  if (clic.wbraid) lignes.push(['WBRAID', clic.wbraid]);
  lignes.push(['Consentement', CONSENTEMENTS[consentement]]);
  return lignes;
}

export function blocSourceHtml(lignes: LigneSource[]): string {
  const rangs = lignes
    .map(([libelle, valeur]) => `<p style="margin: 8px 0; color: #334155; font-size: 15px; word-break: break-word;">
                      <strong style="color: #1e3a8a;">${echapperHtml(libelle)} :</strong> ${echapperHtml(valeur)}
                    </p>`)
    .join('\n                    ');
  return `<!-- Source de la demande -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #1e3a8a; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">
                      🎯 Source de la demande
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                    ${rangs}
                  </td>
                </tr>
              </table>`;
}

export function blocSourceTexte(lignes: LigneSource[]): string {
  return ['SOURCE DE LA DEMANDE', ...lignes.map(([libelle, valeur]) => `${libelle} : ${valeur}`)].join('\n');
}
