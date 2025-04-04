"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCouple } from "@/hooks/use-couple";
import {
  Heart,
  Calendar,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MemoriesModal } from "@/components/memories/memories-modal";
import { memoriesRepository, } from "@/repositories/memories-repository";
import withCouple from "@/layouts/with-couple";

interface Memory {
  id: string;
  title: string;
  description: string;
  avatarUrl?: string;
}

const MemoryCard = ({
  memory,
  selectedMemory,
  onSelect
}: {
  memory: Memory;
  selectedMemory: Memory | null;
  onSelect: (memory: Memory) => void;
}) => (
  <div
    className={cn(
      "relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md h-full",
      selectedMemory?.id === memory.id
        ? "ring-2 ring-[#FF006F] ring-offset-2"
        : ""
    )}
    onClick={() => onSelect(memory)}
  >
    <div className="relative h-40 w-full">
      <Image
        src={memory.avatarUrl || "/placeholder.svg"}
        alt={memory.title}
        fill
        sizes="(max-width: 1080px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
      <p className="text-white text-sm font-medium">{memory.title}</p>
    </div>
  </div>
);

const Memories = () => {
  const { user } = useAuth();
  const { couple } = useCouple();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOpenModal, setShowOpenModal] = useState(false);

  {selectedMemory && (
    <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-md border border-[#FF006F]/10 overflow-hidden sticky top-6 self-start">
      <div className="relative h-[350px] w-full group">
        <Image
          src={selectedMemory.avatarUrl || "/placeholder.svg"}
          alt={selectedMemory.title}
          fill
          sizes="(max-width: 1080px) 100vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-[#302d2d]">
            {selectedMemory.title}
          </h2>
        </div>

        <p className="text-[#353434] text-lg mb-6">
          {selectedMemory.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <Calendar className="h-5 w-5 mr-2 text-[#FF006F]" />
        </div>
      </div>
    </div>
  )}

  useEffect(() => {
    if (couple) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const memoriesData = await memoriesRepository.getMemories(couple.id);

          const formattedMemories = memoriesData.map((memory) => ({
            id: memory.id,
            title: memory.title,
            description: memory.description,
            avatarUrl: memory.avatarUrl,
          }));

          setMemories(formattedMemories);

          if (formattedMemories.length > 0 && !selectedMemory) {
            setSelectedMemory(formattedMemories[0]);
          }
        } catch (error) {
          console.error("Erro ao carregar memórias:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [couple]);

  const handleCreateMemory = (newMemory: Memory) => {
    setMemories(prev => [...prev, newMemory]);
    setSelectedMemory(newMemory);
  };

  const handleSelectMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setCurrentImageIndex(0);
  };

  const handleOpenModal = () => {
    setShowOpenModal(true);
  };

  const handleCloseModal = () => {
    setShowOpenModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-full w-16 bg-white shadow-md flex flex-col items-center py-8 gap-8 z-10">
        <div className="w-10 h-10 rounded-full bg-[#F1DDE6] flex items-center justify-center">
          <Heart className="text-[#FF006F] h-5 w-5" />
        </div>
      </div>

      <div className="pl-16 w-full">
        <div className="max-w-[1800px] mx-auto p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white rounded-2xl shadow-md border border-[#FF006F]/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#F1DDE6] flex items-center justify-center mr-4">
                    <Heart className="text-[#FF006F] h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#302d2d]">
                      Álbum de Memórias
                    </h1>
                    <p className="text-gray-500">
                      Reviva os momentos especiais do seu relacionamento
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleOpenModal}
                  className="bg-[#FF006F] hover:bg-[#D80057] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Memória
                </Button>
              </div>

              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full mb-8"
              >
                <TabsList className="w-[30%] max-w-md bg-[#F1DDE6]/30 p-1 rounded-lg">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-[#F1DDE6] data-[state=active]:text-[#B42A76] rounded-md py-2 text-sm"
                  >
                    Todas as Memórias
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {memories.map((memory) => (
                      <MemoryCard
                        key={memory.id}
                        memory={memory}
                        selectedMemory={selectedMemory}
                        onSelect={handleSelectMemory}
                      />
                    ))}
                    {memories.length === 0 && !isLoading && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        Nenhuma memória encontrada
                      </div>
                    )}
                    {isLoading && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        Carregando memórias...
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {selectedMemory && (
              <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-md border border-[#FF006F]/10 overflow-hidden sticky top-6 self-start">
                <div className="relative h-[350px] w-full group">
                  <Image
                    src={selectedMemory.avatarUrl || "/placeholder.svg"}
                    alt={selectedMemory.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-[#302d2d]">
                      {selectedMemory.title}
                    </h2>
                  </div>

                  <p className="text-[#353434] text-lg mb-6">
                    {selectedMemory.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <Calendar className="h-5 w-5 mr-2 text-[#FF006F]" />
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
  );
};

export default withCouple(Memories);
