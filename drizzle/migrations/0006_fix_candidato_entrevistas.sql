-- Adicionar ID e renomear colunas em candidato_entrevistas
ALTER TABLE "candidato_entrevistas" DROP CONSTRAINT "candidato_entrevistas_candidato_id_entrevista_id_pk";

ALTER TABLE "candidato_entrevistas" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid();

ALTER TABLE "candidato_entrevistas" RENAME COLUMN "iniciou_em" TO "iniciada_em";
ALTER TABLE "candidato_entrevistas" RENAME COLUMN "completou_em" TO "concluida_em";

ALTER TABLE "candidato_entrevistas" ALTER COLUMN "status" SET DEFAULT 'em_andamento';
