import { FiMail } from "react-icons/fi"

export const EmptySignals = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6">
    <div className="w-16 h-16 rounded-full bg-[#F1DDE6] flex items-center justify-center mb-4">
      <FiMail className="text-[#FF006F]" size={24} />
    </div>
    <h3 className="text-[#302d2d] font-medium mb-1">Nenhum sinal registrado</h3>
    <p className="text-[#353434] text-sm max-w-xs">
      Compartilhe como você está se sentindo utilizando o formulário ao lado.
    </p>
  </div>
)

