"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  PlusCircle,
  Users,
  BarChart3,
  DollarSign,
  User,
} from "lucide-react";

const menuItems = [
  {
    title: "Minhas Entrevistas",
    href: "/entrevistas",
    icon: Briefcase,
  },
  {
    title: "Criar Entrevista",
    href: "/criar-entrevista",
    icon: PlusCircle,
  },
  {
    title: "Banco de Candidatos",
    href: "/candidatos",
    icon: Users,
  },
  {
    title: "Dashboards",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Custos",
    href: "/custos",
    icon: DollarSign,
  },
  {
    title: "Conta",
    href: "/conta",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-bold text-primary">Entrevistia</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Avaliador Principal</p>
              <p className="text-xs text-muted-foreground">avaliador@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
