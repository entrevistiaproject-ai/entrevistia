import { Suspense } from "react";
import { getDB } from "@/lib/db";
import { perguntasTemplates, perguntasOcultas } from "@/lib/db/schema";
import { desc, eq, or, isNull, and } from "drizzle-orm";
import { PerguntasListagemClient } from "@/components/perguntas/perguntas-listagem-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getUserId } from "@/lib/auth/get-user";

async function getPerguntas(userId?: string) {
  const db = getDB();

  // Buscar perguntas padrão do sistema OU perguntas do próprio usuário
  const conditions = [
    isNull(perguntasTemplates.deletedAt),
    or(
      eq(perguntasTemplates.isPadrao, true),
      userId ? eq(perguntasTemplates.userId, userId) : undefined
    )
  ].filter(Boolean);

  const perguntas = await db
    .select()
    .from(perguntasTemplates)
    .where(conditions.length > 1 ? and(...conditions as any) : conditions[0])
    .orderBy(desc(perguntasTemplates.createdAt));

  return perguntas;
}

async function getPerguntasOcultas(userId?: string) {
  if (!userId) return [];

  const db = getDB();
  const ocultas = await db
    .select({ perguntaId: perguntasOcultas.perguntaId })
    .from(perguntasOcultas)
    .where(eq(perguntasOcultas.userId, userId));

  return ocultas.map(o => o.perguntaId);
}

export default async function PerguntasPage() {
  const userId = await getUserId();
  const [perguntas, ocultasIds] = await Promise.all([
    getPerguntas(userId || undefined),
    getPerguntasOcultas(userId || undefined),
  ]);

  // Estatísticas (excluindo ocultas das contagens visíveis)
  const perguntasVisiveis = perguntas.filter(p => !ocultasIds.includes(p.id));
  const cargosUnicos = new Set(perguntasVisiveis.map(p => p.cargo));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banco de Perguntas</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas perguntas e monte pacotes para cada vaga
          </p>
        </div>
        <Link href="/perguntas/nova">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Pergunta
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">{perguntasVisiveis.length}</div>
          <p className="text-sm text-muted-foreground">Perguntas Visíveis</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">
            {perguntasVisiveis.filter(p => p.isPadrao).length}
          </div>
          <p className="text-sm text-muted-foreground">Perguntas Padrão</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">
            {perguntasVisiveis.filter(p => !p.isPadrao).length}
          </div>
          <p className="text-sm text-muted-foreground">Minhas Perguntas</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">{cargosUnicos.size}</div>
          <p className="text-sm text-muted-foreground">Cargos Cobertos</p>
        </div>
      </div>

      {/* Listagem de Perguntas */}
      <Suspense fallback={<div>Carregando perguntas...</div>}>
        <PerguntasListagemClient
          perguntas={perguntas}
          perguntasOcultasIdsInicial={ocultasIds}
        />
      </Suspense>
    </div>
  );
}
