import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, candidatos, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";
import {
  logger,
  sanitizeEmail,
  sanitizeName,
  sanitizeCPF,
  sanitizeSlug,
  checkCombinedRateLimit,
  getClientIP,
  getRateLimitHeaders,
  withBotProtection,
  recordFailedAttempt,
} from "@/lib/security";

const iniciarEntrevistaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  emailConfirmacao: z.string().email("Email de confirmação inválido").max(255),
  documento: z.string().max(20).optional(),
  sexo: z.enum(["masculino", "feminino", "outro", "prefiro_nao_informar"]).optional(),
  candidatoExistenteId: z.string().optional(), // ID do candidato se já existir
}).refine((data) => data.email === data.emailConfirmacao, {
  message: "Os emails não coincidem",
  path: ["emailConfirmacao"],
});

/**
 * POST /api/entrevista-publica/[slug]/iniciar
 * Cria/atualiza candidato e inicia a entrevista
 *
 * Validações de segurança:
 * - Rate limiting por IP e email
 * - Detecção de bots
 * - Sanitização de inputs
 * - Validação de status da entrevista
 * - Verificação de expiração do link
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const clientIP = getClientIP(request);

  try {
    const { slug: rawSlug } = await params;
    const slug = sanitizeSlug(rawSlug);

    if (!slug) {
      return NextResponse.json(
        { error: "Slug inválido" },
        { status: 400 }
      );
    }

    // Proteção contra bots
    const botCheck = withBotProtection(request, "public-interview-start", {
      allowLegitBots: false, // Não permite bots em entrevistas
      blockThreshold: 60, // Threshold mais baixo para endpoint crítico
    });

    if (!botCheck.allowed) {
      recordFailedAttempt(clientIP, "public-interview-start");
      return botCheck.response;
    }

    // Rate limiting por IP para evitar abuso
    const rateLimitResult = checkCombinedRateLimit({
      ip: clientIP,
      endpoint: "public-interview-start",
      configKey: "publicInterviewStart",
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
    const validacao = iniciarEntrevistaSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitiza os dados de entrada
    const nome = sanitizeName(validacao.data.nome);
    const email = sanitizeEmail(validacao.data.email);
    const documento = validacao.data.documento ? sanitizeCPF(validacao.data.documento) : undefined;
    const sexo = validacao.data.sexo;

    if (!nome || nome.length < 3) {
      return NextResponse.json(
        { error: "Nome inválido" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar entrevista pelo slug
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.slug, slug),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada ou não está disponível" },
        { status: 404 }
      );
    }

    // Verificar se a entrevista está ativa
    if (entrevista.status !== "active") {
      return NextResponse.json(
        { error: "Esta entrevista não está mais disponível" },
        { status: 410 }
      );
    }

    // Verificar se o link expirou
    if (entrevista.expiracaoLink && new Date(entrevista.expiracaoLink) < new Date()) {
      return NextResponse.json(
        { error: "Link de entrevista expirado" },
        { status: 410 }
      );
    }

    // Criar ou buscar candidato
    const [candidatoExistente] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.email, email),
          eq(candidatos.userId, entrevista.userId),
          isNull(candidatos.deletedAt)
        )
      );

    let candidatoId: string;

    if (candidatoExistente) {
      // Verificar se já existe uma entrevista concluída para este candidato
      const [entrevistaExistente] = await db
        .select()
        .from(candidatoEntrevistas)
        .where(
          and(
            eq(candidatoEntrevistas.candidatoId, candidatoExistente.id),
            eq(candidatoEntrevistas.entrevistaId, entrevista.id),
            eq(candidatoEntrevistas.status, "concluida")
          )
        );

      // Se já concluiu e não pode refazer, bloqueia
      if (entrevistaExistente && !entrevistaExistente.podeRefazer) {
        return NextResponse.json(
          { error: "Você já completou esta entrevista" },
          { status: 403 }
        );
      }

      // NÃO atualizar dados do candidato - usar dados existentes
      // Isso evita sobrescrever o nome/documento/sexo quando o candidato
      // acessa múltiplas entrevistas
      candidatoId = candidatoExistente.id;
    } else {
      // Criar novo candidato
      const [novoCandidato] = await db
        .insert(candidatos)
        .values({
          userId: entrevista.userId,
          nome,
          email,
          documento,
          sexo,
          aceitouTermosEntrevista: true,
          dataAceiteTermos: new Date(),
          consentimentoTratamentoDados: true,
          finalidadeTratamento: `Processo seletivo: ${entrevista.titulo}`,
          ipCadastro: clientIP,
          origemCadastro: "link_entrevista",
        })
        .returning();

      candidatoId = novoCandidato.id;
    }

    // Verificar se já existe uma sessão ativa
    const [sessaoExistente] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevista.id)
        )
      );

    let sessaoId: string;

    if (sessaoExistente) {
      // Se a sessão já foi concluída e pode refazer, cria uma nova
      if (sessaoExistente.status === "concluida" && sessaoExistente.podeRefazer) {
        // Atualiza a sessão existente para permitir refazer
        const [sessaoAtualizada] = await db
          .update(candidatoEntrevistas)
          .set({
            status: "em_andamento",
            iniciadaEm: new Date(),
            concluidaEm: null,
            notaGeral: null,
            recomendacao: null,
            resumoGeral: null,
            avaliadoEm: null,
            updatedAt: new Date(),
          })
          .where(eq(candidatoEntrevistas.id, sessaoExistente.id))
          .returning();

        sessaoId = sessaoAtualizada.id;
      } else {
        sessaoId = sessaoExistente.id;
      }
    } else {
      // Calcular prazo de resposta baseado nas configurações
      let prazoResposta: Date | undefined;
      const prazoHoras = entrevista.configuracoes?.prazoRespostaHoras ?? 48;
      prazoResposta = new Date(Date.now() + prazoHoras * 60 * 60 * 1000);

      // Criar nova sessão de entrevista
      const [novaSessao] = await db
        .insert(candidatoEntrevistas)
        .values({
          candidatoId,
          entrevistaId: entrevista.id,
          status: "em_andamento",
          iniciadaEm: new Date(),
          prazoResposta,
        })
        .returning();

      sessaoId = novaSessao.id;
    }

    return NextResponse.json(
      {
        candidatoId,
        sessaoId,
        entrevistaId: entrevista.id,
      },
      {
        headers: getRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    logger.error("Erro ao iniciar entrevista", error);
    return NextResponse.json(
      { error: "Erro ao processar cadastro" },
      { status: 500 }
    );
  }
}
