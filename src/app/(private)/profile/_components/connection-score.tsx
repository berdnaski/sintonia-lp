import { useCouple } from "@/hooks/use-couple";
import { motion } from "framer-motion";

export default function ConnectionScore({ score }: { score: number }) {
  const { metrics } = useCouple()

  if (!metrics) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#F1DDE6" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#FF006F"
            strokeWidth="10"
            strokeDasharray={`${(2 * Math.PI * 45 * score) / 100} ${
              (2 * Math.PI * 45 * (100 - score)) / 100
            }`}
            strokeDashoffset={2 * Math.PI * 45 * 0.25}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold text-[#FF006F]">{metrics.avgTotal ?? 0}</span>
        </div>
      </div>
      <p className="text-sm text-[#353434] mt-2">Nível de conexão</p>
    </motion.div>
  );
}
