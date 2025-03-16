import { Button } from "@/components/ui/button";
import Link from "next/link";

interface InviteAcceptedProps {
  onNextStep: () => void;
}

export default function InviteAccepted({
  onNextStep
}: InviteAcceptedProps) {
  const handleNextStep = () => {
    onNextStep()
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-[#FF5FA4] font-bold text-3xl">Agora vocês são um casal!</h1>
          <h2 className="text-[#777777] font-semibold text-xl">
           Que essa nova fase seja cheia de amor e harmonia. Que o vínculo de vocês se fortaleça a cada dia!
          </h2>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white rounded-lg transition-colors"
        onClick={handleNextStep}
      >
        <span className="flex items-center justify-center gap-2">
          Prosseguir
        </span>
      </Button>
    </div>
  )
}
