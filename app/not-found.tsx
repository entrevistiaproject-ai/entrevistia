import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-secondary/20 p-4 sm:p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Página não encontrada</CardTitle>
          <CardDescription className="text-base mt-2 leading-relaxed">
            O endereço que você acessou não existe ou foi movido.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-6 sm:px-8 pb-8">
          <div className="text-center py-4">
            <p className="text-8xl sm:text-9xl font-bold text-muted-foreground/20">404</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ir para o início
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Acessar minha conta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
