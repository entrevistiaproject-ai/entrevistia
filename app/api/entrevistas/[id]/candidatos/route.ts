import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas } from "@/lib/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";

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
      .where(
        and(
          eq(candidatoEntrevistas.entrevistaId, entrevistaId),
          isNull(candidatos.deletedAt)
        )
      )
      .orderBy(desc(candidatoEntrevistas.createdAt));

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro ao buscar candidatos da entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}
