import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fatura",
};

export default function FaturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
