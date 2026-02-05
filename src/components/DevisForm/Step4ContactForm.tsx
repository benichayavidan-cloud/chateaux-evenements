import {
  User,
  Mail,
  Phone,
  Briefcase,
  Users,
  MessageSquare,
} from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormData } from "./types";

interface Step4ContactFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  nombreParticipants: number;
  nombreChambres: number;
  budget?: string;
  onBudgetChange: (budget: string) => void;
}

const budgetOptions = [
  "< 10 000 €",
  "10 000 - 25 000 €",
  "25 000 - 50 000 €",
  "50 000 - 100 000 €",
  "> 100 000 €",
];

export function Step4ContactForm({
  register,
  errors,
  nombreParticipants,
  nombreChambres,
  budget,
  onBudgetChange,
}: Step4ContactFormProps) {
  return (
    <div
      key="step4"
      className="flex flex-col gap-6 animate-slide-right"
    >
      <h3 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3 text-gray-800">
        Vos coordonnées et détails
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Entreprise */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <Briefcase className="w-4 h-4 text-gray-800" />
            Entreprise *
          </label>
          <input
            type="text"
            {...register("entreprise")}
            className="w-full rounded-xl text-base placeholder:text-gray-500 focus:border-[#a37e2c] focus:outline-none focus:ring-2 focus:ring-[#a37e2c]/30"
            style={{ padding: "clamp(0.75rem, 2vw, 1rem)", background: "white", border: "2px solid #9CA3AF", color: "#1F2937" }}
            placeholder="Nom de votre entreprise"
          />
          {errors.entreprise && (
            <p className="text-red-500 text-sm mt-1">
              {errors.entreprise.message}
            </p>
          )}
        </div>

        {/* Nom Prénom */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <User className="w-4 h-4 text-gray-800" />
            Nom Prénom *
          </label>
          <input
            type="text"
            {...register("nomPrenom")}
            className="w-full rounded-xl text-base placeholder:text-gray-500 focus:border-[#a37e2c] focus:outline-none focus:ring-2 focus:ring-[#a37e2c]/30"
            style={{ padding: "clamp(0.75rem, 2vw, 1rem)", background: "white", border: "2px solid #9CA3AF", color: "#1F2937" }}
            placeholder="Votre nom et prénom"
          />
          {errors.nomPrenom && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nomPrenom.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <Mail className="w-4 h-4 text-gray-800" />
            Email *
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-xl text-base placeholder:text-gray-500 focus:border-[#a37e2c] focus:outline-none focus:ring-2 focus:ring-[#a37e2c]/30"
            style={{ padding: "clamp(0.75rem, 2vw, 1rem)", background: "white", border: "2px solid #9CA3AF", color: "#1F2937" }}
            placeholder="votre.email@entreprise.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Téléphone Mobile */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <Phone className="w-4 h-4 text-gray-800" />
            Téléphone Mobile *
          </label>
          <input
            type="tel"
            {...register("telephoneMobile")}
            className="w-full rounded-xl text-base placeholder:text-gray-500 focus:border-[#a37e2c] focus:outline-none focus:ring-2 focus:ring-[#a37e2c]/30"
            style={{ padding: "clamp(0.75rem, 2vw, 1rem)", background: "white", border: "2px solid #9CA3AF", color: "#1F2937" }}
            placeholder="+33 6 12 34 56 78"
          />
          {errors.telephoneMobile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.telephoneMobile.message}
            </p>
          )}
        </div>

        {/* Nombre de participants et chambres */}
        <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nombre de participants */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
              <Users className="w-4 h-4 text-gray-800" />
              Nombre de participants: {nombreParticipants}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="1"
              {...register("nombreParticipants", { valueAsNumber: true })}
              className="w-full h-2 rounded-full cursor-pointer appearance-none range-slider"
              style={{
                background: `linear-gradient(to right, #a37e2c 0%, #a37e2c ${
                  ((nombreParticipants - 10) / (500 - 10)) * 100
                }%, #e5e7eb ${
                  ((nombreParticipants - 10) / (500 - 10)) * 100
                }%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>10</span>
              <span>500</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                {...register("plusDe500Participants")}
                className="w-[18px] h-[18px] cursor-pointer"
              />
              <span className="text-xs text-gray-800">Plus de 500 participants</span>
            </label>
            {errors.nombreParticipants && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombreParticipants.message}
              </p>
            )}
          </div>

          {/* Nombre de chambres */}
          <div>
            <label className="text-sm font-semibold block text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
              Nombre de chambres: {nombreChambres}
            </label>
            <input
              type="range"
              min="1"
              max="400"
              step="1"
              {...register("nombreChambres", { valueAsNumber: true })}
              className="w-full h-2 rounded-full cursor-pointer appearance-none range-slider"
              style={{
                background: `linear-gradient(to right, #a37e2c 0%, #a37e2c ${
                  ((nombreChambres - 1) / (400 - 1)) * 100
                }%, #e5e7eb ${
                  ((nombreChambres - 1) / (400 - 1)) * 100
                }%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1</span>
              <span>400</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                {...register("plusDe400Chambres")}
                className="w-[18px] h-[18px] cursor-pointer"
              />
              <span className="text-xs text-gray-800">Plus de 400 chambres</span>
            </label>
            {errors.nombreChambres && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombreChambres.message}
              </p>
            )}
          </div>
        </div>

        {/* Chambres Twin */}
        <div className="col-span-1 sm:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("chambresTwin")}
              className="w-[18px] h-[18px] cursor-pointer"
            />
            <span className="text-xs text-gray-800">
              Possibilité de chambres twin
            </span>
          </label>
        </div>

        {/* Budget */}
        <div className="col-span-1 sm:col-span-2">
          <label className="text-sm font-semibold block text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            Budget estimé *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {budgetOptions.map((budgetOption) => {
              const isSelected = budget === budgetOption;
              return (
                <button
                  key={budgetOption}
                  type="button"
                  onClick={() => onBudgetChange(budgetOption)}
                  className={`
                    p-3 rounded-xl border-2 transition-all duration-300 text-sm
                    ${
                      isSelected
                        ? "border-[#a37e2c] bg-[#a37e2c]/10 font-semibold text-[#a37e2c]"
                        : "border-gray-400 bg-white text-gray-800 font-medium hover:border-[#a37e2c]/50"
                    }
                  `}
                >
                  {budgetOption}
                </button>
              );
            })}
          </div>
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>

        {/* Commentaire déroulement */}
        <div className="col-span-1 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            <MessageSquare className="w-4 h-4 text-gray-800" />
            Commentaire sur votre déroulé d'événement (optionnel)
          </label>
          <textarea
            {...register("commentaireDeroulement")}
            rows={6}
            className="w-full rounded-xl text-base resize-vertical placeholder:text-gray-500 min-h-[138px] focus:border-[#a37e2c] focus:outline-none focus:ring-2 focus:ring-[#a37e2c]/30"
            style={{ padding: "clamp(0.75rem, 2vw, 1rem)", background: "white", border: "2px solid #9CA3AF", color: "#1F2937" }}
            placeholder="Décrivez le déroulement de votre événement, les activités prévues, les besoins spécifiques..."
          />
          {errors.commentaireDeroulement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.commentaireDeroulement.message}
            </p>
          )}
        </div>

        {/* Upload fichier */}
        <div className="col-span-1 sm:col-span-2">
          <label className="text-sm font-semibold block text-gray-800" style={{ marginBottom: "clamp(0.1875rem, 0.5vw, 0.25rem)" }}>
            Importer un fichier (PDF, Excel, Word) - Optionnel
          </label>
          <input
            type="file"
            accept=".pdf,.xlsx,.xls,.doc,.docx"
            {...register("fichier")}
            className="w-full rounded-xl text-base focus:border-[#a37e2c] focus:outline-none focus:ring-2 focus:ring-[#a37e2c]/30"
            style={{ padding: "clamp(0.75rem, 2vw, 1rem)", background: "white", border: "2px solid #9CA3AF", color: "#1F2937" }}
          />
          <p className="text-xs text-gray-600 mt-1">
            Formats acceptés: PDF, Excel (.xlsx, .xls), Word (.doc, .docx)
          </p>
        </div>
      </div>
    </div>
  );
}
