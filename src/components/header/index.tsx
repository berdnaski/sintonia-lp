"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b border-[#636060] relative md:px-5">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto h-[90px] px-4 sm:px-8 xl:px-0">
        <div className="flex gap-2 items-center text-center justify-center">
          <img src="./logo.png" alt="" className="h-16 w-16" />
          <h1 className="font-black text-3xl">Sintonia</h1>
        </div>
        <div className="hidden xl:flex gap-4">
          <Link href='https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw' target="_blank">
          <Button 
            className="bg-[#FF708B] hover:bg-[#FA6B86] px-8 text-xl font-normal hover:cursor-pointer rounded-full group"
          >
            <Bell className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Avise-me do lançamento
          </Button>
          </Link>
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
        className={`absolute top-[90px] left-0 right-0 bg-[#FFF2F8] z-50 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden xl:hidden`}
      >
        <div className="px-4 py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4 mt-2">
            <Button 

              className="bg-[#FF708B] hover:bg-[#FA6B86] py-6 text-xl font-normal hover:cursor-pointer rounded-full group"
            >
              <Bell className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Avise-me do lançamento
            </Button>
            <Button 

              className="text-xl text-[#FF708B] font-normal bg-transparent border border-[#FF708B] hover:bg-[#FFF2F8] hover:cursor-pointer rounded-full py-6"
            >
              Lista de espera
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}