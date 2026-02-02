import { motion } from "framer-motion";
import {
  Presentation,
  BookOpen,
  Sparkles,
  Users,
  Briefcase,
} from "lucide-react";
import type { EventType } from "@/types";
import type { UseFormSetValue, UseFormTrigger, FieldErrors } from "react-hook-form";
import type { FormData } from "./types";

interface Step1EventTypeProps {
  selectedType?: EventType;
  setValue: UseFormSetValue<FormData>;
  trigger: UseFormTrigger<FormData>;
  setCurrentStep: (step: number) => void;
  errors: FieldErrors<FormData>;
}

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

export function Step1EventType({
  selectedType,
  setValue,
  trigger,
  setCurrentStep,
  errors,
}: Step1EventTypeProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col gap-6"
    >
      <h3 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3 text-gray-800">
        Quel type d'événement souhaitez-vous organiser ?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={async () => {
                setValue("typeEvenement", type.id);
                setTimeout(async () => {
                  const isValid = await trigger("typeEvenement");
                  if (isValid) {
                    setCurrentStep(2);
                  }
                }, 500);
              }}
              style={{ padding: "clamp(1.5rem, 4vw, 2rem)", minHeight: "120px" }}
              className={`
                rounded-2xl border-2 transition-all duration-300 text-left flex flex-col justify-center
                ${
                  isSelected
                    ? "border-[#a37e2c] bg-[#a37e2c]/5"
                    : "border-gray-400 bg-white hover:border-[#a37e2c]/50"
                }
              `}
            >
              <Icon className="w-8 h-8 text-[#a37e2c] mb-3" />
              <div className="font-semibold text-base text-gray-800">
                {type.label}
              </div>
            </button>
          );
        })}
      </div>
      {errors.typeEvenement && (
        <p className="text-red-500 text-sm">{errors.typeEvenement.message}</p>
      )}
    </motion.div>
  );
}
