import { auth } from "@/auth";

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Rotas públicas
  const publicRoutes = ["/", "/login", "/cadastro", "/termos", "/privacidade", "/verificar-email"];
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/api/auth");

  // Se não está logado e tenta acessar rota protegida
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }

  // Se está logado e tenta acessar login/cadastro, redireciona para dashboard
  if (isLoggedIn && (pathname === "/login" || pathname === "/cadastro")) {
    return Response.redirect(new URL("/dashboard", origin));
  }

  return;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
