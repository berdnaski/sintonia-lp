"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LockKeyhole, Mail, User } from "lucide-react"

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulação de login - implementar lógica real aqui
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirecionar após login bem-sucedido
    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-pink-50 to-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8 items-center">
        <Card className="w-full md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
              <p className="text-gray-600">Pequenos sinais, grandes conexões. Faça login para continuar sua jornada.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <User size={16} className="text-pink-500" />
                  Insira seu nome
                </Label>
                <Input
                  id="name"
                  type="name"
                  className="h-12 bg-white/90 border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-xl transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

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
                    className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockKeyhole size={16} className="text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                    required
                  />
                </div>
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
  )
}

