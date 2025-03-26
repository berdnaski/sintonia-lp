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
  },
  uploadAvatar: async (file: File) => {
    const { data } = await api.post('/uploads', {
      file
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
  update: async (userId: string, data: Partial<User>) => {
    const { data: response } = await api.put<User>(`${resource}/${userId}`, data)

    return response;
  }
}
