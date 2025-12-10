import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes, entrevistas, candidatoEntrevistas } from "@/lib/db/schema";
import { sql, desc, isNull, eq, and, count, sum } from "drizzle-orm";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageUsers) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();
    const now = new Date();
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();

    // Buscar usuários básicos primeiro
    const usuariosBasicos = await db
      .select({
        id: users.id,
        nome: users.nome,
        email: users.email,
        empresa: users.empresa,
        cargo: users.cargo,
        telefone: users.telefone,
        planType: users.planType,
        planStatus: users.planStatus,
        isActive: users.isActive,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
        usageEntrevistas: users.usageEntrevistas,
        usageCandidatos: users.usageCandidatos,
      })
      .from(users)
      .where(isNull(users.deletedAt))
      .orderBy(desc(users.createdAt));

    // Buscar gastos totais por usuário
    const gastosQuery = await db
      .select({
        userId: transacoes.userId,
        total: sql<string>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
      })
      .from(transacoes)
      .groupBy(transacoes.userId);

    const gastosMap = new Map(
      gastosQuery.map((g) => [g.userId, Number(g.total) || 0])
    );

    // Buscar gastos do mês atual por usuário
    const gastosMesQuery = await db
      .select({
        userId: transacoes.userId,
        total: sql<string>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
      })
      .from(transacoes)
      .where(
        and(
          sql`extract(month from ${transacoes.createdAt}) = ${mesAtual}`,
          sql`extract(year from ${transacoes.createdAt}) = ${anoAtual}`
        )
      )
      .groupBy(transacoes.userId);

    const gastosMesMap = new Map(
      gastosMesQuery.map((g) => [g.userId, Number(g.total) || 0])
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

    // Pegar apenas a última fatura de cada usuário
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

    // Montar resposta final
    const usuariosComDados = usuariosBasicos.map((usuario) => {
      const gastoTotal = gastosMap.get(usuario.id) || 0;
      const gastoMesAtual = gastosMesMap.get(usuario.id) || 0;
      const totalEntrevistas = entrevistasMap.get(usuario.id) || usuario.usageEntrevistas || 0;
      const ultimaFatura = faturasMap.get(usuario.id) || null;

      const mesesAtivo = Math.max(
        1,
        Math.ceil(
          (now.getTime() - new Date(usuario.createdAt).getTime()) /
            (30 * 24 * 60 * 60 * 1000)
        )
      );

      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        empresa: usuario.empresa,
        cargo: usuario.cargo,
        telefone: usuario.telefone,
        planType: usuario.planType,
        planStatus: usuario.planStatus,
        isActive: usuario.isActive,
        emailVerified: usuario.emailVerified ? usuario.emailVerified.toISOString() : null,
        createdAt: usuario.createdAt.toISOString(),
        ultimoLogin: null,
        gastoTotal,
        gastoMesAtual,
        mediaGastoMensal: gastoTotal / mesesAtivo,
        ultimaFatura: ultimaFatura ? {
          valor: ultimaFatura.valor,
          status: ultimaFatura.status,
          dataVencimento: ultimaFatura.dataVencimento,
        } : null,
        totalEntrevistas,
        totalCandidatos: usuario.usageCandidatos || 0,
        isTeste: usuario.planType === "free_trial" && gastoTotal < 10,
      };
    });

    return NextResponse.json({ usuarios: usuariosComDados });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
