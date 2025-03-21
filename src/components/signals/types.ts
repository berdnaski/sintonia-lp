import type { SignalResponse } from "@/repositories/signals-repository"

export type AIResponse = {
  signalId: string
  advice: string
}

export type SignalWithAdvice = SignalResponse & {
  advice: string | null
}

export interface QuestionCardProps {
  question: QuestionsResponse
  onSubmitAnswer: (questionId: string, answer: string) => Promise<void>
}

export interface SignalCardProps {
  signal: SignalWithAdvice
}

export interface QuestionsResponse {
  id: string
  coupleId: string
  userId: string
  question: string
  answer: string
  wasAnswered: boolean
  createdAt: Date
  updatedAt: Date
}

