"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import CardFunction from "@/components/card"
import { Plans } from "@/components/plans"
import { Questions } from "@/components/questions"
import { Footer } from "@/components/footer"
import { AppPreview } from "@/components/app-preview"
import { DecorativeDots, DecorativeGrid, WavyLine } from "@/components/decorative"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <header
        className={`w-full py-4 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <img src="./logo.png" alt="Sintonia Logo" className="w-[42px] h-[42px] md:w-[48px] md:h-[48px]" />
              </motion.div>
              <h1 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-[#FF006F] to-[#B42A76] bg-clip-text text-transparent">
                Sintonia
              </h1>
            </Link>

            <Button
              className="bg-[#FF006F] hover:bg-[#FF005F] text-white font-medium px-4 py-2 h-auto transition-all duration-300 transform hover:scale-105 shadow-sm hidden sm:flex"
              size="sm"
            >
              <Link href="https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw" target="_blank">
                Lista de Espera
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="relative">
        <DecorativeGrid variant="pink" size="lg" position="left" className="top-0 opacity-30 hidden md:block" />
        <DecorativeDots variant="pink" rows={4} cols={4} className="absolute -right-12 top-1/4 hidden md:grid" />

        <h1 className="flex md:text-8xl text-4xl text-[#302d2d] max-w-4xl items-center justify-center text-center font-bold text-gradient-diamond">
          Pequenos sinais, grandes conexões
        </h1>

        <p className="flex font-sans text-[#353434] text-md md:text-xl max-w-2xl text-center mx-auto mt-[2rem]">
          Detecte os sinais, resolva os problemas antes de crescerem. Sintonia: onde a comunicação é o segredo, para o
          amor duradouro
        </p>

        <div className="relative mt-[2rem]">
          <Button className="font-semibold px-12 py-5 bg-[#FF006F] flex mx-auto z-10 hover:bg-[#FF005F] transition-all duration-300 transform hover:scale-105 shadow-glow">
            <Link href='https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw' target="_blank">
              Lista de Espera
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative xl:mt-[8rem] mt-[3rem] w-full max-w-6xl mx-auto mb-[6rem] sm:mb-[8rem] px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <AppPreview />
        </motion.div>
        <DecorativeGrid
          variant="light"
          size="sm"
          position="right"
          className="bottom-[-5%] sm:bottom-[-10%] opacity-40 sm:size-md"
        />
        <DecorativeDots
          variant="pink"
          rows={3}
          cols={3}
          className="absolute left-[5%] top-1/4 hidden lg:grid opacity-40"
        />
      </div>

      <div className="bg-[#F1DDE6] w-full py-16 mb-[1rem] relative">
        <DecorativeGrid variant="pink" size="md" position="left" className="top-12 opacity-30" />
        <DecorativeDots variant="pink" rows={3} cols={3} className="absolute right-[10%] bottom-12 hidden md:grid" />

        <div className="flex flex-col justify-center max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button className="w-[80px] text-white rounded-xl bg-[#B42A75] hover:bg-[#B42A76] transition-all duration-300">
              Benefícios
            </Button>
            <h1 className="text-3xl md:text-5xl text-[#B42A76] max-w-4xl font-bold mt-4 text-start">
              Os Micro-Sinais já afetaram seu relacionamento e você nem percebeu!
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 flex justify-center items-center rounded-2xl border border-[#B42A76]/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-lg font-medium text-center ">
                  Os <span className="text-[#B42A76] font-semibold">sinais</span> dentro do relacionamento
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#FF0000] flex items-center justify-center text-center">
                    72%
                  </span>
                  <span className="text-[#B42A76]">são ignorados</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 flex justify-center items-center rounded-2xl border border-[#FF006F]/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-lg font-medium text-center ">
                  Quando percebem já é <span className="text-[#B42A76] font-semibold">tarde demais</span>
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#FF0000] flex items-center justify-center text-center">
                    43%
                  </span>
                  <span className="text-[#B42A76]">não notam</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 flex justify-center items-center rounded-2xl border border-[#FF006F]/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-lg font-medium text-center ">
                  Com a <span className="text-[#B42A76] font-semibold">Sintonia</span>
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#18E05B] flex items-center justify-center text-center">
                    67%
                  </span>
                  <span className="text-[#B42A76]">melhoram diálogo</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 flex justify-center items-center rounded-2xl border border-[#FF006F]/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-lg font-medium text-center ">
                  Evite o <span className="text-[#B42A76] font-semibold">término</span>
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#18E05B] flex items-center justify-center text-center">
                    81%
                  </span>
                  <span className="text-[#B42A76]">Resolvem as crise</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full my-8 relative">
        <WavyLine variant="pink" className="opacity-50" />
        <DecorativeGrid variant="pink" size="sm" position="center" className="opacity-30 -mt-6" />
      </div>

      <div className="relative w-full">
        <DecorativeDots variant="pink" rows={5} cols={2} className="absolute left-[5%] top-1/4 hidden lg:grid" />
        <DecorativeGrid variant="pink" size="md" position="right" className="top-3/4 opacity-30 hidden lg:block" />
        <CardFunction />
      </div>

      <div className="w-full my-8 relative">
        <WavyLine variant="pink" className="opacity-50 transform rotate-180" />
        <DecorativeGrid variant="pink" size="sm" position="center" className="opacity-30 -mt-6" />
      </div>

      <div className="relative w-full">
        <DecorativeGrid variant="pink" size="md" position="left" className="top-1/4 opacity-30 hidden lg:block" />
        <DecorativeDots variant="pink" rows={3} cols={3} className="absolute right-[5%] top-1/2 hidden lg:grid" />
        <Plans />
      </div>

      <div className="w-full my-8 relative">
        <WavyLine variant="pink" className="opacity-50" />
        <DecorativeGrid variant="pink" size="sm" position="center" className="opacity-30 -mt-6" />
      </div>

      <div className="relative w-full">
        <DecorativeDots variant="pink" rows={4} cols={2} className="absolute left-[5%] top-1/3 hidden lg:grid" />
        <DecorativeGrid variant="pink" size="md" position="right" className="bottom-1/4 opacity-30 hidden lg:block" />
        <Questions />
      </div>

      <div className="mt-[4rem] w-full flex">
        <Footer />
      </div>
    </div>
  )
}
