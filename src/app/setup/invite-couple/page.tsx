"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Send, User } from "lucide-react"
import { toast } from "react-hot-toast"

export default function InviteCouple() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(45)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

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
    <div
      className="flex min-h-screen item-center justify-center w-full p-4 md:p-8"
      style={{
        background: "linear-gradient(135deg, #FF788D, #E30224, #FF006F)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="flex flex-col md:flex-row item-center justify-center w-full max-w-6xl mx-auto gap-8 items-center">
        <Card className="w-full h-[50vh] item-center justify-center flex flex-col md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2 relative">
              <div className="h-7 rounded-full bg-zinc-200 overflow-hidden relative">
                <div
                  className="h-full bg-[#FF5FA4] absolute left-0 top-0 transition-all duration-1000 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                  Etapa 1 de 3
                </div>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <h1 className="font-bold text-3xl">Vamos configurar sua conta</h1>
                  <p className="text-[#FF5FA4] font-light text-sm">
                    Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <Input
                    id="partner-name"
                    type="text"
                    className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                    placeholder="Insira o nome do parceiro(a)"
                    required
                  />
                </div>
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
                    placeholder="Insira o email do parceiro(a)"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? "Enviando..." : "Enviar convite"}
                  {!isSubmitting && <Send size={16} />}
                </span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

