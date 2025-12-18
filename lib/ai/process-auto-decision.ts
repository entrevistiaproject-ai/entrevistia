import { getDB } from "@/lib/db";
import {
  candidatoEntrevistas,
  entrevistas,
  candidatos,
  users,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import {
  emailAprovacaoAutomaticaTemplate,
  emailReprovacaoAutomaticaTemplate,
} from "@/lib/email/templates";

/**
 * Processa decisão automática para um candidato específico
 * Chamado imediatamente após a análise da IA
 */
export async function processAutoDecisionForCandidate(
  candidatoId: string,
  entrevistaId: string
): Promise<{ processed: boolean; decision?: "aprovado" | "reprovado" | null; emailSent?: boolean }> {
  const db = getDB();

  // Busca dados do candidato e configurações da entrevista
  const [data] = await db
    .select({
      candidatoEntrevistaId: candidatoEntrevistas.id,
      notaGeral: candidatoEntrevistas.notaGeral,
      compatibilidadeVaga: candidatoEntrevistas.compatibilidadeVaga,
      decisaoRecrutador: candidatoEntrevistas.decisaoRecrutador,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
      entrevistaCargo: entrevistas.cargo,
      entrevistaUserId: entrevistas.userId,
      autoApprovalEnabled: entrevistas.autoApprovalEnabled,
      autoApprovalMinScore: entrevistas.autoApprovalMinScore,
      autoApprovalUseCompatibility: entrevistas.autoApprovalUseCompatibility,
      autoApprovalMinCompatibility: entrevistas.autoApprovalMinCompatibility,
      autoApprovalNotifyCandidate: entrevistas.autoApprovalNotifyCandidate,
      autoApprovalCandidateMessage: entrevistas.autoApprovalCandidateMessage,
      autoRejectEnabled: entrevistas.autoRejectEnabled,
      autoRejectMaxScore: entrevistas.autoRejectMaxScore,
      autoRejectNotifyCandidate: entrevistas.autoRejectNotifyCandidate,
      autoRejectCandidateMessage: entrevistas.autoRejectCandidateMessage,
    })
    .from(candidatoEntrevistas)
    .innerJoin(candidatos, eq(candidatos.id, candidatoEntrevistas.candidatoId))
    .innerJoin(entrevistas, eq(entrevistas.id, candidatoEntrevistas.entrevistaId))
    .where(
      and(
        eq(candidatoEntrevistas.candidatoId, candidatoId),
        eq(candidatoEntrevistas.entrevistaId, entrevistaId),
        isNull(candidatoEntrevistas.decisaoRecrutador),
        isNull(entrevistas.deletedAt)
      )
    )
    .limit(1);

  if (!data) {
    console.log("[Auto-Decision] Candidato não encontrado ou já tem decisão");
    return { processed: false };
  }

  // Verifica se alguma decisão automática está habilitada
  if (!data.autoApprovalEnabled && !data.autoRejectEnabled) {
    console.log("[Auto-Decision] Nenhuma decisão automática configurada para esta vaga");
    return { processed: false };
  }

  const score = data.notaGeral || 0;
  const compatibility = data.compatibilidadeVaga || 0;
  let emailSent = false;

  // Verifica APROVAÇÃO automática
  if (data.autoApprovalEnabled) {
    let shouldApprove = score >= (data.autoApprovalMinScore || 0);

    if (shouldApprove && data.autoApprovalUseCompatibility) {
      shouldApprove = compatibility >= (data.autoApprovalMinCompatibility || 0);
    }

    if (shouldApprove) {
      console.log(`[Auto-Decision] Aprovando candidato ${data.candidatoNome} (Score: ${score}, Compatibilidade: ${compatibility})`);

      // Envia email se configurado
      if (data.autoApprovalNotifyCandidate) {
        try {
          const [owner] = await db
            .select()
            .from(users)
            .where(eq(users.id, data.entrevistaUserId))
            .limit(1);

          if (owner) {
            await enviarEmail({
              to: data.candidatoEmail,
              subject: `Parabéns! Você foi aprovado(a) para a próxima fase - ${data.entrevistaCargo || "Vaga"}`,
              html: emailAprovacaoAutomaticaTemplate({
                nomeCandidato: data.candidatoNome,
                cargo: data.entrevistaCargo || "Vaga",
                empresa: owner.empresa || owner.nome,
                mensagemPersonalizada: data.autoApprovalCandidateMessage || undefined,
              }),
            });
            emailSent = true;
            console.log(`[Auto-Decision] Email de aprovação enviado para ${data.candidatoEmail}`);
          }
        } catch (emailError) {
          console.error("[Auto-Decision] Erro ao enviar email de aprovação:", emailError);
        }
      }

      // Atualiza o registro com a decisão e status do email
      await db
        .update(candidatoEntrevistas)
        .set({
          decisaoRecrutador: "aprovado",
          decisaoRecrutadorEm: new Date(),
          decisaoRecrutadorObservacao: `Aprovado automaticamente (Score: ${score.toFixed(1)}%, Compatibilidade: ${compatibility.toFixed(1)}%)`,
          emailDecisaoEnviadoEm: emailSent ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(eq(candidatoEntrevistas.id, data.candidatoEntrevistaId));

      return { processed: true, decision: "aprovado", emailSent };
    }
  }

  // Verifica REPROVAÇÃO automática
  if (data.autoRejectEnabled) {
    if (score <= (data.autoRejectMaxScore || 0)) {
      console.log(`[Auto-Decision] Reprovando candidato ${data.candidatoNome} (Score: ${score})`);

      // Envia email se configurado
      if (data.autoRejectNotifyCandidate) {
        try {
          const [owner] = await db
            .select()
            .from(users)
            .where(eq(users.id, data.entrevistaUserId))
            .limit(1);

          if (owner) {
            await enviarEmail({
              to: data.candidatoEmail,
              subject: `Atualização sobre sua candidatura - ${data.entrevistaCargo || "Vaga"}`,
              html: emailReprovacaoAutomaticaTemplate({
                nomeCandidato: data.candidatoNome,
                cargo: data.entrevistaCargo || "Vaga",
                empresa: owner.empresa || owner.nome,
                mensagemPersonalizada: data.autoRejectCandidateMessage || undefined,
              }),
            });
            emailSent = true;
            console.log(`[Auto-Decision] Email de reprovação enviado para ${data.candidatoEmail}`);
          }
        } catch (emailError) {
          console.error("[Auto-Decision] Erro ao enviar email de reprovação:", emailError);
        }
      }

      // Atualiza o registro com a decisão e status do email
      await db
        .update(candidatoEntrevistas)
        .set({
          decisaoRecrutador: "reprovado",
          decisaoRecrutadorEm: new Date(),
          decisaoRecrutadorObservacao: `Reprovado automaticamente (Score: ${score.toFixed(1)}%)`,
          emailDecisaoEnviadoEm: emailSent ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(eq(candidatoEntrevistas.id, data.candidatoEntrevistaId));

      return { processed: true, decision: "reprovado", emailSent };
    }
  }

  console.log(`[Auto-Decision] Candidato ${data.candidatoNome} não atende critérios automáticos (Score: ${score})`);
  return { processed: false, decision: null };
}
