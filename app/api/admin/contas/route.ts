import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes, entrevistas, teamMembers } from "@/lib/db/schema";
import { sql, desc, isNull, eq, and, count, notInArray } from "drizzle-orm";
import { FREE_TRIAL_LIMITS } from "@/lib/config/free-trial";

/**
 * GET /api/admin/contas
 * Lista apenas contas (owners) - usuários que NÃO são membros de outro time
 * Inclui dados financeiros: saldo, limite, gastos, faturas
 */
export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageUsers) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();
    const now = new Date();

    // Primeiro, buscar IDs de usuários que são membros de outros times (esses NÃO são owners)
    const membrosDeOutrosTimesQuery = await db
      .select({ memberId: teamMembers.memberId })
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true));

    const membrosDeOutrosTimes = membrosDeOutrosTimesQuery.map(m => m.memberId);

    // Buscar apenas owners (usuários que NÃO estão na lista de membros)
    let ownersQuery = db
      .select({
        id: users.id,
        nome: users.nome,
        email: users.email,
        empresa: users.empresa,
        telefone: users.telefone,
        planType: users.planType,
        planStatus: users.planStatus,
        isActive: users.isActive,
        isTestAccount: users.isTestAccount,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
        usageEntrevistas: users.usageEntrevistas,
        usageCandidatos: users.usageCandidatos,
        creditoExtra: users.creditoExtra,
      })
      .from(users)
      .where(isNull(users.deletedAt))
      .orderBy(desc(users.createdAt));

    // Se há membros, excluí-los da query
    const owners = membrosDeOutrosTimes.length > 0
      ? await db
          .select({
            id: users.id,
            nome: users.nome,
            email: users.email,
            empresa: users.empresa,
            telefone: users.telefone,
            planType: users.planType,
            planStatus: users.planStatus,
            isActive: users.isActive,
            isTestAccount: users.isTestAccount,
            emailVerified: users.emailVerified,
            createdAt: users.createdAt,
            usageEntrevistas: users.usageEntrevistas,
            usageCandidatos: users.usageCandidatos,
            creditoExtra: users.creditoExtra,
          })
          .from(users)
          .where(
            and(
              isNull(users.deletedAt),
              notInArray(users.id, membrosDeOutrosTimes)
            )
          )
          .orderBy(desc(users.createdAt))
      : await ownersQuery;

    // Buscar gastos totais por usuário (apenas owners)
    const ownerIds = owners.map(o => o.id);

    const gastosQuery = ownerIds.length > 0
      ? await db
          .select({
            userId: transacoes.userId,
            total: sql<string>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
          })
          .from(transacoes)
          .groupBy(transacoes.userId)
      : [];

    const gastosMap = new Map(
      gastosQuery.map((g) => [g.userId, Number(g.total) || 0])
    );

    // Buscar contagem de entrevistas por usuário
    const entrevistasQuery = await db
      .select({
        userId: entrevistas.userId,
        total: count(),
      })
      .from(entrevistas)
      .groupBy(entrevistas.userId);

    const entrevistasMap = new Map(
      entrevistasQuery.map((e) => [e.userId, Number(e.total) || 0])
    );

    // Buscar última fatura de cada usuário
    const ultimasFaturas = await db
      .select({
        userId: faturas.userId,
        valor: faturas.valorTotal,
        status: faturas.status,
        dataVencimento: faturas.dataVencimento,
        mesReferencia: faturas.mesReferencia,
        anoReferencia: faturas.anoReferencia,
      })
      .from(faturas)
      .orderBy(desc(faturas.anoReferencia), desc(faturas.mesReferencia));

    const faturasMap = new Map<string, {
      valor: number;
      status: string;
      dataVencimento: string | null;
    }>();

    for (const f of ultimasFaturas) {
      if (!faturasMap.has(f.userId)) {
        faturasMap.set(f.userId, {
          valor: Number(f.valor) || 0,
          status: f.status,
          dataVencimento: f.dataVencimento || null,
        });
      }
    }

    // Buscar quantos membros cada owner tem no seu time
    const teamMemberCountQuery = await db
      .select({
        ownerId: teamMembers.ownerId,
        count: count(),
      })
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .groupBy(teamMembers.ownerId);

    const teamMemberCountMap = new Map(
      teamMemberCountQuery.map((tc) => [tc.ownerId, Number(tc.count) || 0])
    );

    // Buscar total devido e total pago por usuário
    const totaisFaturasQuery = await db
      .select({
        userId: faturas.userId,
        totalDevido: sql<string>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
        totalPago: sql<string>`coalesce(sum(cast(${faturas.valorPago} as decimal)), 0)`,
      })
      .from(faturas)
      .groupBy(faturas.userId);

    const totaisFaturasMap = new Map(
      totaisFaturasQuery.map((t) => [t.userId, {
        totalDevido: Number(t.totalDevido) || 0,
        totalPago: Number(t.totalPago) || 0,
      }])
    );

    // Montar resposta final
    const contasComDados = owners.map((owner) => {
      const gastoTotal = gastosMap.get(owner.id) || 0;
      const totalEntrevistas = entrevistasMap.get(owner.id) || owner.usageEntrevistas || 0;
      const ultimaFatura = faturasMap.get(owner.id) || null;
      const totaisFaturas = totaisFaturasMap.get(owner.id) || { totalDevido: 0, totalPago: 0 };
      const creditoExtra = Number(owner.creditoExtra) || 0;
      const limiteTotal = FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO + creditoExtra;
      const teamMemberCount = teamMemberCountMap.get(owner.id) || 0;

      const mesesAtivo = Math.max(
        1,
        Math.ceil(
          (now.getTime() - new Date(owner.createdAt).getTime()) /
            (30 * 24 * 60 * 60 * 1000)
        )
      );

      return {
        id: owner.id,
        nome: owner.nome,
        email: owner.email,
        empresa: owner.empresa,
        telefone: owner.telefone,
        planType: owner.planType,
        planStatus: owner.planStatus,
        isActive: owner.isActive,
        emailVerified: owner.emailVerified ? owner.emailVerified.toISOString() : null,
        createdAt: owner.createdAt.toISOString(),
        gastoTotal,
        totalDevido: totaisFaturas.totalDevido,
        totalRecebido: totaisFaturas.totalPago,
        gastoMesAtual: 0, // Simplificado
        mediaGastoMensal: gastoTotal / mesesAtivo,
        creditoExtra,
        limiteFreeTrial: FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO,
        limiteTotal,
        saldoRestante: Math.max(0, limiteTotal - gastoTotal),
        ultimaFatura,
        totalEntrevistas,
        totalCandidatos: owner.usageCandidatos || 0,
        isTeste: owner.isTestAccount || false,
        teamMemberCount,
      };
    });

    return NextResponse.json({ contas: contasComDados });
  } catch (error) {
    console.error("Erro ao listar contas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
