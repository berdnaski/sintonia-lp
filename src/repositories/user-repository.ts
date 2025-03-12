import api from "@/services/api";

interface UserResponse {
  user: User
}

const resource = ''

export const userRepository = {
  me: async () => {
    const { data: response } = await api.post<UserResponse>(`${resource}/me`)

    return response
  },
}
