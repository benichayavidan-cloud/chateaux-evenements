/**
 * Vraies demandes reçues dans le CRM et envoyées à nos 4 châteaux
 * (extraction en lecture seule du 19/11/2026, tables Event, QuoteRequest,
 * QuoteResponse). Elles remplacent les « études de cas » inventées du blog.
 *
 * Règles (décision du PO du 19/11/2026) :
 * - une demande se raconte comme une DEMANDE (« un groupe de 50 personnes
 *   nous a demandé… »), jamais comme un séminaire qui a eu lieu ;
 * - l'entreprise n'est jamais identifiable : secteur large, mois sans le jour ;
 * - aucun vrai nom de château (blind booking) : on renvoie à la fiche par son slug.
 *
 * `disponible` = réponse du château à la demande (QuoteResponse.isAvailable) ;
 * absent = pas de réponse enregistrée. Un passage d'article qui raconte un cas
 * porte `class="cas-demande cas-<id>"` (vérifié par personnages-blog.test.ts).
 */
export type SlugChateau =
  | 'manoir-anglo-normand-chantilly'
  | 'palais-royal-foret-chantilly'
  | 'abbaye-millenaire-vallee-chevreuse'
  | 'hotel-historique-seminaire-paris-92';

export interface CasDemande {
  id: string;
  type: 'seminaire-residentiel' | 'journee-etude' | 'soiree';
  secteur: string;
  mois: string;
  participants: number;
  nuits: number;
  chambres?: { single?: number; twin?: number };
  /** Ce que le groupe a demandé, résumé fidèle du déroulé saisi dans le CRM. */
  besoins: string[];
  budget?: string;
  /** Châteaux à qui la demande a été envoyée, avec leur réponse si elle existe. */
  chateaux: { slug: SlugChateau; disponible?: boolean }[];
}

