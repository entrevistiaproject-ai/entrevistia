import { Suspense } from "react";
import { getDB } from "@/lib/db";
import { perguntasTemplates, perguntasOcultas, perguntasFavoritas } from "@/lib/db/schema";
import { desc, eq, or, isNull, and } from "drizzle-orm";
import { PerguntasListagemClient } from "@/components/perguntas/perguntas-listagem-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
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

async function getPerguntasFavoritas(userId?: string) {
  if (!userId) return [];

  const db = getDB();
  const favoritas = await db
    .select({ perguntaId: perguntasFavoritas.perguntaId })
    .from(perguntasFavoritas)
    .where(eq(perguntasFavoritas.userId, userId));

  return favoritas.map(f => f.perguntaId);
}

export default async function PerguntasPage() {
  const userId = await getUserId();
  const [perguntas, ocultasIds, favoritasIds] = await Promise.all([
    getPerguntas(userId || undefined),
    getPerguntasOcultas(userId || undefined),
    getPerguntasFavoritas(userId || undefined),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Perguntas"
        description="Seu banco de perguntas para usar nas entrevistas"
      >
        <Button asChild size="touch" className="w-full sm:w-auto">
          <Link href="/perguntas/nova">
            <PlusCircle className="h-4 w-4" />
            Criar pergunta
          </Link>
        </Button>
      </PageHeader>

      {/* Listagem de Perguntas (KPIs agora estão no client) */}
      <Suspense fallback={
        <div className="space-y-5">
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </div>
      }>
        <PerguntasListagemClient
          perguntas={perguntas}
          perguntasOcultasIdsInicial={ocultasIds}
          perguntasFavoritasIdsInicial={favoritasIds}
        />
      </Suspense>
    </div>
  );
}
