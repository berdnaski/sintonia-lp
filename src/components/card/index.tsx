"use client"

import { ArrowRight, Sparkles, Heart, MessageCircle, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function CardFunction() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants for floating elements
  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF2F8] relative overflow-hidden">
      {mounted && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute hidden md:block"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [0, -100],
                x: Math.random() * 100 - 50,
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 2,
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${60 + Math.random() * 30}%`,
                fontSize: `${1 + Math.random() * 1.5}rem`,
              }}
            >
              ❤️
            </motion.div>
          ))}

          <motion.div
            className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-[#FF006F]/10 to-[#FF4E9E]/5 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-gradient-to-r from-[#6D243F]/10 to-[#FF006F]/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />

          <motion.div
            className="absolute top-[15%] left-[15%] hidden lg:block"
            variants={floatingAnimation}
            animate="animate"
          >
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Heart className="h-6 w-6 text-[#FF006F]" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-[20%] right-[18%] hidden lg:block"
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: 1 }}
          >
            <div className="bg-white p-3 rounded-full shadow-lg">
              <MessageCircle className="h-6 w-6 text-[#6D243F]" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[25%] right-[15%] hidden lg:block"
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: 2 }}
          >
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Zap className="h-6 w-6 text-[#FF4E9E]" />
            </div>
          </motion.div>
        </>
      )}

      <div className="w-full py-12 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl text-[#B42A76] max-w-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Revolucione seu relacionamento
          </motion.h2>

          <motion.p
            className="text-center text-[#B42A76]/80 max-w-2xl mx-auto mb-12 text-lg"
          >
            Descubra como nossa tecnologia pode transformar a forma como você se conecta com seu parceiro
          </motion.p>

          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-[#FFD6E8] relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 25px 50px rgba(255, 0, 111, 0.15)" }}
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#B42A76]/20 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#6D243F]/20 to-transparent rounded-tl-full" />

            <div className="bg-gradient-to-r from-[#B42A76] to-[#FF006F] text-white py-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    <span className="font-bold">Lista de Espera</span>
                  </p>
                  <p className="text-white/90 text-xs sm:text-sm">Tempo limitado</p>
                </div>
              </div>
              <div className="bg-white text-[#FF006F] text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-full">
                Restam 27 vagas
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#6D243F] mb-4">
                      Detector de <span className="text-[#FF006F]">Micro-Sinais</span>
                    </h2>

                    <p className="text-[#353434] text-base sm:text-lg mb-6 leading-relaxed">
                      O Sintonia identifica mudanças sutis no comportamento antes que se tornem problemas graves,
                      permitindo que você fortaleça seu relacionamento!
                    </p>
                  </motion.div>

                  <div className="space-y-4 mb-6">
                    {[
                      {
                        icon: <Zap className="h-5 w-5 text-white" />,
                        title: "Análise de padrões",
                        description: "Identifica tendências e padrões de comunicação",
                      },
                      {
                        icon: <MessageCircle className="h-5 w-5 text-white" />,
                        title: "Sugestões personalizadas",
                        description: "Recomendações baseadas no seu relacionamento único",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-gradient-to-r from-[#FF006F] to-[#FF4E9E] p-2.5 rounded-full flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#6D243F]">{item.title}</h3>
                          <p className="text-[#353434]/80 text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  {[
                    {
                      title: "Não perca seu relacionamento",
                      description: "Descubra mudanças sutis no seu relacionamento antes que virem problemas.",
                      icon: <Heart className="h-5 w-5 text-white" />,
                      gradient: "from-[#FF006F] to-[#FF4E9E]",
                      delay: 0.1,
                    },
                    {
                      title: "Relacionamentos mais fortes",
                      description: "Crie um espaço seguro para diálogos e entendimento mútuo.",
                      icon: <Zap className="h-5 w-5 text-white" />,
                      gradient: "from-[#6D243F] to-[#FF006F]",
                      delay: 0.3,
                    },
                    {
                      title: "Comunicação sem ruídos",
                      description: "Receba insights para melhorar o diálogo e evitar conflitos desnecessários.",
                      icon: <MessageCircle className="h-5 w-5 text-white" />,
                      gradient: "from-[#FF4E9E] to-[#FF006F]",
                      delay: 0.5,
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#FFF6F9] p-6 rounded-2xl border border-[#FFD6E8] relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: benefit.delay }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 15px 30px rgba(255, 0, 111, 0.15)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${benefit.gradient} opacity-10 rounded-bl-full`}
                      />

                      <div className="flex gap-4 items-start relative z-10">
                        <div className={`bg-gradient-to-r ${benefit.gradient} p-2.5 rounded-full flex-shrink-0`}>
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#6D243F] text-lg mb-2">{benefit.title}</h3>
                          <p className="text-[#353434]/80">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-10 relative">
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#FFF6F9] rounded-full opacity-70 hidden md:block" />
                <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-[#FFF6F9] rounded-full opacity-70 hidden md:block" />

                <motion.button
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF006F] to-[#FF4E9E] text-white py-5 px-8 rounded-xl font-bold w-full md:w-2/3 mx-auto shadow-lg shadow-[#FF006F]/20 relative z-10"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(255, 0, 111, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                <Link href='https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw' target="_blank">
                  Entrar na Lista de Espera
                </Link>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 text-center text-[#6D243F]/70 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p>Tenha seu relacionamento transformado, com muito amor</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

