/**
 * Intention de recherche d'un sujet — lot 4 du plan du 06/10/2026
 * (_claude_docs/2026-10-06_audit-acquisition/plan-intention-commerciale.md).
 *
 * Mesuré : 39 % des clics du site viennent d'un article d'animation (murder
 * party) qui n'amène presque pas de demandes, alors que les recherches qui ont
 * RÉELLEMENT donné des demandes en pub (audits Google Ads des 14, 19 et 23/04)
 * sont « séminaire + lieu géographique ». Camille ne crée donc plus de sujet
 * d'animation, et un sujet de lieu n'est retenu que si Google le traite comme
 * une recherche de lieu (top 10 fait de catalogues de lieux).
 *
 * Trois sources, aucune intuition :
 *   1. INTENTIONS_CONVERTIES : mots-clés de la pub avec leurs demandes ;
 *   2. classerSerp : composition réelle du top 10 Google (Bright Data) ;
 *   3. la Search Console, déjà fournie au modèle dans le socle du prompt.
 */

/** Mots-clés exacts de la campagne Ads (mars-avril 2026) et demandes obtenues. */
const INTENTIONS_CONVERTIES = [
  { requete: 'domaine séminaire île de france', demandes: 5 },
  { requete: 'séminaire proche paris', demandes: 4 },
  { requete: 'séminaire chantilly', demandes: 3 },
  { requete: 'séminaire 78', demandes: 1 },
  { requete: 'lieu séminaire chantilly', demandes: 1 },
  { requete: 'château séminaire île de france', demandes: 1 },
];
/** Mêmes audits : dépenses sans aucune demande. */
const INTENTIONS_SANS_DEMANDE = ['séminaire au vert', 'lieu atypique séminaire', 'séminaire résidentiel région parisienne'];

/**
 * Catalogues de lieux relevés dans le top 10 Google des requêtes cibles le
 * 06/10/2026 (séminaire yvelines, lieu séminaire île de france, séminaire
 * château île de france, séminaire chantilly, séminaire oise).
 */
const CATALOGUES = [
  'funbooker.com', 'kactus.com', 'aleou.fr', 'chateauform.com', 'homanie.com',
  'alfredmeeting.com', '1001salles.com', 'seminairesdecaractere.fr', 'spotlag.com',
  'atypiic.com', 'keysvenue.com', '1lieu1salle.com', 'evenementielpourtous.com',
];
const SEUIL_CATALOGUES = 3;

// Tirets et apostrophes deviennent des espaces : « Île-de-France » doit
// reconnaître « ile de france », « d'étude » → « d etude ».
const sansAccents = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-'’]/g, ' ');

// Activités NOMMÉES seulement : « atelier » ou « enquête » seuls désignent
// aussi des formats de travail (« atelier d'intelligence collective »,
// « enquête de satisfaction ») — revue du 06/10.
const RE_ANIMATION = /\b(murder party|escape game|cluedo|enquete policiere|atelier (cuisine|culinaire|patisserie|oenologie|cocktails?|mixologie|poterie|arts? creatifs?|peinture|chocolat)|cours de cuisine|oenologie|degustation|mixologie|rallye|chasse au tresor|olympiades|quiz|casino|soiree gatsby|spectacle|magicien|feux d artifice|pyrotechni\w*|karting|paintball|laser game|accrobranche|kayak|canoe|yoga|sophrologie|jeux? de (piste|role|societe|cohesion|plateau)|jeux d equipe|serious game)\b/;
const RE_SEMINAIRE = /\b(seminaires?|journee d etude|codir|comite de direction|team ?building|incentive|convention)\b/;
// Recherche de LIEU : une zone, un type de lieu explicite ou un critère de
// capacité. « château » seul n'en fait pas partie : il est dans presque tous
// les titres du blog, y compris d'organisation (« assurance annulation
// séminaire en château ») — revue du 06/10.
const RE_LIEU = /\b(lieux?|salles? de (seminaire|reunion)|domaines?|location|privatis\w*|proche (de )?paris|ile de france|idf|yvelines|oise|chantilly|essonne|val d oise|seine et marne|hauts de seine|val de marne|chevreuse|fontainebleau|rambouillet|versailles|7[578]|9[1-5]|60|\d{2,3} (personnes|pers|participants)|hebergement)\b/;

/**
 * Intention d'un sujet : 'animation', 'lieu', 'organisation' ou 'autre'.
 * Une activité nommée fait du sujet une animation, même avec « séminaire » ou
 * « château » dans le titre : « murder party au château » reste une recherche
 * d'animation.
 */
function classerIntention(texte) {
  const t = sansAccents(texte);
  if (RE_ANIMATION.test(t)) return 'animation';
  if (RE_SEMINAIRE.test(t)) return RE_LIEU.test(t) ? 'lieu' : 'organisation';
  return RE_LIEU.test(t) ? 'lieu' : 'autre';
}

