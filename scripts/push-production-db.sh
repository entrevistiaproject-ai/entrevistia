#!/bin/bash

# Script para aplicar migrations no banco de produção
# Uso: DATABASE_URL="sua-url-de-producao" ./scripts/push-production-db.sh

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Erro: DATABASE_URL não definida"
  echo ""
  echo "Para aplicar no banco de produção, use:"
  echo "  DATABASE_URL=\$(vercel env pull --environment=production) npx drizzle-kit push"
  echo ""
  echo "Ou defina manualmente:"
  echo "  export DATABASE_URL='postgresql://user:pass@host/db'"
  echo "  ./scripts/push-production-db.sh"
  exit 1
fi

echo "🚀 Aplicando migrations no banco de produção..."
echo ""
echo "⚠️  ATENÇÃO: Você está prestes a modificar o banco de PRODUÇÃO!"
echo ""
read -p "Deseja continuar? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Operação cancelada"
  exit 0
fi

# Executa drizzle-kit push
npx drizzle-kit push

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Migrations aplicadas com sucesso no banco de produção!"
else
  echo ""
  echo "❌ Erro ao aplicar migrations"
  exit 1
fi
