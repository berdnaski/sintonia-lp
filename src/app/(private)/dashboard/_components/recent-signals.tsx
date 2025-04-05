import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useCouple } from "@/hooks/use-couple";
import { signalRepository } from "@/repositories/signals-repository";
import { ChevronRight } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";

export function RecentSignals() {
  const { couple } = useCouple();
  const { user } = useAuth();
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      if (couple?.id) {
        try {
          const signalsData = await signalRepository.getSignals(couple.id, 3);

          setSignals(signalsData);
        } catch (err) {
          console.error("Error ao carregar os sinais", err);
        }
      }
    }

    fetchSignals();
  }, [couple])


  return (
    <Card>
      <CardHeader className="flex justify-between flex-row mb-2">
        <h2 className="font-bold text-lg">Sinais recentes</h2>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <div className="space-y-2 mb-4">
        {signals.map((signal, index) => (
          <div key={index} className="p-2 bg-gray-50 rounded text-sm">
            {signal.note}
          </div>
        ))}
        </div>
        <Link href={'/signals'}>
          <Button className="w-full">Ver Mais</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
