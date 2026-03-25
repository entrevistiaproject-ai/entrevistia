import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import {
  candidatos,
  candidatoPreferencias,
  candidatoExperiencias,
  candidatoFormacoes,
  candidatoSkills,
  candidatoIdiomas,
  candidatoCertificacoes,
  candidatoEntrevistas,
  respostas,
  auditLogs,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

const lgpdRequestSchema = z.object({
  tipo: z.enum([
    "acesso",
    "correcao",
    "exclusao",
    "portabilidade",
    "oposicao",
    "revogacao_consentimento",
  ]),
  detalhes: z.string().optional(),
});

/**
 * Verifica se o candidato tem sessão válida (via cookie ou magic link)
 */
async function validateCandidatoSession(candidatoId: string): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("candidato_session");

  if (!sessionCookie) {
    return false;
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    return session.candidatoId === candidatoId;
  } catch {
    return false;
  }
}

/**
 * GET /api/candidatos/[id]/lgpd
 * Retorna todos os dados do candidato (portabilidade/acesso)
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id: candidatoId } = await params;

    // Valida sessão do candidato
    const isValid = await validateCandidatoSession(candidatoId);
    if (!isValid) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();

    // Busca o candidato
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.id, candidatoId),
          isNull(candidatos.deletedAt)
        )
      );

    if (!candidato) {
      return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
    }

    // Busca todos os dados relacionados
    const [preferencias] = await db
      .select()
      .from(candidatoPreferencias)
      .where(eq(candidatoPreferencias.candidatoId, candidatoId));

    const experiencias = await db
      .select()
      .from(candidatoExperiencias)
      .where(eq(candidatoExperiencias.candidatoId, candidatoId));

    const formacoes = await db
      .select()
      .from(candidatoFormacoes)
      .where(eq(candidatoFormacoes.candidatoId, candidatoId));

    const skills = await db
      .select()
      .from(candidatoSkills)
      .where(eq(candidatoSkills.candidatoId, candidatoId));

    const idiomas = await db
      .select()
      .from(candidatoIdiomas)
      .where(eq(candidatoIdiomas.candidatoId, candidatoId));

    const certificacoes = await db
      .select()
      .from(candidatoCertificacoes)
      .where(eq(candidatoCertificacoes.candidatoId, candidatoId));

    // Busca entrevistas e respostas
    const entrevistas = await db
      .select()
      .from(candidatoEntrevistas)
      .where(eq(candidatoEntrevistas.candidatoId, candidatoId));

    // Busca logs de auditoria relacionados
    const logs = await db
      .select({
        acao: auditLogs.acao,
        entidade: auditLogs.entidade,
        timestamp: auditLogs.timestamp,
        ipAddress: auditLogs.ipAddress,
      })
      .from(auditLogs)
      .where(eq(auditLogs.entidadeId, candidatoId));

    // Registra o acesso aos dados
    await db.insert(auditLogs).values({
      userId: candidato.userId,
      acao: "leitura",
      entidade: "candidatos",
      entidadeId: candidatoId,
      tipoOperacaoLGPD: "acesso",
      baseJuridica: "consentimento",
      finalidade: "Solicitação de acesso aos dados pelo titular",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // Atualiza flag de solicitação
    await db
      .update(candidatos)
      .set({ solicitouAcesso: new Date() })
      .where(eq(candidatos.id, candidatoId));

    // Monta objeto de exportação
    const dadosExportados = {
      exportadoEm: new Date().toISOString(),
      titular: {
        nome: candidato.nome,
        email: candidato.email,
        telefone: candidato.telefone,
        documento: candidato.documento,
        linkedin: candidato.linkedin,
        cadastradoEm: candidato.createdAt,
        atualizadoEm: candidato.updatedAt,
      },
      consentimentos: {
        aceitouTermosEntrevista: candidato.aceitouTermosEntrevista,
        dataAceiteTermos: candidato.dataAceiteTermos,
        consentimentoTratamentoDados: candidato.consentimentoTratamentoDados,
        finalidadeTratamento: candidato.finalidadeTratamento,
      },
      preferencias: preferencias
        ? {
            status: preferencias.status,
            preferenciaTrabalho: preferencias.preferenciaTrabalho,
            cidade: preferencias.cidade,
            estado: preferencias.estado,
            pais: preferencias.pais,
            pretensaoSalarialMin: preferencias.pretensaoSalarialMin,
            pretensaoSalarialMax: preferencias.pretensaoSalarialMax,
            resumoProfissional: preferencias.resumoProfissional,
          }
        : null,
      experiencias: experiencias.map((exp) => ({
        cargo: exp.cargo,
        empresa: exp.empresa,
        localidade: exp.localidade,
        periodo: `${exp.dataInicio?.toISOString()} - ${exp.dataFim?.toISOString() || "Atual"}`,
        descricao: exp.descricao,
      })),
      formacoes: formacoes.map((form) => ({
        instituicao: form.instituicao,
        curso: form.curso,
        nivel: form.nivel,
        periodo: `${form.dataInicio?.toISOString()} - ${form.dataFim?.toISOString() || "Em andamento"}`,
      })),
      skills: skills.map((skill) => ({
        nome: skill.nome,
        nivel: skill.nivel,
        categoria: skill.categoria,
      })),
      idiomas: idiomas.map((idioma) => ({
        idioma: idioma.idioma,
        nivel: idioma.nivel,
        certificacao: idioma.certificacao,
      })),
      certificacoes: certificacoes.map((cert) => ({
        nome: cert.nome,
        instituicao: cert.instituicao,
        dataEmissao: cert.dataEmissao?.toISOString(),
      })),
      entrevistas: entrevistas.map((ent) => ({
        status: ent.status,
        notaGeral: ent.notaGeral,
        recomendacao: ent.recomendacao,
        concluidaEm: ent.concluidaEm?.toISOString(),
      })),
      historicoAcessos: logs.map((log) => ({
        acao: log.acao,
        data: log.timestamp?.toISOString(),
        ip: log.ipAddress,
      })),
    };

    return NextResponse.json(dadosExportados);
  } catch (error) {
    console.error("Erro ao exportar dados LGPD:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidatos/[id]/lgpd
 * Registra uma solicitação LGPD (exclusão, correção, etc.)
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id: candidatoId } = await params;

    // Valida sessão do candidato
    const isValid = await validateCandidatoSession(candidatoId);
    if (!isValid) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = lgpdRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { tipo, detalhes } = parsed.data;
    const db = getDB();

    // Busca o candidato
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.id, candidatoId),
          isNull(candidatos.deletedAt)
        )
      );

    if (!candidato) {
      return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
    }

    // Processa a solicitação
    switch (tipo) {
      case "exclusao":
        // Agenda exclusão para 30 dias (permite arrependimento)
        const dataExclusao = new Date();
        dataExclusao.setDate(dataExclusao.getDate() + 30);

        await db
          .update(candidatos)
          .set({
            solicitouExclusao: new Date(),
            dataExclusaoAgendada: dataExclusao,
          })
          .where(eq(candidatos.id, candidatoId));

        // Registra no audit log
        await db.insert(auditLogs).values({
          userId: candidato.userId,
          acao: "solicitacao_exclusao",
          entidade: "candidatos",
          entidadeId: candidatoId,
          tipoOperacaoLGPD: "exclusao",
          baseJuridica: "consentimento",
          finalidade: "Solicitação de exclusão pelo titular",
          ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
          dadosNovos: { dataExclusaoAgendada: dataExclusao.toISOString() },
        });

        return NextResponse.json({
          success: true,
          message: `Exclusão agendada para ${dataExclusao.toLocaleDateString("pt-BR")}. Você pode cancelar até esta data.`,
          dataExclusaoAgendada: dataExclusao,
        });

      case "correcao":
        await db
          .update(candidatos)
          .set({ solicitouCorrecao: new Date() })
          .where(eq(candidatos.id, candidatoId));

        await db.insert(auditLogs).values({
          userId: candidato.userId,
          acao: "solicitacao_correcao",
          entidade: "candidatos",
          entidadeId: candidatoId,
          tipoOperacaoLGPD: "correcao",
          baseJuridica: "consentimento",
          finalidade: detalhes || "Solicitação de correção pelo titular",
          ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        });

        return NextResponse.json({
          success: true,
          message: "Solicitação de correção registrada. O recrutador será notificado.",
        });

      case "revogacao_consentimento":
        await db
          .update(candidatos)
          .set({
            consentimentoTratamentoDados: false,
            aceitouTermosEntrevista: false,
          })
          .where(eq(candidatos.id, candidatoId));

        await db.insert(auditLogs).values({
          userId: candidato.userId,
          acao: "revogacao_consentimento",
          entidade: "candidatos",
          entidadeId: candidatoId,
          tipoOperacaoLGPD: "revogacao",
          baseJuridica: "consentimento",
          finalidade: "Revogação de consentimento pelo titular",
          ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        });

        return NextResponse.json({
          success: true,
          message: "Consentimentos revogados com sucesso.",
        });

      case "oposicao":
        await db.insert(auditLogs).values({
          userId: candidato.userId,
          acao: "oposicao",
          entidade: "candidatos",
          entidadeId: candidatoId,
          tipoOperacaoLGPD: "oposicao",
          baseJuridica: "consentimento",
          finalidade: detalhes || "Oposição ao tratamento pelo titular",
          ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        });

        return NextResponse.json({
          success: true,
          message: "Oposição registrada. O recrutador será notificado.",
        });

      default:
        return NextResponse.json({ error: "Tipo de solicitação inválido" }, { status: 400 });
    }
  } catch (error) {
    console.error("Erro ao processar solicitação LGPD:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/candidatos/[id]/lgpd
 * Cancela uma solicitação de exclusão
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id: candidatoId } = await params;

    // Valida sessão do candidato
    const isValid = await validateCandidatoSession(candidatoId);
    if (!isValid) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();

    // Cancela a exclusão agendada
    await db
      .update(candidatos)
      .set({
        solicitouExclusao: null,
        dataExclusaoAgendada: null,
      })
      .where(eq(candidatos.id, candidatoId));

    return NextResponse.json({
      success: true,
      message: "Solicitação de exclusão cancelada.",
    });
  } catch (error) {
    console.error("Erro ao cancelar exclusão:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
