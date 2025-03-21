import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Routes } from "@/constants/routes";
import { HeartCrack, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-pink-50 px-4 text-center py-10">
      <div className="max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <HeartCrack className="h-16 w-16 text-pink-500" />
        </div>

        <h1 className="mb-2 text-4xl font-bold text-gray-800">Oops! Página não encontrada</h1>

        <p className="mb-8 text-lg text-gray-600">
          Parece que nos perdemos no caminho do amor. Esta página não existe.
        </p>

        <div className="mb-8 overflow-hidden rounded-2xl bg-pink-100 p-4">
          <Image src="/couple.png" alt="Casal" width={300} height={300} className="mx-auto" />
        </div>

        <p className="mb-6 text-pink-600">Vamos voltar juntos para um lugar familiar?</p>

        <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
          <Link href={Routes.DASHBOARD} className="flex items-center gap-2">
            <Home size={18} />
            <span>Voltar para o início</span>
          </Link>
        </Button>
      </div>

      <p className="mt-8 text-sm text-gray-500">&copy; {new Date().getFullYear()} {siteConfig.name} &middot; {siteConfig.description}</p>
    </div>
  )
}
