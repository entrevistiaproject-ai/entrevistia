import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Plus, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EntrevistasEmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[500px] px-4 sm:px-6">
      <Card className="max-w-2xl w-full border-dashed">
        <CardContent className="pt-12 pb-12 px-6 sm:px-10">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Ícone */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900 rounded-full blur-2xl" />
              <div className="relative bg-linear-to-br from-blue-500 to-blue-600 p-7 rounded-2xl shadow-lg">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Título e descrição */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Crie sua primeira entrevista
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Em poucos minutos você terá uma entrevista pronta para enviar aos candidatos.
                A IA cuida da análise, você foca nas decisões.
              </p>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              <div className="flex flex-col items-center p-5 rounded-xl bg-muted/50">
                <Sparkles className="h-6 w-6 text-blue-600 mb-3" />
                <p className="text-sm font-medium">Análise automática</p>
                <p className="text-xs text-muted-foreground mt-1">IA avalia cada resposta</p>
              </div>
              <div className="flex flex-col items-center p-5 rounded-xl bg-muted/50">
                <Briefcase className="h-6 w-6 text-blue-600 mb-3" />
                <p className="text-sm font-medium">Perguntas prontas</p>
                <p className="text-xs text-muted-foreground mt-1">Use nosso banco ou crie</p>
              </div>
              <div className="flex flex-col items-center p-5 rounded-xl bg-muted/50">
                <ArrowRight className="h-6 w-6 text-blue-600 mb-3" />
                <p className="text-sm font-medium">Resultados rápidos</p>
                <p className="text-xs text-muted-foreground mt-1">Veja tudo em minutos</p>
              </div>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="mt-2">
              <Link href="/criar-entrevista">
                <Plus className="mr-2 h-5 w-5" />
                Criar minha primeira entrevista
              </Link>
            </Button>

            {/* Link secundário */}
            <p className="text-sm text-muted-foreground">
              Quer ver as perguntas antes?{" "}
              <Link
                href="/perguntas"
                className="text-blue-600 hover:underline font-medium"
              >
                Explore o banco de perguntas
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
