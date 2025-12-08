import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  try {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Rotas públicas
    const publicRoutes = ["/", "/login", "/cadastro", "/termos", "/privacidade", "/verificar-email"];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/api/auth");

    // Se não está logado e tenta acessar rota protegida
    if (!isPublicRoute && !isLoggedIn) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Se está logado e tenta acessar login/cadastro, redireciona para dashboard
    if (isLoggedIn && (pathname === "/login" || pathname === "/cadastro")) {
      const dashboardUrl = req.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      dashboardUrl.search = "";
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware] Error:", error);
    return NextResponse.next();
  }
});

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
