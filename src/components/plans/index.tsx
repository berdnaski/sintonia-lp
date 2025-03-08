"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCircleCheck } from "react-icons/fa6"
import Link from "next/link"

export function Plans() {
  return (
    <div>
      <div className="flex flex-col mt-[1rem] w-full mb-8 items-center justify-center mx-auto">
        <div className="flex flex-col justify-center max-w-6xl mx-auto px-4">
          <Button className="w-[100px] py-2 bg-[#B42A76] flex items-center justify-center mx-auto text-white rounded-xl hover:bg-[#B42A79] transition-all duration-300">
            Planos
          </Button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#B42A76] font-bold mt-6 md:mt-8 text-center max-w-3xl mx-auto">
            Em pleno 2025, vai deixar seu relacionamento esfriar?
          </h1>

          <p className="text-[#353434] text-base font-light sm:text-lg md:text-xl text-center max-w-2xl mx-auto mt-4 md:mt-6">
            Adquira o Micro-Sinais e fortaleça seu relacionamento, crescendo juntos em amor e compreensão!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex sm:flex-col xl:flex-row xl:justify-between mx-auto justify-between items-center max-w-3xl w-full mt-10 md:mt-16 p-4 md:p-6 bg-gradient-to-r from-white to-[#FFF2F8] rounded-xl shadow-sm border border-[#B42A76]/10"
          >
            <div className="flex sm:flex-col xl:flex-row xl:justify-between text-center w-full mb-4 md:mb-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[#292929]">
                Experimente a Sintonia <span className="text-[#FF006F]">sem compromisso</span>
              </h2>
            </div>

            <div className="flex items-center text-center justify-center gap-2 bg-[#B42A76]/10 px-5 py-2 rounded-full">
              <span className="text-xl md:text-2xl font-bold text-[#FF006F]">15 dias</span>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center mt-[2rem] md:mt-[4rem] w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row  justify-center w-full max-w-7xl"
            >
              {/* Popular Plan */}
              <div className="w-full max-w-[400px] mx-auto">
                <Card className="h-auto md:h-[600px] shadow-2xl flex flex-col items-center bg-white hover:scale-105 transition-all duration-300 pb-6">
                  <CardHeader className="flex text-center justify-center space-y-4 pt-8">
                    <CardTitle className="text-3xl md:text-4xl font-normal text-[#292929]">Sintonia</CardTitle>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-3xl md:text-4xl font-bold text-[#292929]">Mensal</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl md:text-4xl font-bold text-[#e3ab02]">R$49,90</span>
                        <span className="text-gray-500">/mês</span>
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center justify-between h-full w-full px-4 sm:px-8 pt-8">
                    <motion.ul
                      className="space-y-6 w-full"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {[
                        "Alertas personalizados para o seu relacionamento",
                        "Insights exclusivos para fortalecer a conexão",
                        "Site personalizado",
                        "Mais conexão por menos",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start sm:items-center gap-3 sm:gap-4"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <FaCircleCheck size={24} className="text-[#e3ab02] flex-shrink-0 mt-0.5 sm:mt-0" />
                          <li className="text-[#353434] text-sm sm:text-base font-medium">{feature}</li>
                        </motion.div>
                      ))}
                    </motion.ul>

                    <motion.div
                      className="w-full mt-8 mb-2 md:mb-8"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full py-4 md:py-6 bg-[#e3ab02] hover:bg-[#e3ab01] text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:cursor-pointer">
                                 <Link href='https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw' target="_blank">
                  Entrar na Lista de Espera
                </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative w-full max-w-[400px] mx-auto mt-8 md:mt-0">
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF006F] to-[#B42A76] text-white px-6 py-2 rounded-full font-semibold z-10 text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mais Vendido
                </motion.div>
                <Card className="h-auto md:h-[600px] shadow-2xl flex flex-col items-center bg-white hover:scale-105 transition-all duration-300 border-[#FF006F] border-2 pb-6">
                  <CardHeader className="flex text-center justify-center space-y-4 pt-8">
                    <CardTitle className="text-3xl md:text-4xl font-normal text-[#292929]">Sintonia</CardTitle>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-3xl md:text-4xl font-bold text-[#292929]">Anual</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl md:text-4xl font-bold text-[#FF006F]">R$29,90</span>
                        <span className="text-gray-500">/mês</span>
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center justify-between h-full w-full px-4 sm:px-8 pt-8">
                    <motion.ul
                      className="space-y-6 w-full"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {[
                        "Alertas personalizados para o seu relacionamento",
                        "Insights exclusivos para fortalecer a conexão",
                        "Site personalizado",
                        "Mais conexão por menos",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start sm:items-center gap-3 sm:gap-4"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <FaCircleCheck size={24} className="text-[#FF006F] flex-shrink-0 mt-0.5 sm:mt-0" />
                          <li className="text-[#353434] text-sm sm:text-base font-medium">{feature}</li>
                        </motion.div>
                      ))}
                    </motion.ul>

                    <motion.div
                      className="w-full mt-8 mb-2 md:mb-8"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full py-4 md:py-6 bg-[#FF006F] hover:bg-[#FF005F] text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:cursor-pointer">
                                 <Link href='https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw' target="_blank">
                  Entrar na Lista de Espera
                </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 md:mt-20 w-full max-w-5xl mx-auto"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-[#FF006F]/5 via-white to-[#FF006F]/10">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10">
                <div className="flex-1 space-y-4 md:space-y-6">
                  <div className="inline-block bg-[#FF006F]/10 px-4 py-2 rounded-full">
                    <span className="text-[#FF006F] text-sm md:text-base font-medium">Presente Especial</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#292929]">
                    Assine o plano anual e ganhe um <span className="text-[#FF006F]">site personalizado!</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-600">
                    Um espaço digital único para eternizar os momentos especiais do casal.
                  </p>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 md:gap-4 text-[#6D243F]">
                      <FaCircleCheck className="text-[#FF006F] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Design exclusivo e personalizado</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-[#6D243F]">
                      <FaCircleCheck className="text-[#FF006F] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Domínio personalizado incluso</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-[#6D243F]">
                      <FaCircleCheck className="text-[#FF006F] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Hospedagem gratuita</span>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                    <Button className="mt-2 md:mt-4 hover:cursor-pointer bg-[#FF006F] hover:bg-[#FF005F] text-base md:text-lg px-4 md:px-8 py-4 md:py-6 w-full md:w-auto">
                    <Link href='https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw' target="_blank">
                  Demonstre o seu Amor
                </Link>
                    </Button>
                  </motion.div>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-[#FF006F]/20 to-[#FF006F]/5 rounded-2xl w-full mt-6 md:mt-0">
                  <div className="text-center space-y-4 md:space-y-6">
                    <h3 className="text-xl md:text-5xl font-bold text-[#292929]">
                      Economize <span className="text-[#FF006F]">40%</span>
                    </h3>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-gray-500 line-through text-sm md:text-base">R$49,90/mês</p>
                      <p className="text-2xl md:text-5xl font-bold text-[#FF006F]">R$29,90/mês</p>
                    </div>
                    <p className="text-xs md:text-sm text-[#6D243F]">+ Site personalizado grátis</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

