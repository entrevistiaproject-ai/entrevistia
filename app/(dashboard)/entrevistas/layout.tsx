import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minhas Entrevistas",
};

export default function EntrevistasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
