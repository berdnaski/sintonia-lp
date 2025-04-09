export type AIResponse = {
  signalId: string
  advice: string
}

export type SignalWithAdvice = {
  id: string
  userId: string
  coupleId: string
  emotion: string
  note?: string
  createdAt: Date
  user: User
  couple: Couple
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

