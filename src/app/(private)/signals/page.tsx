"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Metrics } from "@/components/metrics/page";

const categories = [
  { value: "amor", label: "Amor" },
  { value: "amizade", label: "Amizade" },
  { value: "familia", label: "Família" },
  { value: "trabalho", label: "Trabalho" },
];

const emotions = [
  { value: "feliz", label: "Feliz" },
  { value: "triste", label: "Triste" },
  { value: "ansioso", label: "Ansioso" },
  { value: "calmo", label: "Calmo" },
];

const SignalCard = () => (
  <div className="bg-white rounded-lg p-4 shadow-sm border-zinc-200 border mb-4">
    <h3 className="text-lg font-medium mb-2">Menos mensagens ao longo do dia</h3>
    <p className="text-gray-600 mb-3">"Percebi que estamos conversando menos por mensagem. Algo mudou?"</p>
    <div className="flex flex-wrap gap-2 items-center">
      <Button className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:text-white hover:bg-blue-400 hover:border-[#638dff]">
        😢 Triste
      </Button>
      <Button className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 hover:text-white hover:bg-orange-400 hover:border-[#ff9a64]">
        Moderado
      </Button>
      <Button className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 hover:text-white hover:bg-green-400 hover:border-[#67ff8b]">
        Comunicação
      </Button>
      <span className="ml-auto text-sm text-gray-500">02 de Março de 2025</span>
    </div>
  </div>
);

export default function Signals() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");

  return (
    <div className="w-full xl:max-w-[1600px] md:max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="max-w-[1600px] md:max-w-[1300px] mx-auto">
        <div className="hidden lg:block">
          <Metrics />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Registrar sinal</h2>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-auto rounded-lg border-2 border-zinc-300 shadow-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-md shadow-lg border-2 border-zinc-300 mt-1 w-full max-w-xs p-2 transition-opacity duration-300 ease-in-out">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer transition-colors">
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
                  <SelectTrigger className="w-full md:w-auto rounded-lg border-2 border-zinc-300 shadow-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <SelectValue placeholder="Emoção" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-md shadow-lg border-2 border-zinc-300 mt-1 w-full max-w-xs p-2 transition-opacity duration-300 ease-in-out">
                    {emotions.map((emotion) => (
                      <SelectItem key={emotion.value} value={emotion.value} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer transition-colors">
                        {emotion.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Textarea placeholder="Escreva seu sinal" className="min-h-[120px] rounded-xl border-zinc-200 resize-none" />

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" className="rounded-full hover:cursor-pointer">
                  Cancelar
                </Button>
                <Button className="bg-[#ff6aaa] hover:bg-[#FF8CBE] text-white hover:cursor-pointer rounded-full transition-all duration-300">
                  Registrar
                </Button>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Perguntas para Reflexão</h3>
                <span className="text-sm text-gray-500">2 restantes</span>
              </div>
              <p className="text-gray-700 mb-3">
                Como você se sente sobre a comunicação no relacionamento?
              </p>
              <Textarea placeholder="Responder à pergunta..." className="min-h-[100px] mb-4 rounded-xl border-zinc-200 resize-none" />
              <div className="flex justify-end">
                <Button className="bg-[#ff6aaa] hover:bg-[#FF8CBE] text-white transition-all duration-300 rounded-full hover:cursor-pointer">
                  Enviar
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Últimos Sinais</h2>
            <div className="space-y-4">
              <SignalCard />
              <SignalCard />
              <SignalCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
