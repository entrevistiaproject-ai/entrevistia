import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visão Geral",
  description: "Acompanhe o desempenho do seu processo seletivo com métricas e gráficos",
};

export default function VisaoGeralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
