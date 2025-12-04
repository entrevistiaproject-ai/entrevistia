import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Plus, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EntrevistasEmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Card className="max-w-2xl w-full border-dashed">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Ícone */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Título e descrição */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                Nenhuma entrevista criada ainda
              </h2>
              <p className="text-muted-foreground max-w-md">
                Comece sua jornada de recrutamento criando sua primeira entrevista.
                Configure perguntas personalizadas e encontre os melhores talentos.
              </p>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                <Sparkles className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">IA Avançada</p>
                <p className="text-xs text-muted-foreground">Análise automática</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                <Briefcase className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">Personalizável</p>
                <p className="text-xs text-muted-foreground">Perguntas sob medida</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                <ArrowRight className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">Rápido</p>
                <p className="text-xs text-muted-foreground">Resultados em minutos</p>
              </div>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="mt-4">
              <Link href="/criar-entrevista">
                <Plus className="mr-2 h-5 w-5" />
                Criar Primeira Entrevista
              </Link>
            </Button>

            {/* Link secundário */}
            <p className="text-sm text-muted-foreground">
              Ou{" "}
              <Link
                href="/perguntas"
                className="text-blue-600 hover:underline font-medium"
              >
                explore nosso banco de perguntas
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
