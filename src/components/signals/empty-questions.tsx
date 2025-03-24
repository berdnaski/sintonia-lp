import { FiHelpCircle } from "react-icons/fi"

export const EmptyQuestions = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 rounded-full bg-[#F1DDE6] flex items-center justify-center mx-auto mb-4">
      <FiHelpCircle className="text-[#B42A76]" size={24} />
    </div>
    <h3 className="text-[#302d2d] font-medium mb-1">Nenhuma pergunta disponível</h3>
    <p className="text-[#353434] text-sm max-w-xs mx-auto">
      As perguntas ajudam a refletir sobre o relacionamento e serão adicionadas em breve.
    </p>
  </div>
)

