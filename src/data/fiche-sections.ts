/**
 * Fiche château : les 6 sections de texte sous la galerie (17/11/2026).
 *
 * Décision PO du 17/11/2026 : chaque section ne parle que de son sujet (pas
 * de spa dans l'hébergement, pas d'activités dans les salles). La matière
 * vient des rubriques du domaine (data/rubriques), déjà classées par thème et
 * sourcées : la fiche n'a plus de texte à elle, sauf « Le lieu ».
 *
 * Titres : un mot-clé + un détail propre au lieu (validés PO le 17/11).
 * Jetons {chambres} {salles} {capacite} : lus dans data/chateaux.ts.
 */
import type { BlocTexte, RubriqueId } from '../types/rubriques.ts';

export const SECTIONS_FICHE = ['lieu', 'hebergement', 'reunion', 'restauration', 'activites', 'acces'] as const;
export type SectionFicheId = (typeof SECTIONS_FICHE)[number];

/** Un bloc repris d'une rubrique : [rubrique, rang du bloc]. */
export type ChoixBloc = [RubriqueId, number];

export interface FicheSectionsChateau {
  titres: Record<SectionFicheId, string>;
  /** « Le lieu » : histoire, architecture, parc. Seul texte propre à la fiche. */
  lieu: { intro: string; blocs: BlocTexte[]; faits: Array<{ label: string; valeur: string }> };
  /** Blocs repris, quand l'ordre par défaut (tous ceux de la rubrique) ne convient pas. */
  blocs?: Partial<Record<Exclude<SectionFicheId, 'lieu'>, ChoixBloc[]>>;
}

export const FICHE_SECTIONS: Record<string, FicheSectionsChateau> = {
  'manoir-anglo-normand-chantilly': {
    titres: {
      lieu: 'Un château anglo-normand dans un parc de 6 hectares',
      hebergement: 'Séminaire résidentiel : {chambres} chambres sur place',
      reunion: '{salles} salles de séminaire à la lumière du jour, au cœur du parc',
      restauration: 'Déjeuners, cocktails et dîner de gala au château',
      activites: 'Team building et spa au domaine',
      acces: 'Venir depuis Paris : 35 km, 25 min de Roissy',
    },
    lieu: {
      intro:
        "Pour un séminaire résidentiel aux portes de Paris, ce château de style anglo-normand offre à vos équipes un cadre qu'elles n'oublient pas. Construit au début du XXe siècle pour une grande famille de banquiers, c'est aujourd'hui le plus grand château-hôtel de France, en lisière de la forêt de Chantilly, à moins de 35 km de la capitale.",
      blocs: [
        {
          titre: 'Un décor qui marque le début du séminaire',
          texte:
            "Colombages, fenêtres à l'anglaise, toitures d'inspiration germanique et blasons gravés dans la pierre : dès l'allée bordée d'arbres, vos participants comprennent que cette convention ne ressemblera pas aux autres. À l'intérieur, les boiseries d'époque donnent du caractère aux temps d'accueil et aux pauses de votre groupe.",
        },
        {
          titre: 'Un parc de 6 hectares pour sortir de la salle',
          texte:
            "Le parc, planté d'arbres centenaires et bordé par trois forêts, prolonge vos sessions de travail au grand air. Des terrasses en cascade, dessinées à la manière d'un jardin italien, descendent jusqu'à un amphithéâtre de verdure aux gradins de pierre : un lieu tout trouvé pour une prise de parole en plein air ou la photo de groupe de fin de séminaire.",
        },
        {
          titre: 'Tout votre événement sur un seul site',
          texte:
            "Travail, repas, soirée et nuit se déroulent au domaine : vos collaborateurs restent ensemble du café d'accueil au dernier verre, et vous n'avez aucune navette à organiser. Labellisé Clef Verte, le domaine répond aussi aux engagements environnementaux de votre entreprise.",
        },
      ],
      faits: [
        { label: 'Parc', valeur: '6 hectares' },
        { label: 'Cadre', valeur: 'forêt de Chantilly' },
        { label: 'Label', valeur: 'Clef Verte' },
      ],
    },
    blocs: {
      restauration: [['restauration', 0], ['restauration', 1], ['restauration', 2], ['soirees', 1]],
    },
  },
  'abbaye-millenaire-vallee-chevreuse': {
    titres: {
      lieu: 'Une abbaye du XIIe siècle sur 80 hectares',
      hebergement: 'Séminaire résidentiel : {chambres} chambres au cœur du domaine',
      reunion: '{salles} salles de séminaire, de la Grande Salle des Voûtes aux salons à la lumière du jour',
      restauration: '4 restaurants et 2 bars, dîner de gala sous les voûtes',
      activites: 'Team building sur 80 hectares et spa',
      acces: 'Venir en séminaire : à 45 min de Paris',
    },
    lieu: {
      intro:
        "Pour un séminaire résidentiel au vert, cette abbaye cistercienne fondée au XIIe siècle plonge vos équipes dans un cadre sans équivalent, à 45 minutes de Paris. Classé Monument Historique, le domaine de 80 hectares a été entièrement rénové en 2023.",
      blocs: [
        {
          titre: 'Neuf siècles d’histoire pour décor',
          texte:
            "Ruines de l'église abbatiale, bâtiments conventuels, voûtes médiévales : vos participants ne sont pas dans un centre de congrès, et ils le sentent dès leur arrivée. Ce patrimoine donne du poids aux temps forts de votre convention et ancre les messages de votre entreprise dans les mémoires.",
        },
        {
          titre: 'Un lac et 80 hectares de forêt',
          texte:
            "Le domaine s'étend en lisière de la forêt de Rambouillet, autour d'un lac qui reflète les ruines. Vos sessions de travail se prolongent dehors, et les rives du lac accueillent la photo de groupe de fin de séminaire.",
        },
        {
          titre: 'Une vraie coupure avec le quotidien',
          texte:
            "À 45 minutes de Paris, vos collaborateurs sont coupés du bureau et disponibles pour le travail en commun. Tout se déroule sur place : vous n'avez aucun transfert à organiser entre la journée de réunion, la soirée et la nuit.",
        },
      ],
      faits: [
        { label: 'Domaine', valeur: '80 hectares' },
        { label: 'Fondation', valeur: 'XIIe siècle' },
        { label: 'Rénovation', valeur: '2023' },
      ],
    },
    blocs: {
      restauration: [['restauration', 0], ['restauration', 1], ['restauration', 2], ['soirees', 1]],
      acces: [['acces', 0], ['acces', 2], ['acces', 3]],
    },
  },
};
