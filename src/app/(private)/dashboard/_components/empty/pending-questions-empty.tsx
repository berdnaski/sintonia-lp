import { HelpCircle } from "lucide-react";

export function PendingQuestionsEmpty() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-gray-100 rounded-full p-3 mb-3">
        <HelpCircle className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="font-medium text-sm mb-2">Nenhuma pergunta pendente</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-4">
        Aqui aparecerão perguntas para ajudar vocês a se conhecerem melhor e fortalecerem o relacionamento.
      </p>
    </div>
  )
}
