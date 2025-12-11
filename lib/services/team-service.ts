import { getDB } from "@/lib/db";
import {
  teamMembers,
  teamInvitations,
  teamSettings,
  users,
  candidatoEntrevistas,
  entrevistas,
  candidatos,
  type TeamMember,
  type TeamInvitation,
  type TeamSettings,
} from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { enviarEmail } from "@/lib/email/resend";
import { emailConviteTimeTemplate, emailAprovacaoAutomaticaTemplate, emailReprovacaoAutomaticaTemplate } from "@/lib/email/templates";

export type TeamRole = "owner" | "admin" | "recruiter" | "financial" | "viewer";

// Limite máximo de membros no time (incluindo o owner)
export const MAX_TEAM_MEMBERS = 11;

/**
 * Verifica se um usuário é owner de seu próprio time
 * (todos os usuários são owners de seus próprios times)
 */
export async function isTeamOwner(userId: string): Promise<boolean> {
  return true; // Todos são owners de seus próprios times
}

/**
 * Verifica se um usuário é membro de outro time
 * Retorna informações sobre a membership
 */
export async function getUserTeamMembership(userId: string): Promise<{
  isMember: boolean;
  ownerId?: string;
  ownerName?: string;
  role?: TeamRole;
}> {
  const db = getDB();

  // Verifica se o usuário é membro de algum time
  const [membership] = await db
    .select({
      ownerId: teamMembers.ownerId,
      ownerNome: users.nome,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(users, eq(teamMembers.ownerId, users.id))
    .where(
      and(
        eq(teamMembers.memberId, userId),
        eq(teamMembers.isActive, true)
      )
    )
    .limit(1);

  if (membership) {
    return {
      isMember: true,
      ownerId: membership.ownerId,
      ownerName: membership.ownerNome,
      role: membership.role as TeamRole,
    };
  }

  return { isMember: false };
}

/**
 * Verifica se um usuário tem acesso às páginas financeiras
 * Owner sempre tem acesso, e membros com papel 'financial' também
 */
export async function canAccessFinancials(userId: string): Promise<boolean> {
  const membership = await getUserTeamMembership(userId);

  // Se não é membro de nenhum time, é owner de seu próprio time - tem acesso
  if (!membership.isMember) {
    return true;
  }

  // Se é membro, só tem acesso se for financial
  return membership.role === "financial";
}

/**
 * Obtém a role de um usuário em um time específico
 */
export async function getUserRoleInTeam(userId: string, ownerId: string): Promise<TeamRole | null> {
  if (userId === ownerId) {
    return "owner";
  }

  const db = getDB();
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.ownerId, ownerId),
        eq(teamMembers.memberId, userId),
        eq(teamMembers.isActive, true)
      )
    )
    .limit(1);

  return (member?.role as TeamRole) || null;
}

/**
 * Verifica se um usuário tem permissão para uma ação no time
 */
export async function canUserPerformAction(
  userId: string,
  ownerId: string,
  action: "invite" | "remove" | "approve" | "reject" | "view" | "edit_settings" | "edit_auto_approval" | "manage_interviews"
): Promise<boolean> {
  const role = await getUserRoleInTeam(userId, ownerId);

  if (!role) return false;

  switch (action) {
    // Apenas owner e admin podem gerenciar membros do time
    case "invite":
    case "remove":
      return role === "owner" || role === "admin";

    // Owner, admin e recruiter podem editar configurações de aprovação automática
    case "edit_settings":
    case "edit_auto_approval":
      return role === "owner" || role === "admin" || role === "recruiter";

    // Owner, admin e recruiter podem aprovar/reprovar candidatos e gerenciar entrevistas
    case "approve":
    case "reject":
    case "manage_interviews":
      return role === "owner" || role === "admin" || role === "recruiter";

    // Todos podem visualizar (exceto financial que só vê financeiro)
    case "view":
      return role !== "financial";

    default:
      return false;
  }
}

/**
 * Lista os membros de um time
 */
