import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/get-user";
import { canAccessFinancials } from "@/lib/services/team-service";

export const metadata: Metadata = {
  title: "Custos e Uso",
};

export default async function CustosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const hasAccess = await canAccessFinancials(userId);

  if (!hasAccess) {
    redirect("/dashboard?error=sem_acesso_financeiro");
  }

  return children;
}
