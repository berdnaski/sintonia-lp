"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Metrics } from "@/components/metrics/page";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { useForm, Controller } from "react-hook-form";
import { signalMessages, signalRepository, signalSchema, type SignalRequest } from "@/repositories/signals-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";
import { useCouple } from "@/hooks/use-couple";

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

export default function SignalForm() {
  const { toastError } = useResponseMessages();

  const { user } = useAuth();
  const { couple } = useCouple();
  const form = useForm<SignalRequest>({
    resolver: zodResolver(signalSchema),
    defaultValues: {
      emotion: "",
      note: "",
    },
  });

  const { control, handleSubmit, formState: { isSubmitting, errors }, watch, reset } = form;

  const handleCreateSignal = async (data: SignalRequest) => {
    if (!user || !couple) {
      toast.error("Usuário ou casal não encontrado.");
      return;
    }

    try {
      const signalData = {
        ...data,
        userId: user.id,
        coupleId: couple.id
      };

      await signalRepository.createSignal(signalData);
      reset(); 
      toast.success("Sinal enviado com sucesso!");
    } catch (error) {
      toastError(error, signalMessages);
    }
  };

  const emotions = [
    { value: "feliz", label: "Feliz" },
    { value: "triste", label: "Triste" },
    { value: "ansioso", label: "Ansioso" },
    { value: "calmo", label: "Calmo" },
  ];

  return (
    <div className="w-full xl:max-w-[1600px] md:max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="max-w-[1600px] md:max-w-[1300px] mx-auto">
        <div className="hidden lg:block">
          <Metrics />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Registrar sinal</h2>

            <form onSubmit={handleSubmit(handleCreateSignal)} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <Controller
                  name="emotion"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value || ""}>
                      <SelectTrigger className="w-full md:w-auto rounded-lg border-2 border-zinc-300 shadow-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <SelectValue placeholder="Emoção" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-md shadow-lg border-2 border-zinc-300 mt-1 w-full max-w-xs p-2">
                        {emotions.map((emotion) => (
                          <SelectItem key={emotion.value} value={emotion.value} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer">
                            {emotion.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Controller
                name="note"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Escreva seu sinal"
                    className="min-h-[120px] rounded-xl border-zinc-200 resize-none"
                  />
                )}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="submit"
                  className="bg-[#ff6aaa] hover:bg-[#FF8CBE] text-white hover:cursor-pointer rounded-full transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Registrar"}
                </Button>
              </div>
            </form>

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
