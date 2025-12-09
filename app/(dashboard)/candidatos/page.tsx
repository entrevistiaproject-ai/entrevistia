"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, Phone, Briefcase, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filtrar candidatos
  const filteredCandidatos = candidatosMock.filter((c) =>
    searchQuery
      ? c.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vaga.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banco de Candidatos"
        description="Gerencie todos os candidatos do processo seletivo"
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar candidatos por nome, email ou vaga..."
            className="pl-9 pr-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button variant="outline" size="touch" className="w-full sm:w-auto">
          Filtros
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredCandidatos.map((candidato) => (
          <Card key={candidato.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm sm:text-base">
                      {getInitials(candidato.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">{candidato.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs sm:text-sm">
                      <Briefcase className="h-3 w-3 shrink-0" />
                      <span className="truncate">{candidato.vaga}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <Badge variant={getStatusVariant(candidato.status)} className="shrink-0">
                    {candidato.status}
                  </Badge>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Pontuação</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-primary">{candidato.pontuacao}</span>
                    </div>
                    <Progress value={candidato.pontuacao} className="h-1.5 w-16 mt-1" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{candidato.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{candidato.telefone}</span>
                </div>
                <span className="text-xs">
                  {candidato.linkExpira !== "-" && candidato.linkExpira !== "Expirado"
                    ? `Link expira em ${candidato.linkExpira}`
                    : candidato.linkExpira === "Expirado"
                    ? "Link expirado"
                    : "Sem link gerado"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Ver Perfil
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Gerar Link
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
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