export async function getTeamMembers(ownerId: string): Promise<(TeamMember & { member: { id: string; nome: string; email: string } })[]> {
  const db = getDB();
  const members = await db
    .select({
      id: teamMembers.id,
      ownerId: teamMembers.ownerId,
      memberId: teamMembers.memberId,
      role: teamMembers.role,
      isActive: teamMembers.isActive,
      createdAt: teamMembers.createdAt,
      updatedAt: teamMembers.updatedAt,
      member: {
        id: users.id,
        nome: users.nome,
        email: users.email,
      },
    })
    .from(teamMembers)
    .innerJoin(users, eq(teamMembers.memberId, users.id))
    .where(and(
      eq(teamMembers.ownerId, ownerId),
      eq(teamMembers.isActive, true)
    ))
    .orderBy(desc(teamMembers.createdAt));

  return members as (TeamMember & { member: { id: string; nome: string; email: string } })[];
}

/**
 * Obtém convites pendentes de um time
 */
export async function getPendingInvitations(ownerId: string): Promise<TeamInvitation[]> {
  const db = getDB();
  const invitations = await db
    .select()
    .from(teamInvitations)
    .where(
      and(
        eq(teamInvitations.invitedBy, ownerId),
        eq(teamInvitations.status, "pending")
      )
    )
    .orderBy(desc(teamInvitations.createdAt));

  // Atualiza status de convites expirados
  const now = new Date();
  for (const invitation of invitations) {
    if (invitation.expiresAt < now) {
      await db
        .update(teamInvitations)
        .set({ status: "expired" })
        .where(eq(teamInvitations.id, invitation.id));
    }
  }

  return invitations.filter((inv: TeamInvitation) => inv.expiresAt >= now);
}

/**
 * Obtém os times que o usuário faz parte (como membro)
 */
export async function getTeamsUserBelongsTo(userId: string): Promise<{
  owner: { id: string; nome: string; email: string; empresa: string | null };
  role: TeamRole;
  joinedAt: Date;
}[]> {
  const db = getDB();
  const memberships = await db
    .select({
      role: teamMembers.role,
      joinedAt: teamMembers.createdAt,
      owner: {
        id: users.id,
        nome: users.nome,
        email: users.email,
        empresa: users.empresa,
      },
    })
    .from(teamMembers)
    .innerJoin(users, eq(teamMembers.ownerId, users.id))
    .where(and(
      eq(teamMembers.memberId, userId),
      eq(teamMembers.isActive, true)
    ));

  return memberships.map(m => ({
    ...m,
    role: m.role as TeamRole,
  }));
}

/**
 * Conta o número atual de membros no time (incluindo owner)
 */
export async function getTeamMemberCount(ownerId: string): Promise<number> {
  const db = getDB();
  const members = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.ownerId, ownerId),
        eq(teamMembers.isActive, true)
      )
    );

  // +1 para contar o owner
  return members.length + 1;
}

/**
 * Cria um convite para um novo membro
 */
export async function createTeamInvitation(params: {
  invitedBy: string;
  invitedEmail: string;
  invitedName?: string;
  role: TeamRole;
  message?: string;
}): Promise<{ success: boolean; invitation?: TeamInvitation; error?: string }> {
  const { invitedBy, invitedEmail, invitedName, role, message } = params;
  const db = getDB();

  // Verifica limite de membros no time
  const currentMemberCount = await getTeamMemberCount(invitedBy);
  if (currentMemberCount >= MAX_TEAM_MEMBERS) {
    return {
      success: false,
      error: `O time já atingiu o limite máximo de ${MAX_TEAM_MEMBERS} membros`
    };
  }

  // Verifica se o email já está no time
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, invitedEmail.toLowerCase()))
    .limit(1);

  if (existingUser) {
    // Verifica se já é membro
    const [existingMember] = await db
      .select()
      .from(teamMembers)
      .where(
        and(
          eq(teamMembers.ownerId, invitedBy),
          eq(teamMembers.memberId, existingUser.id),
          eq(teamMembers.isActive, true)
        )
      )
      .limit(1);

    if (existingMember) {
      return { success: false, error: "Este usuário já faz parte do seu time" };
    }
  }

  // Verifica se já tem convite pendente
  const [existingInvitation] = await db
    .select()
    .from(teamInvitations)
    .where(
      and(
        eq(teamInvitations.invitedBy, invitedBy),
        eq(teamInvitations.invitedEmail, invitedEmail.toLowerCase()),
        eq(teamInvitations.status, "pending")
      )
    )
    .limit(1);

  if (existingInvitation && existingInvitation.expiresAt > new Date()) {
    return { success: false, error: "Já existe um convite pendente para este email" };
  }

  // Gera token único
  const token = nanoid(32);

  // Expira em 7 dias
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Cria o convite
  const [invitation] = await db
    .insert(teamInvitations)
    .values({
      invitedBy,
      invitedEmail: invitedEmail.toLowerCase(),
      invitedName,
      role,
      token,
      message,
      expiresAt,
    })
    .returning();

  // Obtém dados do owner para o email
  const [owner] = await db
    .select()
    .from(users)
    .where(eq(users.id, invitedBy))
    .limit(1);

  if (owner) {
    // Envia email de convite
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const linkConvite = `${baseUrl}/convite-time/${token}`;

    await enviarEmail({
      to: invitedEmail,
      subject: `${owner.nome} convidou você para o time na EntrevistIA`,
      html: emailConviteTimeTemplate({
        nomeConvidado: invitedName || "Recrutador",
        nomeQuemConvidou: owner.nome,
        empresaQuemConvidou: owner.empresa || "sua empresa",
        role,
        linkConvite,
        mensagemPersonalizada: message,
      }),
    });
  }

  return { success: true, invitation };
}

