"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Users,
  BarChart3,
  HelpCircle,
  MoreHorizontal,
  User,
  DollarSign,
  PlusCircle,
  Settings,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    href: "/",
    icon: BarChart3,
    label: "Dashboard",
  },
  {
    href: "/entrevistas",
    icon: Briefcase,
    label: "Entrevistas",
  },
  {
    href: "/candidatos",
    icon: Users,
    label: "Candidatos",
  },
  {
    href: "/perguntas",
    icon: HelpCircle,
    label: "Perguntas",
  },
];

const moreItems = [
  {
    href: "/criar-entrevista",
    icon: PlusCircle,
    label: "Criar Entrevista",
    description: "Nova entrevista rápida",
  },
  {
    href: "/conta",
    icon: User,
    label: "Minha Conta",
    description: "Perfil e configurações",
  },
  {
    href: "/custos",
    icon: DollarSign,
    label: "Custos e Uso",
    description: "Gerenciar plano e pagamentos",
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Verifica se está em uma página do "Mais"
  const isMoreActive = moreItems.some(item => pathname === item.href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around">
        {/* Itens principais */}
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

        {/* Botão Mais */}
        <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-3 transition-colors",
                isMoreActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MoreHorizontal className={cn("h-6 w-6", isMoreActive && "fill-primary/20")} />
              <span className="text-xs font-medium">Mais</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>Mais Opções</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-4 rounded-lg p-4 transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent"
                    )}
                  >
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg",
                      isActive ? "bg-primary/20" : "bg-muted"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
