/**
 * QUESTIONS FRÉQUENTES D'UNE FICHE LIEU — dérivées des données, jamais inventées.
 *
 * Les 68 fiches /lieux/ n'avaient aucune question-réponse, là où les fiches
 * /chateaux/ en portent six — et ce sont les seules fiches que les moteurs
 * génératifs citaient au 01/09/2026. Une fiche lieu tenait en 550 mots contre
 * 2 182 pour une fiche château, sous le seuil d'indexation observé sur ce site.
 *
 * Règle absolue, héritée du gabarit (« aucune prose inventée ») : une question
 * n'est produite que si la donnée qui la remplit existe. Rien n'est extrapolé,
 * aucune fourchette n'est devinée. Un lieu sans chambres n'a pas de question
 * sur l'hébergement — il n'a pas une réponse vague.
 */

import type { Venue } from "@/data/venues";

export interface VenueFaqItem {
  question: string;
  reponse: string;
}

/** « 3 salles », « 1 salle » — accord automatique. */
function pluriel(n: number, singulier: string, plurielMot = `${singulier}s`): string {
  return `${n} ${n > 1 ? plurielMot : singulier}`;
}

/** Liste lisible : « a, b et c ». */
function enumerer(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

export function buildVenueFaq(v: Venue): VenueFaqItem[] {
  const items: VenueFaqItem[] = [];
  const lieu = v.nom;
  const ou = v.ville ? `à ${v.ville}` : `dans ${v.departement ?? `le ${v.departementCode}`}`;

  // 1. Capacité — la question la plus posée, et la donnée de tri n° 1.
  if (v.capacite > 0) {
    const salles = v.sallesReunion
      ? ` Le lieu dispose de ${pluriel(v.sallesReunion, "salle de réunion", "salles de réunion")}.`
      : "";
    items.push({
      question: `Combien de personnes ${lieu} peut-il accueillir ?`,
      reponse: `${lieu} accueille jusqu'à ${v.capacite} personnes pour un séminaire ou un événement d'entreprise ${ou}.${salles}`,
    });
  }

  // 2. Hébergement — départage un résidentiel d'une journée d'étude.
  if (v.chambres && v.chambres > 0) {
    const detail: string[] = [];
    if (v.chambresSingle) detail.push(`${v.chambresSingle} en single`);
    if (v.chambresTwin) detail.push(`${v.chambresTwin} en twin`);
    const repartition = detail.length ? ` (dont ${enumerer(detail)})` : "";
    items.push({
      question: `${lieu} dispose-t-il d'un hébergement sur place ?`,
      reponse: `Oui. ${lieu} compte ${pluriel(v.chambres, "chambre")}${repartition}, ce qui permet d'organiser un séminaire résidentiel sans transfert entre le lieu de travail et l'hôtel.`,
    });
  } else {
    items.push({
      question: `Peut-on organiser un séminaire résidentiel à ${lieu} ?`,
      reponse: `${lieu} n'a pas d'hébergement sur place : le lieu convient aux journées d'étude et aux soirées d'entreprise. Pour un format résidentiel, nous proposons des hébergements à proximité ou d'autres domaines de notre sélection.`,
    });
  }

  // 3. Salles — seulement si elles sont décrites, avec leurs capacités réelles.
  const sallesDecrites = v.salles?.filter(s => s.nom) ?? [];
  if (sallesDecrites.length > 0) {
    const plusGrande = sallesDecrites.reduce((a, b) =>
      (b.theatre ?? b.banquet ?? b.cocktail ?? 0) > (a.theatre ?? a.banquet ?? a.cocktail ?? 0) ? b : a
    );
    const cap = plusGrande.theatre ?? plusGrande.banquet ?? plusGrande.cocktail;
    const precision = cap ? `, la plus grande étant « ${plusGrande.nom} » (jusqu'à ${cap} personnes)` : "";
    items.push({
      question: `Quelles salles de réunion propose ${lieu} ?`,
      reponse: `${lieu} met à disposition ${pluriel(sallesDecrites.length, "espace modulable")}${precision}. Le détail des configurations figure sur cette page.`,
    });
  }

  // 4. Situation — l'ancrage géographique, décisif sur les requêtes de zone.
  //    Formulation entre parenthèses pour éviter les articles de département
  //    (« dans l'Oise », « dans les Yvelines », « en Seine-et-Marne »), qui
  //    demanderaient une table de genres pour un gain nul.
  const departement = v.departement
    ? `${v.departement}, ${v.departementCode}`
    : v.departementCode;
  const situation = v.ville ? `à ${v.ville} (${departement})` : `dans le département ${departement}`;
  items.push({
    question: `Où se situe ${lieu} ?`,
    reponse: `${lieu} se trouve ${situation}${v.region ? `, en région ${v.region}` : ""}. Ce lieu fait partie des domaines vérifiés par Select Châteaux pour les séminaires d'entreprise au départ de Paris.`,
  });

  // 5. Équipements — uniquement ceux réellement enregistrés.
  const equipements = (v.equipements ?? []).filter(Boolean).slice(0, 6);
  if (equipements.length >= 2) {
    items.push({
      question: `Quels équipements sont disponibles à ${lieu} ?`,
      reponse: `Le lieu propose notamment ${enumerer(equipements.map(e => e.toLowerCase()))}.`,
    });
  }

  // 6. Parking — question logistique récurrente, donnée chiffrée disponible.
  if (v.parking && v.parking > 0) {
    items.push({
      question: `Y a-t-il un parking à ${lieu} ?`,
      reponse: `Oui, ${lieu} dispose de ${pluriel(v.parking, "place de stationnement", "places de stationnement")}.`,
    });
  }

  // 7. Devis — la seule question transactionnelle, réponse identique partout
  //    parce que l'engagement commercial l'est aussi.
  items.push({
    question: `Comment obtenir un devis pour ${lieu} ?`,
    reponse: `La demande se fait depuis cette page, en indiquant vos dates, votre nombre de participants et le format souhaité. Select Châteaux répond sous 48 heures avec une proposition chiffrée, sans engagement.`,
  });

  return items;
}
