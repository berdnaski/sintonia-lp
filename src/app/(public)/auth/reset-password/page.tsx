"use client"


import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/form/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { KeyRound, Mail, ArrowLeft, Send } from "lucide-react"
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { authRepository, sendResetPasswordSchema, type SendResetPasswordRequest } from "@/repositories/auth-repository"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

export default function ResetPassword() {
  const form = useForm<SendResetPasswordRequest>({
    resolver: zodResolver(sendResetPasswordSchema),
    defaultValues: {
      email: ""
    }
  });
  
  const { isSubmitting, errors } = form.formState

  const handleSendResetPassword = form.handleSubmit(async (data) => {
    try {
      await authRepository.sendResetPassword(data)

      toast.success("Email enviado! Verifique sua caixa de entrada para redefinir sua senha.")
    } catch (error) {
      form.setError("root", {
        message: "Falha ao enviar email"
      })
    }
  })
  
  return (
    <Form {...form}>
      <div
        className="flex min-h-screen item-center justify-center w-full p-4 md:p-8"
        style={{
          background: "linear-gradient(135deg, #FF788D, #E30224, #FF006F)",
          backgroundSize: "200% 200%",
        }}
      >
        <div className="flex flex-col md:flex-row item-center justify-center w-full max-w-6xl mx-auto gap-8 items-center">
          <Card className="w-full item-center justify-center flex flex-col md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-6">
                  <KeyRound className="h-6 w-6 text-pink-500" />
                  <h1 className="text-2xl font-bold text-gray-900">Recuperação de senha</h1>
                </div>
                <p className="text-gray-600">
                  Enviaremos um link para o seu email que permitirá redefinir sua senha e recuperar o acesso à sua conta.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSendResetPassword}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      name="email"
                      placeholder="exemplo@email.com"
                      icon={Mail}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
                    {!isSubmitting && <Send size={16} />}
                  </span>
                </Button>

                <div className="pt-2">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors gap-1"
                  >
                    <ArrowLeft size={14} />
                    Voltar para o login
                  </Link>
                </div>
              </form>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2 text-sm">Como funciona:</h3>
                <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
                  <li>Insira o email associado à sua conta</li>
                  <li>Enviaremos um link de redefinição para seu email</li>
                  <li>Clique no link e crie uma nova senha</li>
                </ol>
              </div>
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
  )
}
