import { setAPIAuthToken } from "@/services/api";
import { create } from "zustand"
import Cookies from "js-cookie";
import { userRepository } from "@/repositories/user-repository";

interface AuthStore {
  user: User | null;
  authenticate: (user: User, token: string) => void;
  fetchUser: () => Promise<User | undefined>;
  clearUser: () => void;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: {} as User,
  authenticate: (user: User, token: string) => {
    setAPIAuthToken(token)
    Cookies.set('token', token)

    set({ user })
  },
  fetchUser: async () => {
    try {
      const token = Cookies.get('token')

      if (token) {
        setAPIAuthToken(token)

        const { user } = await userRepository.me()

        set({ user })

        return user
      } else {
        get().clearUser()
      }
    } catch (error) {
      get().clearUser()
    }
  },
  clearUser: () => {
    Cookies.remove('token')
    set({ user: null })
  }
}))
