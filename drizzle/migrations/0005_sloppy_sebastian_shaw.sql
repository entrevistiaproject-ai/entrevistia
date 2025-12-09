ALTER TABLE "entrevistas" DROP CONSTRAINT "entrevistas_candidato_id_candidatos_id_fk";
--> statement-breakpoint
ALTER TABLE "entrevistas" DROP COLUMN "candidato_id";