import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Garante que as variáveis de ambiente estejam disponíveis no runtime
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  // Configurações de runtime para Edge
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