/** Domaine nu d'une URL (sans www). */
function domaine(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

/**
 * Composition du top 10 : 'lieu' quand au moins 3 résultats sont des
 * catalogues de lieux — Google y attend une liste de lieux ; sinon 'information'.
 */
function classerSerp(urls) {
  const top = urls.slice(0, 10).map(domaine);
  const catalogues = top.filter((d) => CATALOGUES.some((c) => d === c || d.endsWith(`.${c}`))).length;
  return { type: catalogues >= SEUIL_CATALOGUES ? 'lieu' : 'information', catalogues };
}

/** Top 10 Google France via Bright Data (même appel que Marcus, scripts/agent-seo/collecte.mjs). */
async function topGoogle(requete, cle, fetchImpl = fetch) {
  const r = await fetchImpl('https://api.brightdata.com/request', {
    method: 'POST',
    headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ zone: 'serp_api', url: `https://www.google.com/search?q=${encodeURIComponent(requete)}&gl=fr&hl=fr&brd_json=1`, format: 'raw' }),
    signal: AbortSignal.timeout(90_000),
  });
  const json = await r.json();
  return (json.organic || []).map((o) => o.link).filter(Boolean);
}

/**
 * Motif de rejet d'un sujet de CRÉATION, ou null.
 *   - un sujet d'animation est refusé ;
 *   - un sujet de lieu est vérifié sur le vrai top 10 Google : refusé si
 *     Google n'y montre pas de catalogues de lieux. Sans clé Bright Data ou si
 *     la sonde échoue, ce second contrôle est sauté et journalisé.
 */
async function motifIntention(article, { cle = process.env.BRIGHTDATA_API_KEY, fetchImpl, log = () => {} } = {}) {
  // Titre + mot-clé principal : un mot-clé secondaire ne décide pas du sujet.
  const texte = `${article.title || ''} ${(article.keywords || [])[0] || ''}`;
  const intention = classerIntention(texte);
  if (intention === 'animation') {
    return `Sujet d'animation (« ${article.title} ») : ces recherches amènent des clics mais pas de demandes (plan du 06/10). Choisis un sujet d'organisation de séminaire ou de lieu.`;
  }
  if (intention !== 'lieu') return null;
  const requete = (article.keywords || [])[0] || article.title;
  if (!cle) { log(`Intention : pas de clé Bright Data, contrôle du top 10 sauté pour « ${requete} »`); return null; }
  try {
    const urls = await topGoogle(requete, cle, fetchImpl);
    if (!urls.length) { log(`Intention : top 10 vide pour « ${requete} », contrôle sauté`); return null; }
    const serp = classerSerp(urls);
    log(`Intention : « ${requete} » → ${serp.type} (${serp.catalogues} catalogues dans le top 10)`);
    return serp.type === 'lieu' ? null
      : `Le top 10 Google de « ${requete} » ne contient que ${serp.catalogues} catalogue(s) de lieux : Google n'y attend pas une liste de lieux. Choisis une recherche où il en attend une, ou un sujet d'organisation.`;
  } catch (err) {
    log(`Intention : sonde Google en échec (${String(err.message).split('\n')[0]}), contrôle sauté`);
    return null;
  }
}

/**
 * Résumé des requêtes Search Console par intention (relevé hebdomadaire de
 * Marcus, lot 0 du plan) : clics, impressions et position moyenne pondérée.
 * C'est l'indicateur du plan — les clics « lieu » et « organisation » doivent
 * monter, pas seulement le total.
 */
function resumerParIntention(rows) {
  const res = {};
  for (const r of rows || []) {
    const q = String(r.keys?.[0] ?? '');
    const intention = /select ?ch[aâ]teaux?|selectchateaux/i.test(q) ? 'marque' : classerIntention(q);
    const a = res[intention] || (res[intention] = { clics: 0, imp: 0, pos: 0 });
    a.clics += r.clicks || 0;
    a.imp += r.impressions || 0;
    a.pos += (r.position || 0) * (r.impressions || 0);
  }
  for (const a of Object.values(res)) a.pos = a.imp ? +(a.pos / a.imp).toFixed(1) : null;
  return res;
}

/** Bloc de consignes ajouté au prompt de création. */
function blocIntentionsPrompt() {
  return `INTENTIONS QUI ONT DONNÉ DES DEMANDES (pub Google, mars-avril 2026) :
${INTENTIONS_CONVERTIES.map((i) => `- « ${i.requete} » : ${i.demandes} demande(s)`).join('\n')}
Sans aucune demande : ${INTENTIONS_SANS_DEMANDE.map((r) => `« ${r} »`).join(', ')}.
Règle : un nouveau sujet vise une recherche de LIEU (zone, capacité, hébergement, proximité de Paris) ou d'ORGANISATION d'un séminaire (budget, programme, check-list). Plus aucun sujet d'animation (murder party, escape game, atelier, jeux…). Les chiffres de lieux viennent de notre catalogue, jamais de mémoire.`;
}

module.exports = {
  INTENTIONS_CONVERTIES, INTENTIONS_SANS_DEMANDE, CATALOGUES,
  classerIntention, classerSerp, topGoogle, motifIntention, blocIntentionsPrompt, resumerParIntention,
};
