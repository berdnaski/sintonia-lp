"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LockKeyhole, Mail } from "lucide-react"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authRepository, RegisterRequest, registerSchema } from "@/repositories/auth-repository"
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios"
import { useAuth } from "@/hooks/use-auth"

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema)
  });

  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">
          Name
        </Label>
        <Input
          id="name"
          className="h-11 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
          placeholder="exemplo@email.com"
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
          icon={Mail}
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
  )
}
