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
    message: "A senha deve ter no mínimo 6 caracteres."
  }).max(255),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, {
    message: "Nome precisa ter pelo menos 3 letras"
  }).max(20)
})

export const sendResetPasswordSchema = z.object({
   email: z.string().min(3, {
    message: "Por favor, digite um endereço de e-mail"
  }).max(255).email({
    message: "Por favor, digite um endereço de e-mail válido"
  }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres."
  }).max(255),
  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  path: ['passwordConfirmation'],
  message: 'As senhas não coincidem.',
});

export const registerWithInviteSchema = registerSchema.omit({
  email: true
})

export type RegisterRequest = z.infer<typeof registerSchema>
export type RegisterWithInviteRequest = z.infer<typeof registerWithInviteSchema>
export type LoginRequest = z.infer<typeof loginSchema>
export type SendResetPasswordRequest = z.infer<typeof sendResetPasswordSchema>
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>

interface AuthResponse {
  user: User
  token: string
}

const resource = '/auth'

export const authMessages: Message = {
  error: {
    "Email already in use.": "Já existe uma conta com esse e-mail.",
    INVALID_TOKEN: "Token inválido",
    TOKEN_EXPIRED: "Email expirado",
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
  sendResetPassword: async (data: SendResetPasswordRequest) => {
    const { data: response } = await api.post<AuthResponse>(`send-reset-password/${data.email}`, data)

    return response
  },
  resetPassword: async (data: ResetPasswordRequest, resetPasswordToken: string) => {
    const { data: response } = await api.post<AuthResponse>(`reset-password/${resetPasswordToken}`, data)

    return response
  },
}
