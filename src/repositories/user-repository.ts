import api from "@/services/api";

const resource = 'users'

export const userRepository = {
  me: async () => {
    const { data: response } = await api.post<User>(`${resource}/me`)

    return response
  },
  findByIdOrEmail: async (idOrEamil: string) => {
    const { data: response } = await api.get<User>(`${resource}/${idOrEamil}`)

    return response
  }
}
