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
  MessageSquare,
  ClipboardList,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SupportWidget } from "@/components/support/support-widget";

// 4 itens principais no mobile (baseado em UX de apps de recrutamento)
const navItems = [
  {
    href: "/painel",
    icon: ClipboardList,
    label: "Tarefas",
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
    href: "/criar-entrevista",
    icon: PlusCircle,
    label: "Nova",
  },
];

// Itens secundários no menu "Mais"
const moreItems = [
  {
    href: "/visao-geral",
    icon: BarChart3,
    label: "Visão Geral",
    description: "Métricas e relatórios",
  },
  {
    href: "/perguntas",
    icon: HelpCircle,
    label: "Perguntas",
    description: "Banco de perguntas",
  },
  {
    href: "/time",
    icon: UsersRound,
    label: "Meu Time",
    description: "Gerenciar equipe",
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
    label: "Uso e Créditos",
    description: "Gerenciar plano e pagamentos",
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Verifica se está em uma página do "Mais"
  const isMoreActive = moreItems.some(item => pathname === item.href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
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
                "flex flex-col items-center justify-center gap-1 min-w-16 min-h-14 px-2 py-2 transition-all duration-200 active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                isActive && "bg-primary/10"
              )}>
                <Icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Botão Mais */}
        <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-16 min-h-14 px-2 py-2 transition-all duration-200 active:scale-95 cursor-pointer",
                isMoreActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                isMoreActive && "bg-primary/10"
              )}>
                <MoreHorizontal className={cn("h-5 w-5", isMoreActive && "fill-primary/20")} />
              </div>
              <span className="text-[10px] font-medium">Mais</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto rounded-t-2xl pb-safe">
            <SheetHeader>
              <SheetTitle>Mais Opções</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2 pb-4">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl p-4 transition-all duration-200 active:scale-[0.98]",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent active:bg-accent"
                    )}
                  >
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
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

              {/* Botão de Suporte */}
              <SupportWidget
                trigger={
                  <button
                    className="w-full flex items-center gap-4 rounded-xl p-4 transition-all duration-200 active:scale-[0.98] hover:bg-accent active:bg-accent cursor-pointer"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">Ajuda e Suporte</p>
                      <p className="text-sm text-muted-foreground">
                        Abrir um chamado de suporte
                      </p>
                    </div>
                  </button>
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
