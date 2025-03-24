import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import type { SignalResponse } from "@/repositories/signals-repository";

interface SignalsListProps {
  signals: SignalResponse[] | null;
}

function SignalsList({ signals }: SignalsListProps) {
  if (!signals) {
    return (
      <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
        <div className="flex-1">
          <p className="text-sm font-medium">Carregando sinais...</p>
        </div>
      </li>
    );
  }

  if (signals.length === 0) {
    return (
      <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
        <div className="flex-1">
          <p className="text-sm font-medium">Nenhum micro-sinal detectado ainda</p>
          <p className="text-xs text-gray-500">Continue interagindo para gerar sinais</p>
        </div>
      </li>
    );
  }

  return (
    <ul className="space-y-4">
      {signals.map((signal, index) => {
        const date = signal.createdAt ? new Date(signal.createdAt) : null;
        const formattedDate = date && !isNaN(date.getTime())
          ? new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(date)
          : "Data indisponível";

        return (
          <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <div
              className={`w-3 h-3 mt-1 rounded-full flex-shrink-0 ${
                signal.emotion === "feliz"
                  ? "bg-green-500"
                  : signal.emotion === "triste"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{signal.note?.trim() || "Sem mensagem"}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ChevronRight size={16} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export function RecentSignals({ signals }: { signals: SignalResponse[] | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#302d2d] flex items-center gap-2">
          <MessageCircle className="text-[#FF006F]" size={20} />
          Micro-Sinais Recentes
        </CardTitle>
        <CardDescription>Sinais detectados nas últimas conversas</CardDescription>
      </CardHeader>
      <CardContent>
        <SignalsList signals={signals} />
      </CardContent>
    </Card>
  );
}