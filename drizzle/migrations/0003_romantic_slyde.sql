CREATE TABLE "faturas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"mes_referencia" integer NOT NULL,
	"ano_referencia" integer NOT NULL,
	"valor_total" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"valor_pago" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"status" text DEFAULT 'aberta' NOT NULL,
	"data_abertura" timestamp DEFAULT now() NOT NULL,
	"data_fechamento" timestamp,
	"data_vencimento" date,
	"data_pagamento" timestamp,
	"total_entrevistas" integer DEFAULT 0,
	"total_candidatos" integer DEFAULT 0,
	"total_respostas" integer DEFAULT 0,
	"total_transacoes" integer DEFAULT 0,
	"metodo_pagamento" text,
	"payment_id" text,
	"payment_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transacoes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"fatura_id" uuid,
	"entrevista_id" uuid,
	"resposta_id" uuid,
	"tipo" text NOT NULL,
	"custo_base" numeric(10, 6) NOT NULL,
	"markup" numeric(10, 2) DEFAULT '2.5' NOT NULL,
	"valor_cobrado" numeric(10, 2) NOT NULL,
	"metadados" jsonb,
	"descricao" text,
	"status" text DEFAULT 'concluida' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"processada_em" timestamp
);
--> statement-breakpoint
CREATE TABLE "candidato_entrevistas" (
	"candidato_id" uuid NOT NULL,
	"entrevista_id" uuid NOT NULL,
	"status" text DEFAULT 'invited' NOT NULL,
	"iniciou_em" timestamp,
	"completou_em" timestamp,
	"pode_refazer" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "candidato_entrevistas_candidato_id_entrevista_id_pk" PRIMARY KEY("candidato_id","entrevista_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_type" text DEFAULT 'free_trial' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_started_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "usage_entrevistas" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "usage_candidatos" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "entrevistas" ADD COLUMN "nivel" text;--> statement-breakpoint
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_fatura_id_faturas_id_fk" FOREIGN KEY ("fatura_id") REFERENCES "public"."faturas"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_entrevista_id_entrevistas_id_fk" FOREIGN KEY ("entrevista_id") REFERENCES "public"."entrevistas"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_resposta_id_respostas_id_fk" FOREIGN KEY ("resposta_id") REFERENCES "public"."respostas"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidato_entrevistas" ADD CONSTRAINT "candidato_entrevistas_candidato_id_candidatos_id_fk" FOREIGN KEY ("candidato_id") REFERENCES "public"."candidatos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidato_entrevistas" ADD CONSTRAINT "candidato_entrevistas_entrevista_id_entrevistas_id_fk" FOREIGN KEY ("entrevista_id") REFERENCES "public"."entrevistas"("id") ON DELETE cascade ON UPDATE no action;