import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  // Rotas públicas
  const publicRoutes = ["/", "/login", "/cadastro", "/termos", "/privacidade", "/verificar-email"];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname) || req.nextUrl.pathname.startsWith("/api/auth");

  // Se não está logado e tenta acessar rota protegida
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  // Se está logado e tenta acessar login/cadastro, redireciona para home
  if (isLoggedIn && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/cadastro")) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return Response.redirect(homeUrl);
  }

  return;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
