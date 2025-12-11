import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getSecurityHeaders } from "@/lib/security/headers";
import { checkRateLimit, getClientIP, createRateLimitKey, getRateLimitHeaders } from "@/lib/security/rate-limit";

// Usa Node.js runtime ao invés do Edge Runtime limitado
// Necessário para funcionalidades como Map, setInterval no rate-limit
export const runtime = "nodejs";

// Secret para verificação do JWT admin
const ADMIN_JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || process.env.AUTH_SECRET || "admin-secret-key-change-in-production"
);

/**
 * Verifica se o token JWT admin é válido
 */
async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, ADMIN_JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Aplica headers de segurança em todas as respostas
  const securityHeaders = getSecurityHeaders({
    isDevelopment: process.env.NODE_ENV === "development",
  });

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    "/",
    "/login",
    "/cadastro",
    "/termos",
    "/privacidade",
    "/verificar-email",
    "/auth-error",
    "/admin-login",
  ];

  // Rotas públicas que começam com determinados prefixos (para candidatos)
  const publicPrefixes = [
    "/convite/",
    "/entrevista/",
    "/api/convite/",
    "/api/entrevista-publica/",
  ];

  // Rotas de autenticação com rate limiting mais rigoroso
  const authRoutes = [
    "/api/auth/login",
    "/api/auth/cadastro",
    "/api/auth/verificar-codigo",
    "/api/auth/reenviar-codigo",
    "/api/admin/auth/login",
  ];

  // Aplica rate limiting em rotas de autenticação
  if (authRoutes.some(route => pathname.startsWith(route))) {
    const clientIP = getClientIP(request);
    let rateLimitKey: string;
    let configKey: "login" | "signup" | "verification" | "adminLogin";

    if (pathname.includes("/admin/")) {
      rateLimitKey = createRateLimitKey("admin-auth", clientIP);
      configKey = "adminLogin";
    } else if (pathname.includes("/cadastro")) {
      rateLimitKey = createRateLimitKey("signup", clientIP);
      configKey = "signup";
    } else if (pathname.includes("/verificar") || pathname.includes("/reenviar")) {
      rateLimitKey = createRateLimitKey("verification", clientIP);
      configKey = "verification";
    } else {
      rateLimitKey = createRateLimitKey("login", clientIP);
      configKey = "login";
    }

    const rateLimitResult = checkRateLimit(rateLimitKey, configKey);

    // Adiciona headers de rate limit
    const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);
    for (const [key, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(key, value);
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas tentativas. Por favor, aguarde antes de tentar novamente.",
          retryAfter: rateLimitResult.retryAfter,
          resetAt: rateLimitResult.resetAt.toISOString(),
        },
        {
          status: 429,
          headers: {
            ...Object.fromEntries(response.headers),
            "Retry-After": String(rateLimitResult.retryAfter),
          },
        }
      );
    }
  }

  // Verifica se é rota do painel admin
  const isAdminRoute = pathname.startsWith("/admin") && !pathname.startsWith("/admin-login");
  const isAdminApiRoute = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth");

  // Trata rotas do admin separadamente com validação de JWT
  if (isAdminRoute || isAdminApiRoute) {
    const adminSession = request.cookies.get("admin-session");

    if (!adminSession?.value) {
      if (isAdminApiRoute) {
        return NextResponse.json(
          { error: "Não autorizado" },
          { status: 401, headers: Object.fromEntries(response.headers) }
        );
      }
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    // Valida o token JWT
    const isValidToken = await verifyAdminToken(adminSession.value);

    if (!isValidToken) {
      // Token inválido - limpa o cookie e redireciona
      const redirectResponse = isAdminApiRoute
        ? NextResponse.json(
            { error: "Sessão expirada ou inválida" },
            { status: 401, headers: Object.fromEntries(response.headers) }
          )
        : NextResponse.redirect(new URL("/admin-login", request.url));

      redirectResponse.cookies.delete("admin-session");
      return redirectResponse;
    }

    return response;
  }

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/admin/auth") ||
    publicPrefixes.some(prefix => pathname.startsWith(prefix));

  // Se for rota pública, permite acesso
  if (isPublicRoute) {
    return response;
  }

  // Verifica se tem sessão através do cookie
  const sessionToken = request.cookies.get("authjs.session-token") ||
                       request.cookies.get("__Secure-authjs.session-token");

  // Se não tem sessão e está tentando acessar rota protegida
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se tem sessão e está tentando acessar login/cadastro
  if (sessionToken && (pathname === "/login" || pathname === "/cadastro")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
