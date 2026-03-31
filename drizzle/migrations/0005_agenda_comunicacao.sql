-- Migration: Módulo 12 (Agenda e Calendário) + Módulo 13 (Comunicação Básica)
-- Created: 2026-03-30

-- ==========================================
-- ENUMS
-- ==========================================

CREATE TYPE "tipo_evento" AS ENUM (
  'entrevista_ia',
  'entrevista_humana',
  'prova',
  'teste_tecnico',
  'avaliacao',
  'reuniao_interna',
  'outro'
);

CREATE TYPE "status_evento" AS ENUM (
  'pendente',
  'confirmado',
  'reagendado',
  'cancelado',
  'realizado',
  'no_show'
);

CREATE TYPE "canal_mensagem" AS ENUM (
  'email',
  'whatsapp',
  'sms',
  'plataforma'
);

CREATE TYPE "status_mensagem" AS ENUM (
  'rascunho',
  'agendada',
  'enviada',
  'entregue',
  'aberta',
  'clicada',
  'respondida',
  'erro',
  'bounced'
);

CREATE TYPE "tipo_template_mensagem" AS ENUM (
  'convite_entrevista',
  'lembrete_entrevista',
  'confirmacao_agendamento',
  'reagendamento',
  'cancelamento',
  'aprovacao_etapa',
  'reprovacao_etapa',
  'proposta_enviada',
  'feedback_geral',
  'lembrete_24h',
  'lembrete_1h',
  'boas_vindas',
  'custom'
);

-- ==========================================
-- MÓDULO 12: AGENDA E CALENDÁRIO
-- ==========================================

-- Disponibilidade do recrutador
CREATE TABLE "disponibilidades" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "dia_semana" INTEGER NOT NULL,
  "hora_inicio" TEXT NOT NULL,
  "hora_fim" TEXT NOT NULL,
  "duracao_slot_minutos" INTEGER NOT NULL DEFAULT 60,
  "intervalo_minutos" INTEGER NOT NULL DEFAULT 15,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Bloqueios de horário
CREATE TABLE "bloqueios_horario" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "titulo" TEXT,
  "data_inicio" TIMESTAMP NOT NULL,
  "data_fim" TIMESTAMP NOT NULL,
  "dia_inteiro" BOOLEAN NOT NULL DEFAULT false,
  "recorrente" BOOLEAN NOT NULL DEFAULT false,
  "google_event_id" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Agendamentos
CREATE TABLE "agendamentos" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "candidato_id" UUID REFERENCES "candidatos"("id") ON DELETE SET NULL,
  "entrevista_id" UUID REFERENCES "entrevistas"("id") ON DELETE SET NULL,
  "titulo" TEXT NOT NULL,
  "descricao" TEXT,
  "tipo" "tipo_evento" NOT NULL DEFAULT 'entrevista_humana',
  "status" "status_evento" NOT NULL DEFAULT 'pendente',
  "data_inicio" TIMESTAMP NOT NULL,
  "data_fim" TIMESTAMP NOT NULL,
  "fuso_horario" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
  "local" TEXT,
  "link_reuniao" TEXT,
  "plataforma" TEXT,
  "participantes" TEXT,
  "google_event_id" TEXT,
  "google_calendar_id" TEXT,
  "lembrete_24h_enviado" BOOLEAN NOT NULL DEFAULT false,
  "lembrete_1h_enviado" BOOLEAN NOT NULL DEFAULT false,
  "lembrete_15min_enviado" BOOLEAN NOT NULL DEFAULT false,
  "confirmado_em" TIMESTAMP,
  "cancelado_em" TIMESTAMP,
  "motivo_cancelamento" TEXT,
  "reagendado_de" UUID,
  "tentativas_reagendamento" INTEGER NOT NULL DEFAULT 0,
  "max_reagendamentos" INTEGER NOT NULL DEFAULT 2,
  "notas_internas" TEXT,
  "notas_candidato" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Links de self-scheduling
CREATE TABLE "self_scheduling_links" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "candidato_id" UUID REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "entrevista_id" UUID REFERENCES "entrevistas"("id") ON DELETE SET NULL,
  "token" TEXT NOT NULL UNIQUE,
  "titulo" TEXT NOT NULL,
  "descricao" TEXT,
  "tipo" "tipo_evento" NOT NULL DEFAULT 'entrevista_humana',
  "duracao_minutos" INTEGER NOT NULL DEFAULT 60,
  "data_inicio" TIMESTAMP NOT NULL,
  "data_fim" TIMESTAMP NOT NULL,
  "usado_em" TIMESTAMP,
  "agendamento_id" UUID,
  "expires_at" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Tokens OAuth do Google Calendar
CREATE TABLE "google_calendar_tokens" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE UNIQUE,
  "access_token" TEXT NOT NULL,
  "refresh_token" TEXT NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "calendar_id" TEXT DEFAULT 'primary',
  "email" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ==========================================
-- MÓDULO 13: COMUNICAÇÃO BÁSICA
-- ==========================================

