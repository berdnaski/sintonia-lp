"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Home, Layers, Heart, Image, User, Settings, LogOut, Menu, Plus, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { emitter } from "@/lib/mitt"
import { useCouple } from "@/hooks/use-couple"
import { useAuth } from "@/hooks/use-auth"
import { Routes } from "@/constants/routes"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation";

const navItems = [
  { icon: Home, label: "Início", href: Routes.DASHBOARD },
  { icon: Layers, label: "Sinais", href: Routes.SIGNALS, badge: "Novo" },
  { icon: Heart, label: "Casal", href: Routes.COUPLE },
  { icon: Image, label: "Memórias", href: "/memories" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter();
  const { user } = useAuth()
  const { couple, name: coupleName, durationFormatted } = useCouple()
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [hasNotification, setHasNotification] = useState(true)
  const hideHeaderPages = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    Routes.INVITE_COUPLE,
    "auth/register-with-invite/token",
    "/couple/invite/accept",
    "/plans",
  ]

  const shouldHideHeader = hideHeaderPages.find((route) => pathname.startsWith(route))

  const coupleDuration = durationFormatted()

  const handleLogout = () => {
    emitter.emit("logout")
  }

  const dropdownMenuItem = [
    { icon: User, label: "Perfil", href: Routes.PROFILE },
    { icon: Settings, label: "Ajustes", href: Routes.PROFILE },
    {
      icon: Plus,
      label: "Convidar parceiro (a)",
      href: Routes.INVITE_COUPLE,
      hidden: !!couple,
      className: "items-center hover:text-pink-600 transition-all",
    },
    { icon: LogOut, label: "Sair", onClick: handleLogout },
  ]

  if (!user || shouldHideHeader) {
    return null
  }

  return (
    <div>
      <aside className="hidden xl:flex md:fixed left-0 top-0 bottom-0 w-20 bg-white/95 backdrop-blur-sm border-r border-gray-100 flex-col items-center py-6 z-40 shadow-sm">
        <div className="mb-8">
          <Link href={Routes.DASHBOARD}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF006F] to-[#FF708B] flex items-center justify-center shadow-lg cursor-pointer"
            >
              <img src="./logo.png" alt="" />
            </motion.div>
          </Link>
        </div>

        <nav className="flex-1 w-full px-3">
          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      className="relative"
                      onHoverStart={() => setIsHovered(item.href)}
                      onHoverEnd={() => setIsHovered(null)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`w-full h-12 rounded-xl flex items-center justify-center
                          transition-all duration-200 cursor-pointer
                          ${
                            isActive
                              ? "bg-[#FFF2F8] text-[#FF006F] shadow-sm"
                              : "text-gray-500 hover:bg-gray-50 hover:text-[#FF006F]"
                          }`}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                      </div>

                      <AnimatePresence>
                        {isHovered === item.href && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap z-50"
                          >
                            {item.label}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="w-full px-3 space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full h-12 rounded-xl p-0 hover:bg-gray-50">
                <Avatar className="h-8 w-8 ring-2 ring-[#FF006F]/20">
                  <AvatarImage
                    src={user.avatarUrl ? `${user.avatarUrl}` : "/placeholder.svg"}
                    className="object-cover w-full h-full"
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {user && !couple && user.name[0]}
                    {user && couple && couple.users[0].name[0] + couple.users[1].name[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56 bg-white mb-10">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  {user && !couple && <p className="text-sm font-medium">{user.name}</p>}

                  {user && couple && <p className="text-sm font-medium">{coupleName}</p>}

                  {coupleDuration && <p className="text-xs text-gray-500">{`${coupleDuration} juntos`}</p>}

                  <a
                    href={Routes.PROBLEM_REPORT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs text-red-500 hover:underline self-start cursor-pointer"
                  >
                    Relatar problema
                  </a>
                </div>
              </DropdownMenuLabel>
 
              <DropdownMenuSeparator />
              {dropdownMenuItem.map(({ icon: Icon, ...item }) => {
                if (item.hidden) {
                  return null
                }

                return item.href ? (
                  <DropdownMenuItem key={item.label}>
                    <Link
                      href={item.href}
                      className={`hover:cursor-pointer flex flex-row ${item.className ?? ""}`}
                      onClick={item.onClick}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-red-600 transition-all cursor-pointer"
                    onClick={handleLogout}
                    key={item.label}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <header className="xl:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-4 z-40 shadow-sm">
        <Link href={Routes.DASHBOARD}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF006F] to-[#FF708B] flex items-center justify-center shadow-md">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              {user && !couple && <span className="font-semibold text-gray-800">{user.name}</span>}

              {user && coupleName && <span className="font-semibold text-gray-800">{coupleName}</span>}

              {coupleDuration && <p className="text-xs text-gray-500">{`${coupleDuration} juntos`}</p>}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            {hasNotification && <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF006F] rounded-full" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] md:w-[320px] bg-white p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-[#FF006F]/20">
                      <AvatarImage
                        src={user.avatarUrl ? `${user.avatarUrl}` : "/placeholder.svg"}
                        className="object-cover w-full h-full"
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-[#FFF2F8] text-[#FF006F]">
                        {user && !couple && user.name[0]}
                        {user && couple && couple.users[0].name[0] + couple.users[1].name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {user && !couple && <p className="font-medium text-gray-800">{user.name}</p>}

                      {user && coupleName && <p className="font-medium text-gray-800">{coupleName}</p>}

                      {coupleDuration && <p className="text-xs text-gray-500">{`${coupleDuration} juntos`}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex-1 py-2">
                  <nav className="px-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link key={item.href} href={item.href}>
                          <motion.div
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center justify-between px-3 py-2.5 my-0.5 rounded-lg transition-colors
                              ${isActive ? "bg-[#FFF2F8] text-[#FF006F]" : "text-gray-700 hover:bg-gray-50"}`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            {item.badge && <Badge className="bg-[#FF006F] hover:bg-[#FF006F]/90">{item.badge}</Badge>}
                          </motion.div>
                        </Link>
                      )
                    })}
                  </nav>

                  <Separator className="my-2 mx-3" />

                  <nav className="px-2">
                    {!couple && (
                      <Link href={Routes.INVITE_COUPLE}>
                        <motion.div
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-3 py-2.5 my-0.5 rounded-lg text-[#FF006F] hover:bg-[#FFF2F8] transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                          <span className="font-medium">Convidar parceiro(a)</span>
                        </motion.div>
                      </Link>
                    )}

                    <Link href={Routes.PROFILE}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-3 py-2.5 my-0.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Perfil</span>
                      </motion.div>
                    </Link>

                    <Link href={Routes.PROFILE}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-3 py-2.5 my-0.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Ajustes</span>
                      </motion.div>
                    </Link>
                  </nav>
                </div>

                <div className="p-3 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    <span className="font-medium">Sair</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  )
}

