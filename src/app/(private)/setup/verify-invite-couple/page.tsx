"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function VerifyInviteCouple() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressWidth, setProgressWidth] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setProgressWidth(80);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, insira seu endereço de email.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Email enviado! Verifique sua caixa de entrada para redefinir sua senha.");
      setIsSubmitting(false);
    }, 1500);
  };

  if (!isClient) {
    return null;
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
        <Card className="w-full h-[50vh] items-center justify-center flex flex-col md:w-1/2 p-8 border-none shadow-md bg-white rounded-2xl">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2 relative">
              <div className="h-7 rounded-full bg-zinc-200 overflow-hidden relative">
                {progressWidth !== null && (
                  <div
                    className="h-full bg-[#FF5FA4] absolute left-0 top-0 transition-all duration-1000 ease-out"
                    style={{ width: `${progressWidth}%` }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                  Etapa 2 de 3
                </div>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <h1 className="font-bold text-3xl">Falta pouco!</h1>
                  <h2 className="text-[#FF5FA4] font-semibold text-xl">
                    Aqui começa o caminho para a Sintonia, entre o casal. Onde a união e entendimento é o principal.
                  </h2>
                </div>
              </div>

              <Link
                href="/setup/complete-verify-couple"
                passHref
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? "Prosseguindo" : "Prosseguir"}
                    {!isSubmitting && <Send size={16} />}
                  </span>
                </Button>
              </Link>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
