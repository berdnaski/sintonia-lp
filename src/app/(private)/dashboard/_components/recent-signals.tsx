import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Routes } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { useCouple } from "@/hooks/use-couple";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { signalMessages, signalRepository } from "@/repositories/signals-repository";
import { ChevronRight } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";
import { RecentSignalsEmpty } from "./empty/recent-signals-empty";

export function RecentSignals() {
  const { couple } = useCouple();
  const [signals, setSignals] = useState([]);
  const { toastError } = useResponseMessages()
  const hasSignals = signals.length > 0

  useEffect(() => {
    const fetchSignals = async () => {
      if (couple?.id) {
        try {
          const signals = await signalRepository.getSignals(couple.id, {
            perPage: 3,
            page: 1
          });

          console.log(signals)

          setSignals(signals.data);
        } catch (err) {
          toastError(err, signalMessages)
        }
      }
    }

    fetchSignals();
  }, [couple])

  if (!signals) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <Link href={Routes.SIGNALS} className="flex justify-between flex-row mb-2 group">
          <h2 className="font-bold text-lg">Sinais recentes</h2>
         <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        {hasSignals ? (
          <>
            <div className="space-y-2 mb-4">
              {signals.map((signal, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                  {signal.note}
                </div>
              ))}
            </div>
            <Link href={Routes.SIGNALS}>
              <Button className="w-full">Ver Mais</Button>
            </Link>
          </>
        ) : (
          <RecentSignalsEmpty />
        )}

      </CardContent>
    </Card>
  )
}
