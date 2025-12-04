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
  BarChart3
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold text-primary">EntrevistIA</span>
          </div>
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
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">
              ✨ Inteligência Artificial a serviço do seu talento humano
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Transforme Suas Entrevistas com{" "}
            <span className="text-primary">Inteligência Artificial</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
            Automatize o filtro inicial de candidatos, economize tempo e contrate os melhores talentos
            com análise inteligente de IA.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link href="/dashboard">
                Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <Link href="#como-funciona">Ver Como Funciona</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            ✓ Sem cartão de crédito ✓ Configuração em 2 minutos ✓ Suporte em português
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">90%</p>
              <p className="text-sm text-muted-foreground">Redução de tempo</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">70%</p>
              <p className="text-sm text-muted-foreground">Economia de custos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Disponibilidade</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground">Candidatos simultâneos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Por que usar o EntrevistIA?
          </h2>
          <p className="text-lg text-muted-foreground">
            Economize tempo, reduza custos e melhore a qualidade das suas contratações
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <section id="como-funciona" className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Comece a entrevistar em 3 passos simples
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Crie sua Entrevista</h3>
                <p className="text-muted-foreground">
                  Configure as perguntas para a vaga em menos de 2 minutos
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Envie o Link</h3>
                <p className="text-muted-foreground">
                  Compartilhe o link temporário com seus candidatos por email
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Receba Análises</h3>
                <p className="text-muted-foreground">
                  A IA analisa e pontua as respostas automaticamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="casos-de-uso" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Casos de Uso Ideais
          </h2>
          <p className="text-lg text-muted-foreground">
            Perfeito para diversos cenários de recrutamento
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {[
            "Startups e PMEs que precisam maximizar resultados com equipes enxutas",
            "Vagas com alto volume de candidatos para filtrar rapidamente",
            "Contratação remota para avaliar talentos de qualquer parte do mundo",
            "Processos seletivos estruturados que exigem consistência e qualidade",
            "Recrutamento terceirizado para oferecer mais valor aos clientes",
          ].map((useCase, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
              <p className="text-card-foreground">{useCase}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto para Transformar Suas Entrevistas?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Junte-se a centenas de empresas que já economizam tempo e contratam melhor
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="text-lg" asChild>
                <Link href="/dashboard">
                  Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              <Zap className="inline h-4 w-4" /> Configuração instantânea • Sem cartão de crédito • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary" />
                <span className="text-lg font-bold">EntrevistIA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Inteligência artificial a serviço do seu talento humano.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#beneficios" className="text-muted-foreground hover:text-foreground">Benefícios</a></li>
                <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground">Como Funciona</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Sobre</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EntrevistIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
