"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Info,
  Settings,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";

export default function ConfiguracoesTimePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/time">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title="Configurações do Time"
          description="Gerencie as configurações gerais do seu time"
        />
      </div>

      {/* Card informativo sobre aprovação automática */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium mb-2">Configurações de Aprovação Automática</p>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                A aprovação e reprovação automática de candidatos agora é configurada individualmente para cada vaga.
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                Para configurar a aprovação automática, acesse a vaga desejada em <strong>Entrevistas</strong> e vá na aba <strong>Configurações</strong>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de configurações gerais (placeholder para futuras configurações) */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as preferências gerais do time
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-lg font-semibold">Nenhuma configuração disponível</p>
            <p className="text-muted-foreground">
              As configurações do time aparecerão aqui
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
