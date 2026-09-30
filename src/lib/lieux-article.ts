/**
 * Choix des fiches lieu affichées sous un article de blog.
 *
 * Plan conversion, phase 4 (30/09/2026). Mesuré ce jour sur le build : les 279
 * articles portent tous 2 liens commerciaux ou plus (zones, team building,
 * châteaux), mais AUCUN ne pointe vers l'une des 68 fiches /lieux — les pages
 * qui montrent un lieu réel, ses salles, ses chambres, ses photos.
 *
 * Règles, dans l'ordre :
 *   1. le département vient du cluster de l'article (article de zone), sinon
 *      du texte, s'il y est cité au moins deux fois et plus que tout autre ;
 *   2. les lieux dont la ville est citée dans l'article passent devant ;
 *   3. le reste tourne selon le slug : un même article montre toujours les
 *      mêmes lieux, deux articles différents rarement — le maillage se répartit
 *      sur tout le catalogue au lieu de pointer 279 fois vers les trois mêmes ;
 *   4. sans département, ou si le sien est trop peu fourni, on complète avec
 *      des lieux d'au moins 30 personnes (un groupe d'entreprise) ;
 *   5. à chaque étape, les lieux de caractère passent devant les hôtels de
 *      chaîne, et une marque concurrente n'est jamais proposée.
 *
 * Module pur, sans import : testé par `node --test`.
 */

export interface LieuChoisissable {
  slug: string;
  nom: string;
  ville: string | null;
  departementCode: string;
  capacite: number;
  chambres: number | null;
}

export interface ArticlePourLieux {
  slug: string;
  /** `SeoCluster.id` de l'article (data/seo-clusters), ou null. */
  clusterId: string | null;
  /** Texte de l'article (HTML accepté : seules les lettres comptent). */
  texte: string;
}

const CAPACITE_MIN_GENERALE = 30;

/** Département de chaque cluster de zone (scripts/agent-cm/seo-clusters.json). */
const DEPT_PAR_CLUSTER: Record<string, string> = {
  chantilly: '60',
  oise: '60',
  'team-building-chantilly': '60',
  yvelines: '78',
  chevreuse: '78',
  'hauts-de-seine': '92',
  'team-building-92': '92',
  'val-d-oise': '95',
  'team-building-95': '95',
  essonne: '91',
  'seine-et-marne': '77',
};

/**
 * Mots qui désignent un département dans le texte. « val d oise » et « sur oise »
 * (Asnières-sur-Oise, Auvers-sur-Oise : Val-d'Oise) sont comptés et retirés
 * AVANT « oise » : sans cela chacune de ces mentions compterait pour l'Oise.
 */
const MOTS_PAR_DEPT: [string, string[]][] = [
  ['95', ['val d oise', 'sur oise', 'cergy', 'pontoise', 'enghien', 'auvers', 'vexin', 'royaumont']],
  ['60', ['oise', 'chantilly', 'senlis', 'compiegne', 'pierrefonds', 'gouvieux']],
  ['78', ['yvelines', 'rambouillet', 'versailles', 'chevreuse', 'dampierre', 'breteuil']],
  ['77', ['seine et marne', 'fontainebleau', 'meaux', 'provins', 'melun']],
  ['91', ['essonne', 'dourdan', 'milly la foret', 'evry']],
  ['92', ['hauts de seine', 'boulogne', 'neuilly', 'rueil', 'malmaison', 'sceaux', 'issy']],
];

function normaliser(texte: string): string {
  return ` ${texte
    .replace(/<[^>]+>/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()} `;
}

/**
 * Nombre d'occurrences du mot entier, et le texte débarrassé de celles-ci.
 * Les espaces autour du mot ne sont pas consommés : « yvelines yvelines »
 * compte bien deux.
 */
function compter(texte: string, mot: string): { n: number; reste: string } {
  const motif = new RegExp(`(?<= )${mot}(?= )`, 'g');
  const n = texte.match(motif)?.length ?? 0;
  return { n, reste: n ? texte.replace(motif, ' ') : texte };
}

