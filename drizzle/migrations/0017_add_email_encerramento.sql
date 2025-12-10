-- Adiciona campo para registrar envio de email de encerramento
ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "email_encerramento_enviado_em" timestamp;

-- Comentário para documentação
COMMENT ON COLUMN "candidato_entrevistas"."email_encerramento_enviado_em" IS 'Data/hora em que o email de encerramento foi enviado ao candidato não aprovado';
