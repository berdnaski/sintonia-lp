import { Message } from "@/hooks/use-response-messages";
import api from "@/services/api";

export const inviteMessages: Message = {
  error: {
    NOT_FOUND: "Casal não encontrado",
    default: "Erro ao enviar convite. Tente novamente"
  },
  success: {
    invited: "Convite enviado com sucesso!",
  }
}

const resource = '/couples'

export const coupleRepository = {
  findByUser: async (userId) => {
    const { data: response } = await api.get<Couple>(`${resource}/by-user/${userId}`)

    return response
  }
};



