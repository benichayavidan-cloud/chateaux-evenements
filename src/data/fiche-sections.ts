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
      lieu: 'Un château pour votre séminaire à Chantilly',
      hebergement: 'Séminaire résidentiel : {chambres} chambres sur place',
      reunion: '{salles} salles de séminaire à la lumière du jour, au cœur du parc',
      restauration: 'Déjeuners, cocktails et dîner de gala au château',
      activites: 'Team building et spa au domaine',
      acces: 'Venir depuis Paris : 35 km, 25 min de Roissy',
    },
    lieu: {
      intro:
        "Construit au début du XXe siècle pour une grande famille de banquiers, ce château de style anglo-normand est aujourd'hui le plus grand château-hôtel de France. Il se dresse en lisière de la forêt de Chantilly, dans l'Oise, à moins de 35 km de Paris.",
      blocs: [
        {
          titre: 'Une façade à colombages',
          texte:
            "Colombages, fenêtres à l'anglaise, toitures d'inspiration germanique et blasons gravés dans la pierre : l'architecture donne le ton dès l'allée bordée d'arbres. À l'intérieur, les boiseries d'époque ont été conservées.",
        },
        {
          titre: 'Un parc de 6 hectares, entouré de forêts',
          texte:
            "Le parc est planté d'arbres centenaires et bordé par trois forêts. Des terrasses en cascade, dessinées à la manière d'un jardin italien, descendent par paliers de la façade vers les bois, jusqu'à un amphithéâtre de verdure aux gradins de pierre.",
        },
        {
          titre: 'Tout le séminaire sur un seul site',
          texte:
            "Travail, repas, soirée et nuit se déroulent au domaine : vos participants restent ensemble du café d'accueil au dernier verre, et vous n'avez aucune navette à organiser. Le domaine est labellisé Clef Verte pour son engagement environnemental.",
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
