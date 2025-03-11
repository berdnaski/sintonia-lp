"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { KeyRound, Mail, ArrowLeft, Send } from "lucide-react"
import { toast } from "react-hot-toast"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Por favor, insira seu endereço de email.")
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      toast.success("Email enviado! Verifique sua caixa de entrada para redefinir sua senha.")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen item-center justify-center w-full bg-[#FF788D] p-4 md:p-8">
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

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                    placeholder="exemplo@email.com"
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
        </Card>
      </div>
    </div>
  )
}

