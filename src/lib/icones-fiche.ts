/**
 * Choix d'une icône d'après un libellé de la fiche château (17/11/2026).
 * Deux usages : le moyen de transport d'un bloc de la section Accès, et le
 * sujet d'un chiffre clé (« Chambres et suites », « Aéroport d'Orly »…).
 * Le premier motif reconnu l'emporte : l'ordre des lignes compte.
 */
import {
  Accessibility, Award, Bed, Bus, Car, Clock, Film, Gamepad2, Landmark, Leaf, Monitor, ParkingCircle, Plane,
  Presentation, Ruler, Sparkles, TrainFront, TramFront, Trees, Trophy, Users, UtensilsCrossed, Waves, Wine,
  type LucideIcon,
} from 'lucide-react';

type Table = Array<[RegExp, LucideIcon]>;

const TRANSPORTS: Table = [
  [/voiture/i, Car],
  [/métro/i, TramFront],
  [/train|rer\b/i, TrainFront],
  [/avion|hélicoptère/i, Plane],
  [/transfert|navette/i, Bus],
  [/accessibilité/i, Accessibility],
];

const CHIFFRES: Table = [
  // Accès
  [/aéroport/i, Plane],
  [/métro/i, TramFront],
  [/gare|ter\b|train/i, TrainFront],
  [/parking/i, ParkingCircle],
  [/distance|voiture|paris expo/i, Car],
  // Restauration (avant les salles : « Banquet sous les voûtes », « Cocktail en plénière »)
  [/rhum|dégustation|masterclass|\bbars?\b/i, Wine],
  [/restaurant|banquet|gala|cocktail|petit-déjeuner|régimes|viande|show cooking/i, UtensilsCrossed],
  // Activités
  [/spa|soins|piscine/i, Waves],
  [/tennis|padel/i, Trophy],
  [/jeux/i, Gamepad2],
  // Hébergement
  [/room service/i, Clock],
  [/capacité|participants/i, Users],
  [/surface|hauteur/i, Ruler],
  [/chambre|suite|twin|lits|haras|abbaye|ferme/i, Bed],
  // Réunion
  [/cinéma/i, Film],
  [/écran|mur led/i, Monitor],
  [/plénière|salon|espaces|salle/i, Presentation],
  // Le lieu
  [/environnemental/i, Leaf],
  [/label|classement/i, Award],
  [/fondation|rénovation/i, Landmark],
  [/parc|jardin|domaine|cadre|serre/i, Trees],
];

const choisir = (table: Table, texte: string): LucideIcon | undefined => table.find(([motif]) => motif.test(texte))?.[1];

/** Icône du moyen de transport d'un bloc « En voiture », « En métro »… ; rien si le titre n'en nomme aucun. */
export const iconeTransport = (titre: string): LucideIcon | undefined => choisir(TRANSPORTS, titre);

/** Icône neutre d'un chiffre dont le libellé n'est reconnu par aucun motif. */
export const ICONE_PAR_DEFAUT: LucideIcon = Sparkles;

/** Icône d'un chiffre clé d'après son libellé ; jamais vide. */
export const iconeChiffre = (label: string): LucideIcon => choisir(CHIFFRES, label) ?? ICONE_PAR_DEFAUT;
