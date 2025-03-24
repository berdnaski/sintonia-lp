"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FiHelpCircle, FiHeart, FiSend } from "react-icons/fi"
import type { QuestionCardProps } from "./types"

export const QuestionCard = ({ question, onSubmitAnswer }: QuestionCardProps) => {
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (answer.trim() && !question.answer) {
      setIsSubmitting(true)
      try {
        await onSubmitAnswer(question.id, answer)
        setAnswer("")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Card className="border border-[#FF006F]/10 hover:shadow-md transition-all duration-300 overflow-hidden bg-white mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 w-6 h-6 rounded-full bg-[#F1DDE6] flex-shrink-0 flex items-center justify-center">
            <FiHelpCircle className="text-[#FF006F]" size={14} />
          </div>
          <div className="w-full">
            <h4 className="text-[#302d2d] font-medium text-sm mb-2">{question.question}</h4>

            {!question.answer ? (
              <form onSubmit={handleSubmit} className="mt-3">
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Digite sua resposta..."
                  className="min-h-[80px] rounded-xl border-2 border-[#FF006F]/10 resize-none focus:ring-2 focus:ring-[#FF006F] focus:border-transparent transition-all p-3 text-[#353434] text-sm mb-2"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className={`px-6 py-2.5 bg-[#FF006F] hover:bg-[#FF005F] text-white hover:cursor-pointer rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm flex items-center gap-2 ${!answer.trim() ? "opacity-70 cursor-not-allowed" : ""}`}
                    disabled={isSubmitting || !answer.trim()}
                  >
                    {isSubmitting ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        Responder <FiSend className="ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-3 pt-3 border-t border-[#FF006F]/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#F1DDE6] flex items-center justify-center">
                    <FiHeart className="text-[#FF006F]" size={12} />
                  </div>
                  <p className="text-[#B42A76] text-xs font-medium">Sua resposta:</p>
                </div>
                <p className="text-[#353434] text-sm">{question.answer}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

