import { Badge } from "@/components/ui/badge"
import { FiHeart } from "react-icons/fi"
import { emotionConfig, type EmotionType } from "./emotion-config"
import type { SignalCardProps } from "./types"

export const SignalCard = ({ signal }: SignalCardProps) => {
  const style = emotionConfig[signal.emotion as EmotionType] || emotionConfig.ansioso

  return (
    <div className="border border-[#FF006F]/10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-3 bg-[#F1DDE6]/50 border-b border-[#FF006F]/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">{style.icon}</div>
          <span className="text-[#B42A76] text-sm font-medium">{style.label}</span>
        </div>
        <Badge variant="outline" className="bg-white text-[#B42A76] text-xs">
          {new Date(signal.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
        </Badge>
      </div>

      <div className="p-4">
        <p className="text-[#353434] text-sm leading-relaxed">{signal.note || "Sem mensagem"}</p>

        {signal.advice && (
          <div className="mt-3 pt-3 border-t border-[#FF006F]/10">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 rounded-full bg-[#F1DDE6] flex items-center justify-center">
                <FiHeart className="text-[#FF006F]" size={12} />
              </div>
              <p className="text-[#B42A76] text-xs font-medium">Resposta da IA:</p>
            </div>
            <p className="text-[#353434] text-sm">{signal.advice}</p>
          </div>
        )}
      </div>
    </div>
  )
}

