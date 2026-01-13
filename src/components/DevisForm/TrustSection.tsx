import { motion } from "framer-motion";

export function TrustSection() {
  const trustItems = [
    {
      value: "24h",
      label: "Réponse garantie sous 24 heures",
      delay: 0.1,
    },
    {
      value: "100%",
      label: "Devis personnalisé et sans engagement",
      delay: 0.2,
    },
    {
      value: "15+",
      label: "Années d'expertise événementielle",
      delay: 0.3,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-4 lg:p-6 mb-6 lg:mb-10 rounded-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 text-center">
        {trustItems.map((item) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl lg:text-5xl font-bold text-[#a37e2c] mb-1 lg:mb-2">
              {item.value}
            </div>
            <p className="text-gray-600 text-sm lg:text-base">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
