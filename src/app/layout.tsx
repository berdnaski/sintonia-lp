// app/layout.tsx (ou app/layout.js)
import { Header } from "@/components/header";
import "./globals.css";
import Head from "next/head"; // Adicionando o Head para controlar o conteúdo do <head>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`antialiased mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