export const CAS_DEMANDES: readonly CasDemande[] = [
  {
    id: 'D05', type: 'seminaire-residentiel', secteur: "un groupe d'ingénierie énergétique", mois: 'juin 2026',
    participants: 50, nuits: 1,
    besoins: ['plénière et une salle de sous-commission toute la journée', 'pauses matin et après-midi', 'déjeuner', 'dîner puis nuit sur place'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'palais-royal-foret-chantilly' }],
  },
  {
    id: 'D08', type: 'seminaire-residentiel', secteur: 'une PME de services', mois: 'juin 2026',
    participants: 30, nuits: 1, chambres: { single: 30 }, budget: '10 000 €',
    besoins: ['déjeuner à l’arrivée', 'team building animé par l’entreprise elle-même', 'dîner assis trois plats et soirée'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D10', type: 'seminaire-residentiel', secteur: 'une maison de luxe', mois: 'juillet 2026',
    participants: 50, nuits: 1, chambres: { single: 50 }, budget: '30 000 € HT',
    besoins: ['plénière l’après-midi', 'dîner assis trois plats', 'soirée privatisée avec DJ jusqu’à 1 h'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D14', type: 'seminaire-residentiel', secteur: 'une start-up technologique', mois: 'septembre 2026',
    participants: 150, nuits: 1, chambres: { single: 16, twin: 67 }, budget: '470 € par personne',
    besoins: ['plénière le matin', 'team building l’après-midi', 'deux salles'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: false }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'palais-royal-foret-chantilly' }],
  },
  {
    id: 'D15', type: 'journee-etude', secteur: 'une entreprise de robotique', mois: 'septembre 2026',
    participants: 45, nuits: 0, budget: '7 000 € HT au maximum',
    besoins: ['plénière le matin', 'déjeuner', 'team building l’après-midi, animé par l’entreprise', 'pause et fin vers 17 h 30'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }],
  },
  {
    id: 'D16', type: 'seminaire-residentiel', secteur: 'une agence de communication', mois: 'septembre 2026',
    participants: 30, nuits: 1, chambres: { single: 6, twin: 12 }, budget: 'environ 10 000 €',
    besoins: ['team building le matin et l’après-midi', 'déjeuner', 'cocktail dînatoire le soir'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D17', type: 'journee-etude', secteur: 'un réseau de crèches', mois: 'septembre 2026',
    participants: 200, nuits: 0, budget: 'environ 200 € par personne',
    besoins: ['accueil et petit-déjeuner en musique', 'présentation des résultats par le comité de direction, avec régisseur, micro et écran', 'déjeuner debout ou à table'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D19', type: 'seminaire-residentiel', secteur: 'une banque', mois: 'octobre 2026',
    participants: 80, nuits: 1, chambres: { single: 80 }, budget: '40 000 € TTC',
    besoins: ['plénière ou ateliers de travail', 'dîner', 'activité de cohésion ou de détente le soir'],
    chateaux: [{ slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D25', type: 'seminaire-residentiel', secteur: 'une medtech', mois: 'octobre 2026',
    participants: 11, nuits: 1, chambres: { single: 1, twin: 5 },
    besoins: ['demande urgente', 'réunion en U ou en classe', 'déjeuner et dîner avec vin'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }],
  },
  {
    id: 'D26', type: 'seminaire-residentiel', secteur: 'un groupe de dispositifs médicaux', mois: 'novembre 2026',
    participants: 17, nuits: 3, chambres: { single: 17 },
    besoins: ['demande urgente', 'réunion en U ou en classe chaque jour', 'apéritif et dîner assis'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'palais-royal-foret-chantilly', disponible: false }, { slug: 'abbaye-millenaire-vallee-chevreuse' }, { slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D27', type: 'journee-etude', secteur: 'un organisme de formation', mois: 'décembre 2026',
    participants: 20, nuits: 0,
    besoins: ['réunion en U ou en classe', 'déjeuner', 'animation casino organisée par l’entreprise', 'départ à 17 h'],
    chateaux: [{ slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D28', type: 'journee-etude', secteur: 'une agence publique', mois: 'décembre 2026',
    participants: 66, nuits: 0,
    besoins: ['salle toute la journée en îlots', 'team building le matin et l’après-midi, animé par l’agence', 'déjeuner, de 10 h à 17 h'],
    chateaux: [{ slug: 'hotel-historique-seminaire-paris-92' }],
  },
  {
    id: 'D29', type: 'seminaire-residentiel', secteur: 'une marque de cosmétiques', mois: 'janvier 2027',
    participants: 120, nuits: 1, chambres: { twin: 60 }, budget: 'environ 550 € HT par personne',
    besoins: ['plénière en théâtre et 4 sous-commissions de 30 personnes', 'cocktail dînatoire le soir'],
    chateaux: [{ slug: 'palais-royal-foret-chantilly', disponible: true }, { slug: 'manoir-anglo-normand-chantilly', disponible: false }],
  },
  {
    id: 'D30', type: 'soiree', secteur: 'un groupe de technologies médicales', mois: 'janvier 2027',
    participants: 120, nuits: 0, budget: '13 000 € TTC au maximum',
    besoins: ['apéritif léger à 19 h', 'allocution d’ouverture', 'cocktail dînatoire', 'soirée dansante avec DJ ou groupe jusqu’à 1 h'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }],
  },
  {
    id: 'D31', type: 'seminaire-residentiel', secteur: 'un groupe de travaux publics', mois: 'janvier 2027',
    participants: 55, nuits: 1, chambres: { single: 55 },
    besoins: ['plénière et 4 à 8 salles de sous-commission', 'apéritif et dîner'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'palais-royal-foret-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }],
  },
  {
    id: 'D33', type: 'seminaire-residentiel', secteur: "un groupe d'assurance", mois: 'mai 2027',
    participants: 125, nuits: 1, chambres: { single: 125 },
    besoins: ['demande urgente, décision rapide', 'réunion en théâtre', 'apéritif, dîner et soirée DJ'],
    chateaux: [{ slug: 'manoir-anglo-normand-chantilly', disponible: true }, { slug: 'abbaye-millenaire-vallee-chevreuse' }],
  },
];

export function casDemande(id: string): CasDemande | undefined {
  return CAS_DEMANDES.find((c) => c.id === id);
}
