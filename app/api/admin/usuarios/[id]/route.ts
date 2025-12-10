import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes, entrevistas, candidatoEntrevistas } from "@/lib/db/schema";
import { sql, eq, desc, sum } from "drizzle-orm";
import { FREE_TRIAL_LIMITS } from "@/lib/config/free-trial";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageUsers) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const db = getDB();
    const now = new Date();

    // Buscar usuário
    const [usuario] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Buscar faturas do usuário
    const faturasUsuario = await db
      .select({
        id: faturas.id,
        mes: faturas.mesReferencia,
        ano: faturas.anoReferencia,
        valor: sql<number>`cast(${faturas.valorTotal} as decimal)`,
        status: faturas.status,
      })
      .from(faturas)
      .where(eq(faturas.userId, id))
      .orderBy(desc(faturas.anoReferencia), desc(faturas.mesReferencia))
      .limit(12);

    // Buscar transações recentes
    const transacoesRecentes = await db
      .select({
        id: transacoes.id,
        tipo: transacoes.tipo,
        valor: sql<number>`cast(${transacoes.valorCobrado} as decimal)`,
        data: transacoes.createdAt,
      })
      .from(transacoes)
      .where(eq(transacoes.userId, id))
      .orderBy(desc(transacoes.createdAt))
      .limit(10);

    // Calcular métricas
    const [metricas] = await db
      .select({
        gastoTotal: sql<number>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
        totalTransacoes: sql<number>`count(*)`,
      })
      .from(transacoes)
      .where(eq(transacoes.userId, id));

    const [entrevistasCount] = await db
      .select({ total: sql<number>`count(*)` })
      .from(entrevistas)
      .where(eq(entrevistas.userId, id));

    const [candidatosCount] = await db
      .select({ total: sql<number>`count(distinct ${candidatoEntrevistas.candidatoId})` })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(entrevistas.id, candidatoEntrevistas.entrevistaId))
      .where(eq(entrevistas.userId, id));

    const mesesAtivo = Math.max(
      1,
      Math.ceil(
        (now.getTime() - new Date(usuario.createdAt).getTime()) /
          (30 * 24 * 60 * 60 * 1000)
      )
    );

    const gastoTotal = Number(metricas.gastoTotal) || 0;
    const ultimaFatura = faturasUsuario[0] || null;

    // Calcular total devido e total pago das faturas
    const [totaisFaturas] = await db
      .select({
        totalDevido: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
        totalPago: sql<number>`coalesce(sum(cast(${faturas.valorPago} as decimal)), 0)`,
      })
      .from(faturas)
      .where(eq(faturas.userId, id));

    const creditoExtra = Number(usuario.creditoExtra) || 0;
    const limiteTotal = FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO + creditoExtra;

    return NextResponse.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      empresa: usuario.empresa,
      cargo: usuario.cargo,
      telefone: usuario.telefone,
      planType: usuario.planType,
      planStatus: usuario.planStatus,
      isActive: usuario.isActive,
      emailVerified: usuario.emailVerified?.toISOString() || null,
      createdAt: usuario.createdAt.toISOString(),
      ultimoLogin: null,
      gastoTotal, // Total gasto (transações)
      totalDevido: Number(totaisFaturas.totalDevido) || 0, // Total das faturas
      totalPago: Number(totaisFaturas.totalPago) || 0, // Total efetivamente pago
      gastoMesAtual: 0, // TODO: calcular
      mediaGastoMensal: gastoTotal / mesesAtivo,
      // Créditos do free trial
      creditoExtra,
      limiteFreeTrial: FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO,
      limiteTotal, // Limite base + crédito extra
      saldoRestante: Math.max(0, limiteTotal - gastoTotal),
      ultimaFatura: ultimaFatura
        ? {
            valor: Number(ultimaFatura.valor),
            status: ultimaFatura.status,
            dataVencimento: null,
          }
        : null,
      totalEntrevistas: Number(entrevistasCount.total) || 0,
      totalCandidatos: Number(candidatosCount.total) || 0,
      isTeste: usuario.isTestAccount || false,
      faturas: faturasUsuario.map((f) => ({
        id: f.id,
        mes: f.mes,
        ano: f.ano,
        valor: Number(f.valor),
        status: f.status,
      })),
      transacoesRecentes: transacoesRecentes.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: Number(t.valor),
        data: t.data.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar detalhes do usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * PATCH - Atualiza dados do usuário (ex: crédito extra)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageUsers) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const db = getDB();

    // Verifica se o usuário existe
    const [usuario] = await db
      .select({ id: users.id, planType: users.planType })
      .from(users)
      .where(eq(users.id, id));

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Campos permitidos para atualização
    const updateData: Record<string, unknown> = {};

    // Atualizar crédito extra (apenas para free_trial)
    if (body.creditoExtra !== undefined) {
      const creditoExtra = parseFloat(body.creditoExtra);
      if (isNaN(creditoExtra) || creditoExtra < 0) {
        return NextResponse.json(
          { error: "Valor de crédito extra inválido" },
          { status: 400 }
        );
      }
      updateData.creditoExtra = creditoExtra.toFixed(2);
    }

    // Atualizar status ativo
    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    // Atualizar plano
    if (body.planType !== undefined) {
      const validPlans = ["free_trial", "basic", "professional", "enterprise"];
      if (!validPlans.includes(body.planType)) {
        return NextResponse.json(
          { error: "Tipo de plano inválido" },
          { status: 400 }
        );
      }
      updateData.planType = body.planType;
    }

    // Atualizar conta de teste (QA)
    if (body.isTestAccount !== undefined) {
      updateData.isTestAccount = Boolean(body.isTestAccount);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo para atualizar" },
        { status: 400 }
      );
    }

    // Atualiza o usuário
    updateData.updatedAt = new Date();

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id));

    return NextResponse.json({
      success: true,
      message: "Usuário atualizado com sucesso",
      updated: Object.keys(updateData).filter(k => k !== "updatedAt")
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
