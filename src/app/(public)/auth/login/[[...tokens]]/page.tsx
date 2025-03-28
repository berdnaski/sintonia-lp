"use client"

import React from "react";
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/form/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LockKeyhole, Mail } from "lucide-react"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authRepository, LoginRequest, loginSchema } from "@/repositories/auth-repository"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth"
import { Form } from "@/components/ui/form";
import { InputPassword } from "@/components/ui/form/input-password";

export default function Login({
  params,
}: {
  params: Promise<{ tokens?: string[] }>
}) {
  const router = useRouter()
  const { authenticate } = useAuth()

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { isSubmitting, errors } = form.formState

  const { tokens } = React.use(params)

  const inviteToken = tokens?.length ? tokens[0] : null

  const handleLogin = form.handleSubmit(async (data) => {
    try {
      const { user, token } = await authRepository.login(data)

      authenticate(user, token)

      if (inviteToken) {
        return router.push(`/couple/invite/accept/${inviteToken}`)
      }

      return router.push('/dashboard')
    } catch (error) {
      form.setError("root", {
        message: "Email ou senha inválidos"
      })
    }
  })

  return (
    <Form {...form}>
      <div className="flex min-h-screen w-full bg-[#FFF2F8] p-4 md:p-8">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8 items-center">
          <Card className="w-full md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
                <p className="text-gray-600">Pequenos sinais, grandes conexões. Faça login para continuar sua jornada.</p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    name="email"
                    icon={Mail}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">
                      Senha
                    </Label>
                    <Link
                      href="/auth/reset-password"
                      className="text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors"
                    >
                      Esqueceu?
                    </Link>
                  </div>
                  <InputPassword
                    required
                    name="password"
                    icon={LockKeyhole}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center text-gray-600 pt-2">
                  Não tem uma conta?{" "}
                  <Link href="/auth/register" className="text-pink-500 hover:text-pink-600 font-medium transition-colors">
                    Cadastrar
                  </Link>
                </div>
              </form>
            </div>

            {errors.root?.message && (
              <div className="mt-2">
                <p className="text-sm font-medium text-red-500">{errors.root.message}</p>
              </div>
            )}
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
                Faça login para descobrir conexões significativas e compartilhar momentos especiais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
