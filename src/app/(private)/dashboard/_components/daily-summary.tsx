"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { summaryRepository } from "@/repositories/summary-repository"
import { AlertCircle, BookOpen, CalendarDays, ChevronRight, Lightbulb } from "lucide-react"

interface DailySummaryType {
  id: string
  summary: string
  insights: string
  date: Date
}

export function DailySummary() {
  const { user } = useAuth()
  const [summary, setSummary] = useState<DailySummaryType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return

    const fetchSummary = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await summaryRepository.findLatestByCouple(user.coupleId)
        setSummary(data)
      } catch (err) {
        setError("Não foi possível carregar o resumo diário.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [user?.id, user?.coupleId])

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="h-5 w-5 text-pink-500" />
            Resumo Diário
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="pt-2" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="h-5 w-5 text-pink-500" />
            Resumo Diário
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-3 rounded-full bg-red-100 p-3">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-2 font-medium">Ops! Algo deu errado</h3>
            <p className="text-sm text-gray-500">{error}</p>
            <Button variant="outline" size="sm" className="mt-4">
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="h-5 w-5 text-pink-500" />
            Resumo Diário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 rounded-full bg-purple-100 p-4">
              <CalendarDays className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="mb-2 text-base font-medium">Sem resumo disponível</h3>
            <p className="max-w-xs text-sm text-gray-500">
              Ainda não temos dados suficientes para gerar seu resumo diário. Continue registrando suas interações para
              receber insights personalizados.
            </p>
            <Button className="mt-6" size="sm">
              Registrar interação
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(summary.date)

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="h-5 w-5 text-pink-500" />
            Resumo Diário
          </CardTitle>
          <Badge variant="outline" className="bg-white/80 font-normal">
            <CalendarDays className="mr-1 h-3 w-3" />
            {formattedDate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-3">
            <p className="text-gray-800 leading-relaxed">{summary.summary}</p>
          </div>

          <div className="rounded-lg bg-purple-50 p-3">
            <div className="mb-1 flex items-center gap-1 text-sm font-medium text-purple-700">
              <Lightbulb className="h-4 w-4" />
              Insights
            </div>
            <p className="text-sm text-purple-700">{summary.insights}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-0">
        <Button variant="ghost" size="sm" asChild className="text-pink-600 hover:bg-pink-50 hover:text-pink-700">
          <Link href="/summary" className="flex items-center">
            Ver todos os resumos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
