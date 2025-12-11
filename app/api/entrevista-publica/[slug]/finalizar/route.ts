import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { onCandidatoFinalizouEntrevista } from "@/lib/ai/auto-analyze";
import {
  checkCombinedRateLimit,
  getClientIP,
  getRateLimitHeaders,
  sanitizeUUID,
  withBotProtection,
} from "@/lib/security";

const finalizarSchema = z.object({
  sessaoId: z.string().uuid(),
});

/**
 * POST /api/entrevista-publica/[slug]/finalizar
 * Finaliza a sessão de entrevista
 *
 * Proteções:
 * - Rate limiting por sessão e IP
 * - Detecção de bots
 * - Validação de UUID
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const clientIP = getClientIP(request);

  try {
    // Proteção contra bots
    const botCheck = withBotProtection(request, "public-interview-finish", {
      allowLegitBots: false,
      blockThreshold: 60,
    });

    if (!botCheck.allowed) {
      return botCheck.response;
    }

    // Rate limiting
    const rateLimitResult = checkCombinedRateLimit({
      ip: clientIP,
      endpoint: "public-interview-finish",
      configKey: "publicInterviewFinish",
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas tentativas. Aguarde alguns minutos.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await request.json();

    // Validar dados
    const validacao = finalizarSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitiza UUID
    const sessaoId = sanitizeUUID(validacao.data.sessaoId);
    if (!sessaoId) {
      return NextResponse.json(
        { error: "ID de sessão inválido" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Busca a sessão primeiro para verificar se existe e está ativa
    const [sessaoExistente] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(eq(candidatoEntrevistas.id, sessaoId));

    if (!sessaoExistente) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    // Verifica se já foi finalizada
    if (sessaoExistente.status === "concluida") {
      return NextResponse.json(
        { error: "Esta entrevista já foi finalizada" },
        { status: 400 }
      );
    }

    // Atualizar status da sessão
    const [sessao] = await db
      .update(candidatoEntrevistas)
      .set({
        status: "concluida",
        concluidaEm: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(candidatoEntrevistas.id, sessaoId))
      .returning();

    // Dispara análise automática em background (se configurada)
    // Não aguarda o resultado para não bloquear a resposta ao candidato
    if (sessao.candidatoId && sessao.entrevistaId) {
      // Busca o nome do candidato
      const { candidatos } = await import("@/lib/db/schema");
      const [candidato] = await db
        .select()
        .from(candidatos)
        .where(eq(candidatos.id, sessao.candidatoId))
        .limit(1);

      if (candidato) {
        // Executa em background sem aguardar
        onCandidatoFinalizouEntrevista(
          sessao.candidatoId,
          sessao.entrevistaId,
          candidato.nome
        ).catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.error("Erro ao disparar análise automática:", error);
          }
        });
      }
    }

    return NextResponse.json(
      {
        sucesso: true,
        mensagem: "Entrevista finalizada com sucesso!",
      },
      {
        headers: getRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro ao finalizar entrevista:", error);
    }

    return NextResponse.json(
      { error: "Erro ao finalizar entrevista" },
      { status: 500 }
    );
  }
}
