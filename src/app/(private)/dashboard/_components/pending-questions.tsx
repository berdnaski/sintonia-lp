import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react"

export function PendingQuestions() {
  return (
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
  )
}
