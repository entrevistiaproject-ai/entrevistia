import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes, entrevistas, candidatoEntrevistas } from "@/lib/db/schema";
import { sql, eq, desc } from "drizzle-orm";

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
      gastoTotal,
      gastoMesAtual: 0, // TODO: calcular
      mediaGastoMensal: gastoTotal / mesesAtivo,
      ultimaFatura: ultimaFatura
        ? {
            valor: Number(ultimaFatura.valor),
            status: ultimaFatura.status,
            dataVencimento: null,
          }
        : null,
      totalEntrevistas: Number(entrevistasCount.total) || 0,
      totalCandidatos: Number(candidatosCount.total) || 0,
      isTeste: usuario.planType === "free_trial" && gastoTotal < 10,
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
