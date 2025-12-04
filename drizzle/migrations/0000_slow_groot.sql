CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"telefone" text,
	"empresa" text,
	"cargo" text,
	"password_hash" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"aceitou_termos" boolean DEFAULT false NOT NULL,
	"aceitou_privacidade" boolean DEFAULT false NOT NULL,
	"data_aceite_termos" timestamp,
	"aceita_email_marketing" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"ip_cadastro" text,
	"user_agent_cadastro" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "candidatos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"telefone" text,
	"linkedin" text,
	"curriculo" text,
	"observacoes" text,
	"aceitou_termos_entrevista" boolean DEFAULT false NOT NULL,
	"data_aceite_termos" timestamp,
	"consentimento_tratamento_dados" boolean DEFAULT false NOT NULL,
	"finalidade_tratamento" text,
	"solicitou_acesso" timestamp,
	"solicitou_correcao" timestamp,
	"solicitou_exclusao" timestamp,
	"data_exclusao_agendada" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"ip_cadastro" text,
	"origem_cadastro" text
);
--> statement-breakpoint
CREATE TABLE "entrevistas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"candidato_id" uuid,
	"titulo" text NOT NULL,
	"descricao" text,
	"cargo" text,
	"empresa" text,
	"status" text DEFAULT 'rascunho' NOT NULL,
	"duracao" integer,
	"tempo_resposta" integer,
	"permitir_revisao" text DEFAULT 'false' NOT NULL,
	"slug" text,
	"link_publico" text,
	"expiracao_link" timestamp,
	"anonimizar_dados" text DEFAULT 'false' NOT NULL,
	"periodo_retencao" integer DEFAULT 90,
	"nota_total" integer,
	"aprovado" text,
	"feedback" text,
	"configuracoes" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"iniciada_em" timestamp,
	"concluida_em" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "entrevistas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "perguntas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entrevista_id" uuid NOT NULL,
	"texto" text NOT NULL,
	"ordem" integer DEFAULT 0 NOT NULL,
	"tipo" text DEFAULT 'texto' NOT NULL,
	"obrigatoria" text DEFAULT 'true' NOT NULL,
	"tempo_maximo" integer,
	"pontuacao_maxima" integer DEFAULT 100,
	"opcoes" jsonb,
	"criterios_avaliacao" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "respostas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pergunta_id" uuid NOT NULL,
	"candidato_id" uuid NOT NULL,
	"entrevista_id" uuid NOT NULL,
	"texto_resposta" text,
	"arquivo_url" text,
	"arquivo_tipo" text,
	"transcricao" text,
	"pontuacao" integer,
	"nota" integer,
	"feedback" text,
	"analise_ia" jsonb,
	"tempo_resposta" integer,
	"tentativas" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"ip_resposta" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"user_email" text,
	"acao" text NOT NULL,
	"entidade" text NOT NULL,
	"entidade_id" text,
	"descricao" text,
	"dados_antigos" jsonb,
	"dados_novos" jsonb,
	"tipo_operacao_lgpd" text,
	"base_juridica" text,
	"finalidade" text,
	"ip_address" text,
	"user_agent" text,
	"localizacao" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "candidatos" ADD CONSTRAINT "candidatos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrevistas" ADD CONSTRAINT "entrevistas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrevistas" ADD CONSTRAINT "entrevistas_candidato_id_candidatos_id_fk" FOREIGN KEY ("candidato_id") REFERENCES "public"."candidatos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_entrevista_id_entrevistas_id_fk" FOREIGN KEY ("entrevista_id") REFERENCES "public"."entrevistas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_pergunta_id_perguntas_id_fk" FOREIGN KEY ("pergunta_id") REFERENCES "public"."perguntas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_candidato_id_candidatos_id_fk" FOREIGN KEY ("candidato_id") REFERENCES "public"."candidatos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_entrevista_id_entrevistas_id_fk" FOREIGN KEY ("entrevista_id") REFERENCES "public"."entrevistas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;