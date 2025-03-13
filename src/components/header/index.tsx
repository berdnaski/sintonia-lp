"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Home, Layers, Heart, Image, User, Settings, LogOut, Menu } from "lucide-react"
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { icon: Home, label: "Início", href: "/dashboard" },
  { icon: Layers, label: "Sinais", href: "/sinais" },
  { icon: Heart, label: "Saúde", href: "/saude" },
  { icon: Image, label: "Memórias", href: "/memorias" },
]

export function Header() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const isMobile = useMobile()
  const [hasNotification, setHasNotification] = useState(true)

  return (
    <div>
      <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-20 bg-white/95 backdrop-blur-sm border-r border-gray-100 flex-col items-center py-6 z-40 shadow-sm">
        <div className="mb-8">
          <Link href="/dashboard">
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
                          ${isActive
                          ? 'bg-[#FFF2F8] text-[#FF006F] shadow-sm'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-[#FF006F]'
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
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
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Ana & Pedro</p>
                  <p className="text-xs text-gray-500">2 anos juntos</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ajustes</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="w-full h-12 rounded-xl relative hover:bg-gray-50">
            <Bell className="h-5 w-5 text-gray-500" />
            {hasNotification && <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF006F] rounded-full" />}
          </Button>
        </div>
      </aside>

      <header className="block xl:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-4 z-40 shadow-sm">
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF006F] to-[#FF708B] flex items-center justify-center shadow-md">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">Ana & Pedro</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF006F] rounded-full" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] md:w-[400px] bg-[#ecc2d4]">
              <SheetHeader className="mb-6">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50">
                <Avatar className="h-10 w-10 ring-2 ring-[#FF006F]/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ana & Pedro</p>
                  <p className="text-xs text-gray-500">2 anos juntos</p>
                </div>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={`flex items-center gap-3 px-3 py-3 transition-colors
                        ${isActive ? "bg-[#FFF2F8] text-[#FF006F]" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                        <span>{item.label}</span>
                        {item.href === "/sinais" && <Badge className="ml-auto bg-[#FF006F]">Novo</Badge>}
                      </div>
                    </Link>
                  )
                })}
              </nav>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Ajustes
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  )
}

