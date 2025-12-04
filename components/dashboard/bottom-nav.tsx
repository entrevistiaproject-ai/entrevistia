"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  PlusCircle,
  Users,
  BarChart3,
  User,
  HelpCircle,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    icon: BarChart3,
    label: "Dashboard",
  },
  {
    href: "/entrevistas",
    icon: Briefcase,
    label: "Entrevistas",
  },
  {
    href: "/criar-entrevista",
    icon: PlusCircle,
    label: "Criar",
  },
  {
    href: "/perguntas",
    icon: HelpCircle,
    label: "Perguntas",
  },
  {
    href: "/candidatos",
    icon: Users,
    label: "Candidatos",
  },
  {
    href: "/conta",
    icon: User,
    label: "Conta",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-3 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
