'use client';

import { Header } from "@/components/header";
import { Routes } from "@/constants/routes";
import { usePathname } from "next/navigation";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderPages = [
    "/auth/login", "/auth/register", "/auth/reset-password", Routes.INVITE_COUPLE, "auth/register-with-invite/token", "/couple/invite/accept"
  ];
  const shouldHideHeader = hideHeaderPages.find(route => pathname.startsWith(route));

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}
