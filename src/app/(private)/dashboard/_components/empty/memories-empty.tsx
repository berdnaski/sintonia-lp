import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { ImagePlus } from "lucide-react";
import Link from "next/link";

export function MemoriesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <ImagePlus
          className="text-gray-400 size-5"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-lg font-medium mb-2">Nenhuma memória ainda</h3>
      <p className="text-gray-500 mb-6 max-w-xs">
        Comece a registrar momentos especiais para criar sua coleção de memórias
      </p>
      <Button asChild>
        <Link href={Routes.MEMORIES}>Criar memória</Link>
      </Button>
    </div>
  )
}
