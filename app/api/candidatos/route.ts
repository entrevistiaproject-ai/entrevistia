import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas, users } from "@/lib/db/schema";
import { eq, and, isNull, desc, sql } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import { emailConviteEntrevistaTemplate } from "@/lib/email/templates";
import { getEffectiveOwnerId } from "@/lib/services/team-service";

// URL base do app - NEXT_PUBLIC_APP_URL tem prioridade sobre VERCEL_URL
// pois VERCEL_URL contém URLs de deployment específicos (ex: xxx.vercel.app)
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "https://entrevistia.com.br";
};

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Usa o owner efetivo para membros de time operarem nos dados do owner
    const effectiveOwnerId = await getEffectiveOwnerId(userId);

    const body = await request.json();
    const { nome, email, telefone, linkedin, entrevistaId } = body;

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar dados do recrutador (owner efetivo)
    const [recrutador] = await db
      .select({
        nome: users.nome,
        empresa: users.empresa,
      })
      .from(users)
      .where(eq(users.id, effectiveOwnerId))
      .limit(1);

    let entrevista = null;

    // Se tem entrevistaId, verificar se pertence ao owner efetivo
    if (entrevistaId) {
      const [entrevistaResult] = await db
        .select()
        .from(entrevistas)
        .where(
          and(
            eq(entrevistas.id, entrevistaId),
            eq(entrevistas.userId, effectiveOwnerId)
          )
        )
        .limit(1);

      if (!entrevistaResult) {
        return NextResponse.json(
          { error: "Entrevista não encontrada" },
          { status: 404 }
        );
      }

      entrevista = entrevistaResult;
    }

    // Verificar se já existe candidato com este email para este owner
    const [candidatoExistente] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.email, email),
          eq(candidatos.userId, effectiveOwnerId),
          isNull(candidatos.deletedAt)
        )
      )
      .limit(1);

    let novoCandidato;

    if (candidatoExistente) {
      // Atualizar candidato existente com dados mais recentes
      [novoCandidato] = await db
        .update(candidatos)
        .set({
          nome,
          telefone: telefone || candidatoExistente.telefone,
          linkedin: linkedin || candidatoExistente.linkedin,
          updatedAt: new Date(),
        })
        .where(eq(candidatos.id, candidatoExistente.id))
        .returning();
    } else {
      // Criar novo candidato vinculado ao owner efetivo
      [novoCandidato] = await db
        .insert(candidatos)
        .values({
          userId: effectiveOwnerId,
          nome,
          email,
          telefone: telefone || null,
          linkedin: linkedin || null,
          aceitouTermosEntrevista: false,
          consentimentoTratamentoDados: false,
          finalidadeTratamento: entrevistaId
            ? `Processo seletivo - Entrevista ${entrevistaId}`
            : "Processo seletivo",
          origemCadastro: "cadastro_manual_recrutador",
        })
        .returning();
    }

    // Se tem entrevistaId, vincular candidato à entrevista e enviar email
    if (entrevistaId && entrevista) {
      // Verificar se já existe vínculo com esta entrevista
      const [vinculoExistente] = await db
        .select()
        .from(candidatoEntrevistas)
        .where(
          and(
            eq(candidatoEntrevistas.candidatoId, novoCandidato.id),
            eq(candidatoEntrevistas.entrevistaId, entrevistaId)
          )
        )
        .limit(1);

      // Calcular prazo de resposta (padrão: 48 horas)
      const prazoHoras = (entrevista.configuracoes as { prazoRespostaHoras?: number })?.prazoRespostaHoras || 48;
      const prazoResposta = new Date(Date.now() + prazoHoras * 60 * 60 * 1000);

      // Criar ou atualizar vínculo candidato-entrevista (sem marcar convite ainda)
      let candidatoEntrevistaId: string;
      if (!vinculoExistente) {
        const [novoVinculo] = await db.insert(candidatoEntrevistas).values({
          candidatoId: novoCandidato.id,
          entrevistaId,
          status: "pendente",
          prazoResposta,
        }).returning({ id: candidatoEntrevistas.id });
        candidatoEntrevistaId = novoVinculo.id;
      } else {
        candidatoEntrevistaId = vinculoExistente.id;
        await db
          .update(candidatoEntrevistas)
          .set({
            prazoResposta,
            updatedAt: new Date(),
          })
          .where(eq(candidatoEntrevistas.id, vinculoExistente.id));
      }

      // Gerar link da entrevista
      const linkEntrevista = `${getBaseUrl()}/convite/${entrevista.slug}?candidatoId=${novoCandidato.id}`;

      // Enviar email de convite
      try {
        const result = await enviarEmail({
          to: email,
          subject: `Convite para Entrevista - ${entrevista.cargo || entrevista.titulo} | ${recrutador?.empresa || "EntrevistIA"}`,
          html: emailConviteEntrevistaTemplate({
            nomeCandidato: nome,
            cargo: entrevista.cargo || entrevista.titulo,
            empresa: recrutador?.empresa || entrevista.empresa || "Empresa",
            nomeRecrutador: recrutador?.nome,
            linkEntrevista,
            prazoResposta,
          }),
        });

        // Só marca como enviado se o email foi realmente enviado
        if (result.sent) {
          await db
            .update(candidatoEntrevistas)
            .set({ conviteEnviadoEm: new Date(), updatedAt: new Date() })
            .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));
          console.log(`✅ Email de convite enviado para ${email}`);
        } else {
          console.warn(`⚠️ Email de convite NÃO enviado para ${email} (mode: ${result.mode})`);
        }
      } catch (emailError) {
        console.error("❌ Erro ao enviar email de convite:", emailError);
        // Não falha a criação do candidato se o email falhar
      }
    } else if (entrevistaId) {
      // Verificar se já existe vínculo com esta entrevista
      const [vinculoExistente] = await db
        .select()
        .from(candidatoEntrevistas)
        .where(
          and(
            eq(candidatoEntrevistas.candidatoId, novoCandidato.id),
            eq(candidatoEntrevistas.entrevistaId, entrevistaId)
          )
        )
        .limit(1);

      if (!vinculoExistente) {
        // Apenas vincular sem enviar email (sem dados da entrevista)
        await db.insert(candidatoEntrevistas).values({
          candidatoId: novoCandidato.id,
          entrevistaId,
          status: "pendente",
        });
      }
    }

    return NextResponse.json(novoCandidato, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar candidato:", error);
    return NextResponse.json(
      { error: "Erro ao criar candidato" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Usa o owner efetivo para membros de time verem candidatos do owner
    const effectiveOwnerId = await getEffectiveOwnerId(userId);

    let includeEntrevistas = false;
    let page = 1;
    let limit = 20;
    let search = "";

    // Valores permitidos de itens por página (computacionalmente aceitáveis)
    const ALLOWED_LIMITS = [10, 20, 50, 100];

    try {
      const { searchParams } = new URL(request.url);
      includeEntrevistas = searchParams.get("includeEntrevistas") === "true";
      page = Math.max(1, parseInt(searchParams.get("page") || "1"));
      const requestedLimit = parseInt(searchParams.get("limit") || "20");
      // Usa o valor permitido mais próximo
      limit = ALLOWED_LIMITS.includes(requestedLimit) ? requestedLimit : 20;
      search = searchParams.get("search") || "";
    } catch (error) {
      console.warn("Falha ao processar URL:", error);
    }

    const db = getDB();
    const offset = (page - 1) * limit;

    // Condições base de filtro - usa effectiveOwnerId para membros de time
    const baseConditions = and(
      eq(candidatos.userId, effectiveOwnerId),
      isNull(candidatos.deletedAt)
    );

    // Buscar total para paginação
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(candidatos)
      .where(baseConditions);

    // Buscar candidatos do usuário com paginação
    const candidatosList = await db
      .select()
      .from(candidatos)
      .where(baseConditions)
      .orderBy(desc(candidatos.createdAt))
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

    // Se não precisa incluir entrevistas, retorna só os candidatos
    if (!includeEntrevistas) {
      return NextResponse.json({
        candidatos: candidatosList,
        pagination,
      });
    }

    // Buscar entrevistas de cada candidato
    const candidatosComEntrevistas = await Promise.all(
      candidatosList.map(async (candidato) => {
        const entrevistasDoCandidato = await db
          .select({
            entrevistaId: candidatoEntrevistas.entrevistaId,
            status: candidatoEntrevistas.status,
            notaGeral: candidatoEntrevistas.notaGeral,
            concluidaEm: candidatoEntrevistas.concluidaEm,
            entrevistaTitulo: entrevistas.titulo,
            entrevistaCargo: entrevistas.cargo,
          })
          .from(candidatoEntrevistas)
          .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
          .where(eq(candidatoEntrevistas.candidatoId, candidato.id))
          .orderBy(desc(candidatoEntrevistas.createdAt));

        return {
          ...candidato,
          entrevistas: entrevistasDoCandidato,
        };
      })
    );

    return NextResponse.json({
      candidatos: candidatosComEntrevistas,
      pagination,
    });
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}
