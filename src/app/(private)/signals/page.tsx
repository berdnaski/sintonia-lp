"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils"; // Verifique se a função 'cn' está corretamente implementada.

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Metrics } from "@/components/metrics/page";

// Dados para os selects
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

const intensities = [
  { value: "1", label: "Baixa" },
  { value: "2", label: "Média" },
  { value: "3", label: "Alta" },
];

const SignalCard = () => (
  <div className="bg-white max-w-[1500px] rounded-lg p-4 shadow-sm border mb-4">
    <h3 className="text-lg font-medium mb-2">Menos mensagens ao longo do dia</h3>
    <p className="text-gray-600 mb-3">"Percebi que estamos conversando menos por mensagem. Algo mudou?"</p>
    <div className="flex flex-wrap gap-2 items-center">
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700">
        😢 Triste
      </span>
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700">
        Moderado
      </span>
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
        Comunicação
      </span>
      <span className="ml-auto text-sm text-gray-500">02 de Março de 2025</span>
    </div>
  </div>
);

export default function Signals() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="max-w-[1500px] mx-auto flex flex-col gap-4 mt-[2rem]">
      <Metrics />
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-[4rem]">
        {/* Left Column - Signal Registration */}
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Registrar sinal</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                </PopoverContent>
              </Popover>

              {/* Category Select */}
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Emotion Select */}
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Emoção" />
                </SelectTrigger>
                <SelectContent>
                  {emotions.map((emotion) => (
                    <SelectItem key={emotion.value} value={emotion.value}>
                      {emotion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Intensity Select */}
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Intensidade" />
                </SelectTrigger>
                <SelectContent>
                  {intensities.map((intensity) => (
                    <SelectItem key={intensity.value} value={intensity.value}>
                      {intensity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Signal Text Area */}
            <Textarea placeholder="Escreva seu sinal" className="min-h-[120px]" />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Registrar</Button>
            </div>
          </div>

          {/* Reflection Questions */}
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Perguntas para Reflexão</h3>
              <span className="text-sm text-gray-500">2 restantes</span>
            </div>
            <p className="text-gray-700 mb-3">Como você se sente sobre a comunicação no relacionamento?</p>
            <Textarea placeholder="Responder à pergunta..." className="min-h-[100px] mb-4" />
            <div className="flex justify-end">
              <Button>Enviar</Button>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Signals */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Últimos Sinais</h2>
          <div className="space-y-4">
            <SignalCard />
            <SignalCard />
            <SignalCard />
          </div>
        </div>
      </div>
    </div>
  );
}
