"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b border-[#636060] relative">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto h-[90px] px-4 sm:px-8 xl:px-0">
        <h1 className="font-black text-3xl">Sintonia</h1>
        <div className="hidden xl:flex gap-4">
          <Button className="bg-[#FF708B] hover:bg-[#FA6B86] px-8 text-xl font-normal hover:cursor-pointer rounded-full">
            Entrar
          </Button>
          <Button className="text-xl text-[#FF708B] font-normal bg-transparent border border-[#FF708B] hover:bg-transparent hover:cursor-pointer rounded-full">
            Cadastrar
          </Button>
        </div>

        <button
          className="xl:hidden text-zinc-800 p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`absolute top-[90px] left-0 right-0 bg-white z-50 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden xl:hidden`}
      >
        <div className="px-4 py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4 mt-2">
            <Button className="bg-[#FF708B] hover:bg-[#FA6B86] py-6 text-xl font-normal hover:cursor-pointer rounded-full">
              Entrar
            </Button>
            <Button className="text-xl text-[#FF708B] font-normal bg-transparent border border-[#FF708B] hover:bg-transparent hover:cursor-pointer rounded-full py-6">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

