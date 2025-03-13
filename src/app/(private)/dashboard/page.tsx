"use client"

import { useAuth } from "@/hooks/use-auth"
import { Smile, Heart, ThumbsUp, Star } from "lucide-react"
import { motion } from "framer-motion"

const metrics = [
  {
    icon: Smile,
    label: "Sintonia",
    value: "85%",
    color: "text-green-600",
    bgColor: "from-pink-100 to-pink-200",
    iconColor: "text-pink-500",
  },
  {
    icon: Heart,
    label: "Conexão",
    value: "92%",
    color: "text-red-600",
    bgColor: "from-red-100 to-red-200",
    iconColor: "text-red-500",
  },
  {
    icon: ThumbsUp,
    label: "Compatibilidade",
    value: "78%",
    color: "text-blue-600",
    bgColor: "from-blue-100 to-blue-200",
    iconColor: "text-blue-500",
  },
  {
    icon: Star,
    label: "Felicidade",
    value: "95%",
    color: "text-amber-600",
    bgColor: "from-amber-100 to-amber-200",
    iconColor: "text-amber-500",
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Olá, {user?.name || "Casal"}! 👋</h1>

      <h2 className="text-lg text-gray-600 mb-6">Veja como está o seu relacionamento hoje</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`bg-gradient-to-br ${metric.bgColor} rounded-xl shadow-sm overflow-hidden`}
          >
            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-3 ${metric.iconColor} bg-white/80`}>
                  <metric.icon size={28} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/50">
              <div className={`h-full bg-white`} style={{ width: metric.value }}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

