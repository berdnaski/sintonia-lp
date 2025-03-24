import { FiSmile, FiFrown, FiMeh } from "react-icons/fi"
import type { ReactNode } from "react"

export type EmotionType = "feliz" | "triste" | "ansioso"

export interface EmotionConfig {
  icon: ReactNode
  bg: string
  border: string
  text: string
  label: string
}

export const emotionConfig: Record<EmotionType, EmotionConfig> = {
  feliz: {
    icon: <FiSmile size={18} className="text-[#FF006F]" />,
    bg: "bg-[#F1DDE6]",
    border: "border-[#FF006F]/20",
    text: "text-[#B42A76]",
    label: "Feliz",
  },
  triste: {
    icon: <FiFrown size={18} className="text-[#FF006F]" />,
    bg: "bg-[#F1DDE6]",
    border: "border-[#FF006F]/20",
    text: "text-[#B42A76]",
    label: "Triste",
  },
  ansioso: {
    icon: <FiMeh size={18} className="text-[#FF006F]" />,
    bg: "bg-[#F1DDE6]",
    border: "border-[#FF006F]/20",
    text: "text-[#B42A76]",
    label: "Ansioso",
  },
}

export interface Emotion {
  value: EmotionType
  label: string
  icon: ReactNode
}

export const emotions: Emotion[] = [
  { value: "feliz", label: "Feliz", icon: <FiSmile className="text-[#FF006F]" /> },
  { value: "triste", label: "Triste", icon: <FiFrown className="text-[#FF006F]" /> },
  { value: "ansioso", label: "Ansioso", icon: <FiMeh className="text-[#FF006F]" /> },
]