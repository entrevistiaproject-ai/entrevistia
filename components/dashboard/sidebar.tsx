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
} from "lucide-react";

const mainMenuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
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
    title: "Banco de Perguntas",
    href: "/perguntas",
    icon: HelpCircle,
  },
  {
    title: "Banco de Candidatos",
    href: "/candidatos",
    icon: Users,
  },
];

const secondaryMenuItems = [
  {
    title: "Custos e Uso",
    href: "/custos",
    icon: DollarSign,
  },
  {
    title: "Minha Conta",
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
        if (data.user) {
          setUserInfo({
            nome: data.user.nome,
            email: data.user.email,
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
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-bold text-primary">EntrevistIA</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 px-3 py-4 overflow-y-auto">
          {/* Menu Principal */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
          </div>

          {/* Menu Secundário */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
          </div>
        </nav>

        {/* User Info */}
        <div className="border-t border-border p-4">
          {userInfo ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {getInitials(userInfo.nome, userInfo.email)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userInfo.nome || "Usuário"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userInfo.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted" />
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
