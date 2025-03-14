'use client';

import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderPages = ["/auth/login", "/auth/register", "/auth/reset-password", "/setup/invite-couple", "/setup/verify-invite-couple", "/setup/complete-verify-couple", "auth/register-with-invite/token"];
  const shouldHideHeader = hideHeaderPages.find(route => pathname.startsWith(route));

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}
