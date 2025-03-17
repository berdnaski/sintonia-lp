"use client";

import { useAuth } from "@/hooks/use-auth"
import { Metrics } from "@/components/metrics/page"
import { useCouple } from "@/hooks/use-couple";

export default function Dashboard() {
  const { user } = useAuth()
  const { couple } = useCouple();

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Olá,{' '}
        {user && !couple && user.name}
        {user && couple && `${couple.user1.name} & ${couple.user2.name}`}
      </h1>

      <h2 className="text-lg text-gray-600 mb-6">Veja como está o seu relacionamento hoje</h2>

      <div>
        <Metrics />
      </div>
    </div>
  );
}
