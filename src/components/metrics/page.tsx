import { Heart, Smile as SmileBeam, MessageCircle, HeartHandshake, Bell } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  {
    icon: SmileBeam,
    label: "Sintonia",
    value: "85%",
    color: "bg-green-400/10",
    hoverColor: "hover:bg-green-400/20",
    textColor: "text-green-600",
    iconColor: "text-green-500",
    shadowColor: "group-hover:shadow-green-500/25",
  },
  {
    icon: Heart,
    label: "Conexão",
    value: "85%",
    color: "bg-blue-400/10",
    hoverColor: "hover:bg-blue-400/20",
    textColor: "text-blue-600",
    iconColor: "text-blue-500",
    shadowColor: "group-hover:shadow-blue-500/25",
  },
  {
    icon: MessageCircle,
    label: "Comunicação",
    value: "85%",
    color: "bg-pink-400/10",
    hoverColor: "hover:bg-pink-400/20",
    textColor: "text-pink-600",
    iconColor: "text-pink-500",
    shadowColor: "group-hover:shadow-pink-500/25",
  },
  {
    icon: HeartHandshake,
    label: "Intensidade",
    value: "85%",
    color: "bg-purple-400/10",
    hoverColor: "hover:bg-purple-400/20",
    textColor: "text-purple-600",
    iconColor: "text-purple-500",
    shadowColor: "group-hover:shadow-purple-500/25",
  },
];

export function Metrics() {
  return (
    <div className="flex flex-col sm:flex-row mt-10 flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-5">
      {metrics.map((metric, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.2,
            delay: index * 0.1,
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
          className={`
            group
            flex items-center gap-4 
            px-6 py-1.5 
            rounded-full 
            ${metric.color}
            ${metric.hoverColor}
            w-full sm:w-auto
            cursor-pointer
            transition-all duration-300 ease-in-out
            shadow-lg shadow-transparent
            ${metric.shadowColor}
            outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-opacity-50 ${metric.textColor}
          `}
        >
          <div className={`
            p-2 
            rounded-full 
            ${metric.color} 
            ${metric.hoverColor}
            transition-all duration-300
          `}>
            <metric.icon 
              size={26} 
              className={`
                ${metric.iconColor} 
                flex-shrink-0
                transition-transform duration-300
                group-hover:scale-110
                group-hover:rotate-12
              `} 
            />
          </div>
          <span className={`
            text-lg sm:text-xl 
            font-semibold 
            ${metric.textColor}
            transition-all duration-300
            group-hover:tracking-wide
          `}>
            {metric.label}
          </span>
          {metric.value && (
            <span className={`
              text-lg sm:text-xl 
              font-semibold 
              ${metric.textColor}
              transition-all duration-300
              group-hover:tracking-wide
            `}>
              {metric.value}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}