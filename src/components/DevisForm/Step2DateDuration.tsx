import { Calendar, Clock } from "lucide-react";
import type { DureeEvent } from "@/types";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormGetValues,
  FieldErrors,
} from "react-hook-form";
import type { FormData } from "./types";

interface Step2DateDurationProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  trigger: UseFormTrigger<FormData>;
  getValues: UseFormGetValues<FormData>;
  setCurrentStep: (step: number) => void;
  selectedDuree?: DureeEvent;
  errors: FieldErrors<FormData>;
}

const dureeOptions = [
  { value: "1-jour" as DureeEvent, label: "1 jour" },
  { value: "2-jours" as DureeEvent, label: "2 jours" },
  { value: "3-jours-plus" as DureeEvent, label: "3 jours ou plus" },
];

const dateInputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "clamp(0.75rem, 2vw, 1rem)",
  background: "white",
  border: "2px solid #9CA3AF",
  fontSize: "1rem",
  color: "#1F2937",
  colorScheme: "light",
  cursor: "pointer",
};

export function Step2DateDuration({
  register,
  setValue,
  trigger,
  getValues,
  setCurrentStep,
  selectedDuree,
  errors,
}: Step2DateDurationProps) {
  const today = new Date().toISOString().split("T")[0];

  const tryAdvance = async () => {
    setTimeout(async () => {
      const formValues = getValues();
      const isValid = await trigger(["dateArrivee", "dateDepart", "duree"]);
      if (isValid && formValues.duree && formValues.dateArrivee && formValues.dateDepart) {
        setCurrentStep(3);
      }
    }, 500);
  };

  return (
    <div
      key="step2"
      className="flex flex-col gap-6 animate-slide-right"
    >
      <h3 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3 text-gray-800">
        Quand souhaitez-vous organiser votre événement ?
      </h3>

      {/* Dates d'arrivée et de départ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <Calendar className="w-4 h-4 text-gray-800" />
            Date d&apos;arrivée *
          </label>
          <input
            type="date"
            {...register("dateArrivee")}
            onChange={async (e) => {
              setValue("dateArrivee", e.target.value);
              tryAdvance();
            }}
            onClick={(e) => {
              (e.currentTarget as HTMLInputElement).showPicker?.();
            }}
            className="rounded-xl focus:border-[#a37e2c] focus:outline-none"
            style={dateInputStyle}
            min={today}
          />
          {errors.dateArrivee && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateArrivee.message}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <Calendar className="w-4 h-4 text-gray-800" />
            Date de départ *
          </label>
          <input
            type="date"
            {...register("dateDepart")}
            onChange={async (e) => {
              setValue("dateDepart", e.target.value);
              tryAdvance();
            }}
            onClick={(e) => {
              (e.currentTarget as HTMLInputElement).showPicker?.();
            }}
            className="rounded-xl focus:border-[#a37e2c] focus:outline-none"
            style={dateInputStyle}
            min={today}
          />
          {errors.dateDepart && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateDepart.message}
            </p>
          )}
        </div>
      </div>

      {/* Durée */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
          <Clock className="w-4 h-4 text-gray-800" />
          Durée de l'événement *
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {dureeOptions.map((option) => {
            const isSelected = selectedDuree === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={async () => {
                  setValue("duree", option.value);
                  setTimeout(async () => {
                    const formValues = getValues();
                    const isValid = await trigger(["dateArrivee", "dateDepart", "duree"]);
                    if (isValid && formValues.dateArrivee && formValues.dateDepart) {
                      setCurrentStep(3);
                    }
                  }, 500);
                }}
                className={`
                  p-3 rounded-xl border-2 transition-all duration-300 text-gray-800
                  ${
                    isSelected
                      ? "border-[#a37e2c] bg-[#a37e2c]/5"
                      : "border-gray-400 bg-white hover:border-[#a37e2c]/50"
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {errors.duree && (
          <p className="text-red-500 text-sm mt-1">{errors.duree.message}</p>
        )}
      </div>
    </div>
  );
}
