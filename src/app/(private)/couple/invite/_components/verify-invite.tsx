import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { inviteRepository } from "@/repositories/invite-couple-repository";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface VerifyInviteProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

export default function VerifyInvite({ onNextStep, onPrevStep }: VerifyInviteProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    if (!user?.id) return;

    try {
      setLoading(true);
      await inviteRepository.cancelInvite(user.id);
      toast.success("Convite cancelado com sucesso!");
      onPrevStep()
    } catch (error) {
      toast.error("Erro ao cancelar o convite.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-pink-500 mb-2" />

        <h1 className="text-2xl font-bold text-gray-900">Convite enviado!</h1>

        <div className="space-y-3">
          <p className="text-pink-500 font-medium text-lg">
            Fale para seu parceiro aceitar o convite
          </p>

          <p className="text-gray-600">
            Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal.
          </p>
        </div>

        <Button
          variant="destructive"
          onClick={handleCancel}
          disabled={loading}
          className="mt-6"
        >
          {loading ? "Cancelando..." : "Cancelar convite"}
        </Button>
      </div>
    </div>
  );
}
