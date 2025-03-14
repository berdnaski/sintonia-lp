"use client"

import { useAuth } from "@/hooks/use-auth"
import { useCouple } from "@/hooks/use-couple";
import { emitter } from "@/lib/mitt"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function PrivateLayout({ children }: { children: React.ReactNode}) {
  const { user, fetchUser, clearUser } = useAuth();
  const { couple, fetchCouple } = useCouple();
  const router = useRouter()

  useEffect(() => {
    fetchUser();

    emitter.on('logout', clearUser);

    return () => {
      emitter.off('logout', clearUser)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }

    fetchCouple()
  }, [user])

  useEffect(() => {
    console.log({ couple })
  }, [couple])

  if (!user) {
    return null;
  }

  return (
    <div>
      {children}
    </div>
  );
}
