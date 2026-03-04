import { z } from "zod";

const customErrorMap = (issue: any, ctx: any): { message: string } => {
  const fieldName = issue.path[0];

  // Gestion des enums et valeurs invalides
  if (issue.code === "invalid_value") {
    if (fieldName === "typeEvenement") {
      return { message: "Veuillez sélectionner un type d'événement" };
    }
    if (fieldName === "duree") {
      return { message: "Veuillez sélectionner une durée" };
    }
    if (fieldName === "budget") {
      return { message: "Veuillez sélectionner un budget" };
    }
    if (fieldName === "chateauIds") {
      return { message: "Veuillez sélectionner au moins un château" };
    }
  }

  // Gestion des types invalides
  if (issue.code === "invalid_type") {
    if (fieldName === "budget") {
      return { message: "Veuillez sélectionner un budget" };
    }
    if (fieldName === "entreprise") {
      return { message: "Nom de l'entreprise requis" };
    }
    if (fieldName === "nomPrenom") {
      return { message: "Nom et prénom requis" };
    }
    if (fieldName === "email") {
      return { message: "Email requis" };
    }
    if (fieldName === "telephoneMobile") {
      return { message: "Numéro de téléphone requis" };
    }
    return { message: "Ce champ est requis" };
  }

  // Gestion des erreurs de longueur minimum
  if (issue.code === "too_small") {
    if (fieldName === "chateauIds") {
      return { message: "Veuillez sélectionner au moins un château" };
    }
    if (fieldName === "datesSouhaitees") {
      return { message: "Veuillez sélectionner une date" };
    }
    if (fieldName === "entreprise") {
      return { message: "Nom de l'entreprise requis (minimum 2 caractères)" };
    }
    if (fieldName === "nomPrenom") {
      return { message: "Nom et prénom requis (minimum 2 caractères)" };
    }
    if (fieldName === "telephoneMobile") {
      return { message: "Numéro de téléphone invalide (minimum 10 chiffres)" };
    }
    if (fieldName === "budget") {
      return { message: "Veuillez sélectionner un budget" };
    }
  }

  // Gestion des emails invalides
  if (issue.code === "invalid_string") {
    if (fieldName === "email") {
      return { message: "Email invalide" };
    }
  }

  return { message: ctx?.defaultError || "Ce champ est requis" };
};

z.setErrorMap(customErrorMap as any);

export const formSchema = z.object({
  typeEvenement: z.enum([
    "seminaire",
    "journee-etude",
    "soiree-entreprise",
    "team-building",
    "autre",
  ]),
  datesSouhaitees: z.string().min(1),
  duree: z.enum(["1-jour", "2-jours", "3-jours-plus"]),
  chateauIds: z.array(z.string()).min(1),
  entreprise: z.string().min(2),
  nomPrenom: z.string().min(2),
  email: z.string().email(),
  telephoneMobile: z.string().min(10),
  nombreParticipants: z.number().min(10).max(500),
  nombreChambres: z.number().min(1).max(400),
  plusDe500Participants: z.boolean().optional(),
  plusDe400Chambres: z.boolean().optional(),
  chambresTwin: z.boolean().optional(),
  budget: z.string().min(1),
  commentaireDeroulement: z.string().optional(),
  fichier: z.any().optional(),
});

export type FormData = z.infer<typeof formSchema>;
