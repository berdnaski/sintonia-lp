"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { questionsRepository } from "@/repositories/questions-repository"
import { ChevronRight, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { CardSkeleton } from "./skeletons/card-skeleton"

interface Question {
  id: string
  question: string
  answer?: string
}

export function PendingQuestions() {
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const questions = await questionsRepository.findAllQuestions(user.id, {
          perPage: 3,
        })

        setQuestions(questions)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user.id])

  if (isLoading) {
    return <CardSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row mb-2">
        <h2 className="font-bold text-lg">Perguntas pendentes</h2>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {questions.map((question) => (
            <div key={question.id} className="rounded overflow-hidden border border-gray-100">
              <div className="p-3 bg-gray-50 text-sm font-medium">"{question.question}"</div>

              {question.answer ? (
                <div className="p-3 bg-white border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Resposta:</span>
                  </div>
                  <p className="text-sm text-gray-700">{question.answer}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <Button className="w-full">{questions.some((q) => !q.answer) ? "Responder" : "Ver todas as perguntas"}</Button>
      </CardContent>
    </Card>
  )
}

