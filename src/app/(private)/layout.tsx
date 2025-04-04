"use client"

import { Routes } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth"
import { useCouple } from "@/hooks/use-couple";
import { emitter } from "@/lib/mitt"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function PrivateLayout({ children }: { children: React.ReactNode}) {
  const { user, fetchUser, clearUser } = useAuth();
  const router = useRouter()

  useEffect(() => {
    fetchUser();

    emitter.on('logout', clearUser);

    return () => {
      emitter.off('logout', clearUser)
    }
  }, [])

  useEffect(() => {
    if (user === null) {
      router.push(Routes.LOGIN())
      return;
    }
  }, [user])

  if (!user) {
    return null;
  }

  return (
    <div>
      {children}
    </div>
  );
}
