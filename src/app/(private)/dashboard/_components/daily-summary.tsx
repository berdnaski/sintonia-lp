import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DailySummary() {
  return (
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
  )
}
