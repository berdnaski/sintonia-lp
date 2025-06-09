"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { inviteRepository, inviteMessages, InviteRequest, inviteSchema } from "@/repositories/invite-couple-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface InviteFormProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

export default function InviteForm({
  onNextStep,
  onPrevStep
}: InviteFormProps) {
  const { toastError} = useResponseMessages();

  const form = useForm<InviteRequest>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleInvite = form.handleSubmit(async (data) => {
    try {
      await inviteRepository.invite({ email: data.email });

      toast.success(inviteMessages.success.invited);
      onNextStep();
    } catch (error) {
      toastError(error, inviteMessages);
    }
  });

  return (
    <div>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleInvite}>
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <h1 className="font-bold text-3xl">Vamos configurar sua conta</h1>
              <p className="text-[#FF5FA4] font-light text-sm">
                Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                className="h-11 pl-10 bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg"
                placeholder="Insira o email do parceiro(a)"
                required
                icon={Mail}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white rounded-lg transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? "Enviando..." : "Enviar convite"}
              {!isSubmitting && <Send size={16} />}
            </span>
          </Button>
        </form>
      </Form>
    </div>
  )
}
