import { PaginateParams } from "@/@types";
import api from "@/services/api";

export const summaryMessages = {
  error: {
    NOT_FOUND: "Resumo não encontrado",
    default: "Algo deu errado. Recarregue a página e tente novamente"
  },
  success: {
  }
}

const resource = '/summary';

export interface DailySummary {
  id: string;
  coupleId: string;
  date: string;   
  summary: string;
  insights: string;
  createdAt: string;
  updatedAt: string;
}

export interface Paginate<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
  }
}

export const summaryRepository = {
  findSummaries: async (coupleId: string, params = {} as PaginateParams) => {
    const { data: response } = await api.get<Paginate<DailySummary>>(`${resource}/all/${coupleId}`, {
      params
    });

    console.log('Asaoksa', response);

    const summaries = response.data.map(summary => ({
      ...summary,
      date: new Date(summary.date),
      createdAt: new Date(summary.createdAt),
      updatedAt: new Date(summary.updatedAt),
    }));

    return {
      data: summaries,
      meta: response.meta
    };
  },

  findOne: async (summaryId: string) => {
    const { data } = await api.get<DailySummary>(`${resource}/${summaryId}`);
    return {
      ...data,
      date: new Date(data.date),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  },

  findLatestByCouple: async (coupleId: string) => {
    const { data } = await summaryRepository.findSummaries(coupleId, { page: 1, perPage: 1 });
    return data[0] || null;
  },
}
