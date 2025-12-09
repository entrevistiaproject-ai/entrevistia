-- Migration: Add requisitos column to entrevistas table
ALTER TABLE "entrevistas" ADD COLUMN "requisitos" text;