/**
 * Aceita um convite de time
 */
export async function acceptTeamInvitation(token: string, userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const db = getDB();
  const [invitation] = await db
    .select()
    .from(teamInvitations)
    .where(eq(teamInvitations.token, token))
    .limit(1);

  if (!invitation) {
    return { success: false, error: "Convite não encontrado" };
  }

  if (invitation.status !== "pending") {
    return { success: false, error: "Este convite já foi utilizado ou expirou" };
  }

  if (invitation.expiresAt < new Date()) {
    await db
      .update(teamInvitations)
      .set({ status: "expired" })
      .where(eq(teamInvitations.id, invitation.id));
    return { success: false, error: "Este convite expirou" };
  }

  // Verifica limite de membros no time antes de aceitar
  const currentMemberCount = await getTeamMemberCount(invitation.invitedBy);
  if (currentMemberCount >= MAX_TEAM_MEMBERS) {
    return {
      success: false,
      error: `O time já atingiu o limite máximo de ${MAX_TEAM_MEMBERS} membros. Entre em contato com o administrador.`
    };
  }

  // Verifica se o usuário já é membro
  const [existingMember] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.ownerId, invitation.invitedBy),
        eq(teamMembers.memberId, userId)
      )
    )
    .limit(1);

  if (existingMember) {
    if (existingMember.isActive) {
      return { success: false, error: "Você já faz parte deste time" };
    }
    // Reativa membro
    await db
      .update(teamMembers)
      .set({ isActive: true, role: invitation.role, updatedAt: new Date() })
      .where(eq(teamMembers.id, existingMember.id));
  } else {
    // Cria novo membro
    await db.insert(teamMembers).values({
      ownerId: invitation.invitedBy,
      memberId: userId,
      role: invitation.role,
    });
  }

  // Atualiza status do convite
  await db
    .update(teamInvitations)
    .set({
      status: "accepted",
      respondedAt: new Date(),
      respondedBy: userId,
    })
    .where(eq(teamInvitations.id, invitation.id));

  return { success: true };
}

/**
 * Recusa um convite de time
 */
export async function rejectTeamInvitation(token: string, userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const db = getDB();
  const [invitation] = await db
    .select()
    .from(teamInvitations)
    .where(eq(teamInvitations.token, token))
    .limit(1);

  if (!invitation) {
    return { success: false, error: "Convite não encontrado" };
  }

  if (invitation.status !== "pending") {
    return { success: false, error: "Este convite já foi utilizado ou expirou" };
  }

  await db
    .update(teamInvitations)
    .set({
      status: "rejected",
      respondedAt: new Date(),
      respondedBy: userId,
    })
    .where(eq(teamInvitations.id, invitation.id));

  return { success: true };
}

/**
 * Remove um membro do time
 */
export async function removeTeamMember(ownerId: string, memberId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (ownerId === memberId) {
    return { success: false, error: "Você não pode se remover do próprio time" };
  }

  const db = getDB();
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.ownerId, ownerId),
        eq(teamMembers.memberId, memberId)
      )
    )
    .limit(1);

  if (!member) {
    return { success: false, error: "Membro não encontrado" };
  }

  await db
    .update(teamMembers)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(teamMembers.id, member.id));

  return { success: true };
}

