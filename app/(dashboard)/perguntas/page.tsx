import { Suspense } from "react";
import { getDB } from "@/lib/db";
import { perguntasTemplates, perguntasOcultas } from "@/lib/db/schema";
import { desc, eq, or, isNull, and } from "drizzle-orm";
import { PerguntasListagemClient } from "@/components/perguntas/perguntas-listagem-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, FileQuestion, Star, User, Briefcase } from "lucide-react";
import { getUserId } from "@/lib/auth/get-user";
import { PageHeader } from "@/components/ui/page-header";
import { SkeletonCard } from "@/components/ui/skeleton-card";

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
      <PageHeader
        title="Banco de Perguntas"
        description="Gerencie suas perguntas e monte pacotes para cada vaga"
      >
        <Button asChild size="touch" className="w-full sm:w-auto">
          <Link href="/perguntas/nova">
            <PlusCircle className="h-4 w-4" />
            Nova Pergunta
          </Link>
        </Button>
      </PageHeader>

      {/* Estatísticas - scroll horizontal no mobile */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          <div className="rounded-lg border bg-card p-4 sm:p-6 min-w-[130px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileQuestion className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">{perguntasVisiveis.length}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Perguntas Visíveis</p>
          </div>
          <div className="rounded-lg border bg-card p-4 sm:p-6 min-w-[130px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Star className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              {perguntasVisiveis.filter(p => p.isPadrao).length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Perguntas Padrão</p>
          </div>
          <div className="rounded-lg border bg-card p-4 sm:p-6 min-w-[130px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              {perguntasVisiveis.filter(p => !p.isPadrao).length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Minhas Perguntas</p>
          </div>
          <div className="rounded-lg border bg-card p-4 sm:p-6 min-w-[130px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">{cargosUnicos.size}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Cargos Cobertos</p>
          </div>
        </div>
      </div>

      {/* Listagem de Perguntas */}
      <Suspense fallback={
        <div className="space-y-4">
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </div>
      }>
        <PerguntasListagemClient
          perguntas={perguntas}
          perguntasOcultasIdsInicial={ocultasIds}
        />
      </Suspense>
    </div>
  );
}
