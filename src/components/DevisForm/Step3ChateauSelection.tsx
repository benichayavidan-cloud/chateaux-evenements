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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              className={`
                text-left rounded-2xl border-2 transition-all duration-300 bg-white overflow-hidden relative
                ${
                  isSelected
                    ? "border-[#a37e2c]"
                    : "border-gray-200 hover:border-[#a37e2c]/50"
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#a37e2c] flex items-center justify-center z-10">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="relative h-40">
                <Image
                  src={chateau.images.card}
                  alt={chateau.nom}
                  fill
                  className="object-cover"
                />
              </div>
              <div style={{ padding: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                <h4 className="font-bold mb-1 text-gray-800">{chateau.nom}</h4>
                <p className="text-sm text-gray-600">
                  {chateau.region} • {chateau.capacite.min}-{chateau.capacite.max} pers.
                </p>
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
                : "border-gray-300 bg-white hover:border-[#a37e2c]/50"
            }
          `}
          style={{ padding: "clamp(1.5rem, 3.5vw, 2rem)" }}
        >
          {selectedChateauIds?.includes("conseil") && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#a37e2c] flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          <Building className="w-12 h-12 text-[#a37e2c] mb-3" />
          <div className="font-semibold mb-2 text-gray-800">
            Laissez-nous vous conseiller
          </div>
          <p className="text-sm text-gray-600">
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
