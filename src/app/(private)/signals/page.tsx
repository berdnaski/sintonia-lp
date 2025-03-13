"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

const intensities = [
  { value: "1", label: "Baixa" },
  { value: "2", label: "Média" },
  { value: "3", label: "Alta" },
];

export default function Signals() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Metrics />
      <div className="flex flex-col sm:flex-row sm:space-x-6 mt-8 space-y-6 sm:space-y-0">
        <div className="w-full sm:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">Registrar sinal</h1>
          
          <div className="flex flex-wrap gap-3">
            {/* Calendar Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[auto] p-0" align="start">
                <div className="relative">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ptBR}
                  />
                </div>
              </PopoverContent>
            </Popover>

            {/* Select for Category */}
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
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

            {/* Select for Emotion */}
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
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

            {/* Select for Intensity */}
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
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

          {/* Textarea */}
          <Textarea
            placeholder="Escreva seu sinal"
            className="w-full min-h-[120px]"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Registrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
