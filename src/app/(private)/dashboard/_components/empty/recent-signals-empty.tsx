import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { Radio } from "lucide-react";
import Link from "next/link";

export function RecentSignalsEmpty() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-gray-100 rounded-full p-3 mb-3">
        <Radio className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="font-medium text-sm mb-2">Nenhum sinal recente</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-4">
        Aqui aparecerão os últimos sinais que vocês registrarem.
      </p>
      <Button asChild>
        <Link href={Routes.SIGNALS}>Criar sinal</Link>
      </Button>
    </div>
  )
}
