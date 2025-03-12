"use client"

import { useAuth } from "@/hooks/use-auth"
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
    if (!user) {
      router.push('/auth/login')
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