/**
 * Atualiza a role de um membro
 */
export async function updateMemberRole(ownerId: string, memberId: string, newRole: TeamRole): Promise<{
  success: boolean;
  error?: string;
}> {
  if (ownerId === memberId) {
    return { success: false, error: "Você não pode alterar sua própria role" };
  }

  if (newRole === "owner") {
    return { success: false, error: "Não é possível transferir ownership por esta ação" };
  }

  const db = getDB();
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.ownerId, ownerId),
        eq(teamMembers.memberId, memberId),
        eq(teamMembers.isActive, true)
      )
    )
    .limit(1);

  if (!member) {
    return { success: false, error: "Membro não encontrado" };
  }

  await db
    .update(teamMembers)
    .set({ role: newRole, updatedAt: new Date() })
    .where(eq(teamMembers.id, member.id));

  return { success: true };
}

/**
 * Cancela um convite pendente
 */
export async function cancelInvitation(ownerId: string, invitationId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const db = getDB();
  const [invitation] = await db
    .select()
    .from(teamInvitations)
    .where(
      and(
        eq(teamInvitations.id, invitationId),
        eq(teamInvitations.invitedBy, ownerId),
        eq(teamInvitations.status, "pending")
      )
    )
    .limit(1);

  if (!invitation) {
    return { success: false, error: "Convite não encontrado ou já processado" };
  }

  await db
    .update(teamInvitations)
    .set({ status: "cancelled" })
    .where(eq(teamInvitations.id, invitationId));

  return { success: true };
}

// ================== CONFIGURAÇÕES DE APROVAÇÃO AUTOMÁTICA ==================

/**
 * Obtém ou cria as configurações do time
 */
export async function getOrCreateTeamSettings(ownerId: string): Promise<TeamSettings> {
  const db = getDB();
  let [settings] = await db
    .select()
    .from(teamSettings)
    .where(eq(teamSettings.ownerId, ownerId))
    .limit(1);

  if (!settings) {
    const [newSettings] = await db
      .insert(teamSettings)
      .values({ ownerId })
      .returning();
    settings = newSettings;
  }

  return settings;
}

/**
 * Atualiza as configurações de aprovação automática
 */
export async function updateAutoApprovalSettings(ownerId: string, settingsData: {
  autoApprovalEnabled?: boolean;
  autoApprovalMinScore?: number;
  autoApprovalUseCompatibility?: boolean;
  autoApprovalMinCompatibility?: number;
  autoApprovalNotifyTeam?: boolean;
  autoApprovalNotifyCandidate?: boolean;
  autoApprovalCandidateMessage?: string;
  autoRejectEnabled?: boolean;
  autoRejectMaxScore?: number;
  autoRejectNotifyCandidate?: boolean;
  autoRejectCandidateMessage?: string;
}): Promise<TeamSettings> {
  const db = getDB();

  // Garante que as configurações existem
  await getOrCreateTeamSettings(ownerId);

  const [updated] = await db
    .update(teamSettings)
    .set({
      ...settingsData,
      updatedAt: new Date(),
    })
    .where(eq(teamSettings.ownerId, ownerId))
    .returning();

  return updated;
}

/**
 * Processa aprovação/reprovação automática após avaliação da IA
 * Usa as configurações da vaga (entrevista) ao invés das configurações gerais do time
 */
