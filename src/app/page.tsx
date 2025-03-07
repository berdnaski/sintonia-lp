"use client";

import { Button } from "@/components/ui/button";
import {
  PlayIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import CardFunction from "@/components/card";
import { Plans } from "@/components/plans";
import { Questions } from "@/components/questions";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-[8rem]">
      <div>
        <h1 className="flex text-8xl text-[#302d2d] max-w-4xl items-center justify-center text-center font-bold text-gradient-diamond">
          Pequenos sinais, grandes conexões
        </h1>

        <p className="flex font-sans text-[#353434] text-xl max-w-2xl text-center mx-auto mt-[2rem]">
          Detecte os sinais, resolva os problemas antes de crescerem. Sintonia:
          onde a comunicação é o segredo, para o amor duradouro
        </p>

        <div className="relative mt-[2rem]">
          <Button className="font-semibold px-12 py-5 bg-[#FF006F] flex mx-auto z-10 hover:bg-[#FF005F] transition-all duration-300 transform hover:scale-105 shadow-glow">
            Lista de Espera
          </Button>
        </div>
      </div>

      <div className="relative mt-[8rem] w-full max-w-3xl h-[450px] bg-black flex justify-center items-center rounded-xl shadow-lg mb-[8rem]">
        <PlayIcon className="w-16 h-16 text-white" />
      </div>

      <div className="bg-[#F1DDE6] w-full py-16 mb-[1rem]">
        <div className="flex flex-col justify-center max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button className="w-[80px] text-white rounded-xl bg-[#B42A75] hover:bg-[#B42A76] transition-all duration-300">
              Benefícios
            </Button>
            <h1 className="text-4xl md:text-5xl text-[#B42A76] max-w-4xl font-bold mt-4 text-start">
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
                  <span className="text-3xl font-bold text-[#FF0000] flex items-center justify-center text-center">72%</span>
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
                  Percebem <span className="text-[#B42A76] font-semibold">tarde demais</span>
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#FF0000] flex items-center justify-center text-center">43%</span>
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
                  Com o nosso <span className="text-[#B42A76] font-semibold">Sintonia</span>
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#18E05B] flex items-center justify-center text-center">67%</span>
                  <span className="text-[#B42A76]">melhoram a comunicação</span>
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
                  <span className="text-3xl font-bold text-[#18E05B] flex items-center justify-center text-center">81%</span>
                  <span className="text-[#B42A76]">Resolvem as crise</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div>
        <CardFunction />
      </div>

      <div>
        <Plans />
      </div>

      <div>
        <Questions />
      </div>

      <div className="mt-[4rem] w-full flex">
        <Footer />
      </div>
    </div>
  );
}
