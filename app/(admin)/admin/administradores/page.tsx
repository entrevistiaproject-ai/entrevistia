"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserCog,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Clock,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Admin {
  id: string;
  nome: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  permissions: {
    canManageUsers: boolean;
    canManageFinances: boolean;
    canViewAnalytics: boolean;
    canManageAdmins: boolean;
    canAccessLogs: boolean;
  };
}

export default function AdministradoresPage() {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    role: "admin",
    canManageUsers: true,
    canManageFinances: true,
    canViewAnalytics: true,
    canManageAdmins: false,
    canAccessLogs: true,
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/administradores");
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.admins);
      }
    } catch (error) {
      console.error("Erro ao carregar admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setError("");
    setCreating(true);

    try {
      const response = await fetch("/api/admin/administradores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao criar administrador");
        return;
      }

      setCreateOpen(false);
      setFormData({
        nome: "",
        email: "",
        password: "",
        role: "admin",
        canManageUsers: true,
        canManageFinances: true,
        canViewAnalytics: true,
        canManageAdmins: false,
        canAccessLogs: true,
      });
      fetchAdmins();
    } catch {
      setError("Erro de conexão");
    } finally {
      setCreating(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-red-900 text-red-400 border-red-700">
            <ShieldAlert className="h-3 w-3 mr-1" />
            Super Admin
          </Badge>
        );
      case "admin":
        return (
          <Badge className="bg-blue-900 text-blue-400 border-blue-700">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case "viewer":
        return (
          <Badge className="bg-slate-800 text-slate-400 border-slate-600">
            <Eye className="h-3 w-3 mr-1" />
            Viewer
          </Badge>
        );
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const adminsFiltrados = admins.filter(
    (admin) =>
      !search ||
      admin.nome.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando administradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Administradores</h1>
          <p className="text-slate-400">{admins.length} administradores cadastrados</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setCreateOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Admin
          </Button>
          <Button onClick={fetchAdmins} variant="outline" className="border-slate-700">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-slate-900/50 border-slate-700 text-white"
        />
      </div>

      {/* Admin Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminsFiltrados.map((admin) => (
          <Card key={admin.id} className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-medium">
                    {admin.nome
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{admin.nome}</p>
                    <p className="text-sm text-slate-400">{admin.email}</p>
                  </div>
                </div>
                {admin.isActive ? (
                  <div className="w-2 h-2 rounded-full bg-emerald-400" title="Ativo" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-red-400" title="Inativo" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Papel</span>
                  {getRoleBadge(admin.role)}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Criado em
                  </span>
                  <span className="text-white">
                    {new Date(admin.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Último login
                  </span>
                  <span className="text-white">
                    {admin.lastLoginAt
                      ? new Date(admin.lastLoginAt).toLocaleDateString("pt-BR")
                      : "Nunca"}
                  </span>
                </div>
              </div>

              {/* Permissions */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-300 mb-2">Permissões</p>
                <div className="flex flex-wrap gap-1">
                  {admin.permissions.canManageUsers && (
                    <Badge variant="outline" className="text-xs text-blue-300 border-blue-400/40">
                      Usuários
                    </Badge>
                  )}
                  {admin.permissions.canManageFinances && (
                    <Badge variant="outline" className="text-xs text-emerald-300 border-emerald-400/40">
                      Financeiro
                    </Badge>
                  )}
                  {admin.permissions.canViewAnalytics && (
                    <Badge variant="outline" className="text-xs text-purple-300 border-purple-400/40">
                      Analytics
                    </Badge>
                  )}
                  {admin.permissions.canAccessLogs && (
                    <Badge variant="outline" className="text-xs text-amber-300 border-amber-400/40">
                      Logs
                    </Badge>
                  )}
                  {admin.permissions.canManageAdmins && (
                    <Badge variant="outline" className="text-xs text-red-300 border-red-400/40">
                      Admins
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-700 text-slate-300"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Novo Administrador
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Adicione um novo administrador ao sistema
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Nome</Label>
              <Input
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                placeholder="Nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Senha</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Papel</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-200">Permissões</Label>
              <div className="space-y-2">
                {[
                  { key: "canManageUsers", label: "Gerenciar Usuários" },
                  { key: "canManageFinances", label: "Gerenciar Financeiro" },
                  { key: "canViewAnalytics", label: "Ver Analytics" },
                  { key: "canAccessLogs", label: "Acessar Logs" },
                  { key: "canManageAdmins", label: "Gerenciar Admins" },
                ].map((perm) => (
                  <div key={perm.key} className="flex items-center gap-2">
                    <Checkbox
                      id={perm.key}
                      checked={formData[perm.key as keyof typeof formData] as boolean}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, [perm.key]: checked })
                      }
                    />
                    <label htmlFor={perm.key} className="text-sm text-slate-300">
                      {perm.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateOpen(false)}
              className="border-slate-700 text-slate-300"
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={creating}>
              {creating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Criar Admin
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
