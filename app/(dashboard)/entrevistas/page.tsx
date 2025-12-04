"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Briefcase, Users, Calendar } from "lucide-react";
import Link from "next/link";

const entrevistasMock = [
  {
    id: 1,
    titulo: "Desenvolvedor Full Stack Senior",
    tipo: "Desenvolvimento",
    senioridade: "Senior",
    candidatos: 24,
    status: "Ativa",
    dataCriacao: "2024-03-01",
  },
  {
    id: 2,
    titulo: "UX Designer Pleno",
    tipo: "Design",
    senioridade: "Pleno",
    candidatos: 18,
    status: "Ativa",
    dataCriacao: "2024-03-05",
  },
  {
    id: 3,
    titulo: "Product Manager",
    tipo: "Produto",
    senioridade: "Senior",
    candidatos: 32,
    status: "Ativa",
    dataCriacao: "2024-02-28",
  },
  {
    id: 4,
    titulo: "Desenvolvedor Frontend Junior",
    tipo: "Desenvolvimento",
    senioridade: "Junior",
    candidatos: 45,
    status: "Pausada",
    dataCriacao: "2024-02-20",
  },
];

export default function EntrevistasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Entrevistas</h1>
          <p className="text-muted-foreground">
            Gerencie suas entrevistas e acompanhe os candidatos
          </p>
        </div>
        <Button asChild>
          <Link href="/criar-entrevista">
            <Plus className="mr-2 h-4 w-4" />
            Nova Entrevista
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {entrevistasMock.map((entrevista) => (
          <Card key={entrevista.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    {entrevista.titulo}
                  </CardTitle>
                  <CardDescription>
                    {entrevista.tipo} • {entrevista.senioridade}
                  </CardDescription>
                </div>
                <Badge variant={entrevista.status === "Ativa" ? "default" : "secondary"}>
                  {entrevista.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{entrevista.candidatos} candidatos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Criada em {new Date(entrevista.dataCriacao).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Ver Candidatos
                </Button>
                <Button variant="outline" size="sm">
                  Editar Entrevista
                </Button>
                <Button variant="outline" size="sm">
                  Ver Perguntas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
