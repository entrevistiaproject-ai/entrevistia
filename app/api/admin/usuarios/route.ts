import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes, entrevistas, candidatoEntrevistas } from "@/lib/db/schema";
import { sql, eq, desc, isNull, and } from "drizzle-orm";

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

    // Buscar usuários com agregações
    const usuariosData = await db
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
        // Agregações financeiras
        gastoTotal: sql<number>`coalesce((
          select sum(cast(t.valor_cobrado as decimal))
          from transacoes t
          where t.user_id = ${users.id}
        ), 0)`,
        gastoMesAtual: sql<number>`coalesce((
          select sum(cast(t.valor_cobrado as decimal))
          from transacoes t
          where t.user_id = ${users.id}
          and extract(month from t.created_at) = ${mesAtual}
          and extract(year from t.created_at) = ${anoAtual}
        ), 0)`,
        totalEntrevistas: sql<number>`coalesce((
          select count(*)
          from entrevistas e
          where e.user_id = ${users.id}
        ), 0)`,
        totalCandidatos: sql<number>`coalesce((
          select count(distinct ce.candidato_id)
          from candidato_entrevistas ce
          inner join entrevistas e on e.id = ce.entrevista_id
          where e.user_id = ${users.id}
        ), 0)`,
      })
      .from(users)
      .where(isNull(users.deletedAt))
      .orderBy(desc(users.createdAt));

    // Buscar última fatura de cada usuário
    const ultimasFaturas = await db
      .select({
        userId: faturas.userId,
        valor: sql<number>`cast(${faturas.valorTotal} as decimal)`,
        status: faturas.status,
        dataVencimento: faturas.dataVencimento,
      })
      .from(faturas)
      .where(
        sql`(${faturas.userId}, ${faturas.anoReferencia}, ${faturas.mesReferencia}) in (
          select user_id, max(ano_referencia), max(mes_referencia)
          from faturas
          group by user_id
        )`
      );

    const faturasMap = new Map(
      ultimasFaturas.map((f) => [
        f.userId,
        {
          valor: Number(f.valor),
          status: f.status,
          dataVencimento: f.dataVencimento,
        },
      ])
    );

    // Calcular média de gasto mensal
    const usuariosComMedia = await Promise.all(
      usuariosData.map(async (usuario) => {
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
          ultimoLogin: null, // TODO: implementar rastreamento de login
          gastoTotal: Number(usuario.gastoTotal) || 0,
          gastoMesAtual: Number(usuario.gastoMesAtual) || 0,
          mediaGastoMensal: (Number(usuario.gastoTotal) || 0) / mesesAtivo,
          ultimaFatura: faturasMap.get(usuario.id) || null,
          totalEntrevistas: Number(usuario.totalEntrevistas) || 0,
          totalCandidatos: Number(usuario.totalCandidatos) || 0,
          isTeste: usuario.planType === "free_trial" && Number(usuario.gastoTotal) < 10,
        };
      })
    );

    return NextResponse.json({ usuarios: usuariosComMedia });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
