import { z } from "zod";
import api from "@/services/api";
import { PaginateParams } from "@/@types";

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

const deleteMemory = async (id: string) => {
  const response = await api.delete(`/memories/${id}`);
  return response.data;
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

  getMemories: async (coupleId: string, params = {} as PaginateParams) => {
    const { perPage = 8, page = 1} = params

    const { data } = await api.get<Paginate<Memory>>(`/memories/${coupleId}`, {
      params: {
        perPage,
        page,
      },
    });

    return data;
  }, 
  deleteMemory,
};



