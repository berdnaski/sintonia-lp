"use client"

import { useState, useEffect } from "react"
import { useCouple } from "@/hooks/use-couple"
import { Heart, Calendar, Plus, Delete } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { MemoriesModal } from "@/components/memories/memories-modal"
import { memoriesRepository } from "@/repositories/memories-repository"
import withCouple from "@/layouts/with-couple"
import { formatDate } from "@/lib/date-fns"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MemoriesEmpty } from "../dashboard/_components/empty/memories-empty"
import toast from "react-hot-toast"
import { useInView } from 'react-intersection-observer';

const MemoryCard = ({
  memory,
  selectedMemory,
  onSelect,
}: {
  memory: Memory
  selectedMemory: Memory | null
  onSelect: (memory: Memory) => void
}) => (
  <div
    className={cn(
      "relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md h-full min-w-36 lg:w-autow-full col-span-2 md:col-span-1",
      selectedMemory?.id === memory.id ? "ring-2 ring-[#FF006F] ring-offset-2" : "",
    )}
    onClick={() => onSelect(memory)}
  >
    <div className="relative h-48 w-full">
      <Image
        src={memory.avatarUrl || "/placeholder.svg"}
        alt={memory.title}
        fill
        className="object-cover object-center transition-transform duration-500 hover:scale-110 h-full"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMj4xLy4vLi4+QT5APj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj7/2wBDAR"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
      <p className="text-white text-sm font-medium">{memory.title}</p>
    </div>
  </div>
)

const Memories = () => {
  const { ref, inView } = useInView();
  const { couple } = useCouple()
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showOpenModal, setShowOpenModal] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [meta, setMeta] = useState<Meta>({} as Meta)
  const perPage = 30

  useEffect(() => {
    if (inView && !isLoading && !hasMore) {
      setPage(prev => prev + 1);
    }
  }, [inView, isLoading, hasMore]);

  useEffect(() => {
    console.log("featch")
    if (couple) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          const memories = await memoriesRepository.getMemories(couple.id, {
            page,
            perPage,
          })

          setMemories(memories.data)
          setMeta(memories.meta)
          setHasMore(page === memories.meta.lastPage)

          if (memories.data.length > 0 && !selectedMemory) {
            setSelectedMemory(memories[0])
          }
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [couple, page])

  const handleCreateMemory = (newMemory: Memory) => {
    setMemories((prev) => [...prev, newMemory])
    setSelectedMemory(newMemory)
  }

  const handleDeleteMemory = async (id: string) => {
    if (!selectedMemory) return;
    
    try {
      await memoriesRepository.deleteMemory(id);
      
      // Remove memory from state
      setMemories((prev) => prev.filter((memory) => memory.id !== id));
      
      // Clear selected memory if it was deleted
      if (selectedMemory.id === id) {
        setSelectedMemory(null);
      }
      
      toast.success("Memória excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir memória");
    }
  };

  const handleSelectMemory = (memory: Memory) => {
    if (selectedMemory?.id === memory.id) {
      setSelectedMemory(null)
    } else {
      setSelectedMemory(memory)
      setCurrentImageIndex(0)
    }
  }

  const handleOpenModal = () => {
    setShowOpenModal(true)
  }

  const handlePreviusPage = () => {
    if (page === 1) {
      return
    }

    setPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    if (page === meta.lastPage) {
      return
    }

    setPage((prev) => Math.max(prev + 1, meta.lastPage))
  }

  if (!memories) {
    return null
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 mt-16 xl:mt-0">
      <div className="md:pl-16 w-full ">
        <div className="max-w-[1800px] mx-auto p-6 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
            <div className="flex-1 h-min bg-white rounded-2xl shadow-md border border-[#FF006F]/10 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-4">
                    <Heart className="text-[#FF006F] h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-3xl font-bold text-[#302d2d]">Álbum de Memórias</h1>
                    <p className="text-gray-500">Reviva os momentos especiais do seu relacionamento</p>
                  </div>
                </div>
                <Button onClick={handleOpenModal} className="bg-[#FF006F] hover:bg-[#D80057] text-white">
                  <Plus className="h-4 w-4" /> Criar Memória
                </Button>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-3 lg:gap-6">
                    {memories.map((memory) => (
                      <MemoryCard
                        key={memory.id}
                        memory={memory}
                        selectedMemory={selectedMemory}
                        onSelect={handleSelectMemory}
                      />
                    ))}
                    {memories.length === 0 && !isLoading && (
                      <div className="flex justify-center items-center w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                        <MemoriesEmpty />
                      </div>
                    )}
                    {isLoading && (
                      <div className="col-span-full text-center py-8 text-gray-500">Carregando memórias...</div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <Pagination className="justify-center sm:justify-end mt-4 sm:mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious disabled={page === 1} onClick={handlePreviusPage} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext disabled={page === meta.lastPage} onClick={handleNextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {selectedMemory && (
              <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-md border border-[#FF006F]/10 overflow-hidden lg:sticky top-6 self-start mt-4 lg:mt-0">
                <div className="relative h-[250px] sm:h-[350px] w-full group">
                  <Image
                    src={selectedMemory.avatarUrl || "/placeholder.svg"}
                    alt={selectedMemory.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 400px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-[#302d2d]">{selectedMemory.title}</h2>
                  </div>

                  <p className="text-[#353434] text-lg mb-6">{selectedMemory.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-[#FF006F]" />
                      {formatDate(selectedMemory.createdAt)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteMemory(selectedMemory.id)}
                    >
                      <Delete className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MemoriesModal
        isOpen={showOpenModal}
        onClose={() => setShowOpenModal(false)}
        onCreateMemory={handleCreateMemory}
      />
    </div>
  )
}

export default withCouple(Memories)

