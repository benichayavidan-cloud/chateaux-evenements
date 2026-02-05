import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Building } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import type { FormData } from "./types";

interface Step3ChateauSelectionProps {
  selectedChateauIds?: string[];
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  shouldValidate?: boolean;
}

export function Step3ChateauSelection({
  selectedChateauIds,
  setValue,
  errors,
  shouldValidate = false,
}: Step3ChateauSelectionProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col gap-6"
    >
      <h3 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3 text-gray-800">
        Choisissez vos châteaux
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Vous pouvez sélectionner plusieurs châteaux pour comparer les offres
      </p>

      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4">
        {chateaux.map((chateau) => {
          const isSelected = selectedChateauIds?.includes(chateau.id);
          return (
            <button
              key={chateau.id}
              type="button"
              onClick={() => {
                const currentIds = selectedChateauIds || [];
                if (isSelected) {
                  setValue(
                    "chateauIds",
                    currentIds.filter((id) => id !== chateau.id),
                    { shouldValidate }
                  );
                } else {
                  setValue("chateauIds", [...currentIds, chateau.id], { shouldValidate });
                }
              }}
              style={{ minHeight: "280px" }}
              className={`
                text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden relative
                ${
                  isSelected
                    ? "border-[#a37e2c]"
                    : "border-gray-400 hover:border-[#a37e2c]/50"
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#a37e2c] flex items-center justify-center z-10">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="relative w-full h-full">
                <Image
                  src={chateau.images.card}
                  alt={chateau.nom}
                  fill
                  className="object-cover"
                />
                {/* Overlay léger - gradient uniquement en bas pour texte lisible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                {/* Texte par-dessus l'overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "2rem 1rem 1rem" }}>
                  <h4 className="font-bold mb-1 text-base" style={{ color: "#FFFFFF", filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))" }}>{chateau.nom}</h4>
                  <p className="text-sm font-medium" style={{ color: "#FFFFFF", filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))" }}>
                    {chateau.region} • {chateau.capacite.min}-{chateau.capacite.max} pers.
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        {/* Option "Laissez-nous vous conseiller" */}
        <button
          type="button"
          onClick={() => {
            const currentIds = selectedChateauIds || [];
            const isSelected = currentIds.includes("conseil");
            if (isSelected) {
              setValue(
                "chateauIds",
                currentIds.filter((id) => id !== "conseil"),
                { shouldValidate }
              );
            } else {
              setValue("chateauIds", [...currentIds, "conseil"], { shouldValidate });
            }
          }}
          className={`
            rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center relative
            ${
              selectedChateauIds?.includes("conseil")
                ? "border-[#a37e2c] bg-[#a37e2c]/5"
                : "border-gray-400 bg-white hover:border-[#a37e2c]/50"
            }
          `}
          style={{ padding: "1rem" }}
        >
          {selectedChateauIds?.includes("conseil") && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#a37e2c] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <Building className="w-8 h-8 text-[#a37e2c] mb-2" />
          <div className="font-semibold mb-1 text-gray-800 text-sm">
            Laissez-nous vous conseiller
          </div>
          <p className="text-xs text-gray-600">
            Nos experts choisiront le château idéal pour votre événement
          </p>
        </button>
      </div>
      {errors.chateauIds && (
        <p className="text-red-500 text-sm">{errors.chateauIds.message}</p>
      )}
    </motion.div>
  );
}
