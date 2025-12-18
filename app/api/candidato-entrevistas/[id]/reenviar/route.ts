import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas, candidatos, entrevistas, respostas, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import { emailConviteEntrevistaTemplate } from "@/lib/email/templates";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "https://entrevistia.com.br";
};

// POST - Reenviar entrevista (dar nova chance ao candidato)
export async function POST(
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

    const { id: candidatoEntrevistaId } = await params;
    const body = await request.json().catch(() => ({}));
    const { prazoHoras = 48, enviarEmailConvite = true } = body;

    const db = getDB();

    // Buscar a sessão candidato-entrevista com dados completos
    const [sessao] = await db
      .select({
        id: candidatoEntrevistas.id,
        entrevistaId: candidatoEntrevistas.entrevistaId,
        candidatoId: candidatoEntrevistas.candidatoId,
        status: candidatoEntrevistas.status,
      })
      .from(candidatoEntrevistas)
      .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId))
      .limit(1);

    if (!sessao) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    // Buscar entrevista e verificar se pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, sessao.entrevistaId),
          eq(entrevistas.userId, userId)
        )
      )
      .limit(1);

    if (!entrevista) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 403 }
      );
    }

    // Verificar se entrevista está ativa
    if (entrevista.status !== "active") {
      return NextResponse.json(
        { error: "Entrevista não está ativa. Reative-a primeiro." },
        { status: 400 }
      );
    }

    // Buscar dados do candidato
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, sessao.candidatoId))
      .limit(1);

    if (!candidato) {
      return NextResponse.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    // Buscar dados do recrutador para o email
    const [recrutador] = await db
      .select({
        nome: users.nome,
        empresa: users.empresa,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // Soft delete das respostas anteriores
    await db
      .update(respostas)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(respostas.candidatoId, sessao.candidatoId),
          eq(respostas.entrevistaId, sessao.entrevistaId)
        )
      );

    // Calcular novo prazo
    const novoPrazo = new Date(Date.now() + prazoHoras * 60 * 60 * 1000);

    // Resetar a sessão candidato-entrevista (sem marcar convite ainda)
    await db
      .update(candidatoEntrevistas)
      .set({
        status: "pendente",
        iniciadaEm: null,
        concluidaEm: null,
        // Limpar avaliações
        notaGeral: null,
        compatibilidadeVaga: null,
        recomendacao: null,
        resumoGeral: null,
        competencias: null,
        avaliadoEm: null,
        // Limpar decisão do recrutador
        decisaoRecrutador: null,
        decisaoRecrutadorEm: null,
        decisaoRecrutadorObservacao: null,
        emailEncerramentoEnviadoEm: null,
        emailDecisaoEnviadoEm: null,
        // Novo prazo (convite será marcado após envio com sucesso)
        prazoResposta: novoPrazo,
        // Atualizar timestamp
        updatedAt: new Date(),
      })
      .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));

    // Enviar email de convite se solicitado
    let emailRealmenteEnviado = false;
    if (enviarEmailConvite) {
      try {
        const linkEntrevista = `${getBaseUrl()}/convite/${entrevista.slug}?candidatoId=${candidato.id}`;

        const result = await enviarEmail({
          to: candidato.email,
          subject: `Nova oportunidade - ${entrevista.cargo || entrevista.titulo} | ${recrutador?.empresa || "EntrevistIA"}`,
          html: emailConviteEntrevistaTemplate({
            nomeCandidato: candidato.nome,
            cargo: entrevista.cargo || entrevista.titulo,
            empresa: recrutador?.empresa || entrevista.empresa || "Empresa",
            nomeRecrutador: recrutador?.nome,
            linkEntrevista,
            prazoResposta: novoPrazo,
          }),
        });

        // Só marca como enviado se o email foi realmente enviado
        if (result.sent) {
          await db
            .update(candidatoEntrevistas)
            .set({ conviteEnviadoEm: new Date(), updatedAt: new Date() })
            .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));
          emailRealmenteEnviado = true;
          console.log(`✅ Email de reenvio enviado para ${candidato.email}`);
        } else {
          console.warn(`⚠️ Email de reenvio NÃO enviado para ${candidato.email} (mode: ${result.mode})`);
        }
      } catch (emailError) {
        console.error("❌ Erro ao enviar email de reenvio:", emailError);
        // Não falha a operação se o email falhar
      }
    }

    return NextResponse.json({
      success: true,
      message: "Entrevista reenviada com sucesso",
      novoPrazo,
      emailEnviado: emailRealmenteEnviado,
    });
  } catch (error) {
    console.error("Erro ao reenviar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao reenviar entrevista" },
      { status: 500 }
    );
  }
}
