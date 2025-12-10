import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Verifica se é rota do painel admin
  const isAdminRoute = pathname.startsWith("/admin") && !pathname.startsWith("/admin-login");
  const isAdminApiRoute = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth");

  // Trata rotas do admin separadamente
  if (isAdminRoute || isAdminApiRoute) {
    const adminSession = request.cookies.get("admin-session");

    if (!adminSession) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    return NextResponse.next();
  }

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/admin/auth") ||
    publicPrefixes.some(prefix => pathname.startsWith(prefix));

  // Se for rota pública, permite acesso
  if (isPublicRoute) {
    return NextResponse.next();
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

  return NextResponse.next();
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
