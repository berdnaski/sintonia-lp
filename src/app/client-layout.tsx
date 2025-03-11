'use client';

import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderPages = ["/auth/login", "/auth/register", "/auth/reset-password"];
  const shouldHideHeader = hideHeaderPages.includes(pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}