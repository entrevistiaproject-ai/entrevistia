import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas, users } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { checkEntrevistaOwnership } from "@/lib/security/ownership";
import { enviarEmail } from "@/lib/email/resend";
import { emailConviteEntrevistaTemplate } from "@/lib/email/templates";
import { getEffectiveOwnerId } from "@/lib/services/team-service";

// URL base do app
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "https://entrevistia.com.br";
};

// Validador de email simples
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
    const { candidatos: candidatosData, entrevistaId } = body;

    if (!Array.isArray(candidatosData) || candidatosData.length === 0) {
      return NextResponse.json(
        { error: "Lista de candidatos inválida" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Se foi fornecido entrevistaId, verificar ownership
    let entrevista = null;
    if (entrevistaId) {
      entrevista = await checkEntrevistaOwnership(entrevistaId, effectiveOwnerId);
      if (!entrevista) {
        return NextResponse.json(
          { error: "Entrevista não encontrada ou não pertence a você" },
          { status: 404 }
        );
      }
    }

    // Buscar dados do recrutador (owner efetivo)
    const [recrutador] = await db
      .select({
        nome: users.nome,
        empresa: users.empresa,
      })
      .from(users)
      .where(eq(users.id, effectiveOwnerId))
      .limit(1);

    // Validar dados básicos e email
    const candidatosValidos = candidatosData.filter(
      (c) => c.nome && c.email && isValidEmail(c.email.trim())
    );

    if (candidatosValidos.length === 0) {
      return NextResponse.json(
        { error: "Nenhum candidato válido encontrado. Verifique se os emails são válidos." },
        { status: 400 }
      );
    }

    // Normalizar dados (trim e lowercase para email)
    const candidatosNormalizados = candidatosValidos.map((c) => ({
      ...c,
      email: c.email.trim().toLowerCase(),
      nome: c.nome.trim(),
      telefone: c.telefone?.trim() || null,
      linkedin: c.linkedin?.trim() || null,
    }));

    // Buscar candidatos existentes (por email e userId)
    const candidatosExistentes = await db
      .select({
        id: candidatos.id,
        email: candidatos.email
      })
      .from(candidatos)
      .where(eq(candidatos.userId, effectiveOwnerId));

    const emailParaCandidatoId = new Map(
      candidatosExistentes.map((c) => [c.email, c.id])
    );

    // Separar candidatos novos dos existentes
    const candidatosNovos = candidatosNormalizados.filter(
      (c) => !emailParaCandidatoId.has(c.email)
    );

    const candidatosExistentesLista = candidatosNormalizados.filter(
      (c) => emailParaCandidatoId.has(c.email)
    );

    let candidatosInseridos: { id: string; email: string; nome: string }[] = [];
    let vinculosEntrevistaInseridos = 0;
    let jaVinculados = 0;
    let emailsEnviados = 0;
    let emailsFalharam = 0;

    // 1. Inserir candidatos novos
    if (candidatosNovos.length > 0) {
      candidatosInseridos = await db
        .insert(candidatos)
        .values(
          candidatosNovos.map((c) => ({
            userId: effectiveOwnerId,
            nome: c.nome,
            email: c.email,
            telefone: c.telefone,
            linkedin: c.linkedin,
            aceitouTermosEntrevista: false,
            consentimentoTratamentoDados: false,
            finalidadeTratamento: entrevistaId
              ? `Processo seletivo - Entrevista ${entrevistaId}`
              : "Processo seletivo",
            origemCadastro: "importacao_planilha",
          }))
        )
        .returning({
          id: candidatos.id,
          email: candidatos.email,
          nome: candidatos.nome,
        });

      // Adicionar novos candidatos ao mapa
      candidatosInseridos.forEach((c) => {
        emailParaCandidatoId.set(c.email, c.id);
      });
    }

    // 2. Se foi fornecido um entrevistaId, vincular candidatos à entrevista e enviar emails
    if (entrevistaId && entrevista) {
      // Obter IDs apenas dos candidatos da planilha atual (não todos do owner)
      const candidatosParaProcessar = candidatosNormalizados
        .map((c) => ({
          id: emailParaCandidatoId.get(c.email)!,
          email: c.email,
          nome: c.nome,
        }))
        .filter((c) => c.id);

      const todosCandidatosIds = candidatosParaProcessar.map((c) => c.id);

      // Buscar vínculos existentes para esta entrevista
      const vinculosExistentes = await db
        .select({
          candidatoId: candidatoEntrevistas.candidatoId,
        })
        .from(candidatoEntrevistas)
        .where(
          and(
            eq(candidatoEntrevistas.entrevistaId, entrevistaId),
            inArray(candidatoEntrevistas.candidatoId, todosCandidatosIds)
          )
        );

      const candidatosJaVinculados = new Set(
        vinculosExistentes.map((v) => v.candidatoId)
      );

      jaVinculados = candidatosJaVinculados.size;

      // Filtrar apenas candidatos que ainda não foram vinculados a esta entrevista
      const candidatosParaVincular = candidatosParaProcessar.filter(
        (c) => !candidatosJaVinculados.has(c.id)
      );

      // Calcular prazo de resposta (padrão: 48 horas)
      const prazoHoras = (entrevista.configuracoes as { prazoRespostaHoras?: number })?.prazoRespostaHoras || 48;
      const prazoResposta = new Date(Date.now() + prazoHoras * 60 * 60 * 1000);

      // Criar vínculos com a entrevista
      if (candidatosParaVincular.length > 0) {
        const vinculosCriados = await db
          .insert(candidatoEntrevistas)
          .values(
            candidatosParaVincular.map((c) => ({
              candidatoId: c.id,
              entrevistaId,
              status: "pendente",
              conviteEnviadoEm: new Date(),
              prazoResposta,
              podeRefazer: false,
            }))
          )
          .returning();

        vinculosEntrevistaInseridos = vinculosCriados.length;

        // Enviar emails de convite para cada candidato vinculado
        for (const candidato of candidatosParaVincular) {
          try {
            const linkEntrevista = `${getBaseUrl()}/convite/${entrevista.slug}?candidatoId=${candidato.id}`;

            await enviarEmail({
              to: candidato.email,
              subject: `Convite para Entrevista - ${entrevista.cargo || entrevista.titulo} | ${recrutador?.empresa || "EntrevistIA"}`,
              html: emailConviteEntrevistaTemplate({
                nomeCandidato: candidato.nome,
                cargo: entrevista.cargo || entrevista.titulo,
                empresa: recrutador?.empresa || entrevista.empresa || "Empresa",
                nomeRecrutador: recrutador?.nome,
                linkEntrevista,
                prazoResposta,
              }),
            });

            emailsEnviados++;
            console.log(`✅ Email de convite enviado para ${candidato.email}`);
          } catch (emailError) {
            emailsFalharam++;
            console.error(`❌ Erro ao enviar email para ${candidato.email}:`, emailError);
          }
        }
      }
    }

    const invalidos = candidatosData.length - candidatosValidos.length;

    return NextResponse.json(
      {
        success: true,
        total: candidatosData.length,
        candidatosNovos: candidatosInseridos.length,
        candidatosExistentes: candidatosExistentesLista.length,
        vinculadosEntrevista: vinculosEntrevistaInseridos,
        jaVinculadosEntrevista: jaVinculados,
        emailsEnviados,
        emailsFalharam,
        invalidos,
        candidatos: candidatosInseridos,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao importar candidatos:", error);
    return NextResponse.json(
      { error: "Erro ao importar candidatos" },
      { status: 500 }
    );
  }
}
