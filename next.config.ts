import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações de runtime
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
