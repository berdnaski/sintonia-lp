import api from "@/services/api";
import { z } from "zod";

export const inviteSchema = z.object({
  email: z.string().min(3, {
    message: "Por favor, digite um endereço de e-mail"
  })
})

export type InviteRequest = z.infer<typeof inviteSchema>

export interface InviteResponse {
  id: string;
  relationshipStatus: InviteStatus;
  user1Id: string;
  user2Id: string;
  token: string;
  createdAt: string;
}

export const inviteMessages = {
  error: {
    "There is already a pending invitation for that email.": "Já existe um convite pendente para esse e-mail.",
    "You cannot invite yourself.": "Você não pode convidar a si mesmo",
    "Already have a pending invitation.": "Você já tem um convite pendente",
    NOT_FOUND: "Convite não encontrado",
    default: "Algo deu errado, atualize a página e tente novamente."
  },
  success: {
    invited: "Convite enviado com sucesso!",
    inviteAccepted: "Convite aceito com sucesso!"
  }
}

const resource = '/couples/invite'

export const inviteRepository = {
  invite: async (data: InviteRequest) => {
    const { data: response} = await api.post<InviteResponse>(`${resource}`, data);

    return response;
  },
  findByToken: async (token: string) => {
    const { data: response} = await api.get<Invite>(`${resource}/token/${token}`);

    return response;
  },
  findByInviter: async (id: string) => {
    const { data: response} = await api.get<Invite>(`${resource}/by-inviter/${id}`);

    return response;
  },
  acceptInvite: async (token: string) => {
    const { data: response} = await api.post<InviteResponse>(`${resource}/accept/${token}`);

    return response;
  },
  cancelInvite: async (userId: string) => {
    await api.delete(`${resource}/by-inviter/${userId}`);
  }
};


