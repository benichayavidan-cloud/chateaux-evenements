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

      <div className="step1-grid">
        {eventTypes.map((type, index) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <motion.button
              key={type.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(163, 126, 44, 0.15)' }}
              whileTap={{ scale: 0.97 }}
              onClick={async () => {
                setValue("typeEvenement", type.id);
                setTimeout(async () => {
                  const isValid = await trigger("typeEvenement");
                  if (isValid) {
                    setCurrentStep(2);
                  }
                }, 500);
              }}
              style={{
                padding: "clamp(1.25rem, 3vw, 1.75rem)",
                minHeight: "110px",
                borderRadius: "16px",
                border: isSelected ? "2px solid #a37e2c" : "2px solid #d1d5db",
                background: isSelected ? "rgba(163, 126, 44, 0.05)" : "#ffffff",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color 0.3s, background 0.3s",
                boxShadow: isSelected ? '0 4px 16px rgba(163, 126, 44, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <Icon style={{ width: "28px", height: "28px", color: "#a37e2c", marginBottom: "0.75rem" }} />
              <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1f2937" }}>
                {type.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      <style jsx>{`
        .step1-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        @media (min-width: 768px) {
          .step1-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
        }
      `}</style>
      {errors.typeEvenement && (
        <p className="text-red-500 text-sm">{errors.typeEvenement.message}</p>
      )}
    </motion.div>
  );
}
