import { PaginateParams } from "@/@types";
import { QuestionsResponse } from "@/components/signals/types";
import { Message } from "@/hooks/use-response-messages";
import api from "@/services/api";

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
  findAllQuestions: async (userId: string, params = {} as PaginateParams) => {
    const { data: response } = await api.get<Paginate<Question>>(`${resource}/all/${userId}`, {
      params
    })

    return response.data.map(question => ({
      ...question,
      createdAt: new Date(question.createdAt),
      updatedAt: new Date(question.updatedAt)
    }))
  },

  submitAnswer: async (questionId: string, updateData: IUpdateQuestion) => {
    const { data } = await api.put<QuestionsResponse>(`${resource}/answer/${questionId}`, updateData)
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    }
  }
}




