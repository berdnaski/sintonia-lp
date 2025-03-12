"use client"
import { useAuth } from "@/hooks/use-auth"

export default function Dashboard() {
  const { user } = useAuth()
  return <div className="pt-[90px] max-w-[1200px] mx-auto">
    <h1 className="text-2xl text-gray-700">{ user?.name}</h1>
  </div>
}
