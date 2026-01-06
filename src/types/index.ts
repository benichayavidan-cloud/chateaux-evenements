export interface Chateau {
  id: string;
  nom: string;
  region: string;
  capacite: {
    min: number;
    max: number;
  };
  styleArchitectural: string;
  description: string;
  atouts: string[];
  images: string[];
  slug: string;
}

export interface TypeEvenement {
  id: string;
  titre: string;
  description: string;
  icon: string;
  servicesInclus: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  nom: string;
  entreprise: string;
  poste: string;
  contenu: string;
  avatar: string;
  note: number;
}

export interface ChiffreCle {
  valeur: number;
  unite?: string;
  label: string;
  suffix?: string;
}

export type EventType =
  | "seminaire"
  | "journee-etude"
  | "soiree-entreprise"
  | "team-building"
  | "autre";

export type DureeEvent = "1-jour" | "2-jours" | "3-jours-plus";

export interface DevisFormData {
  // Étape 1
  typeEvenement: EventType;

  // Étape 2
  nombreParticipants: number;
  datesSouhaitees: Date | null;
  duree: DureeEvent;

  // Étape 3
  chateauId: string | "conseil";

  // Étape 4
  entreprise: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  message?: string;
}
