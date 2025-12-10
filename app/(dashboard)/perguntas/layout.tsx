import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banco de Perguntas",
};

export default function PerguntasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
