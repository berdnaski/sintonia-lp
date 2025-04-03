import { Message } from "@/hooks/use-response-messages";
import api from "@/services/api";
import { z } from "zod";

export const coupleMessages: Message = {
  error: {
    NOT_FOUND: "Casal não encontrado",
    default: "Algo deu errado. Recarregue a página e tente novamente"
  },
  success: {
    updated: "Salvo com sucesso!"
  }
}

export const updateSchema = z.object({
  startAt: z.date().optional().refine(
    (date) => date ? date <= new Date() : true,
    {
      message: "A data não pode ser no futuro",
    }
  ),
})

export type UpdateCoupleRequest = z.infer<typeof updateSchema>

const resource = '/couples'

export const coupleRepository = {
  findByUser: async (userId: string) => {
    const { data: response } = await api.get<Couple>(`${resource}/by-user/${userId}`)

    return response
  },
  metrics: async (coupleId: string) => {
    const { data: response } = await api.get<CoupleMetric>(`${resource}/${coupleId}/metrics`)

    return response
  },
  update: async (data: UpdateCoupleRequest) => {
    const { data: response } = await api.put<Couple>(`${resource}/by-user`, data)

    return response
  }
};



