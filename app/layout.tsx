import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EntrevistIA - Entrevistas com Inteligência Artificial",
    template: "%s | EntrevistIA",
  },
  description:
    "Automatize o filtro inicial de candidatos com IA. Economize tempo e contrate os melhores talentos com análise inteligente.",
  keywords: [
    "entrevista",
    "recrutamento",
    "inteligência artificial",
    "RH",
    "recursos humanos",
    "seleção",
    "candidatos",
  ],
  authors: [{ name: "EntrevistIA" }],
  creator: "EntrevistIA",
  metadataBase: new URL("https://entrevistia.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "EntrevistIA",
    title: "EntrevistIA - Entrevistas com Inteligência Artificial",
    description:
      "Automatize o filtro inicial de candidatos com IA. Economize tempo e contrate os melhores talentos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EntrevistIA - Entrevistas com Inteligência Artificial",
    description:
      "Automatize o filtro inicial de candidatos com IA. Economize tempo e contrate os melhores talentos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
