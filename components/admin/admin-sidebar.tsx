"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  Activity,
  LogOut,
  ChevronDown,
  UserCog,
  Bell,
  Database,
  Ticket,
  Bug,
  Shield,
} from "lucide-react";
import { Logo } from "@/components/logo";

interface AdminInfo {
  id: string;
  nome: string;
  email: string;
  role: string;
  permissions: {
    canManageUsers: boolean;
    canManageFinances: boolean;
    canViewAnalytics: boolean;
    canManageAdmins: boolean;
    canAccessLogs: boolean;
  };
}

const menuGroups = [
  {
    title: "Visão Geral",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        permission: null,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: TrendingUp,
        permission: "canViewAnalytics" as const,
      },
    ],
  },
  {
    title: "Gerenciamento",
    items: [
      {
        title: "Usuários",
        href: "/admin/usuarios",
        icon: Users,
        permission: "canManageUsers" as const,
      },
    ],
  },
  {
    title: "Financeiro",
    items: [
      {
        title: "Receitas & Custos",
        href: "/admin/financeiro",
        icon: DollarSign,
        permission: "canManageFinances" as const,
      },
      {
        title: "Faturas",
        href: "/admin/faturas",
        icon: FileText,
        permission: "canManageFinances" as const,
      },
    ],
  },
  {
    title: "Suporte",
    items: [
      {
        title: "Chamados",
        href: "/admin/suporte",
        icon: Ticket,
        permission: "canAccessLogs" as const,
      },
      {
        title: "Erros",
        href: "/admin/erros",
        icon: Bug,
        permission: "canAccessLogs" as const,
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        title: "Monitoramento",
        href: "/admin/monitoramento",
        icon: Activity,
        permission: "canViewAnalytics" as const,
      },
      {
        title: "Segurança",
        href: "/admin/seguranca",
        icon: Shield,
        permission: "canViewAnalytics" as const,
      },
      {
        title: "Logs de Auditoria",
        href: "/admin/logs",
        icon: Database,
        permission: "canAccessLogs" as const,
      },
      {
        title: "Administradores",
        href: "/admin/administradores",
        icon: UserCog,
        permission: "canManageAdmins" as const,
      },
      {
        title: "Configurações",
        href: "/admin/configuracoes",
        icon: Settings,
        permission: "canManageAdmins" as const,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    menuGroups.map((g) => g.title)
  );

  useEffect(() => {
    fetch("/api/admin/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAdminInfo(data.admin);
        }
      })
      .catch(console.error);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  const hasPermission = (
    permission: keyof AdminInfo["permissions"] | null
  ): boolean => {
    if (!adminInfo) return false;
    if (!permission) return true;
    if (adminInfo.role === "super_admin") return true;
    return adminInfo.permissions[permission];
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "admin":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "viewer":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "admin":
        return "Administrador";
      case "viewer":
        return "Visualizador";
      default:
        return role;
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-slate-700 bg-slate-900 lg:block">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-700 px-4">
          <Logo size="md" textClassName="text-white" />
          <span className="text-xs text-slate-400 ml-auto">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="space-y-6">
            {menuGroups.map((group) => {
              const visibleItems = group.items.filter((item) =>
                hasPermission(item.permission)
              );

              if (visibleItems.length === 0) return null;

              const isExpanded = expandedGroups.includes(group.title);

              return (
                <div key={group.title} className="space-y-1">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="space-y-1">
                      {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                          pathname === item.href ||
                          (item.href !== "/admin" &&
                            pathname.startsWith(item.href));

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                              isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Notifications */}
        <div className="border-t border-slate-700 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Bell className="h-5 w-5" />
            <span>Notificações</span>
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              3
            </span>
          </button>
        </div>

        {/* Admin Info */}
        <div className="border-t border-slate-700 p-4">
          {adminInfo ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-sm font-semibold text-white shrink-0">
                  {adminInfo.nome
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {adminInfo.nome}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {adminInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-md border",
                    getRoleBadgeColor(adminInfo.role)
                  )}
                >
                  {getRoleLabel(adminInfo.role)}
                </span>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-slate-700 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-slate-700 rounded" />
                <div className="h-3 w-32 bg-slate-700 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
