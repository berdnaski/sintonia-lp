import { create } from "zustand"
import { coupleRepository } from "@/repositories/couple-repository";
import { useAuth } from "./use-auth";

interface CoupleStore {
  couple: Couple | null;
  fetchCouple: () => void;
  cleanCouple: () => void
}

export const useCouple = create<CoupleStore>((set, get) => ({
  couple: null,
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
  cleanCouple:  () => {
    set({ couple: null })
  }
}))
