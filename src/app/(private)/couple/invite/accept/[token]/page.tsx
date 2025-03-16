'use client'

import React, { useEffect, useState } from "react"

import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { useResponseMessages } from "@/hooks/use-response-messages"
import { inviteMessages } from "@/repositories/invite-couple-repository"
import AcceptInvite from "./_components/accept-invite"
import InviteAccepted from "./_components/invite-accepted"
import { Routes } from "@/constants/routes"
import { useCoupleInvite } from "@/hooks/use-couple-invite"

const steps = [
  {
    id: 1,
    component: AcceptInvite
  },
  {
    id: 2,
    component: InviteAccepted
  }
]

export default function RegisterWithInvite({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const router = useRouter()
  const { toastError } = useResponseMessages()
  const { findInviteByToken } = useCoupleInvite()
  const { token: inviteToken } = React.use(params)

  const [step, setStep] = useState(1);
  const percentagePerStep = 100 / steps.length;
  const [progressWidth, setProgressWidth] = useState(0);

  const validateIfInviteExists = async () => {
    try {
      const invite = await findInviteByToken(inviteToken)

      if (!invite || invite.used) {
        router.push(Routes.DASHBOARD);
        return;
      }
    } catch (error) {
      toastError(error, inviteMessages);
      router.push(Routes.DASHBOARD);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(percentagePerStep);
    }, 300);

    const load = async () => {
      await validateIfInviteExists()
    }

    load()

    return () => clearTimeout(timer);
  }, [])

  const handleNextStep = () => {
    if (step === steps.length) {
      router.push(Routes.DASHBOARD);
      return;
    }

    setStep(step + 1);
    setProgressWidth(progressWidth + percentagePerStep);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center w-full p-4 md:p-8"
      style={{
        background: "linear-gradient(135deg, #FF788D, #E30224, #FF006F)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8">
        <Card className="w-full min-h-fit max-h-[50vh] items-center justify-center flex flex-col md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2 relative">
              <div className="h-7 rounded-full bg-zinc-200 overflow-hidden relative">
                <div
                  className="h-full bg-[#FF5FA4] absolute left-0 top-0 transition-all duration-1000 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                  Etapa {step} de {steps.length}
                </div>
              </div>
            </div>

            { React.createElement(steps.find(s => s.id === step).component, {
                onNextStep: handleNextStep,
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