export async function processAutoDecision(candidatoEntrevistaId: string): Promise<{
  processed: boolean;
  decision?: "aprovado" | "reprovado";
  reason?: string;
}> {
  const db = getDB();

  // Busca a candidatura
  const [candidatura] = await db
    .select()
    .from(candidatoEntrevistas)
    .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId))
    .limit(1);

  if (!candidatura || !candidatura.notaGeral) {
    return { processed: false, reason: "Candidatura não encontrada ou sem avaliação" };
  }

  // Se já tem decisão do recrutador, não processa
  if (candidatura.decisaoRecrutador) {
    return { processed: false, reason: "Já existe decisão manual" };
  }

  // Busca a entrevista para pegar as configurações de aprovação automática da vaga
  const [entrevista] = await db
    .select()
    .from(entrevistas)
    .where(eq(entrevistas.id, candidatura.entrevistaId))
    .limit(1);

  if (!entrevista) {
    return { processed: false, reason: "Entrevista não encontrada" };
  }

  const score = candidatura.notaGeral;
  const compatibility = candidatura.compatibilidadeVaga || 0;

  // Verifica aprovação automática usando configurações da vaga
  if (entrevista.autoApprovalEnabled) {
    let shouldApprove = score >= entrevista.autoApprovalMinScore;

    if (shouldApprove && entrevista.autoApprovalUseCompatibility) {
      shouldApprove = compatibility >= entrevista.autoApprovalMinCompatibility;
    }

    if (shouldApprove) {
      // Aprova automaticamente
      await db
        .update(candidatoEntrevistas)
        .set({
          decisaoRecrutador: "aprovado",
          decisaoRecrutadorEm: new Date(),
          decisaoRecrutadorObservacao: `Aprovado automaticamente (Score: ${score.toFixed(1)}%, Compatibilidade: ${compatibility.toFixed(1)}%)`,
          updatedAt: new Date(),
        })
        .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));

      // Notifica candidato se configurado na vaga
      if (entrevista.autoApprovalNotifyCandidate) {
        const [candidato] = await db
          .select()
          .from(candidatos)
          .where(eq(candidatos.id, candidatura.candidatoId))
          .limit(1);

        const [owner] = await db
          .select()
          .from(users)
          .where(eq(users.id, entrevista.userId))
          .limit(1);

        if (candidato && owner) {
          await enviarEmail({
            to: candidato.email,
            subject: `Parabéns! Você foi aprovado(a) para a próxima fase - ${entrevista.cargo || "Vaga"}`,
            html: emailAprovacaoAutomaticaTemplate({
              nomeCandidato: candidato.nome,
              cargo: entrevista.cargo || "Vaga",
              empresa: owner.empresa || owner.nome,
              mensagemPersonalizada: entrevista.autoApprovalCandidateMessage || undefined,
            }),
          });
        }
      }

      return { processed: true, decision: "aprovado" };
    }
  }

  // Verifica reprovação automática usando configurações da vaga
  if (entrevista.autoRejectEnabled) {
    if (score <= entrevista.autoRejectMaxScore) {
      // Reprova automaticamente
      await db
        .update(candidatoEntrevistas)
        .set({
          decisaoRecrutador: "reprovado",
          decisaoRecrutadorEm: new Date(),
          decisaoRecrutadorObservacao: `Reprovado automaticamente (Score: ${score.toFixed(1)}%)`,
          updatedAt: new Date(),
        })
        .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));

      // Notifica candidato se configurado na vaga
      if (entrevista.autoRejectNotifyCandidate) {
        const [candidato] = await db
          .select()
          .from(candidatos)
          .where(eq(candidatos.id, candidatura.candidatoId))
          .limit(1);

        const [owner] = await db
          .select()
          .from(users)
          .where(eq(users.id, entrevista.userId))
          .limit(1);

        if (candidato && owner) {
          await enviarEmail({
            to: candidato.email,
            subject: `Atualização sobre sua candidatura - ${entrevista.cargo || "Vaga"}`,
            html: emailReprovacaoAutomaticaTemplate({
              nomeCandidato: candidato.nome,
              cargo: entrevista.cargo || "Vaga",
              empresa: owner.empresa || owner.nome,
              mensagemPersonalizada: entrevista.autoRejectCandidateMessage || undefined,
            }),
          });
        }
      }

      return { processed: true, decision: "reprovado" };
    }
  }

  return { processed: false, reason: "Score não atingiu critérios automáticos ou aprovação automática desabilitada para esta vaga" };
}

/**
 * Obtém o owner efetivo para um usuário
 * Se o usuário é membro de um time, retorna o owner do time
 * Caso contrário, retorna o próprio usuário
 */
export async function getEffectiveOwnerId(userId: string): Promise<string> {
  const db = getDB();

  // Verifica se o usuário faz parte de algum time como membro
  const [membership] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.memberId, userId),
        eq(teamMembers.isActive, true)
      )
    )
    .limit(1);

  // Se faz parte de um time, usa o owner do time
  // Senão, usa ele mesmo como owner
  return membership?.ownerId || userId;
}
