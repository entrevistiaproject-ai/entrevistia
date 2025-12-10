import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import {
  systemConfig,
  systemConfigHistory,
  CONFIG_KEYS,
  DEFAULT_CONFIG_VALUES,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Helper para parsear valor baseado no tipo
function parseValue(value: string, valueType: string): unknown {
  switch (valueType) {
    case "number":
      return parseFloat(value);
    case "boolean":
      return value === "true";
    case "json":
      return JSON.parse(value);
    default:
      return value;
  }
}

// Helper para serializar valor
function serializeValue(value: unknown): string {
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();

    // Verificar se a tabela existe
    let configs: Array<{
      id: string;
      key: string;
      value: string;
      valueType: string;
      category: string;
      description: string | null;
      isActive: boolean;
      updatedAt: Date;
    }> = [];

    try {
      configs = await db.select().from(systemConfig);
    } catch {
      // Se a tabela não existir, retornar os valores padrão
      console.log("Tabela system_config não existe ainda, usando valores padrão");
    }

    // Se não há configs no banco, usar os valores padrão
    const configMap: Record<
      string,
      {
        value: unknown;
        valueType: string;
        category: string;
        description: string;
        fromDatabase: boolean;
      }
    > = {};

    // Primeiro, adicionar todos os valores padrão
    for (const [key, config] of Object.entries(DEFAULT_CONFIG_VALUES)) {
      configMap[key] = {
        value: parseValue(config.value, config.valueType),
        valueType: config.valueType,
        category: config.category,
        description: config.description,
        fromDatabase: false,
      };
    }

    // Sobrescrever com valores do banco de dados
    for (const config of configs) {
      if (config.isActive) {
        configMap[config.key] = {
          value: parseValue(config.value, config.valueType),
          valueType: config.valueType,
          category: config.category,
          description: config.description || "",
          fromDatabase: true,
        };
      }
    }

    // Agrupar por categoria
    const grouped: Record<
      string,
      Array<{
        key: string;
        value: unknown;
        valueType: string;
        description: string;
        fromDatabase: boolean;
      }>
    > = {};

    for (const [key, config] of Object.entries(configMap)) {
      if (!grouped[config.category]) {
        grouped[config.category] = [];
      }
      grouped[config.category].push({
        key,
        value: config.value,
        valueType: config.valueType,
        description: config.description,
        fromDatabase: config.fromDatabase,
      });
    }

    return NextResponse.json({
      configs: configMap,
      grouped,
      keys: CONFIG_KEYS,
    });
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Verificar se é super_admin
    if (session.role !== "super_admin") {
      return NextResponse.json(
        { error: "Apenas super admins podem alterar configurações" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { key, value, reason } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Chave e valor são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se a chave é válida
    const defaultConfig = DEFAULT_CONFIG_VALUES[key as keyof typeof DEFAULT_CONFIG_VALUES];
    if (!defaultConfig) {
      return NextResponse.json(
        { error: "Chave de configuração inválida" },
        { status: 400 }
      );
    }

    const db = getDB();
    const serializedValue = serializeValue(value);

    // Buscar configuração existente
    let existing: typeof systemConfig.$inferSelect | null = null;
    try {
      const results = await db
        .select()
        .from(systemConfig)
        .where(eq(systemConfig.key, key));
      existing = results[0] || null;
    } catch {
      // Tabela pode não existir ainda
      console.log("Tabela system_config não existe, será criada pela migration");
      return NextResponse.json(
        { error: "Tabela de configurações não existe. Execute a migration primeiro." },
        { status: 500 }
      );
    }

    if (existing) {
      // Registrar histórico
      await db.insert(systemConfigHistory).values({
        configKey: key,
        oldValue: existing.value,
        newValue: serializedValue,
        changedBy: session.id,
        reason: reason || null,
      });

      // Atualizar configuração
      await db
        .update(systemConfig)
        .set({
          value: serializedValue,
          updatedBy: session.id,
          updatedAt: new Date(),
        })
        .where(eq(systemConfig.key, key));
    } else {
      // Criar nova configuração
      await db.insert(systemConfig).values({
        key,
        value: serializedValue,
        valueType: defaultConfig.valueType,
        category: defaultConfig.category,
        description: defaultConfig.description,
        updatedBy: session.id,
      });

      // Registrar histórico
      await db.insert(systemConfigHistory).values({
        configKey: key,
        oldValue: null,
        newValue: serializedValue,
        changedBy: session.id,
        reason: reason || "Primeira configuração",
      });
    }

    return NextResponse.json({
      success: true,
      key,
      value: parseValue(serializedValue, defaultConfig.valueType),
    });
  } catch (error) {
    console.error("Erro ao atualizar configuração:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Endpoint para atualização em lote
export async function PATCH(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (session.role !== "super_admin") {
      return NextResponse.json(
        { error: "Apenas super admins podem alterar configurações" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { configs, reason } = body;

    if (!configs || !Array.isArray(configs)) {
      return NextResponse.json(
        { error: "Array de configurações é obrigatório" },
        { status: 400 }
      );
    }

    const db = getDB();
    const results: Array<{ key: string; success: boolean; error?: string }> = [];

    for (const config of configs) {
      try {
        const { key, value } = config;
        const defaultConfig = DEFAULT_CONFIG_VALUES[key as keyof typeof DEFAULT_CONFIG_VALUES];

        if (!defaultConfig) {
          results.push({ key, success: false, error: "Chave inválida" });
          continue;
        }

        const serializedValue = serializeValue(value);

        // Buscar existente
        const existingResults = await db
          .select()
          .from(systemConfig)
          .where(eq(systemConfig.key, key));
        const existing = existingResults[0];

        if (existing) {
          // Registrar histórico
          await db.insert(systemConfigHistory).values({
            configKey: key,
            oldValue: existing.value,
            newValue: serializedValue,
            changedBy: session.id,
            reason: reason || null,
          });

          // Atualizar
          await db
            .update(systemConfig)
            .set({
              value: serializedValue,
              updatedBy: session.id,
              updatedAt: new Date(),
            })
            .where(eq(systemConfig.key, key));
        } else {
          // Criar
          await db.insert(systemConfig).values({
            key,
            value: serializedValue,
            valueType: defaultConfig.valueType,
            category: defaultConfig.category,
            description: defaultConfig.description,
            updatedBy: session.id,
          });

          await db.insert(systemConfigHistory).values({
            configKey: key,
            oldValue: null,
            newValue: serializedValue,
            changedBy: session.id,
            reason: reason || "Configuração inicial",
          });
        }

        results.push({ key, success: true });
      } catch (error) {
        results.push({
          key: config.key,
          success: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Erro ao atualizar configurações em lote:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
