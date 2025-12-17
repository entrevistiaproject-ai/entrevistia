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
  type MemberPermissions,
  defaultPermissionsByRole,
} from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { enviarEmail } from "@/lib/email/resend";
import { emailConviteTimeTemplate, emailAprovacaoAutomaticaTemplate, emailReprovacaoAutomaticaTemplate } from "@/lib/email/templates";
import { logger } from "@/lib/logger";

export type TeamRole = "owner" | "admin" | "recruiter" | "financial" | "viewer";
export type { MemberPermissions };

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
 * Owner sempre tem acesso, e membros com permissão canViewFinancials também
 */
export async function canAccessFinancials(userId: string): Promise<boolean> {
  const membership = await getUserTeamMembership(userId);

  // Se não é membro de nenhum time, é owner de seu próprio time - tem acesso
  if (!membership.isMember) {
    return true;
  }

  // Se é membro, verifica se é o próprio owner do time (não deveria acontecer, mas por segurança)
  if (membership.ownerId === userId) {
    return true;
  }

  // Usa permissões granulares
  const permissions = await getMemberPermissions(userId, membership.ownerId!);
  return permissions.canViewFinancials;
}

/**
 * Obtém as permissões de um membro do time
 * Retorna as permissões granulares definidas, ou as permissões padrão do role
 */