-- Templates de mensagem
CREATE TABLE "templates_mensagem" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE,
  "nome" TEXT NOT NULL,
  "tipo" "tipo_template_mensagem" NOT NULL,
  "canal" "canal_mensagem" NOT NULL DEFAULT 'email',
  "assunto" TEXT,
  "corpo" TEXT NOT NULL,
  "variaveis" TEXT,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "padrao" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Mensagens enviadas/recebidas
CREATE TABLE "mensagens" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "candidato_id" UUID NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "entrevista_id" UUID REFERENCES "entrevistas"("id") ON DELETE SET NULL,
  "template_id" UUID REFERENCES "templates_mensagem"("id") ON DELETE SET NULL,
  "canal" "canal_mensagem" NOT NULL DEFAULT 'email',
  "status" "status_mensagem" NOT NULL DEFAULT 'enviada',
  "recebida" BOOLEAN NOT NULL DEFAULT false,
  "assunto" TEXT,
  "corpo" TEXT NOT NULL,
  "email_id" TEXT,
  "aberta_em" TIMESTAMP,
  "clicada_em" TIMESTAMP,
  "respondida_em" TIMESTAMP,
  "erro_detalhe" TEXT,
  "lida_pelo_recrutador" BOOLEAN NOT NULL DEFAULT false,
  "lida_pelo_candidato" BOOLEAN NOT NULL DEFAULT false,
  "arquivada" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ==========================================
-- ÍNDICES
-- ==========================================

-- Agenda
CREATE INDEX "idx_disponibilidades_user" ON "disponibilidades" ("user_id");
CREATE INDEX "idx_bloqueios_user_data" ON "bloqueios_horario" ("user_id", "data_inicio", "data_fim");
CREATE INDEX "idx_agendamentos_user" ON "agendamentos" ("user_id");
CREATE INDEX "idx_agendamentos_candidato" ON "agendamentos" ("candidato_id");
CREATE INDEX "idx_agendamentos_data" ON "agendamentos" ("data_inicio", "data_fim");
CREATE INDEX "idx_agendamentos_status" ON "agendamentos" ("status");
CREATE INDEX "idx_agendamentos_entrevista" ON "agendamentos" ("entrevista_id");
CREATE INDEX "idx_self_scheduling_token" ON "self_scheduling_links" ("token");
CREATE INDEX "idx_self_scheduling_candidato" ON "self_scheduling_links" ("candidato_id");

-- Mensagens
CREATE INDEX "idx_mensagens_user" ON "mensagens" ("user_id");
CREATE INDEX "idx_mensagens_candidato" ON "mensagens" ("candidato_id");
CREATE INDEX "idx_mensagens_entrevista" ON "mensagens" ("entrevista_id");
CREATE INDEX "idx_mensagens_status" ON "mensagens" ("status");
CREATE INDEX "idx_mensagens_created" ON "mensagens" ("created_at" DESC);
CREATE INDEX "idx_mensagens_nao_lidas" ON "mensagens" ("user_id", "lida_pelo_recrutador") WHERE "lida_pelo_recrutador" = false;
CREATE INDEX "idx_templates_user_tipo" ON "templates_mensagem" ("user_id", "tipo");

-- ==========================================
-- TEMPLATES PADRÃO DE MENSAGEM
-- ==========================================

