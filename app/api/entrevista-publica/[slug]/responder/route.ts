import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { respostas, candidatos, entrevistas, perguntas, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import {
  checkCombinedRateLimit,
  getClientIP,
  getRateLimitHeaders,
  sanitizeUUID,
  sanitizeString,
  withBotProtection,
} from "@/lib/security";

const responderSchema = z.object({
  candidatoId: z.string().uuid(),
  sessaoId: z.string().uuid(),
  perguntaId: z.string().uuid(),
  transcricao: z.string().min(1, "Transcrição não pode estar vazia").max(50000),
  tempoResposta: z.number().int().positive().max(3600), // Máximo 1 hora
});

/**
 * POST /api/entrevista-publica/[slug]/responder
 * Salva a resposta transcrita do candidato
 *
 * Proteções:
 * - Rate limiting por sessão e IP
 * - Validação de UUIDs
 * - Sanitização de transcrição
 * - Detecção de bots
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const clientIP = getClientIP(request);

  try {
    const { slug } = await params;

    // Proteção contra bots (mais permissivo para permitir fluxo normal)
    const botCheck = withBotProtection(request, "public-interview-response", {
      allowLegitBots: false,
      blockThreshold: 80, // Threshold mais alto para permitir uso normal
    });

    if (!botCheck.allowed) {
      return botCheck.response;
    }

    const body = await request.json();

    // Validar dados
    const validacao = responderSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitiza UUIDs
    const candidatoId = sanitizeUUID(validacao.data.candidatoId);
    const sessaoId = sanitizeUUID(validacao.data.sessaoId);
    const perguntaId = sanitizeUUID(validacao.data.perguntaId);

    if (!candidatoId || !sessaoId || !perguntaId) {
      return NextResponse.json(
        { error: "IDs inválidos" },
        { status: 400 }
      );
    }

    // Rate limiting por sessão e IP
    const rateLimitResult = checkCombinedRateLimit({
      ip: clientIP,
      userId: sessaoId, // Usa sessaoId como identificador
      endpoint: "public-interview-response",
      configKey: "publicInterviewResponse",
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas respostas em pouco tempo. Aguarde um momento.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    // Sanitiza transcrição (remove scripts e caracteres perigosos)
    const transcricao = sanitizeString(validacao.data.transcricao);
    const tempoResposta = validacao.data.tempoResposta;

    if (!transcricao || transcricao.length < 1) {
      return NextResponse.json(
        { error: "Transcrição inválida" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Verificar se a entrevista existe e está publicada
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(eq(entrevistas.slug, slug));

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se o candidato existe
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, candidatoId));

    if (!candidato) {
      return NextResponse.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se a sessão existe e está ativa
    const [sessao] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.id, sessaoId),
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevista.id)
        )
      );

    if (!sessao) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    if (sessao.status === "concluida") {
      return NextResponse.json(
        { error: "Esta entrevista já foi finalizada" },
        { status: 403 }
      );
    }

    // Verificar se a pergunta pertence à entrevista
    const [pergunta] = await db
      .select()
      .from(perguntas)
      .where(
        and(
          eq(perguntas.id, perguntaId),
          eq(perguntas.entrevistaId, entrevista.id)
        )
      );

    if (!pergunta) {
      return NextResponse.json(
        { error: "Pergunta não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se já existe uma resposta para esta pergunta
    const [respostaExistente] = await db
      .select()
      .from(respostas)
      .where(
        and(
          eq(respostas.perguntaId, perguntaId),
          eq(respostas.candidatoId, candidatoId),
          eq(respostas.entrevistaId, entrevista.id)
        )
      );

    let resposta;

    if (respostaExistente) {
      // Limite de tentativas para evitar abuso
      const maxTentativas = 5;
      if ((respostaExistente.tentativas || 1) >= maxTentativas) {
        return NextResponse.json(
          { error: "Número máximo de tentativas atingido para esta pergunta" },
          { status: 403 }
        );
      }

      // Atualizar resposta existente
      [resposta] = await db
        .update(respostas)
        .set({
          transcricao,
          tempoResposta,
          updatedAt: new Date(),
          tentativas: (respostaExistente.tentativas || 1) + 1,
        })
        .where(eq(respostas.id, respostaExistente.id))
        .returning();
    } else {
      // Criar nova resposta
      [resposta] = await db
        .insert(respostas)
        .values({
          perguntaId,
          candidatoId,
          entrevistaId: entrevista.id,
          transcricao,
          tempoResposta,
          ipResposta: clientIP,
          userAgent: request.headers.get("user-agent")?.substring(0, 500) || "unknown",
        })
        .returning();
    }

    return NextResponse.json(
      {
        respostaId: resposta.id,
        sucesso: true,
      },
      {
        headers: getRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro ao salvar resposta:", error);
    }

    return NextResponse.json(
      { error: "Erro ao salvar resposta" },
      { status: 500 }
    );
  }
}
