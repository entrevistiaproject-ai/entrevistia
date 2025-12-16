import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas } from "@/lib/db/schema";
import { eq, and, isNull, desc, sql } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { id: entrevistaId } = await params;

    // Parâmetros de paginação
    let page = 1;
    let limit = 20;

    // Valores permitidos de itens por página (computacionalmente aceitáveis)
    const ALLOWED_LIMITS = [10, 20, 50, 100];

    try {
      const { searchParams } = new URL(request.url);
      page = Math.max(1, parseInt(searchParams.get("page") || "1"));
      const requestedLimit = parseInt(searchParams.get("limit") || "20");
      limit = ALLOWED_LIMITS.includes(requestedLimit) ? requestedLimit : 20;
    } catch (error) {
      console.warn("Falha ao processar URL:", error);
    }

    const offset = (page - 1) * limit;
    const db = getDB();

    // Verificar se a entrevista pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, entrevistaId),
          eq(entrevistas.userId, userId)
        )
      )
      .limit(1);

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Condições para filtrar candidatos da entrevista
    const baseConditions = and(
      eq(candidatoEntrevistas.entrevistaId, entrevistaId),
      isNull(candidatos.deletedAt)
    );

    // Buscar total para paginação
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatoEntrevistas.candidatoId, candidatos.id))
      .where(baseConditions);

    // Buscar candidatos vinculados à entrevista através da tabela candidato_entrevistas
    const resultado = await db
      .select({
        id: candidatos.id,
        nome: candidatos.nome,
        email: candidatos.email,
        telefone: candidatos.telefone,
        linkedin: candidatos.linkedin,
        createdAt: candidatos.createdAt,
        // Dados da participação na entrevista
        status: candidatoEntrevistas.status,
        iniciadaEm: candidatoEntrevistas.iniciadaEm,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        // Prazo de resposta
        prazoResposta: candidatoEntrevistas.prazoResposta,
        conviteEnviadoEm: candidatoEntrevistas.conviteEnviadoEm,
        // Dados da avaliação da IA
        notaGeral: candidatoEntrevistas.notaGeral,
        recomendacao: candidatoEntrevistas.recomendacao,
        avaliadoEm: candidatoEntrevistas.avaliadoEm,
        // Decisão manual do recrutador
        decisaoRecrutador: candidatoEntrevistas.decisaoRecrutador,
        decisaoRecrutadorEm: candidatoEntrevistas.decisaoRecrutadorEm,
        decisaoRecrutadorObservacao: candidatoEntrevistas.decisaoRecrutadorObservacao,
        // Email de encerramento
        emailEncerramentoEnviadoEm: candidatoEntrevistas.emailEncerramentoEnviadoEm,
        // ID da sessão para ações
        candidatoEntrevistaId: candidatoEntrevistas.id,
      })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatoEntrevistas.candidatoId, candidatos.id))
      .where(baseConditions)
      .orderBy(desc(candidatoEntrevistas.createdAt))
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(totalCount / limit);
    const pagination = {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasMore: page < totalPages,
      allowedLimits: ALLOWED_LIMITS,
    };

    return NextResponse.json({ candidatos: resultado, pagination });
  } catch (error) {
    console.error("Erro ao buscar candidatos da entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}
