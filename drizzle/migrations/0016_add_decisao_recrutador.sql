-- Adiciona campos para decisão manual do recrutador (separada da recomendação da IA)
ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "decisao_recrutador" text;
ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "decisao_recrutador_em" timestamp;
ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "decisao_recrutador_observacao" text;

-- Comentários para documentação
COMMENT ON COLUMN "candidato_entrevistas"."decisao_recrutador" IS 'Decisão manual do recrutador: aprovado, reprovado ou null (pendente)';
COMMENT ON COLUMN "candidato_entrevistas"."decisao_recrutador_em" IS 'Data/hora em que o recrutador tomou a decisão';
COMMENT ON COLUMN "candidato_entrevistas"."decisao_recrutador_observacao" IS 'Observação opcional do recrutador sobre a decisão';
