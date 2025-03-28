import { Message } from "@/hooks/use-response-messages";
import api from "@/services/api";

export const coupleMessages: Message = {
  error: {
    NOT_FOUND: "Casal não encontrado",
    default: "Algo deu errado. Recarregue a página e tente novamente"
  },
  success: {
  }
}

const resource = '/couples'

export const coupleRepository = {
  findByUser: async (userId: string) => {
    const { data: response } = await api.get<Couple>(`${resource}/by-user/${userId}`)

    return response
  },
  metrics: async (coupleId: string) => {
    const { data: response } = await api.get<CoupleMetric>(`${resource}/${coupleId}/metrics`)

    return response
  }
};



