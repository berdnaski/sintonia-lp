import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VerifyInviteProps {
  onNextStep: () => void;
}

export default function VerifyInvite({
  onNextStep
}: VerifyInviteProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="font-bold text-3xl">Falta pouco!</h1>
          <h2 className="text-[#FF5FA4] font-semibold text-xl">
            Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal.
          </h2>
        </div>
      </div>


      <Button
        type="submit"
        className="w-full h-11 bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white rounded-lg transition-colors"
        onClick={onNextStep}
      >
        <span className="flex items-center justify-center gap-2">
          Prosseguir
        </span>
      </Button>
    </div>
  )
}
