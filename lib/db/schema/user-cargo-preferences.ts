import { pgTable, text, timestamp, uuid, boolean, json } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de preferências de cargos do usuário
 * Armazena quais cargos/áreas o usuário deseja ver no banco de perguntas padrão
 */
export const userCargoPreferences = pgTable("user_cargo_preferences", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Usuário dono das preferências
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),

  // Lista de cargos visíveis (array de strings com nomes dos cargos)
  // Se vazio, nenhuma pergunta padrão é exibida
  cargosVisiveis: json("cargos_visiveis").$type<string[]>().default([]),

  // Se o usuário completou o onboarding de seleção de áreas
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type UserCargoPreferences = typeof userCargoPreferences.$inferSelect;
export type NewUserCargoPreferences = typeof userCargoPreferences.$inferInsert;
