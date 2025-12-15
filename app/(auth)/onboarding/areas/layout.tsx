import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurar Banco de Perguntas",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
