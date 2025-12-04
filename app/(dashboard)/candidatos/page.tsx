"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, Phone, Briefcase } from "lucide-react";

const candidatosMock = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    vaga: "Desenvolvedor Full Stack Senior",
    status: "Link enviado",
    pontuacao: 85,
    linkExpira: "2 dias",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(11) 98765-4322",
    vaga: "UX Designer Pleno",
    status: "Concluído",
    pontuacao: 92,
    linkExpira: "Expirado",
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    telefone: "(11) 98765-4323",
    vaga: "Product Manager",
    status: "Em andamento",
    pontuacao: 78,
    linkExpira: "5 dias",
  },
  {
    id: 4,
    nome: "Ana Paula",
    email: "ana.paula@email.com",
    telefone: "(11) 98765-4324",
    vaga: "Desenvolvedor Frontend Junior",
    status: "Aguardando",
    pontuacao: 88,
    linkExpira: "-",
  },
];

export default function CandidatosPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Concluído":
        return "default";
      case "Em andamento":
        return "default";
      case "Link enviado":
        return "outline";
      case "Aguardando":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Banco de Candidatos</h1>
        <p className="text-muted-foreground">
          Gerencie todos os candidatos do processo seletivo
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar candidatos por nome, email ou vaga..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      <div className="grid gap-4">
        {candidatosMock.map((candidato) => (
          <Card key={candidato.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(candidato.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{candidato.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {candidato.vaga}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(candidato.status)}>
                    {candidato.status}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium">Pontuação</div>
                    <div className="text-2xl font-bold text-primary">{candidato.pontuacao}</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{candidato.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{candidato.telefone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs">
                    {candidato.linkExpira !== "-" && candidato.linkExpira !== "Expirado"
                      ? `Link expira em ${candidato.linkExpira}`
                      : candidato.linkExpira === "Expirado"
                      ? "Link expirado"
                      : "Sem link gerado"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Ver Perfil
                </Button>
                <Button variant="outline" size="sm">
                  Gerar Link
                </Button>
                <Button variant="outline" size="sm">
                  Copiar Link
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
