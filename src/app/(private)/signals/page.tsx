"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useResponseMessages } from "@/hooks/use-response-messages"
import { useForm, Controller } from "react-hook-form"
import {
  signalMessages,
  signalRepository,
  signalSchema,
  type SignalRequest,
  type SignalResponse,
} from "@/repositories/signals-repository"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useAuth } from "@/hooks/use-auth"
import { useCouple } from "@/hooks/use-couple"
import { FiSmile, FiFrown, FiMeh, FiMessageCircle, FiSend, FiMail, FiHeart } from "react-icons/fi"

type AIResponse = {
  signalId: string
  advice: string
}

const emotionConfig = {
  feliz: {
    icon: <FiSmile size={18} />,
    bg: "bg-[#F1DDE6]",
    border: "border-[#FF006F]/20",
    text: "text-[#B42A76]",
    label: "Feliz",
  },
  triste: {
    icon: <FiFrown size={18} />,
    bg: "bg-[#F1DDE6]",
    border: "border-[#FF006F]/20",
    text: "text-[#B42A76]",
    label: "Triste",
  },
  ansioso: {
    icon: <FiMeh size={18} />,
    bg: "bg-[#F1DDE6]",
    border: "border-[#FF006F]/20",
    text: "text-[#B42A76]",
    label: "Ansioso",
  },
}

