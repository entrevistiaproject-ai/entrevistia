import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Menu,
  Play,
  Users,
  Mic,
  FileText,
  Brain,
  Sparkles,
  Clock,
} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Clean and minimal */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
          <Link href="/" className="shrink-0">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </a>
            <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/cadastro">Começar Grátis</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <a href="#como-funciona" className="text-lg font-medium py-2">Como Funciona</a>
                <a href="#recursos" className="text-lg font-medium py-2">Recursos</a>
                <a href="#precos" className="text-lg font-medium py-2">Preços</a>
                <hr className="my-4" />
                <Button asChild className="w-full">
                  <Link href="/cadastro">Começar Grátis</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Entrar</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero - Clean, focused on value proposition */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Powered by Claude AI
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Entreviste mais candidatos,{" "}
              <span className="text-primary">gaste menos tempo</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
              A IA conduz entrevistas por áudio, transcreve e analisa cada resposta.
              Você foca apenas nos melhores talentos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/cadastro">
                  Começar grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="#como-funciona">
                  <Play className="mr-2 h-4 w-4" />
                  Ver demonstração
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                R$ 50 em créditos grátis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Pronto em 2 minutos
              </span>
            </div>
          </div>

          {/* Product Preview - Simplified */}
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
            <div className="relative rounded-xl sm:rounded-2xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background rounded px-3 py-1 text-xs text-muted-foreground">
                    app.entrevistia.com.br
                  </div>
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="p-4 sm:p-6 bg-muted/30">
                <div className="grid sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Candidatos", value: "127", color: "text-foreground" },
                    { label: "Em análise", value: "43", color: "text-blue-600" },
                    { label: "Aprovados", value: "24", color: "text-emerald-600" },
                    { label: "Taxa de conversão", value: "19%", color: "text-primary" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-background rounded-lg p-4 border">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-background rounded-lg border overflow-hidden">
                  <div className="px-4 py-3 border-b bg-muted/30">
                    <p className="text-sm font-medium">Candidatos recentes</p>
                  </div>
                  <div className="divide-y">
                    {[
                      { name: "Maria Silva", role: "Analista de Suporte", score: 92, status: "Recomendado" },
                      { name: "João Santos", role: "Atendente", score: 78, status: "Com ressalvas" },
                      { name: "Ana Costa", role: "Analista de Suporte", score: 85, status: "Recomendado" },
                    ].map((candidate, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-semibold text-primary">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{candidate.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={candidate.score >= 85 ? "default" : "secondary"} className={candidate.score >= 85 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                            {candidate.status}
                          </Badge>
                          <div className="text-right hidden sm:block">
                            <p className={`text-lg font-bold ${candidate.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {candidate.score}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Metrics */}
      <section className="py-12 sm:py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "90%", label: "menos tempo em triagem" },
              { value: "~R$ 3", label: "por candidato avaliado" },
              { value: "24/7", label: "disponível para candidatos" },
              { value: "100+", label: "entrevistas simultâneas" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Clean 3 steps */}
      <section id="como-funciona" className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Simples de usar</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Como funciona</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Da criação da entrevista aos resultados em poucos minutos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: FileText,
                  step: "01",
                  title: "Crie a entrevista",
                  desc: "Escolha perguntas do banco ou crie as suas. Configure em minutos."
                },
                {
                  icon: Users,
                  step: "02",
                  title: "Convide candidatos",
                  desc: "Envie o link. Cada candidato responde quando puder, 24/7."
                },
                {
                  icon: BarChart3,
                  step: "03",
                  title: "Analise resultados",
                  desc: "Receba transcrições, análises e scores. Decida com confiança."
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-2">{item.step}</p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features - Visual showcase */}
      <section id="recursos" className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Recursos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tudo que você precisa</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Uma plataforma completa para triagem inteligente
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Mic className="h-5 w-5" />
                  <span className="text-sm font-medium">Entrevistas por áudio</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Candidatos respondem de qualquer lugar
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Interface simples que funciona em qualquer dispositivo. Candidatos gravam
                  respostas em áudio quando for conveniente para eles.
                </p>
                <ul className="space-y-3">
                  {[
                    "Funciona em celular, tablet ou computador",
                    "Candidato responde no próprio tempo",
                    "Interface intuitiva, zero treinamento",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                {/* Mobile mockup */}
                <div className="bg-slate-900 rounded-[2.5rem] p-3 max-w-[280px] mx-auto shadow-2xl">
                  <div className="bg-background rounded-[2rem] overflow-hidden">
                    <div className="bg-primary px-4 py-3">
                      <p className="text-primary-foreground text-sm font-medium text-center">EntrevistIA</p>
                    </div>
                    <div className="p-5 min-h-[380px] flex flex-col">
                      <div className="text-center mb-6">
                        <p className="text-xs text-muted-foreground mb-4">Pergunta 2 de 5</p>
                        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                          <Mic className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="bg-muted/50 rounded-xl p-4 mb-6">
                          <p className="text-sm leading-relaxed">
                            &ldquo;Como você lida com situações de pressão no trabalho?&rdquo;
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <Mic className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                        <p className="text-center text-xs text-muted-foreground mt-4">
                          Toque para gravar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                {/* Analysis card */}
                <div className="bg-background rounded-2xl border shadow-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">MS</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Maria Silva</p>
                      <p className="text-sm text-muted-foreground">Analista de Suporte</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      Recomendado
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-emerald-600">92</p>
                      <p className="text-xs text-muted-foreground mt-1">Score Geral</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600">85</p>
                      <p className="text-xs text-muted-foreground mt-1">Fit com Vaga</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <p className="text-xs font-medium">Análise da IA</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      &ldquo;Candidata demonstrou excelente capacidade de comunicação e experiência sólida
                      em atendimento. Destacou-se na resolução de problemas...&rdquo;
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Brain className="h-5 w-5" />
                  <span className="text-sm font-medium">Análise com IA</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Decisões baseadas em dados
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Cada resposta é transcrita e analisada pela Claude AI. Você recebe scores,
                  pontos fortes, áreas de atenção e recomendação final.
                </p>
                <ul className="space-y-3">
                  {[
                    "Transcrição automática de alta precisão",
                    "Análise de competências por resposta",
                    "Score de compatibilidade com a vaga",
                    "Resumo executivo para decisão rápida",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Simple and clear */}
      <section id="precos" className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Preços</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pague só pelo que usar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sem mensalidade. Você só paga quando um candidato completar a entrevista.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-4">Pay-per-use</Badge>
                  <h3 className="text-2xl font-bold mb-2">Modelo simples</h3>
                  <p className="text-muted-foreground">Sem surpresas, sem taxas escondidas</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl font-bold text-primary">R$ 1</p>
                    <p className="text-sm text-muted-foreground">taxa base</p>
                  </div>
                  <span className="text-2xl text-muted-foreground">+</span>
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl font-bold text-primary">R$ 0,25</p>
                    <p className="text-sm text-muted-foreground">por pergunta</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mb-8">
                  <p className="text-center text-sm">
                    <span className="font-medium">Exemplo:</span> Entrevista com 10 perguntas = <span className="font-bold">R$ 3,50</span> por candidato
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Entrevistas ilimitadas",
                    "Candidatos ilimitados",
                    "Transcrição incluída",
                    "Análise com IA avançada",
                    "Banco de perguntas",
                    "Relatórios completos",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button size="lg" className="w-full sm:w-auto px-12" asChild>
                    <Link href="/cadastro">
                      Começar com R$ 50 grátis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Dá para avaliar até ~15 candidatos de graça
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases - Compact */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Para quem é a EntrevistIA?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Se você precisa entrevistar mais candidatos sem aumentar a equipe
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, text: "Equipes de RH enxutas" },
              { icon: Clock, text: "Vagas com muitos candidatos" },
              { icon: Zap, text: "Processos seletivos urgentes" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg border bg-background">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 max-w-2xl mx-auto">
            Comece a entrevistar de forma mais inteligente
          </h2>
          <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto">
            Crie sua conta, ganhe R$ 50 em créditos e faça sua primeira entrevista hoje
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
              <Link href="/cadastro">
                Criar conta gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-white/30 hover:bg-white/10" asChild>
              <Link href="/login">
                Já tenho conta
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Logo size="md" />
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  LGPD
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Claude AI
                </Badge>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a>
              <a href="#recursos" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
              <a href="#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a>
              <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link>
              <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos</Link>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} EntrevistIA. Feito no Brasil.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
