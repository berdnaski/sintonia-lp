import { Message } from "@/hooks/use-response-messages";
import api from "@/services/api";
import type { QuestionsResponse } from "@/components/signals/types"

export interface QuestionsResponse {
  id: string;
  coupleId: string;
  userId: string;
  question: string;
  answer: string;
  wasAnswered: boolean;
}


export const questionsMessages: Message = {
  error: {
    NOT_FOUND: "Casal não encontrado",
    default: "Algo deu errado. Recarregue a página e tente novamente"
  },
  success: {
  }
}

const resource = '/questions'

export interface IUpdateQuestion {
  answer: string
  userId: string
}

export const questionsRepository = {
  findAllQuestions: async (userId: string) => {
    const { data } = await api.get<QuestionsResponse[]>(`/questions/all/${userId}`)
    return data.map(question => ({
      ...question,
      createdAt: new Date(question.createdAt),
      updatedAt: new Date(question.updatedAt)
    }))
  },
  
  submitAnswer: async (questionId: string, updateData: IUpdateQuestion) => {
    const { data } = await api.put<QuestionsResponse>(`/questions/answer/${questionId}`, updateData)
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    }
  }
}




