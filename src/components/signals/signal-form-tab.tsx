"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FiSend } from "react-icons/fi"
import { emotions } from "./emotion-config"
import { type SignalRequest, signalSchema } from "@/repositories/signals-repository"
import type { EmotionType } from "./emotion-config"
import { EmotionTips } from "./emotion-tip"

interface SignalFormTabProps {
  onSubmit: (data: SignalRequest) => Promise<void>
  isSubmitting: boolean
}

export const SignalFormTab = ({ onSubmit, isSubmitting }: SignalFormTabProps) => {
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
    formState: { errors },
    watch,
  } = form

  const currentEmotion = watch("emotion") as EmotionType
  const currentNote = watch("note")
  const isFormValid = currentEmotion && currentNote

  const currentEmotionConfig = currentEmotion
    ? {
        bg: "bg-[#F1DDE6]",
        border: "border-[#FF006F]/20",
        text: "text-[#B42A76]",
        icon: emotions.find((e) => e.value === currentEmotion)?.icon || emotions[2].icon,
        label: emotions.find((e) => e.value === currentEmotion)?.label || "Emoção",
      }
    : null

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      {currentEmotionConfig && <EmotionTips emotionConfig={currentEmotionConfig} currentEmotion={currentEmotion} />}
    </>
  )
}

