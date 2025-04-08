import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface VerifyInviteProps {
  onNextStep: () => void;
}

export default function VerifyInvite({
  onNextStep
}: VerifyInviteProps) {
  return (
    <div className="space-y-8">
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-pink-500 mb-2" />

        <h1 className="text-2xl font-bold text-gray-900">Convite enviado!</h1>

        <div className="space-y-3">
          <p className="text-pink-500 font-medium text-lg">Fale para seu parceiro aceitar o convite</p>

          <p className="text-gray-600">
            Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal.
          </p>
        </div>
      </div>
    </div>
  )
}
