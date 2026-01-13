import { z } from "zod";

export const formSchema = z.object({
  typeEvenement: z.enum([
    "seminaire",
    "journee-etude",
    "soiree-entreprise",
    "team-building",
    "autre",
  ]),
  datesSouhaitees: z.string().min(1, "Veuillez sélectionner une date"),
  duree: z.enum(["1-jour", "2-jours", "3-jours-plus"]),
  chateauIds: z.array(z.string()).min(1, "Veuillez sélectionner au moins un château"),
  entreprise: z.string().min(2, "Nom de l'entreprise requis"),
  nomPrenom: z.string().min(2, "Nom et prénom requis"),
  email: z.string().email("Email invalide"),
  telephoneMobile: z.string().min(10, "Numéro de téléphone invalide"),
  nombreParticipants: z.number().min(10).max(500),
  nombreChambres: z.number().min(1).max(400),
  plusDe500Participants: z.boolean().optional(),
  plusDe400Chambres: z.boolean().optional(),
  chambresTwin: z.boolean().optional(),
  budget: z.string().min(1, "Budget requis"),
  commentaireDeroulement: z.string().optional(),
  fichier: z.any().optional(),
});

export type FormData = z.infer<typeof formSchema>;
