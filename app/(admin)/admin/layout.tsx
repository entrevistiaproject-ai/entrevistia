import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
