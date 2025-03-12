"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DecorativeDots, DecorativeGrid } from "@/components/decorative"
import { Heart, MessageCircle, Calendar, Settings, Bell, ChevronRight, Award, Zap } from "lucide-react"

interface ProgressProps {
  value: number;
  className: string;
  indicatorClassName?: string; 
}

export default function ProfilePage<T extends ProgressProps>(props: T) {
  const [connectionScore, setConnectionScore] = useState(78)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative pt-8 pb-20 px-4 bg-gradient-to-b from-[#F1DDE6] to-white">
        <DecorativeGrid variant="pink" size="md" position="left" className="top-0 opacity-30" />
        <DecorativeDots variant="pink" rows={3} cols={3} className="absolute right-[5%] top-12 hidden md:grid" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                <AvatarFallback className="bg-[#FF006F] text-white text-2xl">MC</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-[#FF006F] text-white rounded-full p-2 shadow-md">
                <Zap size={20} />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#302d2d]">Maria Carvalho</h1>
              <p className="text-[#353434] mt-1">Buscando melhorar a comunicação no meu relacionamento</p>

              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">3 meses</Badge>
                <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">Plano Premium</Badge>
                <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">Comunicadora</Badge>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#F1DDE6" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF006F"
                    strokeWidth="10"
                    strokeDasharray={`${(2 * Math.PI * 45 * connectionScore) / 100} ${(2 * Math.PI * 45 * (100 - connectionScore)) / 100}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-[#FF006F]">{connectionScore}</span>
                  <span className="text-xs text-[#353434]">Sintonia</span>
                </div>
              </div>
              <p className="text-sm text-[#353434] mt-2">Nível de conexão</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 -mt-10 relative z-20">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8 bg-white shadow-md rounded-xl p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Atividades
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#302d2d] flex items-center gap-2">
                    <Heart className="text-[#FF006F]" size={20} />
                    Resumo do Relacionamento
                  </CardTitle>
                  <CardDescription>Veja como está a saúde do seu relacionamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Comunicação</span>
                        <span className="text-sm text-[#FF006F] font-bold">82%</span>
                      </div>
                      <Progress value={82} className="h-2 bg-[#F1DDE6]" indicatorClassName="bg-[#FF006F]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Intimidade</span>
                        <span className="text-sm text-[#FF006F] font-bold">68%</span>
                      </div>
                      <Progress value={68} className="h-2 bg-[#F1DDE6]" indicatorClassName="bg-[#FF006F]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Resolução de Conflitos</span>
                        <span className="text-sm text-[#FF006F] font-bold">75%</span>
                      </div>
                      <Progress value={75} className="h-2 bg-[#F1DDE6]" indicatorClassName="bg-[#FF006F]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#302d2d] flex items-center gap-2">
                      <MessageCircle className="text-[#FF006F]" size={20} />
                      Micro-Sinais Recentes
                    </CardTitle>
                    <CardDescription>Sinais detectados nas últimas conversas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { text: "Falta de resposta às mensagens", severity: "high", date: "Ontem" },
                        { text: "Aumento de palavras positivas", severity: "positive", date: "3 dias atrás" },
                        { text: "Diminuição do tempo de resposta", severity: "medium", date: "1 semana atrás" },
                      ].map((signal, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                          <div
                            className={`w-3 h-3 mt-1 rounded-full flex-shrink-0 ${
                              signal.severity === "high"
                                ? "bg-red-500"
                                : signal.severity === "medium"
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{signal.text}</p>
                            <p className="text-xs text-gray-500">{signal.date}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-gray-400">
                            <ChevronRight size={16} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#302d2d] flex items-center gap-2">
                      <Calendar className="text-[#FF006F]" size={20} />
                      Próximos Passos
                    </CardTitle>
                    <CardDescription>Atividades recomendadas para melhorar a sintonia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { text: "Exercício de comunicação não-verbal", type: "Atividade", date: "Hoje" },
                        { text: "Conversa sobre expectativas futuras", type: "Diálogo", date: "Amanhã" },
                        { text: "Análise de padrões de comunicação", type: "Insight", date: "Em 3 dias" },
                      ].map((activity, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                          <div className="w-8 h-8 rounded-full bg-[#FF006F]/10 flex items-center justify-center flex-shrink-0">
                            {activity.type === "Atividade" ? (
                              <Zap size={16} className="text-[#FF006F]" />
                            ) : activity.type === "Diálogo" ? (
                              <MessageCircle size={16} className="text-[#FF006F]" />
                            ) : (
                              <Award size={16} className="text-[#FF006F]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs py-0 h-5">
                                {activity.type}
                              </Badge>
                              <span className="text-xs text-gray-500">{activity.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-gray-400">
                            <ChevronRight size={16} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#302d2d]">Histórico de Atividades</CardTitle>
                  <CardDescription>Acompanhe seu progresso e atividades realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        date: "12 de Março, 2025",
                        activities: [
                          { title: "Completou exercício de escuta ativa", time: "19:30", points: 15 },
                          { title: "Respondeu questionário semanal", time: "10:15", points: 10 },
                        ],
                      },
                      {
                        date: "10 de Março, 2025",
                        activities: [
                          { title: "Compartilhou sentimentos usando o modelo sugerido", time: "21:45", points: 20 },
                          { title: "Completou desafio de comunicação não-verbal", time: "18:20", points: 25 },
                        ],
                      },
                    ].map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">{day.date}</h3>
                        <div className="space-y-4">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                              <div className="w-10 h-10 rounded-full bg-[#FF006F]/10 flex items-center justify-center flex-shrink-0">
                                <Award size={20} className="text-[#FF006F]" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-sm text-gray-500">{activity.time}</p>
                              </div>
                              <div className="flex items-center gap-1 text-[#FF006F] font-medium">
                                <span>+{activity.points}</span>
                                <Zap size={16} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#302d2d]">Plano e Assinatura</CardTitle>
                  <CardDescription>Gerencie seu plano atual e veja os benefícios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-[#FF006F] to-[#B42A76] text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">Plano Premium</h3>
                        <p className="text-white/80 text-sm mt-1">Renovação em 15 de Abril, 2025</p>
                      </div>
                      <Badge className="bg-white text-[#FF006F]">Ativo</Badge>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Award size={12} className="text-white" />
                        </div>
                        <span className="text-sm">Análises avançadas de comunicação</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Award size={12} className="text-white" />
                        </div>
                        <span className="text-sm">Exercícios exclusivos de conexão</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Award size={12} className="text-white" />
                        </div>
                        <span className="text-sm">Suporte prioritário</span>
                      </div>
                    </div>

                    <Button className="mt-6 bg-white text-[#FF006F] hover:bg-white/90">Gerenciar Assinatura</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

