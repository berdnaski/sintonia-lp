import { z } from "zod";
import api from "@/services/api";

export const memoriesSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  avatar: z.instanceof(File).optional(),
});

const resource = '/signals'

export type MemoriesRequest = z.infer<typeof memoriesSchema>;

export interface MemoriesResponse {
  id: string;
  title: string;
  description: string;
  avatarUrl: string; 
}

export const memoriesMessages = {
  default: "Erro ao criar memória",
  error: {
    MEMORY_NOT_FOUND: "Memória não encontrada",
    INVALID_DATA: "Dados inválidos",
    UNAUTHORIZED: "Não autorizado",
    DEFAULT: "Erro ao processar a requisição",
    default: "Erro inesperado"
  }
};

export const memoriesRepository = {
  createMemory: async (data: FormData) => {
    const response = await api.post("/memories", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMemories: async (coupleId: string, limit: number = 8, page: number = 1) => {
    const { data } = await api.get<Memory[]>(`/memories/${coupleId}`, {
      params: {
        limit,
        page,
      },
    });
  
    return data;
  }
};



