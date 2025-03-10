import { Header } from "@/components/header";
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sintonia | Pequenos sinais, grandes conexões",
  description: "Detecte os sinais, resolva os problemas antes de crescerem. Sintonia: onde a comunicação é o segredo, para o amor duradouro",
  keywords: ["relacionamento", "comunicação", "amor", "casal", "sintonia", "relacionamentos", "terapia de casal"],
  authors: [{ name: "Sintonia" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sintonia-nine.vercel.app/",
    title: "Sintonia | Pequenos sinais, grandes conexões",
    description: "Detecte os sinais, resolva os problemas antes de crescerem. Sintonia: onde a comunicação é o segredo, para o amor duradouro",
    siteName: "Sintonia",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Sintonia - Pequenos sinais, grandes conexões"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sintonia | Pequenos sinais, grandes conexões",
    description: "Detecte os sinais, resolva os problemas antes de crescerem. Sintonia: onde a comunicação é o segredo, para o amor duradouro",
    images: ["/og-image.jpg"]
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}