/** Département nettement dominant dans le texte, ou null. */
function departementDuTexte(texteNorm: string): string | null {
  let reste = texteNorm;
  const scores = new Map<string, number>();
  for (const [dept, mots] of MOTS_PAR_DEPT) {
    for (const mot of mots) {
      const r = compter(reste, mot);
      reste = r.reste;
      if (r.n) scores.set(dept, (scores.get(dept) ?? 0) + r.n);
    }
  }
  const tries = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  if (!tries.length || tries[0][1] < 2) return null;
  if (tries[1] && tries[1][1] === tries[0][1]) return null;
  return tries[0][0];
}

/** Empreinte stable d'un texte (FNV-1a 32 bits). */
function empreinte(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** Ordre tournant propre à l'article : trié par slug, puis décalé selon l'empreinte. */
function tourner<T extends LieuChoisissable>(lieux: T[], graine: string): T[] {
  const tries = [...lieux].sort((a, b) => a.slug.localeCompare(b.slug));
  if (!tries.length) return tries;
  const d = empreinte(graine) % tries.length;
  return [...tries.slice(d), ...tries.slice(0, d)];
}

/**
 * Lieu « de caractère » d'après son NOM. La catégorie du CRM n'est pas fiable
 * pour ça (30/09/2026 : un Best Western y est « Château & domaine », un château
 * y est « Hôtel »). Sur un site de châteaux, ce sont eux qu'on montre d'abord.
 */
const CARACTERE = / (chateau|domaine|manoir|abbaye|prieure|clos) /;
const CHAINE = /best western|novotel|mercure|ibis|hilton|marriott|wyndham|renaissance|\binn\b/i;
/** Marque concurrente : la recommander irait contre la page /alternative-chateauform. */
const CONCURRENT = /ch[aâ]teauform/i;

// Testé sur le nom normalisé (sans accents) : `\b` ne connaît que l'ASCII et
// ratait « Prieuré ».
const estDeCaractere = (l: LieuChoisissable) => CARACTERE.test(normaliser(l.nom)) && !CHAINE.test(l.nom);

/**
 * Lieux de caractère d'abord, chaque groupe tournant pour son propre compte :
 * tourner la liste entière PUIS filtrer ramenait les articles voisins sur le
 * même trio (mesuré le 30/09 : 8 articles Yvelines sur 12 montraient les mêmes).
 */
function caractereDabord<T extends LieuChoisissable>(lieux: T[], graine: string): T[] {
  return [
    ...tourner(lieux.filter(estDeCaractere), graine),
    ...tourner(lieux.filter((l) => !estDeCaractere(l)), graine),
  ];
}

export function lieuxPourArticle<T extends LieuChoisissable>(
  article: ArticlePourLieux,
  lieux: T[],
  n = 3,
): T[] {
  lieux = lieux.filter((l) => !CONCURRENT.test(l.nom) && !CONCURRENT.test(l.slug));
  const texteNorm = normaliser(article.texte);
  const dept = (article.clusterId && DEPT_PAR_CLUSTER[article.clusterId]) || departementDuTexte(texteNorm);

  const choisis: T[] = [];
  const ajouter = (l: T) => {
    if (choisis.length < n && !choisis.some((c) => c.slug === l.slug)) choisis.push(l);
  };

  if (dept) {
    const duDept = caractereDabord(lieux.filter((l) => l.departementCode === dept), article.slug);
    const cite = (l: T) => !!l.ville && texteNorm.includes(normaliser(l.ville));
    // Ville citée d'abord, mais un hôtel de chaîne cité ne passe pas devant un château.
    duDept.filter((l) => cite(l) && estDeCaractere(l)).forEach(ajouter);
    duDept.filter(estDeCaractere).forEach(ajouter);
    duDept.filter(cite).forEach(ajouter);
    duDept.forEach(ajouter);
  }

  caractereDabord(lieux.filter((l) => l.capacite >= CAPACITE_MIN_GENERALE), article.slug).forEach(ajouter);
  return choisis;
}
