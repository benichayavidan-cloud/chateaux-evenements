"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Presentation,
  BookOpen,
  Sparkles,
  Users,
  Calendar,
  Clock,
  Building,
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { chateaux } from "@/data/chateaux";
import type { DevisFormData, EventType, DureeEvent } from "@/types";

const formSchema = z.object({
  typeEvenement: z.enum([
    "seminaire",
    "journee-etude",
    "soiree-entreprise",
    "team-building",
    "autre",
  ]),
  nombreParticipants: z.number().min(10).max(500),
  datesSouhaitees: z.string().min(1, "Veuillez sélectionner une date"),
  duree: z.enum(["1-jour", "2-jours", "3-jours-plus"]),
  chateauId: z.string().min(1, "Veuillez sélectionner un château"),
  entreprise: z.string().min(2, "Nom de l'entreprise requis"),
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const eventTypes = [
  {
    id: "seminaire" as EventType,
    label: "Séminaire Résidentiel",
    icon: Presentation,
  },
  {
    id: "journee-etude" as EventType,
    label: "Journée d'Étude",
    icon: BookOpen,
  },
  {
    id: "soiree-entreprise" as EventType,
    label: "Soirée d'Entreprise",
    icon: Sparkles,
  },
  { id: "team-building" as EventType, label: "Team Building", icon: Users },
  { id: "autre" as EventType, label: "Autre", icon: Briefcase },
];

const dureeOptions = [
  { value: "1-jour" as DureeEvent, label: "1 jour" },
  { value: "2-jours" as DureeEvent, label: "2 jours" },
  { value: "3-jours-plus" as DureeEvent, label: "3 jours ou plus" },
];

export function DevisForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreParticipants: 50,
    },
  });

  const watchedValues = watch();

  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger("typeEvenement");
        break;
      case 2:
        isValid = await trigger([
          "nombreParticipants",
          "datesSouhaitees",
          "duree",
        ]);
        break;
      case 3:
        isValid = await trigger("chateauId");
        break;
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    console.log("Demande de devis:", data);
    setIsSubmitted(true);
    // Ici, vous ajouteriez l'appel API pour envoyer les données
  };

  const progressPercentage = (currentStep / 4) * 100;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4 font-[var(--font-playfair)]">
          Demande envoyée avec succès !
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-8">
          Merci pour votre demande. Notre équipe vous contactera dans les 24
          heures pour discuter de votre projet et établir un devis personnalisé.
        </p>
        <div className="bg-[var(--secondary)] rounded-lg p-6">
          <p className="text-[var(--text-secondary)]">
            <strong>Numéro de référence:</strong> #DEV
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center ${
                step < 4 ? "flex-1" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step === currentStep
                    ? "bg-[var(--gold)] text-white"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--gold)] transition-all duration-300"
                    style={{
                      width: step < currentStep ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-[var(--text-secondary)] mt-2">
          <span>Type</span>
          <span>Détails</span>
          <span>Château</span>
          <span>Contact</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Étape 1: Type d'événement */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Quel type d'événement souhaitez-vous organiser ?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setValue("typeEvenement", type.id);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                        watchedValues.typeEvenement === type.id
                          ? "border-[var(--gold)] bg-[var(--gold)]/5"
                          : "border-gray-200 hover:border-[var(--gold)]"
                      }`}
                    >
                      <Icon className="w-8 h-8 text-[var(--gold)] mb-3" />
                      <div className="font-semibold text-[var(--text-primary)]">
                        {type.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.typeEvenement && (
                <p className="text-red-500 text-sm">
                  {errors.typeEvenement.message}
                </p>
              )}
            </motion.div>
          )}

          {/* Étape 2: Détails */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Précisez les détails de votre événement
              </h3>

              {/* Nombre de participants */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Nombre de participants: {watchedValues.nombreParticipants}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  {...register("nombreParticipants", { valueAsNumber: true })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--gold)]"
                />
                <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                  <span>10</span>
                  <span>500</span>
                </div>
                {errors.nombreParticipants && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nombreParticipants.message}
                  </p>
                )}
              </div>

              {/* Dates souhaitées */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Dates souhaitées
                </label>
                <input
                  type="date"
                  {...register("datesSouhaitees")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none"
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.datesSouhaitees && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.datesSouhaitees.message}
                  </p>
                )}
              </div>

              {/* Durée */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Durée de l'événement
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {dureeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue("duree", option.value)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        watchedValues.duree === option.value
                          ? "border-[var(--gold)] bg-[var(--gold)]/5"
                          : "border-gray-200 hover:border-[var(--gold)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {errors.duree && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duree.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Étape 3: Sélection du château */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Choisissez votre château
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chateaux.map((chateau) => (
                  <button
                    key={chateau.id}
                    type="button"
                    onClick={() => setValue("chateauId", chateau.id)}
                    className={`text-left rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg ${
                      watchedValues.chateauId === chateau.id
                        ? "border-[var(--gold)]"
                        : "border-gray-200 hover:border-[var(--gold)]"
                    }`}
                  >
                    <div className="relative h-40">
                      <Image
                        src={chateau.images[0]}
                        alt={chateau.nom}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-[var(--text-primary)]">
                        {chateau.nom}
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {chateau.region} • {chateau.capacite.min}-
                        {chateau.capacite.max} pers.
                      </p>
                    </div>
                  </button>
                ))}

                {/* Option "Laissez-nous vous conseiller" */}
                <button
                  type="button"
                  onClick={() => setValue("chateauId", "conseil")}
                  className={`p-6 rounded-xl border-2 border-dashed transition-all hover:shadow-lg flex flex-col items-center justify-center text-center ${
                    watchedValues.chateauId === "conseil"
                      ? "border-[var(--gold)] bg-[var(--gold)]/5"
                      : "border-gray-300 hover:border-[var(--gold)]"
                  }`}
                >
                  <Building className="w-12 h-12 text-[var(--gold)] mb-3" />
                  <div className="font-semibold text-[var(--text-primary)]">
                    Laissez-nous vous conseiller
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    Nos experts choisiront le château idéal pour votre événement
                  </p>
                </button>
              </div>
              {errors.chateauId && (
                <p className="text-red-500 text-sm">
                  {errors.chateauId.message}
                </p>
              )}
            </motion.div>
          )}

          {/* Étape 4: Informations de contact */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Vos coordonnées
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Entreprise */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Entreprise *
                  </label>
                  <input
                    type="text"
                    {...register("entreprise")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none"
                    placeholder="Nom de votre entreprise"
                  />
                  {errors.entreprise && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.entreprise.message}
                    </p>
                  )}
                </div>

                {/* Prénom */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Prénom *
                  </label>
                  <input
                    type="text"
                    {...register("prenom")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none"
                    placeholder="Votre prénom"
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.prenom.message}
                    </p>
                  )}
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nom *
                  </label>
                  <input
                    type="text"
                    {...register("nom")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none"
                    placeholder="Votre nom"
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nom.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none"
                    placeholder="votre.email@entreprise.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    {...register("telephone")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none"
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.telephone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message complémentaire (optionnel)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--gold)] focus:outline-none resize-none"
                    placeholder="Détails supplémentaires sur votre projet..."
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 text-[var(--text-primary)] font-semibold rounded-full hover:bg-gray-300 transition-colors flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Précédent
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
            >
              Suivant
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
            >
              Envoyer ma demande
              <Check className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
