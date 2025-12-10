"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Briefcase,
  PlusCircle,
  Users,
  BarChart3,
  DollarSign,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { signOut } from "next-auth/react";

const mainMenuItems = [
  {
    title: "Visão geral",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Entrevistas",
    href: "/entrevistas",
    icon: Briefcase,
  },
  {
    title: "Nova entrevista",
    href: "/criar-entrevista",
    icon: PlusCircle,
  },
  {
    title: "Perguntas",
    href: "/perguntas",
    icon: HelpCircle,
  },
  {
    title: "Candidatos",
    href: "/candidatos",
    icon: Users,
  },
];

const secondaryMenuItems = [
  {
    title: "Uso e créditos",
    href: "/custos",
    icon: DollarSign,
  },
  {
    title: "Minha conta",
    href: "/conta",
    icon: User,
  },
];

interface UserInfo {
  nome: string | null;
  email: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Buscar informações do usuário
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setUserInfo({
            nome: data.nome,
            email: data.email,
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, []);

  // Função para pegar as iniciais do nome
  const getInitials = (nome: string | null, email: string) => {
    if (nome) {
      return nome
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return email[0].toUpperCase();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-card md:block">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo size="md" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-8 px-4 py-6 overflow-y-auto scroll-smooth">
          {/* Menu Principal */}
          <div className="space-y-1.5">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Principal
            </p>
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Menu Secundário */}
          <div className="space-y-1.5">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Configurações
            </p>
            {secondaryMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="border-t border-border p-5">
          {userInfo ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                {getInitials(userInfo.nome, userInfo.email)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userInfo.nome || "Usuário"}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {userInfo.email}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-3 w-32 bg-muted rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