INSERT INTO "templates_mensagem" ("nome", "tipo", "canal", "assunto", "corpo", "variaveis", "padrao") VALUES
(
  'Convite para Entrevista',
  'convite_entrevista',
  'email',
  'Convite para Entrevista - {{vaga}} na {{empresa}}',
  '<p>Olá {{nome}},</p><p>Você foi convidado(a) para participar do processo seletivo para a vaga de <strong>{{vaga}}</strong> na <strong>{{empresa}}</strong>.</p><p>Clique no link abaixo para acessar sua entrevista:</p><p><a href="{{link}}">Acessar Entrevista</a></p><p>Prazo para responder: <strong>{{prazo}}</strong></p><p>Boa sorte!</p><p>Equipe {{empresa}}</p>',
  '["nome","vaga","empresa","link","prazo"]',
  true
),
(
  'Lembrete de Entrevista (24h)',
  'lembrete_24h',
  'email',
  'Lembrete: Sua entrevista é amanhã - {{vaga}}',
  '<p>Olá {{nome}},</p><p>Estamos escrevendo para lembrar que sua entrevista para a vaga de <strong>{{vaga}}</strong> está marcada para amanhã, <strong>{{data}}</strong> às <strong>{{hora}}</strong>.</p><p>{{#link_reuniao}}<p>Link da reunião: <a href="{{link_reuniao}}">Acessar reunião</a></p>{{/link_reuniao}}<p>Caso precise reagendar, entre em contato conosco o mais breve possível.</p><p>Atenciosamente,<br>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","data","hora","link_reuniao","recrutador","empresa"]',
  true
),
(
  'Lembrete de Entrevista (1h)',
  'lembrete_1h',
  'email',
  'Sua entrevista começa em 1 hora - {{vaga}}',
  '<p>Olá {{nome}},</p><p>Sua entrevista para a vaga de <strong>{{vaga}}</strong> começa em <strong>1 hora</strong> ({{hora}}).</p>{{#link_reuniao}}<p>Link da reunião: <a href="{{link_reuniao}}">Acessar reunião</a></p>{{/link_reuniao}}<p>Até já!</p><p>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","hora","link_reuniao","recrutador","empresa"]',
  true
),
(
  'Confirmação de Agendamento',
  'confirmacao_agendamento',
  'email',
  'Entrevista Confirmada - {{vaga}} em {{data}}',
  '<p>Olá {{nome}},</p><p>Sua entrevista foi agendada com sucesso!</p><p><strong>Vaga:</strong> {{vaga}}<br><strong>Data:</strong> {{data}}<br><strong>Horário:</strong> {{hora}}<br>{{#local}}<strong>Local:</strong> {{local}}<br>{{/local}}{{#link_reuniao}}<strong>Link:</strong> <a href="{{link_reuniao}}">Acessar reunião</a><br>{{/link_reuniao}}</p><p>Caso precise reagendar ou cancelar, utilize o link abaixo:</p><p><a href="{{link_gerenciar}}">Gerenciar agendamento</a></p><p>Atenciosamente,<br>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","data","hora","local","link_reuniao","link_gerenciar","recrutador","empresa"]',
  true
),
(
  'Reagendamento',
  'reagendamento',
  'email',
  'Entrevista Reagendada - {{vaga}}',
  '<p>Olá {{nome}},</p><p>Sua entrevista para a vaga de <strong>{{vaga}}</strong> foi reagendada.</p><p><strong>Nova data:</strong> {{data}}<br><strong>Novo horário:</strong> {{hora}}<br>{{#link_reuniao}}<strong>Link:</strong> <a href="{{link_reuniao}}">Acessar reunião</a>{{/link_reuniao}}</p><p>Pedimos desculpas por qualquer inconveniente.</p><p>Atenciosamente,<br>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","data","hora","link_reuniao","recrutador","empresa"]',
  true
),
(
  'Cancelamento',
  'cancelamento',
  'email',
  'Entrevista Cancelada - {{vaga}}',
  '<p>Olá {{nome}},</p><p>Infelizmente, precisamos informar que a entrevista para a vaga de <strong>{{vaga}}</strong> marcada para <strong>{{data}}</strong> foi cancelada.</p>{{#motivo}}<p><strong>Motivo:</strong> {{motivo}}</p>{{/motivo}}<p>Entraremos em contato em breve para novas informações.</p><p>Atenciosamente,<br>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","data","motivo","recrutador","empresa"]',
  true
),
(
  'Aprovação de Etapa',
  'aprovacao_etapa',
  'email',
  'Parabéns! Você avançou no processo - {{vaga}}',
  '<p>Olá {{nome}},</p><p>Temos boas notícias! Você foi aprovado(a) para a próxima etapa do processo seletivo para a vaga de <strong>{{vaga}}</strong> na <strong>{{empresa}}</strong>.</p>{{#proxima_etapa}}<p><strong>Próxima etapa:</strong> {{proxima_etapa}}</p>{{/proxima_etapa}}<p>Em breve entraremos em contato com mais detalhes.</p><p>Parabéns e continue assim!</p><p>Atenciosamente,<br>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","empresa","proxima_etapa","recrutador"]',
  true
),
(
  'Reprovação de Etapa',
  'reprovacao_etapa',
  'email',
  'Retorno sobre o processo seletivo - {{vaga}}',
  '<p>Olá {{nome}},</p><p>Agradecemos muito seu interesse e participação no processo seletivo para a vaga de <strong>{{vaga}}</strong> na <strong>{{empresa}}</strong>.</p><p>Após análise cuidadosa, decidimos seguir com outros candidatos para esta posição.</p>{{#feedback}}<p><strong>Feedback:</strong> {{feedback}}</p>{{/feedback}}<p>Gostaríamos de manter seu perfil em nosso banco de talentos para futuras oportunidades.</p><p>Desejamos sucesso em sua trajetória profissional!</p><p>Atenciosamente,<br>{{recrutador}}<br>{{empresa}}</p>',
  '["nome","vaga","empresa","feedback","recrutador"]',
  true
),
(
  'Boas-vindas',
  'boas_vindas',
  'email',
  'Bem-vindo(a) ao processo seletivo da {{empresa}}!',
  '<p>Olá {{nome}},</p><p>Seu cadastro foi realizado com sucesso! Agora você faz parte do processo seletivo da <strong>{{empresa}}</strong>.</p><p>Acompanhe seu progresso e atualize seu perfil a qualquer momento.</p><p>Se tiver dúvidas, não hesite em entrar em contato.</p><p>Atenciosamente,<br>Equipe {{empresa}}</p>',
  '["nome","empresa"]',
  true
);
