"use client";

import { ChevronRight, Bell } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Memories from "./_components/memories";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center p-4 border-b mt-4">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <span className="text-green-500 text-sm font-medium">Sintonia: 85%</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M5.636 4.575a.75.75 0 010 1.06 9 9 0 000 12.729.75.75 0 01-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 011.06 0zm12.728 0a.75.75 0 011.06 0c4.101 4.1 4.101 10.749 0 14.85a.75.75 0 11-1.06-1.061 9 9 0 000-12.728.75.75 0 010-1.06zM7.757 6.696a.75.75 0 010 1.061 6 6 0 000 8.485.75.75 0 01-1.06 1.061 7.5 7.5 0 010-10.607.75.75 0 011.06 0zm8.486 0a.75.75 0 011.06 0 7.5 7.5 0 010 10.607.75.75 0 01-1.06-1.06 6 6 0 000-8.486.75.75 0 010-1.06zM9.879 8.818a.75.75 0 010 1.06 3 3 0 000 4.243.75.75 0 11-1.061 1.06 4.5 4.5 0 010-6.363.75.75 0 011.06 0zm4.242 0a.75.75 0 011.061 0 4.5 4.5 0 010 6.364.75.75 0 01-1.06-1.06 3 3 0 000-4.244.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-blue-500 text-sm font-medium">Conexão: 85%</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-pink-500 text-sm font-medium">Comunicação: 85%</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <span className="text-purple-500 text-sm font-medium">Intensidade: 85%</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative">
            <Bell className="h-5 w-5 text-amber-500" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card>
          <CardHeader className="font-bold text-lg">Resumo Diário</CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium text-sm mb-1">Padrões Detectados</h3>
              <p className="text-sm">Diminuição de interação e menor troca de carinho.</p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Ação recomendada</h3>
              <p className="text-sm">
                Marquem um tempo juntos sem distrações - pode ser um café, um passeio ou só uma conversa sem pressa.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row mb-2">
            <h2 className="font-bold text-lg">Perguntas pendentes</h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-gray-50 rounded text-sm">"Menos tempo juntos ultimamente"</div>
              <div className="p-2 bg-gray-50 rounded text-sm">"Conversa ficou mais curta"</div>
              <div className="p-2 bg-gray-50 rounded text-sm">"Menos demonstrações de carinho"</div>
            </div>
            <Button className="w-full">Responder</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row mb-2">
            <h2 className="font-bold text-lg">Sinais recentes</h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-gray-50 rounded text-sm">"Menos tempo juntos ultimamente"</div>
              <div className="p-2 bg-gray-50 rounded text-sm">"Conversa ficou mais curta"</div>
              <div className="p-2 bg-gray-50 rounded text-sm">"Menos demonstrações de carinho"</div>
            </div>
            <Button className="w-full">Ver Mais</Button>
          </CardContent>
        </Card>
      </div>

      <Memories />
    </div>
  );
}
