import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banco de Candidatos",
};

export default function CandidatosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