const SignalCard = ({ signal }: { signal: SignalResponse & { advice: string | null } }) => {
  const style = emotionConfig[signal.emotion as keyof typeof emotionConfig] || emotionConfig.ansioso

  return (
    <div className="border border-[#FF006F]/10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white">

      <div className="p-4">
        <p className="text-[#353434] text-sm leading-relaxed">{signal.note || "Sem mensagem"}</p>

        {signal.advice && (
          <div className="mt-3 pt-3 border-t border-[#FF006F]/10">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 rounded-full bg-[#F1DDE6] flex items-center justify-center">
                <FiHeart className="text-[#FF006F]" size={12} />
              </div>
              <p className="text-[#B42A76] text-xs font-medium">Resposta da IA:</p>
            </div>
            <p className="text-[#353434] text-sm">{signal.advice}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const EmptySignals = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6">
    <div className="w-16 h-16 rounded-full bg-[#F1DDE6] flex items-center justify-center mb-4">
      <FiMail className="text-[#B42A76]" size={24} />
    </div>
    <h3 className="text-[#302d2d] font-medium mb-1">Nenhum sinal registrado</h3>
    <p className="text-[#353434] text-sm max-w-xs">
      Compartilhe como você está se sentindo utilizando o formulário ao lado.
    </p>
  </div>
)

const SignalForm = () => {
  const { toastError } = useResponseMessages()
  const { user } = useAuth()
  const { couple } = useCouple()
  const [signals, setSignals] = useState<(SignalResponse & { advice: string | null })[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (couple) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const signalsData = await signalRepository.getSignals(couple.id, 3);
  
          if (signalsData.length > 0) {
            const signalIds = signalsData.map(signal => signal.id);
            const aiResponsesData = await signalRepository.getAiResponse(couple.id, undefined, signalIds);
  
            const signalsWithAI = signalsData.map((signal) => ({
              ...signal,
              advice: aiResponsesData.find((ai: AIResponse) => ai.signalId === signal.id)?.advice || null,
            }));
  
            setSignals(signalsWithAI);
          } else {
            setSignals([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Erro ao carregar os sinais. Por favor, tente novamente.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [couple]);
  

  const form = useForm<SignalRequest>({
    resolver: zodResolver(signalSchema),
    defaultValues: {
      emotion: "",
      note: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = form
  const currentEmotion = watch("emotion")
  const currentNote = watch("note")
  const isFormValid = currentEmotion && currentNote

  const handleCreateSignal = async (data: SignalRequest) => {
    if (!user || !couple) {
      toast.error("Usuário ou casal não encontrado.")
      return
    }

    try {
      const signalData = {
        ...data,
        userId: user.id,
        coupleId: couple.id,
      }

      await signalRepository.createSignal(signalData)
      reset()
      toast.success("Sinal enviado com sucesso!")

      if (couple) {
        const signalsData = await signalRepository.getSignals(couple.id, 3)

        const signalIds = signalsData.map(signal => signal.id)
        const aiResponsesData = await signalRepository.getAiResponse(couple.id, undefined, signalIds)

        const signalsWithAI = signalsData.map((signal) => ({
          ...signal,
          advice: aiResponsesData.find((ai: AIResponse) => ai.signalId === signal.id)?.advice || null,
        }))

        setSignals(signalsWithAI)
      }
    } catch (error) {
      toastError(error, signalMessages)
    }
  }

  const emotions = [
    { value: "feliz", label: "Feliz", icon: <FiSmile className="text-[#FF006F]" /> },
    { value: "triste", label: "Triste", icon: <FiFrown className="text-[#FF006F]" /> },
    { value: "ansioso", label: "Ansioso", icon: <FiMeh className="text-[#FF006F]" /> },
  ]

  const currentEmotionConfig = currentEmotion
    ? {
        bg: "bg-[#F1DDE6]",
        border: "border-[#FF006F]/20",
        text: "text-[#B42A76]",
        icon: emotions.find((e) => e.value === currentEmotion)?.icon || <FiMeh className="text-[#FF006F]" />,
        label: emotions.find((e) => e.value === currentEmotion)?.label || "Emoção",
      }
    : null

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
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#FF006F]/10 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-3">
              <FiHeart className="text-[#FF006F]" />
            </div>
            <h2 className="text-xl font-semibold text-[#302d2d]">Registrar Sinal</h2>
          </div>

          <form onSubmit={handleSubmit(handleCreateSignal)} className="space-y-5">
            <div>
              <label htmlFor="emotion" className="block text-sm font-medium text-[#353434] mb-2">
                Como você está se sentindo?
              </label>
              <Controller
                name="emotion"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value || ""}>
                    <SelectTrigger
                      className={`w-full rounded-xl border-2 ${currentEmotionConfig ? currentEmotionConfig.border : "border-[#FF006F]/10"} shadow-sm ${currentEmotionConfig ? currentEmotionConfig.bg : "bg-white"} text-[#353434] focus:ring-2 focus:ring-[#FF006F] focus:border-transparent transition-all h-12`}
                    >
                      <SelectValue placeholder="Selecione uma emoção" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-lg shadow-lg border-2 border-[#FF006F]/10 mt-1 w-full p-1">
                      {emotions.map((emotion) => (
                        <SelectItem
                          key={emotion.value}
                          value={emotion.value}
                          className="px-4 py-3 text-sm text-[#353434] hover:bg-[#F1DDE6] rounded-md cursor-pointer m-1 transition-colors"
                        >
                          <span className="inline-flex items-center gap-2">
                            {emotion.icon}
                            {emotion.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.emotion && <p className="text-red-500 text-xs mt-1">Por favor, selecione uma emoção</p>}
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-[#353434] mb-2">
                Compartilhe seus pensamentos
              </label>
              <Controller
                name="note"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Escreva como você está se sentindo e por quê..."
                    className={`min-h-[150px] rounded-xl border-2 ${currentEmotionConfig ? currentEmotionConfig.border : "border-[#FF006F]/10"} resize-none focus:ring-2 focus:ring-[#FF006F] focus:border-transparent transition-all p-4 text-[#353434]`}
                  />
                )}
              />
              {errors.note && <p className="text-red-500 text-xs mt-1">Por favor, escreva uma mensagem</p>}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="submit"
                className={`px-6 py-2.5 bg-[#FF006F] hover:bg-[#FF005F] text-white hover:cursor-pointer rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm flex items-center gap-2 ${!isFormValid ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    Registrar <FiSend className="ml-1" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {currentEmotionConfig && (
            <div className="mt-4 p-4 rounded-xl bg-[#F1DDE6] border border-[#FF006F]/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  {currentEmotionConfig.icon}
                </div>
                <h3 className="text-sm font-medium text-[#B42A76]">
                  Dicas para momentos de {currentEmotionConfig.label.toLowerCase()}
                </h3>
              </div>
              <p className="text-sm text-[#353434]">
                {currentEmotion === "feliz" &&
                  "Aproveite esse momento positivo! Compartilhe sua felicidade com seu parceiro para fortalecer a conexão entre vocês."}
                {currentEmotion === "triste" &&
                  "Está tudo bem se sentir triste às vezes. Abrir-se sobre seus sentimentos pode ajudar seu parceiro a entender e apoiar você."}
                {currentEmotion === "ansioso" &&
                  "Respiração profunda pode ajudar nos momentos de ansiedade. Comunicar o que te preocupa é o primeiro passo para resolver juntos."}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#FF006F]/10 flex flex-col h-[640px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-3">
                <FiMessageCircle className="text-[#FF006F]" />
              </div>
              <h2 className="text-xl font-semibold text-[#302d2d]">Últimos Sinais</h2>
            </div>
            <span className="px-3 py-1 bg-[#F1DDE6] text-[#B42A76] rounded-full text-xs font-medium">
              {signals.length} registros
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF006F]"></div>
              </div>
            ) : signals.length === 0 ? (
              <EmptySignals />
            ) : (
              <div className="grid gap-4 grid-cols-1">
                {signals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignalForm

