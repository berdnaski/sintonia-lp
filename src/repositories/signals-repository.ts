import { PaginateParams } from "@/@types";
import api from "@/services/api";
import { z } from "zod";

export const signalSchema = z.object({
  userId: z.string().optional(),
  coupleId: z.string().optional(),
  emotion: z.string().min(1, {
    message: "Por favor, selecione uma emoção"
  }),
  note: z.string().min(1, {
    message: "Por favor, escreva um sinal"
  }).max(255, {
    message: "Por favor, insira um comentário com no máximo 255 caracteres"
  })
})

export type SignalRequest = z.infer<typeof signalSchema>

export const signalMessages = {
  error: {
    "user_not_found": "Usuário não encontrado. Verifique o ID do usuário.",
    "couple_not_found": "Relacionamento não encontrado. Verifique o ID do casal.",
    "emotion_required": "A emoção é obrigatória. Por favor, selecione uma emoção.",
    "note_too_long": "O comentário excede o limite de 255 caracteres. Por favor, insira um comentário mais curto.",
    "default": "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
  },
  success: {
    "signal_created": "Sinal registrado com sucesso!",
    "signal_updated": "Sinal atualizado com sucesso!",
    "signal_deleted": "Sinal excluído com sucesso!",
    "invite_accepted": "Convite aceito com sucesso!",
    "signal_sent": "Sinal enviado para o casal com sucesso!"
  }
};

const resource = '/signals'

export interface AIResponse {
  id: string;
  coupleId: string;
  signalId: string;
  summary: string;
  advice: string;
  challenge?: string;
  createdAt: Date;
  couple: Couple;
}

export const signalRepository = {
  createSignal: async (data: SignalRequest) => {
    const { data: response } = await api.post<Signal[]>(`${resource}`, data);
    return response;
  },

  getSignals: async (coupleId: string, params = {} as PaginateParams) => {
    const { page = 1, perPage = 8 } = params

    const { data: signals } = await api.get<Paginate<Signal>>(`${resource}/couple/${coupleId}`, {
      params: {
        perPage,
        page,
        orderBy: 'createdAt',
        order: 'desc'
      },
    });

    return signals;
  },

  getAiResponse: async (coupleId: string, signalIds?: string[], params = {} as PaginateParams) => {
    const { data: aiResponse } = await api.get<Paginate<AIResponse>>(`/ai-responses/${coupleId}`, {
      params: {
        params,
        signalIds: signalIds ? signalIds.join(',') : undefined,
        orderBy: 'createdAt',
        order: 'desc'
      }
    });

    return aiResponse;
  }

};

