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
};
