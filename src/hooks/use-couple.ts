import { setAPIAuthToken } from "@/services/api";
import { create } from "zustand"
import Cookies from "js-cookie";
import { userRepository } from "@/repositories/user-repository";
import { coupleRepository } from "@/repositories/couple-repository";
import { useAuth } from "./use-auth";

interface AuthStore {
  couple: Couple | null;
  fetchCouple: () => void;
  cleanCouple: () => void
}

export const useCouple = create<AuthStore>((set, get) => ({
  couple: null,
  fetchCouple: async () => {
    try {
      const { user } = useAuth.getState()

      if (!user) {
        get().cleanCouple()
        return
      }

      console.log({ user })
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
