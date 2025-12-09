import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Menu,
  Building2
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">EntrevistIA</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <a href="#beneficios" className="text-sm font-medium hover:text-primary transition-colors">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="#casos-de-uso" className="text-sm font-medium hover:text-primary transition-colors">
              Casos de Uso
            </a>
          </nav>

          {/* Desktop buttons */}
          <div className="hidden sm:flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/cadastro">Começar Grátis</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="sm:hidden flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="touch-icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    EntrevistIA
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  <a href="#beneficios" className="text-lg font-medium hover:text-primary transition-colors py-2">
                    Benefícios
                  </a>
                  <a href="#como-funciona" className="text-lg font-medium hover:text-primary transition-colors py-2">
                    Como Funciona
                  </a>
                  <a href="#casos-de-uso" className="text-lg font-medium hover:text-primary transition-colors py-2">
                    Casos de Uso
                  </a>
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <Button asChild className="w-full" size="touch">
                      <Link href="/cadastro">Começar Grátis</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">
              ✨ Inteligência Artificial a serviço do seu talento humano
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Transforme Suas Entrevistas com{" "}
            <span className="text-primary">Inteligência Artificial</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto">
            Automatize o filtro inicial de candidatos, economize tempo e contrate os melhores talentos
            com análise inteligente de IA.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="touch" className="text-base sm:text-lg" asChild>
              <Link href="/cadastro">
                Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="touch" variant="outline" className="text-base sm:text-lg" asChild>
              <Link href="#como-funciona">Ver Como Funciona</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Configuração em 2 min
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Suporte em português
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-background py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">90%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Redução de tempo</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">70%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Economia de custos</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">24/7</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Disponibilidade</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">100+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Candidatos simultâneos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Por que usar o EntrevistIA?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Economize tempo, reduza custos e melhore a qualidade das suas contratações
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Economia de Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Automatize o filtro inicial de candidatos e foque apenas na seleção final dos melhores talentos.
                Economize horas preciosas de entrevistas presenciais.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <DollarSign className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Reduza Custos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Elimine múltiplas rodadas iniciais de entrevistas. Pague apenas pela análise das respostas –
                uma fração do custo de mobilizar sua equipe de RH.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Flexibilidade Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Candidatos respondem quando e onde quiserem. Sem conflitos de agenda, sem fusos horários,
                sem limitações geográficas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Escale Infinitamente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Avalie 10, 50 ou 100 candidatos simultaneamente. Receba todas as respostas organizadas
                e analisadas automaticamente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Análise Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                IA analisa cada resposta identificando competências-chave, pontos fortes e fornece
                insights valiosos para sua decisão.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Compliance e Documentação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Todas as respostas ficam gravadas e transcritas. Perfeito para auditorias, revisões
                futuras e requisitos legais.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="bg-secondary/30 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Como Funciona
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Comece a entrevistar em 3 passos simples
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Crie sua Entrevista</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Configure as perguntas para a vaga em menos de 2 minutos
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Envie o Link</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Compartilhe o link temporário com seus candidatos por email
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Receba Análises</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  A IA analisa e pontua as respostas automaticamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="casos-de-uso" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Casos de Uso Ideais
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Perfeito para diversos cenários de recrutamento
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          {[
            "Startups e PMEs que precisam maximizar resultados com equipes enxutas",
            "Vagas com alto volume de candidatos para filtrar rapidamente",
            "Contratação remota para avaliar talentos de qualquer parte do mundo",
            "Processos seletivos estruturados que exigem consistência e qualidade",
            "Recrutamento terceirizado para oferecer mais valor aos clientes",
          ].map((useCase, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-primary mt-0.5" />
              <p className="text-sm sm:text-base text-card-foreground">{useCase}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 sm:py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Pronto para Transformar Suas Entrevistas?
            </h2>
            <p className="mb-8 text-base sm:text-lg opacity-90">
              Junte-se a centenas de empresas que já economizam tempo e contratam melhor
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="touch" variant="secondary" className="text-base sm:text-lg" asChild>
                <Link href="/cadastro">
                  Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm opacity-75">
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Configuração instantânea
              </span>
              <span>•</span>
              <span>Sem cartão de crédito</span>
              <span>•</span>
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold">EntrevistIA</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Inteligência artificial a serviço do seu talento humano.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Produto</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">Benefícios</a></li>
                <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Empresa</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} EntrevistIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
