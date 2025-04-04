import { useCouple } from "@/hooks/use-couple"
import { cn } from "@/lib/utils"
import { Bell, Heart, AudioLines, MessageCircleMore, AudioWaveform } from "lucide-react"
import { useEffect } from "react"
import { HeaderSkeleton } from "./skeletons/header-skeleton"

export function Header() {
  const { metrics, fetchMetrics } = useCouple()

  const items = [
    {
      label: "Sintonia",
      value: metrics?.synchrony,
      bg: "bg-green-500",
      text: "text-green-500",
      icon: <Heart color="#FFFFFF" fill="#FFFFFF" className="size-5" />
    },
    {
      label: "Conexão",
      value: metrics?.connection,
      bg: "bg-blue-500",
      text: "text-blue-500",
      icon: <AudioLines color="#FFFFFF" className="size-5" />
    },
    {
      label: "Comunicação",
      value: metrics?.communication,
      bg: "bg-pink-500",
      text: "text-pink-500",
      icon: <MessageCircleMore color="#FFFFFF" className="size-5" />
    },
    {
      label: "Intensidade",
      value: metrics?.intensity,
      bg: "bg-purple-500",
      text: "text-purple-500",
      icon: <AudioWaveform color="#FFFFFF" className="size-5" />
    }
  ]

  useEffect(() => {
    fetchMetrics()
  }, [])

  if (!metrics) {
    return <HeaderSkeleton />;
  }

  return (
    <div className="flex justify-between items-center p-4 border-b mt-4 bg-white rounded-md md:mt-20 lg:mt-4">
      {items.map(item => (
        <div key={`${item.label}-${item.value}`} className="flex items-center gap-1">
          <div className={cn("w-7 h-7 rounded-full flex items-center justify-center", item.bg)}>
            {item.icon}
          </div>
          <span className={cn("text-sm font-medium", item.text)}>{`${item.label}: ${item.value}%`}</span>
        </div>
      ))}

      <div className="flex items-center gap-1">
        <div className="relative">
          <Bell className="h-5 w-5 text-amber-500" />
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </div>
      </div>
    </div>
  )
}
