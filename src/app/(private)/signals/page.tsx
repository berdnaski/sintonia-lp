"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useResponseMessages } from "@/hooks/use-response-messages"
import { useAuth } from "@/hooks/use-auth"
import { useCouple } from "@/hooks/use-couple"
import { FiHeart } from "react-icons/fi"
import toast from "react-hot-toast"
import { signalMessages, signalRepository, type SignalRequest } from "@/repositories/signals-repository"
import { questionsRepository } from "@/repositories/questions-repository"


import { SignalsList } from "@/components/signals/signals-list"
import type { AIResponse, SignalWithAdvice, QuestionsResponse } from "@/components/signals/types"
import { SignalFormTab } from "@/components/signals/signal-form-tab"
import { QuestionsTab } from "@/components/signals/question-tab"
import withCouple from "@/layouts/with-couple"

const SignalForm = () => {
  const { toastError } = useResponseMessages()
  const { user } = useAuth()
  const { couple } = useCouple()
  const [signals, setSignals] = useState<SignalWithAdvice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const [questions, setQuestions] = useState<QuestionsResponse[]>([])
  const [activeTab, setActiveTab] = useState("signal")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      if (user && couple) {
        setIsLoadingQuestions(true)
        try {
          const questionsData = await questionsRepository.findAllQuestions(user.id)
          setQuestions(questionsData)
        } catch (error) {
          console.error("Erro ao carregar as perguntas", error)
        } finally {
          setIsLoadingQuestions(false)
        }
      }
    }

    fetchQuestions()
  }, [user, couple])

  useEffect(() => {
    if (couple) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          const signalsData = await signalRepository.getSignals(couple.id, 3)

          if (signalsData.length > 0) {
            const signalIds = signalsData.map((signal) => signal.id)
            const aiResponsesData = await signalRepository.getAiResponse(couple.id, undefined, signalIds)

            const signalsWithAI = signalsData.map((signal) => ({
              ...signal,
              advice: aiResponsesData.find((ai: AIResponse) => ai.signalId === signal.id)?.advice || null,
            }))

            setSignals(signalsWithAI)
          } else {
            setSignals([])
          }
        } catch (error) {
          console.error("Error fetching data:", error)
          toast.error("Erro ao carregar os sinais. Por favor, tente novamente.")
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [couple])

  const handleCreateSignal = async (data: SignalRequest) => {
    if (!user || !couple) {
      toast.error("Usuário ou casal não encontrado.")
      return
    }

    setIsSubmitting(true)
    try {
      const signalData = {
        ...data,
        userId: user.id,
        coupleId: couple.id,
      }

      await signalRepository.createSignal(signalData)
      toast.success("Sinal enviado com sucesso!")

      if (couple) {
        const signalsData = await signalRepository.getSignals(couple.id, 3)

        const signalIds = signalsData.map((signal) => signal.id)
        const aiResponsesData = await signalRepository.getAiResponse(couple.id, undefined, signalIds)

        const signalsWithAI = signalsData.map((signal) => ({
          ...signal,
          advice: aiResponsesData.find((ai: AIResponse) => ai.signalId === signal.id)?.advice || null,
        }))

        setSignals(signalsWithAI)
      }
    } catch (error) {
      toastError(error, signalMessages)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitAnswer = async (questionId: string, answer: string) => {
    if (!user) {
      toast.error("Usuário não encontrado.")
      return
    }

    try {
      const response = await questionsRepository.submitAnswer(questionId, {
        answer,
        userId: user.id,
      })

      setQuestions(questions.map((q) => (q.id === questionId ? response : q)))
      toast.success("Resposta enviada com sucesso!")
    } catch (error) {
      console.error("Erro ao enviar resposta:", error)
      toast.error("Erro ao enviar resposta. Por favor, tente novamente.")
      throw error
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
      <div className="relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden sm:-top-80 blur-3xl">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FF006F]/20 to-[#B42A76]/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#302d2d] mb-2">Sinais do Casal</h1>
        <p className="text-[#353434] max-w-xl mx-auto">
          Detecte os sinais, resolva os problemas antes de crescerem. Compartilhe como você está se sentindo hoje.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="flex flex-col bg-white rounded-2xl shadow-md border border-[#FF006F]/10 transition-all duration-300 hover:shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-3">
                <FiHeart className="text-[#FF006F]" />
              </div>
              <h2 className="text-xl font-semibold text-[#302d2d]">Compartilhar & Aprender</h2>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-[#F1DDE6]/30 p-1 rounded-lg">
                <TabsTrigger
                  value="signal"
                  className="data-[state=active]:bg-[#F1DDE6] data-[state=active]:text-[#B42A76] rounded-md py-2 text-sm"
                >
                  Registrar Sinal
                </TabsTrigger>
                <TabsTrigger
                  value="questions"
                  className="data-[state=active]:bg-[#F1DDE6] data-[state=active]:text-[#B42A76] rounded-md py-2 text-sm"
                >
                  Perguntas & Respostas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signal" className="mt-0">
                <SignalFormTab onSubmit={handleCreateSignal} isSubmitting={isSubmitting} />
              </TabsContent>

              <TabsContent value="questions" className="mt-0">
                <QuestionsTab
                  questions={questions}
                  isLoadingQuestions={isLoadingQuestions}
                  onSubmitAnswer={handleSubmitAnswer}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <SignalsList signals={signals} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default withCouple(SignalForm)

