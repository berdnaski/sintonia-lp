import { FiHeart } from "react-icons/fi"
import { QuestionCard } from "./question-card"
import { EmptyQuestions } from "./empty-questions"
import type { QuestionsResponse } from "./types"

interface QuestionsTabProps {
  questions: QuestionsResponse[]
  isLoadingQuestions: boolean
  onSubmitAnswer: (questionId: string, answer: string) => Promise<void>
}

export const QuestionsTab = ({ questions, isLoadingQuestions, onSubmitAnswer }: QuestionsTabProps) => {
  return (
    <>
      {isLoadingQuestions ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF006F]"></div>
        </div>
      ) : questions.length === 0 ? (
        <EmptyQuestions />
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} onSubmitAnswer={onSubmitAnswer} />
          ))}
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl bg-[#F1DDE6]/50 border border-[#FF006F]/10">
        <div className="flex items-start gap-3">
          <div className="mt-1 w-6 h-6 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
            <FiHeart className="text-[#FF006F]" size={14} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#B42A76] mb-1">Por que as perguntas são importantes?</h3>
            <p className="text-sm text-[#353434]">
              Refletir sobre estas perguntas pode ajudar a fortalecer seu relacionamento. Considere discuti-las com seu
              parceiro para melhorar a comunicação e compreensão mútua.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

