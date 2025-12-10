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
} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <a href="#beneficios" className="text-sm font-medium hover:text-primary transition-colors">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="#precos" className="text-sm font-medium hover:text-primary transition-colors">
              Preços
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="touch-icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto pt-12">
                <nav className="flex flex-col items-center gap-1">
                  <a href="#beneficios" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Benefícios
                  </a>
                  <a href="#como-funciona" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Como Funciona
                  </a>
                  <a href="#precos" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Preços
                  </a>
                  <a href="#casos-de-uso" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Casos de Uso
                  </a>
                  <div className="w-full mt-4 pt-4 border-t space-y-3">
                    <Button asChild className="w-full" size="touch">
                      <Link href="/cadastro">Começar Grátis</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full" size="touch">
                      <Link href="/login">Entrar</Link>
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
              Recrutamento inteligente para equipes que crescem rápido
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Entreviste 10x mais candidatos{" "}
            <span className="text-primary">sem aumentar sua equipe</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto">
            A IA conduz entrevistas por áudio, transcreve e analisa cada resposta.
            Você foca apenas nos melhores talentos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="touch" className="text-base sm:text-lg" asChild>
              <Link href="/cadastro">
                Criar conta gratuita <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="touch" variant="outline" className="text-base sm:text-lg" asChild>
              <Link href="#como-funciona">Ver demonstração</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              R$ 50 em créditos grátis
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Primeira entrevista em 2 min
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Sem cartão de crédito
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
              <p className="text-xs sm:text-sm text-muted-foreground">Menos tempo em triagem</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">R$ 3</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Custo médio por candidato</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">24/7</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Candidatos respondem quando quiserem</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-primary">100+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Entrevistas simultâneas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            O que você ganha com a EntrevistIA?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Contrate melhor gastando menos tempo e dinheiro
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Recupere seu tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pare de gastar horas em calls de triagem. A IA faz as perguntas iniciais e você só
                conversa com quem realmente importa.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <DollarSign className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Custo previsível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pague apenas quando um candidato completar a entrevista. Sem mensalidades,
                sem surpresas na fatura.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Sem conflito de agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Candidatos respondem quando puderem: de manhã, à noite, fim de semana.
                Você não precisa bloquear horário na sua agenda.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Escale sem contratar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Entreviste 10, 50 ou 200 candidatos ao mesmo tempo.
                Todas as respostas chegam analisadas e prontas para você decidir.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Decisões embasadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cada resposta vem com análise de competências, pontos fortes e score de compatibilidade.
                Chega de depender só do "feeling".
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Tudo documentado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Áudios, transcrições e análises ficam salvos. Perfeito para auditorias,
                revisões com gestores e histórico do processo.
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
              Como funciona na prática
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Da criação da vaga aos resultados em 3 passos
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Monte sua entrevista</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Escolha perguntas do nosso banco ou crie as suas. Pronto em 2 minutos.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Convide candidatos</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Envie o link por email ou importe uma lista. Cada um responde no seu tempo.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-xl sm:text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Receba os resultados</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Veja transcrições, análises e scores. Decida quem avança com confiança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Preço justo: pague só pelo que usar
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Sem mensalidade. Você só paga quando um candidato completar a entrevista.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Modelo de Preço Principal */}
          <Card className="border-2 border-primary mb-8">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-2 inline-block rounded-full bg-primary/10 px-4 py-1">
                <span className="text-sm font-medium text-primary">Pay-per-Use</span>
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Pague por entrevista concluída</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-primary">R$ 1,00</p>
                  <p className="text-sm text-muted-foreground">taxa base por candidato</p>
                </div>
                <span className="text-2xl text-muted-foreground">+</span>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-primary">R$ 0,25</p>
                  <p className="text-sm text-muted-foreground">por pergunta analisada</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-2">Fórmula simples:</p>
                <p className="text-lg font-mono bg-background rounded px-3 py-2 inline-block">
                  Custo = R$ 1,00 + (perguntas × R$ 0,25)
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">5 perguntas</p>
                  <p className="text-lg font-bold">R$ 2,25</p>
                  <p className="text-xs text-muted-foreground">por candidato</p>
                </div>
                <div className="p-3 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">10 perguntas</p>
                  <p className="text-lg font-bold">R$ 3,50</p>
                  <p className="text-xs text-muted-foreground">por candidato</p>
                </div>
                <div className="p-3 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">15 perguntas</p>
                  <p className="text-lg font-bold">R$ 4,75</p>
                  <p className="text-xs text-muted-foreground">por candidato</p>
                </div>
                <div className="p-3 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">20 perguntas</p>
                  <p className="text-lg font-bold">R$ 6,00</p>
                  <p className="text-xs text-muted-foreground">por candidato</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* O que está incluído */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Criar entrevistas</p>
                <p className="text-sm text-muted-foreground">Ilimitado e gratuito</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Criar perguntas</p>
                <p className="text-sm text-muted-foreground">Ilimitado e gratuito</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Candidatos ilimitados</p>
                <p className="text-sm text-muted-foreground">Sem limite por vaga</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Transcrição de áudio</p>
                <p className="text-sm text-muted-foreground">Incluída na análise</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Análise com IA avançada</p>
                <p className="text-sm text-muted-foreground">Claude AI (Anthropic)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Relatórios detalhados</p>
                <p className="text-sm text-muted-foreground">Competências e insights</p>
              </div>
            </div>
          </div>

          {/* Free Trial */}
          <div className="text-center p-6 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5">
            <h3 className="text-lg font-semibold mb-2">Ganhe R$ 50 em créditos ao criar sua conta</h3>
            <p className="text-muted-foreground mb-4">
              Teste sem compromisso. Dá para avaliar até 15 candidatos de graça.
            </p>
            <Button asChild>
              <Link href="/cadastro">
                Criar conta e ganhar créditos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="casos-de-uso" className="bg-secondary/30 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Feito para quem precisa contratar mais rápido
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Veja se a EntrevistIA resolve o seu problema
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
            {[
              "Equipes de RH enxutas que precisam entrevistar dezenas de candidatos",
              "Vagas com muitos candidatos onde não dá pra falar com todo mundo",
              "Contratação remota: candidatos de qualquer lugar respondem quando puderem",
              "Processos seletivos que precisam de padronização e documentação",
              "Consultorias e recrutadores que querem entregar mais com menos esforço",
            ].map((useCase, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-primary mt-0.5" />
                <p className="text-sm sm:text-base text-card-foreground">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 sm:py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Comece a entrevistar de um jeito mais inteligente
            </h2>
            <p className="mb-8 text-base sm:text-lg opacity-90">
              Crie sua conta, ganhe créditos grátis e faça sua primeira entrevista hoje
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="touch" variant="secondary" className="text-base sm:text-lg" asChild>
                <Link href="/cadastro">
                  Criar conta gratuita <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm opacity-75">
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Pronto em 2 minutos
              </span>
              <span>•</span>
              <span>R$ 50 em créditos grátis</span>
              <span>•</span>
              <span>Sem cartão de crédito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <Logo size="md" />
              </Link>
              <p className="text-sm text-muted-foreground">
                Entrevistas por IA para equipes que precisam contratar rápido.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Produto</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">Benefícios</a></li>
                <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a></li>
                <li><a href="#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
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
