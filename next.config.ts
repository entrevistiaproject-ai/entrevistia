import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Configurações de runtime
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Headers de segurança aplicados a todas as rotas
  async headers() {
    return [
      {
        // Aplica a todas as rotas
        source: "/:path*",
        headers: [
          // Previne clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Previne MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controla informações do Referrer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: "accelerometer=(), camera=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(self), payment=(), usb=()",
          },
          // Previne XSS em navegadores antigos
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // DNS Prefetch Control
          {
            key: "X-DNS-Prefetch-Control",
            value: "off",
          },
          // HSTS - apenas em produção
          ...(isDev
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
              ]),
        ],
      },
      {
        // Headers específicos para API
        source: "/api/:path*",
        headers: [
          // Previne caching de dados sensíveis em APIs
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },

  // Configurações de segurança para imagens
  images: {
    // Lista de domínios permitidos para imagens remotas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
    ],
  },

  // Desabilita powered-by header
  poweredByHeader: false,
};

export default nextConfig;
