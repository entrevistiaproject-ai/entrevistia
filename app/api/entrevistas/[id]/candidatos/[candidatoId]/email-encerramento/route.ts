import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas, entrevistas, candidatos } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import { emailEncerramentoTemplate } from "@/lib/email/templates";

/**
 * POST /api/entrevistas/[id]/candidatos/[candidatoId]/email-encerramento
 *
 * Envia email de encerramento para candidato não aprovado.
 *
 * Body:
 * - mensagem?: string (mensagem personalizada, se não fornecida usa a padrão)
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; candidatoId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { id: entrevistaId, candidatoId } = await params;
    const body = await request.json();
    const { mensagem } = body;

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

    // Buscar dados do candidato
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, candidatoId))
      .limit(1);

    if (!candidato) {
      return NextResponse.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se o candidato está vinculado a esta entrevista
    const [participacao] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.entrevistaId, entrevistaId),
          eq(candidatoEntrevistas.candidatoId, candidatoId)
        )
      )
      .limit(1);

    if (!participacao) {
      return NextResponse.json(
        { error: "Candidato não encontrado nesta entrevista" },
        { status: 404 }
      );
    }

    // Verificar se o candidato foi reprovado
    if (participacao.decisaoRecrutador !== "reprovado") {
      return NextResponse.json(
        { error: "Email de encerramento só pode ser enviado para candidatos não aprovados" },
        { status: 400 }
      );
    }

    // Verificar se o email já foi enviado
    if (participacao.emailEncerramentoEnviadoEm) {
      return NextResponse.json(
        { error: "Email de encerramento já foi enviado para este candidato" },
        { status: 400 }
      );
    }

    // Gerar o HTML do email
    const htmlEmail = emailEncerramentoTemplate({
      nomeCandidato: candidato.nome,
      cargo: entrevista.cargo || "a vaga",
      empresa: entrevista.empresa || "Nossa empresa",
      mensagemPersonalizada: mensagem || undefined,
    });

    // Enviar o email
    const result = await enviarEmail({
      to: candidato.email,
      subject: `Atualização sobre sua candidatura - ${entrevista.empresa || "Processo Seletivo"}`,
      html: htmlEmail,
    });

    // Só registra como enviado se o email foi realmente enviado
    if (result.sent) {
      await db
        .update(candidatoEntrevistas)
        .set({
          emailEncerramentoEnviadoEm: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(candidatoEntrevistas.entrevistaId, entrevistaId),
            eq(candidatoEntrevistas.candidatoId, candidatoId)
          )
        );

      return NextResponse.json({
        success: true,
        message: "Email de encerramento enviado com sucesso",
      });
    } else {
      console.warn(`Email de encerramento NÃO enviado para ${candidato.email} (mode: ${result.mode})`);
      return NextResponse.json(
        { error: "Falha ao enviar email. Verifique a configuração do remetente." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao enviar email de encerramento:", error);
    return NextResponse.json(
      { error: "Erro ao enviar email de encerramento" },
      { status: 500 }
    );
  }
}