export async function getMemberPermissions(userId: string, ownerId: string): Promise<MemberPermissions> {
  // Se é o owner, retorna todas as permissões
  if (userId === ownerId) {
    return defaultPermissionsByRole.owner;
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

  if (!member) {
    // Se não é membro, retorna permissões de viewer (mais restritivo)
    return defaultPermissionsByRole.viewer;
  }

  // Retorna as permissões granulares do membro
  return {
    canViewInterviews: member.canViewInterviews,
    canCreateInterviews: member.canCreateInterviews,
    canEditInterviews: member.canEditInterviews,
    canDeleteInterviews: member.canDeleteInterviews,
    canViewCandidates: member.canViewCandidates,
    canApproveCandidates: member.canApproveCandidates,
    canRejectCandidates: member.canRejectCandidates,
    canViewFinancials: member.canViewFinancials,
    canInviteMembers: member.canInviteMembers,
    canRemoveMembers: member.canRemoveMembers,
    canEditMemberPermissions: member.canEditMemberPermissions,
    canEditSettings: member.canEditSettings,
    canEditAutoApproval: member.canEditAutoApproval,
  };
}

/**
 * Atualiza as permissões de um membro do time
 */
export async function updateMemberPermissions(
  ownerId: string,
  memberId: string,
  permissions: Partial<MemberPermissions>
): Promise<{ success: boolean; error?: string }> {
  if (ownerId === memberId) {
    return { success: false, error: "Você não pode alterar suas próprias permissões" };
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
    .set({
      ...permissions,
      updatedAt: new Date(),
    })
    .where(eq(teamMembers.id, member.id));

  return { success: true };
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
 * Agora usa permissões granulares em vez de roles fixos
 */
export async function canUserPerformAction(
  userId: string,
  ownerId: string,
  action: "invite" | "remove" | "approve" | "reject" | "view" | "edit_settings" | "edit_auto_approval" | "manage_interviews" | "edit_permissions"
): Promise<boolean> {
  // Owner sempre pode tudo
  if (userId === ownerId) {
    return true;
  }

  const permissions = await getMemberPermissions(userId, ownerId);

  switch (action) {
    case "invite":
      return permissions.canInviteMembers;

    case "remove":
      return permissions.canRemoveMembers;

    case "edit_permissions":
      return permissions.canEditMemberPermissions;

    case "edit_settings":
      return permissions.canEditSettings;

    case "edit_auto_approval":
      return permissions.canEditAutoApproval;

    case "approve":
      return permissions.canApproveCandidates;

    case "reject":
      return permissions.canRejectCandidates;

    case "manage_interviews":
      return permissions.canCreateInterviews || permissions.canEditInterviews;

    case "view":
      return permissions.canViewInterviews || permissions.canViewCandidates;

    default:
      return false;
  }
}

/**
 * Lista os membros de um time com suas permissões
 */
export async function getTeamMembers(ownerId: string): Promise<(TeamMember & { member: { id: string; nome: string; email: string }; permissions: MemberPermissions })[]> {
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
      canViewInterviews: teamMembers.canViewInterviews,
      canCreateInterviews: teamMembers.canCreateInterviews,
      canEditInterviews: teamMembers.canEditInterviews,
      canDeleteInterviews: teamMembers.canDeleteInterviews,
      canViewCandidates: teamMembers.canViewCandidates,
      canApproveCandidates: teamMembers.canApproveCandidates,
      canRejectCandidates: teamMembers.canRejectCandidates,
      canViewFinancials: teamMembers.canViewFinancials,
      canInviteMembers: teamMembers.canInviteMembers,
      canRemoveMembers: teamMembers.canRemoveMembers,
      canEditMemberPermissions: teamMembers.canEditMemberPermissions,
      canEditSettings: teamMembers.canEditSettings,
      canEditAutoApproval: teamMembers.canEditAutoApproval,
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

  return members.map(m => ({
    ...m,
    permissions: {
      canViewInterviews: m.canViewInterviews,
      canCreateInterviews: m.canCreateInterviews,
      canEditInterviews: m.canEditInterviews,
      canDeleteInterviews: m.canDeleteInterviews,
      canViewCandidates: m.canViewCandidates,
      canApproveCandidates: m.canApproveCandidates,
      canRejectCandidates: m.canRejectCandidates,
      canViewFinancials: m.canViewFinancials,
      canInviteMembers: m.canInviteMembers,
      canRemoveMembers: m.canRemoveMembers,
      canEditMemberPermissions: m.canEditMemberPermissions,
      canEditSettings: m.canEditSettings,
      canEditAutoApproval: m.canEditAutoApproval,
    },
  })) as (TeamMember & { member: { id: string; nome: string; email: string }; permissions: MemberPermissions })[];
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
 * Verifica se um usuário é owner de sua própria conta (tem dados próprios)
 * Um usuário é considerado owner se:
 * 1. Tem entrevistas criadas em seu nome
 * 2. Tem configurações de time como owner
 */
export async function isUserAccountOwner(userId: string): Promise<boolean> {
  const db = getDB();

  // Verifica se tem entrevistas próprias
  const [hasEntrevistas] = await db
    .select({ count: entrevistas.id })
    .from(entrevistas)
    .where(eq(entrevistas.userId, userId))
    .limit(1);

  if (hasEntrevistas) {
    return true;
  }

  // Verifica se tem configurações de time como owner
  const [hasTeamSettings] = await db
    .select({ count: teamSettings.id })
    .from(teamSettings)
    .where(eq(teamSettings.ownerId, userId))
    .limit(1);

  if (hasTeamSettings) {
    return true;
  }

  return false;
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

  // Verifica se o owner está tentando convidar a si mesmo
  const [ownerUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, invitedBy))
    .limit(1);

  if (ownerUser && ownerUser.email.toLowerCase() === invitedEmail.toLowerCase()) {
    return {
      success: false,
      error: "Você não pode convidar a si mesmo para o seu próprio time"
    };
  }

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

    // Verifica se o usuário convidado já é owner de sua própria conta
    // Se ele tem entrevistas ou dados próprios, não pode ser membro de outro time
    const isOwner = await isUserAccountOwner(existingUser.id);
    if (isOwner) {
      return {
        success: false,
        error: "Este usuário já possui uma conta própria com dados. Ele não pode ser adicionado como membro de outro time."
      };
    }

    // Verifica se o usuário já é membro de outro time
    // Um usuário só pode pertencer a um time por vez
    const [existingMembershipInOtherTeam] = await db
      .select({
        ownerId: teamMembers.ownerId,
        ownerNome: users.nome,
      })
      .from(teamMembers)
      .innerJoin(users, eq(teamMembers.ownerId, users.id))
      .where(
        and(
          eq(teamMembers.memberId, existingUser.id),
          eq(teamMembers.isActive, true)
        )
      )
      .limit(1);

    if (existingMembershipInOtherTeam) {
      return {
        success: false,
        error: `Este usuário já faz parte do time de ${existingMembershipInOtherTeam.ownerNome}. Um usuário só pode pertencer a um time por vez.`
      };
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
    // Em produção na Vercel, usa VERCEL_URL ou NEXT_PUBLIC_APP_URL
    // Em desenvolvimento, usa localhost
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
      "https://entrevistia.com.br";
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

  // Obtém as permissões padrão do role
  const defaultPermissions = defaultPermissionsByRole[invitation.role as TeamRole] || defaultPermissionsByRole.viewer;

  if (existingMember) {
    if (existingMember.isActive) {
      return { success: false, error: "Você já faz parte deste time" };
    }
    // Reativa membro com permissões padrão do role
    await db
      .update(teamMembers)
      .set({
        isActive: true,
        role: invitation.role,
        ...defaultPermissions,
        updatedAt: new Date(),
      })
      .where(eq(teamMembers.id, existingMember.id));
  } else {
    // Cria novo membro com permissões padrão do role
    await db.insert(teamMembers).values({
      ownerId: invitation.invitedBy,
      memberId: userId,
      role: invitation.role,
      ...defaultPermissions,
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
  logger.info('[AUTO_DECISION] Iniciando processamento', { candidatoEntrevistaId });

  const db = getDB();

  // Busca a candidatura
  const [candidatura] = await db
    .select()
    .from(candidatoEntrevistas)
    .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId))
    .limit(1);

  if (!candidatura || !candidatura.notaGeral) {
    logger.warn('[AUTO_DECISION] Candidatura não encontrada ou sem avaliação', {
      candidatoEntrevistaId,
      candidaturaExists: !!candidatura,
      notaGeral: candidatura?.notaGeral,
    });
    return { processed: false, reason: "Candidatura não encontrada ou sem avaliação" };
  }

  // Se já tem decisão do recrutador, não processa
  if (candidatura.decisaoRecrutador) {
    logger.info('[AUTO_DECISION] Candidatura já tem decisão manual', {
      candidatoEntrevistaId,
      decisaoExistente: candidatura.decisaoRecrutador,
    });
    return { processed: false, reason: "Já existe decisão manual" };
  }

  // Busca a entrevista para pegar as configurações de aprovação automática da vaga
  const [entrevista] = await db
    .select()
    .from(entrevistas)
    .where(eq(entrevistas.id, candidatura.entrevistaId))
    .limit(1);

  if (!entrevista) {
    logger.error('[AUTO_DECISION] Entrevista não encontrada', {
      candidatoEntrevistaId,
      entrevistaId: candidatura.entrevistaId,
    });
    return { processed: false, reason: "Entrevista não encontrada" };
  }

  const score = candidatura.notaGeral;
  const compatibility = candidatura.compatibilidadeVaga || 0;

  logger.info('[AUTO_DECISION] Configurações da vaga', {
    candidatoEntrevistaId,
    entrevistaId: entrevista.id,
    cargo: entrevista.cargo,
    score,
    compatibility,
    autoApprovalEnabled: entrevista.autoApprovalEnabled,
    autoApprovalMinScore: entrevista.autoApprovalMinScore,
    autoApprovalUseCompatibility: entrevista.autoApprovalUseCompatibility,
    autoApprovalMinCompatibility: entrevista.autoApprovalMinCompatibility,
    autoRejectEnabled: entrevista.autoRejectEnabled,
    autoRejectMaxScore: entrevista.autoRejectMaxScore,
  });

  // Verifica aprovação automática usando configurações da vaga
  if (entrevista.autoApprovalEnabled) {
    let shouldApprove = score >= entrevista.autoApprovalMinScore;
    logger.info('[AUTO_DECISION] Verificação de aprovação', {
      candidatoEntrevistaId,
      scoreCheck: `${score} >= ${entrevista.autoApprovalMinScore}`,
      shouldApproveByScore: shouldApprove,
    });

    if (shouldApprove && entrevista.autoApprovalUseCompatibility) {
      shouldApprove = compatibility >= entrevista.autoApprovalMinCompatibility;
      logger.info('[AUTO_DECISION] Verificação de compatibilidade', {
        candidatoEntrevistaId,
        compatibilityCheck: `${compatibility} >= ${entrevista.autoApprovalMinCompatibility}`,
        shouldApproveByCompatibility: shouldApprove,
      });
    }

    if (shouldApprove) {
      logger.info('[AUTO_DECISION] ✅ Aprovando candidato automaticamente', {
        candidatoEntrevistaId,
        score,
        compatibility,
      });

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
    const shouldReject = score <= entrevista.autoRejectMaxScore;
    logger.info('[AUTO_DECISION] Verificação de reprovação', {
      candidatoEntrevistaId,
      scoreCheck: `${score} <= ${entrevista.autoRejectMaxScore}`,
      shouldReject,
    });

    if (shouldReject) {
      logger.info('[AUTO_DECISION] ❌ Reprovando candidato automaticamente', {
        candidatoEntrevistaId,
        score,
      });

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

  logger.info('[AUTO_DECISION] Nenhuma decisão automática aplicada', {
    candidatoEntrevistaId,
    score,
    autoApprovalEnabled: entrevista.autoApprovalEnabled,
    autoRejectEnabled: entrevista.autoRejectEnabled,
  });

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
