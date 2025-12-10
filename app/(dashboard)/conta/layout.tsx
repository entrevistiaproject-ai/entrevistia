import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default function ContaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
