'use client';

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCircleCheck } from "react-icons/fa6"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth";

export default function PlansPage() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();

  const userId = user?.id;

  const handleMonthlyPlanClick = async () => {
    if (!userId) {
      console.log('Você precisa estar logado para comprar planos.')
      return;
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/checkout/${userId}`, {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      } else {
        console.error("Erro ao obter a URL de checkout")
      }
    } catch (error) {
      console.error("Erro ao fazer requisição:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnnualPlanClick = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/checkout/${userId}`, {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      } else {
        console.error("Erro ao obter a URL de checkout")
      }
    } catch (error) {
      console.error("Erro ao fazer requisição:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="pt-[90px] min-h-screen bg-gradient-to-b from-white to-[#FFF2F8]/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12 pt-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#B42A76] font-bold mb-4">
              Escolha seu plano Sintonia
            </h1>
            <p className="text-[#353434] text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Selecione o plano ideal para fortalecer seu relacionamento e crescer juntos em amor e compreensão.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
            <div className="w-full max-w-[400px] mx-auto">
              <Card className="h-full shadow-xl flex flex-col items-center bg-white hover:scale-105 transition-all duration-300 pb-6">
                <CardHeader className="flex text-center justify-center space-y-4 pt-8">
                  <CardTitle className="text-3xl md:text-4xl font-normal text-[#292929]">Sintonia</CardTitle>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-bold text-[#292929]">Mensal</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-[#e3ab02]">R$49,90</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-between h-full w-full px-4 sm:px-8 pt-8">
                  <ul className="space-y-6 w-full">
                    {[
                      "Alertas personalizados para o seu relacionamento",
                      "Insights exclusivos para fortalecer a conexão",
                      "Site personalizado",
                      "Mais conexão por menos",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <FaCircleCheck size={24} className="text-[#e3ab02] flex-shrink-0 mt-0.5 sm:mt-0" />
                        <li className="text-[#353434] text-sm sm:text-base font-medium">{feature}</li>
                      </div>
                    ))}
                  </ul>

                  <div className="w-full mt-8 mb-2 md:mb-8">
                    <Button
                      className="w-full py-4 md:py-6 bg-[#e3ab02] hover:bg-[#e3ab01] text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:cursor-pointer"
                      onClick={handleMonthlyPlanClick}
                      disabled={loading}
                    >
                      {loading ? 'Carregando...' : 'Assinar Plano Mensal'}
                    </Button>
                  </div>
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
              <Card className="h-full shadow-xl flex flex-col items-center bg-white hover:scale-105 transition-all duration-300 border-[#FF006F] border-2 pb-6">
                <CardHeader className="flex text-center justify-center space-y-4 pt-8">
                  <CardTitle className="text-3xl md:text-4xl font-normal text-[#292929]">Sintonia</CardTitle>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-bold text-[#292929]">Anual</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-[#FF006F]">R$29,90</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-between h-full w-full px-4 sm:px-8 pt-8">
                  <ul className="space-y-6 w-full">
                    {[
                      "Alertas personalizados para o seu relacionamento",
                      "Insights exclusivos para fortalecer a conexão",
                      "Site personalizado",
                      "Mais conexão por menos",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <FaCircleCheck size={24} className="text-[#FF006F] flex-shrink-0 mt-0.5 sm:mt-0" />
                        <li className="text-[#353434] text-sm sm:text-base font-medium">{feature}</li>
                      </div>
                    ))}
                  </ul>

                  <div className="w-full mt-8 mb-2 md:mb-8">
                    <Button
                      className="w-full py-4 md:py-6 bg-[#FF006F] hover:bg-[#FF005F] text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:cursor-pointer"
                      onClick={handleAnnualPlanClick}
                      disabled={loading}
                    >
                      {loading ? 'Carregando...' : 'Assinar Plano Anual'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#353434] text-sm">
              Ao escolher o plano anual, você economiza 40% e ganha um site personalizado!
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
