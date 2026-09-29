import { z } from 'zod';

// Schema Zod pour validation serveur
// Accepte deux formats :
// - Formulaire principal (/devis) : datesSouhaitees (date unique)
// - Formulaire mini (pages château) : dateArrivee + dateDepart
export const formSchema = z.object({
  typeEvenement: z.enum([
    "seminaire",
    "journee-etude",
    "soiree-entreprise",
    "team-building",
    "autre",
  ]),
  datesSouhaitees: z.string().min(1).optional(),
  dateArrivee: z.string().min(1).optional(),
  dateDepart: z.string().min(1).optional(),
  duree: z.enum(["1-jour", "2-jours", "3-jours-plus"]),
  // Vide quand le formulaire est posé sur une page qui ne vend pas un château
  // précis (article de blog, fiche lieu). Jusqu'au 29/09/2026 le serveur
  // exigeait au moins un id : toutes les demandes envoyées depuis ces pages —
  // 70 % des visites Google — étaient refusées en « Données invalides ».
  // Voir chateauxDeLaDemande.
  chateauIds: z.array(z.string()).optional().default([]),
  // Obligatoire depuis le 29/09/2026 : sans société, le commercial ne peut
  // ni qualifier le prospect ni ouvrir la fiche dans le CRM.
  entreprise: z.string().trim().min(1, "Entreprise requise"),
  nomPrenom: z.string().min(2, "Nom et prénom requis"),
  email: z.string().email("Email invalide"),
  telephoneMobile: z.string().min(10, "Numéro de téléphone invalide"),
  // Un petit groupe (comité de direction de 6) est un vrai client.
  nombreParticipants: z.number().int().min(1).max(500),
  nombreChambres: z.number().min(1).max(400),
  plusDe500Participants: z.boolean().optional(),
  plusDe400Chambres: z.boolean().optional(),
  chambresTwin: z.boolean().optional(),
  budget: z.string().optional().default(''),
  commentaireDeroulement: z.string().optional(),
  datesFlexibles: z.boolean().optional().default(false),
  sourceLabel: z.string().optional(),
  sourcePage: z.string().max(300).optional(),
  // Relu par parsePremierContact : une forme inattendue devient « inconnue »,
  // elle ne doit jamais faire perdre une demande.
  premierContact: z.unknown().optional(),
}).refine(
  (data) => data.datesFlexibles || data.datesSouhaitees || (data.dateArrivee && data.dateDepart),
  { message: "Veuillez sélectionner une date", path: ["datesSouhaitees"] }
);

// Une demande sans château choisi porte sur tous les châteaux, comme celle
// envoyée depuis /devis.
export function chateauxDeLaDemande(ids: string[], tous: string[]): string[] {
  return ids.length > 0 ? ids : tous;
}
