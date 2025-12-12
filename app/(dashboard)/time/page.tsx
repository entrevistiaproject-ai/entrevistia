"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  UserPlus,
  Mail,
  Crown,
  Shield,
  UserCheck,
  Eye,
  Trash2,
  Clock,
  Loader2,
  X,
  Send,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface TeamMember {
  id: string;
  ownerId: string;
  memberId: string;
  role: "owner" | "admin" | "recruiter" | "viewer";
  isActive: boolean;
  createdAt: string;
  member: {
    id: string;
    nome: string;
    email: string;
  };
}

interface TeamInvitation {
  id: string;
  invitedEmail: string;
  invitedName: string | null;
  role: string;
  status: string;
  expiresAt: string;
  createdAt: string;
}

interface TeamOwner {
  id: string;
  nome: string;
  email: string;
  empresa: string | null;
  role: "owner";
}

interface TeamData {
  owner: TeamOwner;
  members: TeamMember[];
  invitations: TeamInvitation[];
  teamsUserBelongsTo: {
    owner: { id: string; nome: string; email: string; empresa: string | null };
    role: string;
    joinedAt: string;
  }[];
  memberCount: number;
  maxMembers: number;
}

const roleLabels: Record<string, string> = {
  owner: "Dono",
  admin: "Administrador",
  recruiter: "Recrutador",
  financial: "Financeiro",
  viewer: "Visualizador",
};

const roleIcons: Record<string, React.ElementType> = {
  owner: Crown,
  admin: Shield,
  recruiter: UserCheck,
  financial: Wallet,
  viewer: Eye,
};

