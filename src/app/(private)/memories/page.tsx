"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useCouple } from "@/hooks/use-couple"
import {
  Heart,
  Calendar,
  Home,
  Activity,
  ImageIcon,
  Settings,
  BookOpen,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Tipos para as memórias
interface Memory {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  isFavorite: boolean
  images?: string[]
}

// Imagens locais para fallback
const localImages = [
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
]

// Repositório simulado para memórias
const memoriesRepository = {
  getMemories: async (coupleId: string): Promise<Memory[]> => {
    // Simulação de dados com imagens locais como fallback
    return [
      {
        id: "1",
        title: "Jantar Surpresa",
        description: "DESCRIÇÃO DO ENCONTRO DO CASAL SUPER PIKA E FOFA",
        date: "2025-02-12T19:00:00",
        imageUrl: localImages[0],
        isFavorite: true,
        images: [localImages[0], localImages[1]],
      },
      {
        id: "2",
        title: "Jantar Surpresa",
        description: "Nosso jantar especial no restaurante favorito",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[1],
        isFavorite: true,
        images: [localImages[1]],
      },
      {
        id: "3",
        title: "Jantar Surpresa",
        description: "Momento especial juntos",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[2],
        isFavorite: false,
        images: [localImages[2]],
      },
      {
        id: "4",
        title: "Jantar Surpresa",
        description: "Celebração do nosso aniversário",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[3],
        isFavorite: false,
        images: [localImages[3]],
      },
      {
        id: "5",
        title: "Jantar Surpresa",
        description: "Noite especial juntos",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[4],
        isFavorite: false,
        images: [localImages[4]],
      },
      {
        id: "6",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[5],
        isFavorite: false,
        images: [localImages[5]],
      },
      {
        id: "7",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[6],
        isFavorite: false,
        images: [localImages[6]],
      },
      {
        id: "8",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[7],
        isFavorite: false,
        images: [localImages[7]],
      },
      {
        id: "9",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[8],
        isFavorite: false,
        images: [localImages[8]],
      },
      {
        id: "10",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[9],
        isFavorite: false,
        images: [localImages[9]],
      },
      {
        id: "11",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[10],
        isFavorite: false,
        images: [localImages[10]],
      },
      {
        id: "12",
        title: "Jantar Surpresa",
        description: "Momento romântico",
        date: "2025-01-12T19:00:00",
        imageUrl: localImages[11],
        isFavorite: false,
        images: [localImages[11]],
      },
    ]
  },
}

// Componente de Memórias
const Memories = () => {
  const { user } = useAuth()
  const { couple } = useCouple()
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (couple) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          const memoriesData = await memoriesRepository.getMemories(couple.id)
          setMemories(memoriesData)

          // Seleciona a primeira memória por padrão
          if (memoriesData.length > 0 && !selectedMemory) {
            setSelectedMemory(memoriesData[0])
          }
        } catch (error) {
          console.error("Erro ao carregar memórias:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [couple, selectedMemory])

  const favoriteMemories = memories.filter((memory) => memory.isFavorite)
  const recentMemories = [...memories]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12)

  const memoriesByYear = memories.reduce(
    (acc, memory) => {
      const year = new Date(memory.date).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(memory)
      return acc
    },
    {} as Record<string, Memory[]>,
  )

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  const handleSelectMemory = (memory: Memory) => {
    setSelectedMemory(memory)
    setCurrentImageIndex(0)
  }

  const toggleFavorite = (memoryId: string) => {
    setMemories(
      memories.map((memory) => (memory.id === memoryId ? { ...memory, isFavorite: !memory.isFavorite } : memory)),
    )

    if (selectedMemory && selectedMemory.id === memoryId) {
      setSelectedMemory({
        ...selectedMemory,
        isFavorite: !selectedMemory.isFavorite,
      })
    }
  }

  const nextImage = () => {
    if (selectedMemory?.images && selectedMemory.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedMemory.images!.length)
    }
  }

  const prevImage = () => {
    if (selectedMemory?.images && selectedMemory.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedMemory.images!.length) % selectedMemory.images!.length)
    }
  }

  const MemoryCard = ({ memory }: { memory: Memory }) => (
    <div
      className={cn(
        "relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md h-full",
        selectedMemory?.id === memory.id ? "ring-2 ring-[#FF006F] ring-offset-2" : "",
      )}
      onClick={() => handleSelectMemory(memory)}
    >
      <div className="relative h-40 w-full">
        <Image
          src={memory.imageUrl || "/placeholder.svg"}
          alt={memory.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        {memory.isFavorite && (
          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
            <Heart className="h-4 w-4 fill-[#FF006F] text-[#FF006F]" />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
        <p className="text-white text-sm font-medium">{memory.title}</p>
        <p className="text-white/80 text-xs">{format(new Date(memory.date), "dd 'de' MMMM", { locale: ptBR })}</p>
      </div>
    </div>
  )

  const filteredMemories =
    activeTab === "favorites" ? favoriteMemories : activeTab === "recent" ? recentMemories : memories

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Barra de navegação lateral */}
      <div className="fixed left-0 top-0 h-full w-16 bg-white shadow-md flex flex-col items-center py-8 gap-8 z-10">
        <div className="w-10 h-10 rounded-full bg-[#F1DDE6] flex items-center justify-center">
          <Heart className="text-[#FF006F] h-5 w-5" />
        </div>

        <div className="flex flex-col items-center gap-8 mt-4">
          <NavItem icon={<Home className="h-5 w-5" />} label="Início" />
          <NavItem icon={<BookOpen className="h-5 w-5" />} label="Sinais" />
          <NavItem icon={<Activity className="h-5 w-5" />} label="Saúde" />
          <NavItem icon={<ImageIcon className="h-5 w-5" />} label="Álbum" active />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Ajustes" />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pl-16 w-full">
        <div className="max-w-[1800px] mx-auto p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Painel principal de memórias */}
            <div className="flex-1 bg-white rounded-2xl shadow-md border border-[#FF006F]/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-4">
                    <Heart className="text-[#FF006F] h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#302d2d]">Álbum de Memórias</h1>
                    <p className="text-gray-500">Reviva os momentos especiais do seu relacionamento</p>
                  </div>
                </div>
                <Button className="bg-[#FF006F] hover:bg-[#D80057] text-white">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Memória
                </Button>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-md bg-[#F1DDE6]/30 p-1 rounded-lg">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-[#F1DDE6] data-[state=active]:text-[#B42A76] rounded-md py-2 text-sm"
                  >
                    Todas as Memórias
                  </TabsTrigger>
                  <TabsTrigger
                    value="favorites"
                    className="data-[state=active]:bg-[#F1DDE6] data-[state=active]:text-[#B42A76] rounded-md py-2 text-sm"
                  >
                    Favoritas
                  </TabsTrigger>
                  <TabsTrigger
                    value="recent"
                    className="data-[state=active]:bg-[#F1DDE6] data-[state=active]:text-[#B42A76] rounded-md py-2 text-sm"
                  >
                    Recentes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-10">
                    {Object.entries(memoriesByYear).map(([year, yearMemories]) => (
                      <div key={year} className="mb-8">
                        <div className="flex items-center mb-4">
                          <h2 className="text-xl font-bold text-[#302d2d]">{year}</h2>
                          <div className="ml-4 h-[1px] flex-1 bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 auto-rows-fr">
                          {yearMemories.map((memory) => (
                            <MemoryCard key={memory.id} memory={memory} />
                          ))}
                          {/* Elementos fantasmas para preencher a última linha */}
                          {Array.from({ length: (6 - (yearMemories.length % 6)) % 6 }).map((_, index) => (
                            <div key={`ghost-${index}`} className="hidden xl:block" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 auto-rows-fr">
                    {favoriteMemories.map((memory) => (
                      <MemoryCard key={memory.id} memory={memory} />
                    ))}
                    {/* Elementos fantasmas para preencher a última linha */}
                    {Array.from({ length: (6 - (favoriteMemories.length % 6)) % 6 }).map((_, index) => (
                      <div key={`ghost-${index}`} className="hidden xl:block" />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 auto-rows-fr">
                    {recentMemories.map((memory) => (
                      <MemoryCard key={memory.id} memory={memory} />
                    ))}
                    {/* Elementos fantasmas para preencher a última linha */}
                    {Array.from({ length: (6 - (recentMemories.length % 6)) % 6 }).map((_, index) => (
                      <div key={`ghost-${index}`} className="hidden xl:block" />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Painel de detalhes da memória */}
            {selectedMemory && (
              <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-md border border-[#FF006F]/10 overflow-hidden sticky top-6 self-start">
                <div className="relative h-[350px] w-full group">
                  {selectedMemory.images && selectedMemory.images.length > 0 ? (
                    <Image
                      src={selectedMemory.images[currentImageIndex] || "/placeholder.svg"}
                      alt={selectedMemory.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={selectedMemory.imageUrl || "/placeholder.svg"}
                      alt={selectedMemory.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {selectedMemory.images && selectedMemory.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {selectedMemory.images && selectedMemory.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedMemory.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-white" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-[#302d2d]">Nosso jantar surpresa</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(selectedMemory.id)}
                      className="h-10 w-10 rounded-full hover:bg-[#F1DDE6]/50"
                    >
                      <Heart
                        className={`h-6 w-6 ${selectedMemory.isFavorite ? "fill-[#FF006F] text-[#FF006F]" : "text-gray-400"}`}
                      />
                    </Button>
                  </div>

                  <p className="text-[#353434] text-lg mb-6">{selectedMemory.description}</p>

                  <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <Calendar className="h-5 w-5 mr-2 text-[#FF006F]" />
                    <span className="font-medium">{formatDate(selectedMemory.date)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className="flex flex-col items-center">
    <div
      className={cn("w-10 h-10 rounded-full flex items-center justify-center", active ? "bg-[#F1DDE6]" : "bg-gray-100")}
    >
      <div className={active ? "text-[#FF006F]" : "text-gray-500"}>{icon}</div>
    </div>
    <span className={cn("text-xs mt-1", active ? "text-[#FF006F] font-medium" : "text-gray-500")}>{label}</span>
  </div>
)

export default Memories

