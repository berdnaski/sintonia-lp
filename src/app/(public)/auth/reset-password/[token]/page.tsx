"use client"

import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authMessages, authRepository, resetPasswordSchema, type ResetPasswordRequest } from "@/repositories/auth-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Form } from "@/components/ui/form";
import { InputPassword } from "@/components/ui/form/input-password";
import { useResponseMessages } from "@/hooks/use-response-messages";

export default function ResetPassword({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const router = useRouter()
  const { toastError } = useResponseMessages()
  const { authenticate } = useAuth()

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: ""
    }
  });

  const { isSubmitting, errors } = form.formState

  const { token: resetToken } = React.use(params)

  const handleResetPassword = form.handleSubmit(async (data) => {
    try {
      const { user, token } = await authRepository.resetPassword(data, resetToken)

      authenticate(user, token)

      return router.push('/dashboard')
    } catch (error) {
      toastError(error, authMessages)
    }
  })

  return (
    <Form {...form}>
      <div className="flex min-h-screen w-full items-center justify-center bg-[#FFF2F8] p-4 md:p-8">
        <div className="flex flex-col w-full mx-auto gap-8 items-center">
          <Card className="flex h-auto w-full md:w-xl p-8 border-none shadow-md bg-white rounded-2xl">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
                <p className="text-gray-600">Pequenos sinais, grandes conexões. Faça login para continuar sua jornada.</p>
              </div>

              <form className="space-y-5" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">
                      Senha
                    </Label>
                  </div>
                  <InputPassword
                    required
                    name="password"
                    icon={LockKeyhole}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordConfirmation" className="text-gray-700">
                      Confirme a senha
                    </Label>
                  </div>
                  <InputPassword
                    required
                    name="passwordConfirmation"
                    icon={LockKeyhole}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>

                <div className="text-center text-gray-600 pt-2">
                  Fazer login?{" "}
                  <Link href="/auth/login" className="text-pink-500 hover:text-pink-600 font-medium transition-colors">
                    Login
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
        </div>
      </div>
    </Form>
  );
}
