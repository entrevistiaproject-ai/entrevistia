import { Suspense } from "react";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { desc, eq, or, isNull, and } from "drizzle-orm";
import { PerguntasListagem } from "@/components/perguntas/perguntas-listagem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getUserId } from "@/lib/auth/get-user";

async function getPerguntas(userId?: string) {
  const db = getDB();

  // Buscar perguntas padrão do sistema OU perguntas do próprio usuário
  // Cada recrutador vê apenas suas perguntas + as padrão do sistema
  const conditions = [
    isNull(perguntasTemplates.deletedAt),
    or(
      eq(perguntasTemplates.isPadrao, true), // Perguntas padrão do sistema
      userId ? eq(perguntasTemplates.userId, userId) : undefined // Perguntas do usuário logado
    )
  ].filter(Boolean);

  const perguntas = await db
    .select()
    .from(perguntasTemplates)
    .where(conditions.length > 1 ? and(...conditions as any) : conditions[0])
    .orderBy(desc(perguntasTemplates.createdAt));

  return perguntas;
}

export default async function PerguntasPage() {
  const userId = await getUserId();
  const perguntas = await getPerguntas(userId || undefined);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banco de Perguntas</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas perguntas e use templates para criar entrevistas
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
          <div className="text-2xl font-bold">{perguntas.length}</div>
          <p className="text-sm text-muted-foreground">Total de Perguntas</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">
            {perguntas.filter(p => p.isPadrao).length}
          </div>
          <p className="text-sm text-muted-foreground">Perguntas Padrão</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">
            {perguntas.filter(p => !p.isPadrao).length}
          </div>
          <p className="text-sm text-muted-foreground">Minhas Perguntas</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">
            {new Set(perguntas.map(p => p.cargo)).size}
          </div>
          <p className="text-sm text-muted-foreground">Cargos Cobertos</p>
        </div>
      </div>

      {/* Listagem de Perguntas */}
      <Suspense fallback={<div>Carregando perguntas...</div>}>
        <PerguntasListagem perguntas={perguntas} />
      </Suspense>
    </div>
  );
}
