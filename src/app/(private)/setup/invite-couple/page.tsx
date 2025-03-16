"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import InviteForm from "./_components/invite-form";
import { randomUUID } from "crypto";
import VerifyInvite from "./_components/verify-invite";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    component: InviteForm
  },
  {
    id: 2,
    component: VerifyInvite
  }
]

export default function InviteCouple() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const percentagePerStep = 100 / steps.length;
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(percentagePerStep);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = () => {
    if (step === steps.length) {
      router.push("/dashboard");
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
                onNextStep: handleNextStep
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
