"use client";

import { Button } from "@/components/ui/button";
import { useCoupleInvite } from "@/hooks/use-couple-invite";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { inviteRepository, inviteMessages } from "@/repositories/invite-couple-repository";
import { userRepository } from "@/repositories/user-repository";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AcceptInviteProps {
  onNextStep: () => void;
}

export default function AcceptInvite({
  onNextStep
}: AcceptInviteProps) {
  const { toastError } = useResponseMessages()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { invite } = useCoupleInvite()
  const [inviter, setInviter] = useState<User>(null);

  const findInviter = async () => {
    const inviter =  await userRepository.findByIdOrEmail(invite.inviterId)
    setInviter(inviter)
  }

  useEffect(() => {
    if (!invite) {
      return
    }

    findInviter()
  }, [invite])

  const handleAcceptInvite = async () => {
    if (!invite) {
      return
    }

    try {
      setIsSubmitting(true)
      await inviteRepository.acceptInvite(invite.token)
      onNextStep()
      toast.success(inviteMessages.success.inviteAccepted)

    } catch (error) {
      toastError(error, inviteMessages);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div>
        <div className="space-y-6">
          <div>
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Convite para formar um casal</h1>
              <p className="text-[#777777]">
                Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal
              </p>
              <p className="text-lg">
                <span className="text-[#FF5FA4] font-medium">{inviter?.name}</span> convidou você para formar um casal
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAcceptInvite}
            className="w-full h-11 bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white rounded-lg transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? "Aceitando..." : "Aceitar convite"}
              {!isSubmitting && <Send size={16} />}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
