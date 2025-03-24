import { FiMessageCircle } from "react-icons/fi"
import { SignalCard } from "./signal-card"
import { EmptySignals } from "./empty-signals"
import type { SignalWithAdvice } from "./types"

interface SignalsListProps {
  signals: SignalWithAdvice[]
  isLoading: boolean
}

export const SignalsList = ({ signals, isLoading }: SignalsListProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#FF006F]/10 flex flex-col h-[640px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-3">
            <FiMessageCircle className="text-[#FF006F]" />
          </div>
          <h2 className="text-xl font-semibold text-[#302d2d]">Últimos Sinais</h2>
        </div>
        <span className="px-3 py-1 bg-[#F1DDE6] text-[#B42A76] rounded-full text-xs font-medium">
          {signals.length} registros
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF006F]"></div>
          </div>
        ) : signals.length === 0 ? (
          <EmptySignals />
        ) : (
          <div className="grid gap-4 grid-cols-1">
            {signals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

