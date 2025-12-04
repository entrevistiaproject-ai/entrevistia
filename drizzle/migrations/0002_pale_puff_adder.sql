CREATE TABLE "perguntas_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"texto" text NOT NULL,
	"cargo" text NOT NULL,
	"nivel" text NOT NULL,
	"categoria" text NOT NULL,
	"competencia" text NOT NULL,
	"tipo" text DEFAULT 'texto' NOT NULL,
	"is_padrao" boolean DEFAULT false NOT NULL,
	"criterios_avaliacao" jsonb,
	"tags" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "perguntas_templates" ADD CONSTRAINT "perguntas_templates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;