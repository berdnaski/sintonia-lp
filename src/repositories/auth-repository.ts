import { Message } from "@/hooks/use-response-messages";
import api from "@/services/api";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, {
    message: "Por favor, digite um endereço de e-mail"
  }).max(255).email({
    message: "Por favor, digite um endereço de e-mail válido"
  }),
  password: z.string().min(6, {
    message: "Por favor, digite uma senha válida."
  }).max(255),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, {
    message: "Nome precisa ter pelo menos 3 letras"
  }).max(20)
})

export const registerWithInviteSchema = registerSchema.omit({
  email: true
})

export type RegisterRequest = z.infer<typeof registerSchema>
export type RegisterWithInviteRequest = z.infer<typeof registerWithInviteSchema>
export type LoginRequest = z.infer<typeof loginSchema>

interface AuthResponse {
  user: User
  token: string
}

const resource = '/auth'

export const authMessages: Message = {
  error: {
    "Email already in use.": "Já existe uma conta com esse e-mail.",
    default: "Email ou senha inválidos"
  },
}

export const authRepository = {
  register: async (data: RegisterRequest) => {
    const { data: response } = await api.post<AuthResponse>(`${resource}/register`, data)

    return response
  },
  login: async (data: LoginRequest) => {
    const { data: response } = await api.post<AuthResponse>(`${resource}/login`, data)

    return response
  },
  registerWithInvite: async (data: RegisterWithInviteRequest, inviteToken: string) => {
    const { data: response } = await api.post<AuthResponse>(`${resource}/register-with-invite/token/${inviteToken}`, data)

    return response
  },
}
