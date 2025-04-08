import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

export function DailySummary() {
  return (
    <Card>
      <CardHeader className="font-bold text-lg">Resumo Diário</CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center py-6">
          <div className="bg-gray-100 rounded-full p-3 mb-3">
            <CalendarIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="font-medium text-sm mb-2">Sem resumo disponível</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Ainda não temos dados suficientes para gerar seu resumo diário. Continue registrando suas interações para
            receber insights personalizados.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
