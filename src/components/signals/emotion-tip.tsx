import type React from "react"
import type { EmotionType } from "./emotion-config"

interface EmotionTipsProps {
  emotionConfig: {
    icon: React.ReactNode
    label: string
  }
  currentEmotion: EmotionType | ""
}

export const EmotionTips = ({ emotionConfig, currentEmotion }: EmotionTipsProps) => {
  if (!currentEmotion) return null

  return (
    <div className="mt-4 p-4 rounded-xl bg-[#F1DDE6] border border-[#FF006F]/10">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">{emotionConfig.icon}</div>
        <h3 className="text-sm font-medium text-[#B42A76]">
          Dicas para momentos de {emotionConfig.label.toLowerCase()}
        </h3>
      </div>
      <p className="text-sm text-[#353434]">
        {currentEmotion === "feliz" &&
          "Aproveite esse momento positivo! Compartilhe sua felicidade com seu parceiro para fortalecer a conexão entre vocês."}
        {currentEmotion === "triste" &&
          "Está tudo bem se sentir triste às vezes. Abrir-se sobre seus sentimentos pode ajudar seu parceiro a entender e apoiar você."}
        {currentEmotion === "ansioso" &&
          "Respiração profunda pode ajudar nos momentos de ansiedade. Comunicar o que te preocupa é o primeiro passo para resolver juntos."}
      </p>
    </div>
  )
}

