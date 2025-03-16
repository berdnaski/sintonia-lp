'use client'

import React, { useEffect, useState } from "react"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LockKeyhole, Mail } from "lucide-react"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authMessages, authRepository, RegisterWithInviteRequest, registerWithInviteSchema } from "@/repositories/auth-repository"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth"
import { useResponseMessages } from "@/hooks/use-response-messages"
import { inviteMessages, inviteRepository } from "@/repositories/invite-couple-repository"
import { userRepository } from "@/repositories/user-repository"
import { Routes } from "@/constants/routes"

export default function RegisterWithInvite({
  params
}: {
  params: {
    id: string
  }
}) {
  const router = useRouter()
  const { toastError } = useResponseMessages()
  const { authenticate } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterWithInviteRequest>({
    resolver: zodResolver(registerWithInviteSchema),
  });

  const [invite, setInvite] = useState({
    inviteeEmail: ""
  } as Invite)

  // @ts-ignore:next-line
  const { token: inviteToken } = React.use(params)

  const validateIfInviteExists = async () => {
    try {
      const invite = await inviteRepository.findByToken(inviteToken)

      if (!invite || invite.used) {
        router.push(Routes.LOGIN());
        return;
      }

      const userAlreadyExists =  await userRepository.findByIdOrEmail(invite.inviterId)

      if (userAlreadyExists?.id) {
        router.push(Routes.LOGIN(inviteToken))
        return
      }

      setInvite(invite)
    } catch (error) {
      toastError(error, inviteMessages);
      router.push(Routes.LOGIN());
    }
  };

  useEffect(() => {
    const load = async () => {
      await validateIfInviteExists()
    }

    load()
  }, [])

  const handleRegister = handleSubmit(async (data) => {
    try {
      const { user, token } = await authRepository.registerWithInvite(data, inviteToken)

      authenticate(user, token)

      router.push('/dashboard')
    } catch (error) {
      toastError(error, authMessages);
    }
  })

  return (
    <div className="flex min-h-screen w-full bg-[#FFF2F8] p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8 items-center">
        <Card className="w-full md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Bem vindo a Sintonia</h1>
              <p className="text-gray-600">Pequenos sinais, grandes conexões. Crie uma conta para continuar sua jornada.</p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  className="h-11 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                  placeholder="exemplo@email.com"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                  placeholder="exemplo@email.com"
                  value={invite.inviteeEmail}
                  icon={Mail}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">
                    Senha
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                  icon={LockKeyhole}
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </div>

        </Card>

        <div className="hidden md:block w-full md:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1887&auto=format&fit=crop"
              alt="Couple illustration"
              className="w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-medium text-gray-800">Conecte-se</h2>
            <p className="text-gray-600 mt-1">
              Faça seu cadastro para descobrir conexões significativas e compartilhar momentos especiais.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
