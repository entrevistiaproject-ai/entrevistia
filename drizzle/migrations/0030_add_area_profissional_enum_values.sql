-- Migration: Add missing area_profissional enum values
-- This migration adds all the areas that were defined in TypeScript but missing from the database enum

-- Add new enum values to area_profissional
-- PostgreSQL requires using ALTER TYPE to add enum values

ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'saude';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'callcenter';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'logistica';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'engenharia';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'agronegocio';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'educacao';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'hotelaria';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'industria';
ALTER TYPE "area_profissional" ADD VALUE IF NOT EXISTS 'design';
