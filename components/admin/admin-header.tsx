"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  Search,
  Bell,
  LogOut,
  X,
  ChevronRight,
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  Settings,
  Database,
  Building2,
  UserCog,
  FileText,
  TrendingUp,
} from "lucide-react";
import { LogoIcon } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AdminInfo {
  id: string;
  nome: string;
  email: string;
  role: string;
}

const mobileMenuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Usuários", href: "/admin/usuarios", icon: Users },
  { title: "Empresas", href: "/admin/empresas", icon: Building2 },
  { title: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { title: "Receitas & Custos", href: "/admin/financeiro", icon: DollarSign },
  { title: "Faturas", href: "/admin/faturas", icon: FileText },
  { title: "Monitoramento", href: "/admin/monitoramento", icon: Activity },
  { title: "Logs", href: "/admin/logs", icon: Database },
  { title: "Administradores", href: "/admin/administradores", icon: UserCog },
  { title: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/usuarios": "Usuários",
  "/admin/empresas": "Empresas",
  "/admin/analytics": "Analytics",
  "/admin/financeiro": "Receitas & Custos",
  "/admin/faturas": "Faturas",
  "/admin/monitoramento": "Monitoramento",
  "/admin/logs": "Logs de Auditoria",
  "/admin/administradores": "Administradores",
  "/admin/configuracoes": "Configurações",
};

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

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

  const currentPage = breadcrumbMap[pathname] || "Admin";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-slate-500">Admin</span>
          <ChevronRight className="h-4 w-4 text-slate-600" />
          <span className="text-white font-medium">{currentPage}</span>
        </div>

        {/* Mobile Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <LogoIcon className="h-6 w-6" />
          <span className="font-bold text-white">Admin</span>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md ml-auto mr-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Buscar usuários, faturas..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          {/* Search - Mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </button>

          {/* User Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-700">
            {adminInfo && (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {adminInfo.nome}
                  </p>
                  <p className="text-xs text-slate-400">{adminInfo.role}</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  {adminInfo.nome
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-20 p-4 bg-slate-900 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Buscar..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-700 overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <LogoIcon className="h-6 w-6" />
                <span className="font-bold text-white">Admin</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="p-4 space-y-1">
              {mobileMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile User Section */}
            {adminInfo && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-medium">
                    {adminInfo.nome
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {adminInfo.nome}
                    </p>
                    <p className="text-xs text-slate-400">{adminInfo.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-slate-700 text-slate-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
