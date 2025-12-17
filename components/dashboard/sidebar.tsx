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
  MessageSquare,
  UsersRound,
  Home,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { signOut, useSession } from "next-auth/react";
import { SupportWidget } from "@/components/support/support-widget";

// Função de logout que limpa dados sensíveis do localStorage
const handleSignOut = () => {
  // Não limpa o email salvo - isso é controlado pela opção "Lembrar meu email"
  // que é gerenciada no login (se desmarcado, o email já foi removido no login)
  // Mas limpamos outros dados de cache que possam causar problemas ao trocar de usuário
  if (typeof window !== "undefined") {
    // Remove qualquer cache de dados do usuário anterior
    localStorage.removeItem("userCache");
    localStorage.removeItem("usageCache");
  }
  signOut({ callbackUrl: "/" });
};

const mainMenuItems = [
  {
    title: "Minha Mesa",
    href: "/painel",
    icon: Home,
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
    title: "Candidatos",
    href: "/candidatos",
    icon: Users,
  },
  {
    title: "Visão geral",
    href: "/visao-geral",
    icon: BarChart3,
  },
  {
    title: "Perguntas",
    href: "/perguntas",
    icon: HelpCircle,
  },
];

// Itens que requerem acesso financeiro
const financialMenuItems = [
  {
    title: "Uso e créditos",
    href: "/custos",
    icon: DollarSign,
  },
];

const secondaryMenuItems = [
  {
    title: "Meu Time",
    href: "/time",
    icon: UsersRound,
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
  canAccessFinancials: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Usa permissões da sessão JWT (calculadas no login) como valor inicial
  // A API serve como reforço de segurança e atualização
  const sessionUser = session?.user as { canAccessFinancials?: boolean } | undefined;
  const canAccessFinancials = userInfo?.canAccessFinancials ?? sessionUser?.canAccessFinancials ?? true;

  useEffect(() => {
    // Buscar informações do usuário (reforço de segurança)
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setUserInfo({
            nome: data.nome,
            email: data.email,
            canAccessFinancials: data.canAccessFinancials ?? true,
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
            {/* Itens financeiros - apenas para owners */}
            {canAccessFinancials && financialMenuItems.map((item) => {
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
            {/* Itens gerais */}
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

        {/* Suporte */}
        <div className="px-4 pb-4">
          <SupportWidget
            trigger={
              <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer">
                <MessageSquare className="h-5 w-5 shrink-0" />
                <span className="truncate">Ajuda e Suporte</span>
              </button>
            }
          />
        </div>

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
                onClick={handleSignOut}
                className="p-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
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
