import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custos e Uso",
};

export default function CustosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