const roleColors: Record<string, string> = {
  owner: "bg-amber-100 text-amber-800 border-amber-200",
  admin: "bg-purple-100 text-purple-800 border-purple-200",
  recruiter: "bg-blue-100 text-blue-800 border-blue-200",
  financial: "bg-green-100 text-green-800 border-green-200",
  viewer: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function TimePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  // Dialog de convite
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("recruiter");
  const [inviteMessage, setInviteMessage] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);

  // Estado para ações
  const [removingMember, setRemovingMember] = useState<string | null>(null);
  const [cancellingInvite, setCancellingInvite] = useState<string | null>(null);

  // Carregar dados do time
  useEffect(() => {
    fetchTeamData();
  }, []);

  async function fetchTeamData() {
    try {
      const res = await fetch("/api/time");
      if (res.ok) {
        const data = await res.json();
        setTeamData(data);
      } else {
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do time",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar time:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do time",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // Enviar convite
  async function handleSendInvite() {
    if (!inviteEmail.trim()) {
      toast({
        title: "Erro",
        description: "Digite o email do convidado",
        variant: "destructive",
      });
      return;
    }

    setSendingInvite(true);
    try {
      const res = await fetch("/api/time/convite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail,
          nome: inviteName || undefined,
          role: inviteRole,
          message: inviteMessage || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Convite enviado!",
          description: `Um email foi enviado para ${inviteEmail}`,
        });
        setInviteDialogOpen(false);
        setInviteEmail("");
        setInviteName("");
        setInviteRole("recruiter");
        setInviteMessage("");
        fetchTeamData();
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao enviar convite",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar convite:", error);
      toast({
        title: "Erro",
        description: "Erro ao enviar convite",
        variant: "destructive",
      });
    } finally {
      setSendingInvite(false);
    }
  }

  // Remover membro
  async function handleRemoveMember(memberId: string) {
    setRemovingMember(memberId);
    try {
      const res = await fetch(`/api/time/membro/${memberId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Membro removido",
          description: "O membro foi removido do time",
        });
        fetchTeamData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao remover membro",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao remover membro:", error);
      toast({
        title: "Erro",
        description: "Erro ao remover membro",
        variant: "destructive",
      });
    } finally {
      setRemovingMember(null);
    }
  }

  // Cancelar convite
  async function handleCancelInvite(invitationId: string) {
    setCancellingInvite(invitationId);
    try {
      const res = await fetch(`/api/time/convite/${invitationId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Convite cancelado",
          description: "O convite foi cancelado",
        });
        fetchTeamData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao cancelar convite",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao cancelar convite:", error);
      toast({
        title: "Erro",
        description: "Erro ao cancelar convite",
        variant: "destructive",
      });
    } finally {
      setCancellingInvite(null);
    }
  }

  // Alterar role de membro
  async function handleChangeRole(memberId: string, newRole: string) {
    try {
      const res = await fetch(`/api/time/membro/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        toast({
          title: "Permissão alterada",
          description: "A função do membro foi atualizada",
        });
        fetchTeamData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao alterar função",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao alterar função:", error);
      toast({
        title: "Erro",
        description: "Erro ao alterar função",
        variant: "destructive",
      });
    }
  }

  // Iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meu Time"
        description={`Gerencie os membros do seu time de recrutamento (${teamData?.memberCount || 1}/${teamData?.maxMembers || 7} membros)`}
      >
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={!!(teamData && teamData.memberCount >= teamData.maxMembers)}
              title={teamData && teamData.memberCount >= teamData.maxMembers ? "Limite de membros atingido" : undefined}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Convidar Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Convidar para o Time</DialogTitle>
              <DialogDescription>
                Envie um convite por email para adicionar um novo membro ao seu time
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="pl-10"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-name">Nome (opcional)</Label>
                <Input
                  id="invite-name"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Nome do convidado"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-role">Função no Time</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Administrador
                      </div>
                    </SelectItem>
                    <SelectItem value="recruiter">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Recrutador
                      </div>
                    </SelectItem>
                    <SelectItem value="financial">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        Financeiro
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Visualizador
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {inviteRole === "admin" &&
                    "Pode gerenciar membros e configurações"}
                  {inviteRole === "recruiter" &&
                    "Pode criar entrevistas, avaliar candidatos e configurar aprovação automática"}
                  {inviteRole === "financial" &&
                    "Acesso apenas às páginas financeiras (custos e fatura)"}
                  {inviteRole === "viewer" && "Apenas visualização"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-message">Mensagem (opcional)</Label>
                <Textarea
                  id="invite-message"
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Adicione uma mensagem personalizada ao convite..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setInviteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSendInvite} disabled={sendingInvite}>
                {sendingInvite ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Enviar Convite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Times que faz parte */}
      {teamData?.teamsUserBelongsTo && teamData.teamsUserBelongsTo.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Times que Participo
            </CardTitle>
            <CardDescription>
              Você também faz parte destes times como membro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamData.teamsUserBelongsTo.map((team) => {
                const RoleIcon = roleIcons[team.role] || Eye;
                return (
                  <div
                    key={team.owner.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(team.owner.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{team.owner.empresa || team.owner.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {team.owner.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={roleColors[team.role]}>
                      <RoleIcon className="mr-1 h-3 w-3" />
                      {roleLabels[team.role]}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meu Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Membros do Time
          </CardTitle>
          <CardDescription>
            {teamData?.members.length === 0
              ? "Você ainda não tem membros no time. Convide alguém!"
              : `${(teamData?.members.length || 0) + 1} membros no time`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Owner (você) */}
            {teamData?.owner && (
              <div className="flex items-center justify-between gap-3 p-4 rounded-lg border bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(teamData.owner.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{teamData.owner.nome}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">(você)</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {teamData.owner.email}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={`${roleColors.owner} shrink-0`}>
                  <Crown className="mr-1 h-3 w-3" />
                  Dono
                </Badge>
              </div>
            )}

            {/* Membros */}
            {teamData?.members.map((member) => {
              const RoleIcon = roleIcons[member.role] || Eye;
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted">
                        {getInitials(member.member.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.member.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.member.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleChangeRole(member.memberId, value)
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <RoleIcon className="h-3 w-3" />
                            {roleLabels[member.role]}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Administrador
                          </div>
                        </SelectItem>
                        <SelectItem value="recruiter">
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Recrutador
                          </div>
                        </SelectItem>
                        <SelectItem value="financial">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            Financeiro
                          </div>
                        </SelectItem>
                        <SelectItem value="viewer">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Visualizador
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveMember(member.memberId)}
                      disabled={removingMember === member.memberId}
                    >
                      {removingMember === member.memberId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Convites Pendentes */}
      {teamData?.invitations && teamData.invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Convites Pendentes
            </CardTitle>
            <CardDescription>
              {teamData.invitations.length} convite(s) aguardando resposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamData.invitations.map((invitation) => {
                const RoleIcon = roleIcons[invitation.role] || Eye;
                return (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-dashed"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-muted">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {invitation.invitedName || invitation.invitedEmail}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {invitation.invitedEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expira em {formatDate(invitation.expiresAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={roleColors[invitation.role]}>
                        <RoleIcon className="mr-1 h-3 w-3" />
                        {roleLabels[invitation.role]}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleCancelInvite(invitation.id)}
                        disabled={cancellingInvite === invitation.id}
                      >
                        {cancellingInvite === invitation.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Link para configurações de aprovação automática */}
      <Card>
        <CardHeader>
          <CardTitle>Aprovação Automática</CardTitle>
          <CardDescription>
            Configure a aprovação ou reprovação automática de candidatos com base no score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/time/configuracoes">
            <Button variant="outline">
              Configurar Aprovação Automática
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
