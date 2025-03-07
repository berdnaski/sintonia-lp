import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCircleCheck } from "react-icons/fa6";
import { Smartphone } from "lucide-react";

export function Plans() {
  return (
    <div>
      <div className="flex flex-col mt-[1rem] w-full mb-8 items-center justify-center mx-auto">
        <div className="flex flex-col justify-center max-w-6xl mx-auto px-4">
          <Button className="w-[100px] py-2 bg-[#B42A76] flex items-center justify-center mx-auto text-white rounded-xl hover:bg-[#B42A79] transition-all duration-300">
            Planos
          </Button>
          <h1 className="text-4xl md:text-5xl text-[#B42A76] font-bold mt-8 text-center max-w-3xl mx-auto">
            Em pleno 2025, vai deixar seu relacionamento esfriar?
          </h1>

          <p className="text-[#353434] text-xl text-center max-w-2xl mx-auto mt-6">
            Adquira o Micro-Sinais e fortaleça seu relacionamento, crescendo
            juntos em amor e compreensão!
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row mx-auto justify-between items-center max-w-3xl w-full mt-16 p-6 bg-gradient-to-r from-white to-[#FFF2F8] rounded-xl shadow-sm border border-[#B42A76]/10 gap-4"
          >
            <div className="flex flex-col text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#292929]">
                Experimente a Sintonia <span className="text-[#FF006F]">sem compromisso</span>
              </h2>
            </div>
            
            <div className="flex items-center text-center justify-center gap-2 bg-[#B42A76]/10 px-5 py-2 rounded-full">
              <span className="text-2xl font-bold text-[#FF006F]">15 dias</span>
            </div>
          </motion.div>

          <div className="flex flex-row justify-center gap-8 mt-[4rem] w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-row gap-8 justify-center w-full max-w-7xl"
            >
              {/* Popular Plan */}
              <div className="w-full max-w-[400px]">
                <Card className="h-[600px] shadow-2xl flex flex-col items-center bg-white hover:scale-105 transition-all duration-300">
                  <CardHeader className="flex text-center justify-center space-y-4 pt-8">
                    <CardTitle className="text-4xl font-normal text-[#292929]">
                      Sintonia
                    </CardTitle>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-4xl font-bold text-[#292929]">
                        Mensal
                      </p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-[#e3ab02]">
                          R$49,90
                        </span>
                        <span className="text-gray-500">/mês</span>
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center justify-between h-full w-full px-8 pt-8">
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
                          className="flex items-center gap-4"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <FaCircleCheck
                            size={28}
                            className="text-[#e3ab02] flex-shrink-0"
                          />
                          <li className="text-[#353434] font-medium">
                            {feature}
                          </li>
                        </motion.div>
                      ))}
                    </motion.ul>

                    <motion.div
                      className="w-full mt-8 mb-8"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full py-6 bg-[#e3ab02] hover:bg-[#e3ab01] text-lg font-semibold transition-all duration-300 shadow-lg hover:cursor-pointer">
                        Escolher Plano
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative w-full max-w-[400px]">
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF006F] to-[#B42A76] text-white px-6 py-2 rounded-full font-semibold z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mais Vendido
                </motion.div>
                <Card className="h-[600px] shadow-2xl flex flex-col items-center bg-white hover:scale-105 transition-all duration-300 border-[#FF006F] border-2">
                  <CardHeader className="flex text-center justify-center space-y-4 pt-8">
                    <CardTitle className="text-4xl font-normal text-[#292929]">
                      Sintonia
                    </CardTitle>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-4xl font-bold text-[#292929]">Anual</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-[#FF006F]">
                          R$29,90
                        </span>
                        <span className="text-gray-500">/mês</span>
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center justify-between h-full w-full px-8 pt-8">
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
                          className="flex items-center gap-4"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <FaCircleCheck
                            size={28}
                            className="text-[#FF006F] flex-shrink-0"
                          />
                          <li className="text-[#353434] font-medium">
                            {feature}
                          </li>
                        </motion.div>
                      ))}
                    </motion.ul>

                    <motion.div
                      className="w-full mt-8 mb-8"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full py-6 bg-[#FF006F] hover:bg-[#FF005F] text-lg font-semibold transition-all duration-300 shadow-lg hover:cursor-pointer">
                        Escolher Plano
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
          {/* Special offer card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-20 w-full max-w-5xl mx-auto"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-[#FF006F]/5 via-white to-[#FF006F]/10">
              <div className="flex flex-col md:flex-row items-center gap-12 p-10">
                <div className="flex-1 space-y-6">
                  <div className="inline-block bg-[#FF006F]/10 px-4 py-2 rounded-full">
                    <span className="text-[#FF006F] font-medium">Presente Especial</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[#292929]">
                    Assine o plano anual e ganhe um <span className="text-[#FF006F]">site personalizado!</span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    Um espaço digital único para eternizar os momentos especiais do casal.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[#6D243F]">
                      <FaCircleCheck className="text-[#FF006F] w-5 h-5" />
                      <span>Design exclusivo e personalizado</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#6D243F]">
                      <FaCircleCheck className="text-[#FF006F] w-5 h-5" />
                      <span>Domínio personalizado incluso</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#6D243F]">
                      <FaCircleCheck className="text-[#FF006F] w-5 h-5" />
                      <span>Hospedagem gratuita</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="mt-4 bg-[#FF006F] hover:bg-[#FF005F] text-lg px-8 py-6 w-full md:w-auto">
                      Demonstre seu amor de um jeito único
                    </Button>
                  </motion.div>
                </div>

                <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#FF006F]/20 to-[#FF006F]/5 rounded-2xl">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-[#292929]">
                      Economize <span className="text-[#FF006F]">40%</span>
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-500 line-through">R$49,90/mês</p>
                      <p className="text-3xl font-bold text-[#FF006F]">R$29,90/mês</p>
                    </div>
                    <p className="text-sm text-[#6D243F]">
                      + Site personalizado grátis
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
