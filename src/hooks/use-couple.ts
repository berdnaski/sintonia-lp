import { create } from "zustand"
import { coupleRepository } from "@/repositories/couple-repository";
import { useAuth } from "./use-auth";

interface CoupleStore {
  couple: Couple | null;
  metrics: CoupleMetric | null;
  fetchCouple: () => void;
  cleanCouple: () => void;
  fetchMetrics: () => void;
}

export const useCouple = create<CoupleStore>((set, get) => ({
  couple: null,
  metrics: null,
  fetchCouple: async () => {
    try {
      const { user } = useAuth.getState()

      if (!user) {
        get().cleanCouple()
        return
      }

      const couple = await coupleRepository.findByUser(user.id)

      set({ couple })
    } catch {
      get().cleanCouple()
    }
  },
  fetchMetrics: async () => {
    try {
      const { couple } = get()

      if (!couple) {
        return
      }

      const metrics = await coupleRepository.metrics(couple.id)

      set({ metrics })
    } catch {
      set({ metrics: null })
    }
  },
  cleanCouple:  () => {
    set({ couple: null, metrics: null })
  }
}))
