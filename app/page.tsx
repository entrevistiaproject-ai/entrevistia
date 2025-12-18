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
  Code2,
  Target,
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
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Como Funciona
            </a>
            <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Recursos
            </a>
            <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Preços
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/cadastro">
                <span className="hidden sm:inline">Começar Grátis</span>
                <span className="sm:hidden">Criar conta</span>
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header do menu */}
                  <div className="p-6 border-b bg-muted/30">
                    <Logo size="md" />
                  </div>

                  {/* Links de navegação */}
                  <nav className="flex-1 p-4">
                    <div className="space-y-1">
                      <a
                        href="#como-funciona"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <Play className="h-4 w-4" />
                        Como Funciona
                      </a>
                      <a
                        href="#recursos"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <Zap className="h-4 w-4" />
                        Recursos
                      </a>
                      <a
                        href="#precos"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <BarChart3 className="h-4 w-4" />
                        Preços
                      </a>
                    </div>
                  </nav>

                  {/* Botões de ação */}
                  <div className="p-6 border-t bg-muted/30 space-y-3">
                    <Button asChild className="w-full h-11">
                      <Link href="/cadastro">
                        Começar Grátis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full h-11">
                      <Link href="/login">Entrar</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero - Clean, focused on value proposition */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
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
              {/* TODO: Descomentar quando tiver vídeo de marketing
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="#como-funciona">
                  <Play className="mr-2 h-4 w-4" />
                  Ver demonstração
                </Link>
              </Button>
              */}
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
          <div className="max-w-5xl mx-auto mt-6 sm:mt-10 md:mt-16 lg:mt-20">
            {/* Container com escala fixa para mobile - mostra miniatura da versão desktop */}
            {/* Mobile: altura fixa com overflow hidden para centralizar visualmente */}
            <div className="flex justify-center">
              <div className="relative h-[340px] sm:h-auto overflow-hidden sm:overflow-visible flex items-center justify-center">
                <div className="relative origin-center sm:origin-top scale-[0.38] sm:scale-75 md:scale-90 lg:scale-100">
                <div className="relative rounded-2xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden w-[900px]">
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

                {/* Dashboard mockup - Lista de candidatos da entrevista - Layout fixo desktop */}
                <div className="p-6 bg-muted/30">
                  {/* Header da entrevista */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-sm">Analista de Suporte Jr</h3>
                      <p className="text-xs text-muted-foreground">12 candidatos • 8 perguntas</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Ativa</Badge>
                  </div>

                  {/* Cards resumo */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Candidatos", value: "12", icon: Users },
                      { label: "Perguntas", value: "8", icon: FileText },
                      { label: "Duração média", value: "15m", icon: Clock },
                      { label: "Concluídas", value: "9", icon: CheckCircle2 },
                    ].map((stat, i) => (
                      <div key={i} className="bg-background rounded-lg p-3 border">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Lista de candidatos */}
                  <div className="bg-background rounded-lg border overflow-hidden">
                    <div className="px-4 py-3 border-b bg-muted/30 flex items-center justify-between">
                      <p className="text-sm font-medium">Candidatos</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">Todos</Badge>
                      </div>
                    </div>
                    <div className="divide-y">
                      {[
                        { name: "Maria Silva", email: "maria@email.com", score: 92, status: "Concluída", decision: "aprovado" },
                        { name: "João Santos", email: "joao@email.com", score: 78, status: "Concluída", decision: "reprovado" },
                        { name: "Ana Costa", email: "ana@email.com", score: 85, status: "Concluída", decision: null },
                        { name: "Pedro Lima", email: "pedro@email.com", score: null, status: "Em andamento", decision: null },
                      ].map((candidate, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-xs font-semibold text-primary">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{candidate.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{candidate.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {candidate.score !== null && (
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-3.5 w-3.5 text-yellow-500" />
                                <span className={`text-sm font-bold ${candidate.score >= 85 ? 'text-emerald-600' : candidate.score >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                                  {candidate.score}
                                </span>
                              </div>
                            )}
                            {candidate.decision && (
                              <Badge variant={candidate.decision === "aprovado" ? "default" : "destructive"} className={candidate.decision === "aprovado" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
                                {candidate.decision === "aprovado" ? "Aprovado" : "Reprovado"}
                              </Badge>
                            )}
                            <Badge variant={candidate.status === "Concluída" ? "secondary" : "outline"}>
                              {candidate.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { value: "4.500+", label: "perguntas prontas grátis" },
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
      <section id="como-funciona" className="py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8">Simples de usar</Badge>
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
                  title: "Crie a entrevista",
                  desc: "Escolha entre 4.500+ perguntas prontas ou crie as suas. Configure em minutos."
                },
                {
                  icon: Users,
                  title: "Convide candidatos",
                  desc: "Envie o link. Cada candidato responde quando puder, 24/7."
                },
                {
                  icon: BarChart3,
                  title: "Analise resultados",
                  desc: "Receba transcrições, análises e scores. Decida com confiança."
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features - Visual showcase */}
      <section id="recursos" className="py-8 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8">Recursos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tudo que você precisa</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Uma plataforma completa para triagem inteligente
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2.5 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <Mic className="h-6 w-6" />
                  <span className="text-base font-semibold">Entrevistas por áudio</span>
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
                {/* Mobile mockup - Interface real de entrevista */}
                <div className="bg-slate-900 rounded-[2.5rem] p-3 max-w-[280px] mx-auto shadow-2xl">
                  <div className="bg-background rounded-[2rem] overflow-hidden">
                    {/* Barra de progresso do topo */}
                    <div className="bg-muted/30 px-4 py-3 border-b">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Pergunta 2 de 5</span>
                        <span className="text-xs font-bold text-primary">40%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: '40%' }} />
                      </div>
                    </div>
                    <div className="p-5 min-h-[360px] flex flex-col">
                      {/* Pergunta */}
                      <div className="bg-muted/30 rounded-xl p-4 mb-6">
                        <p className="text-sm font-medium leading-relaxed">
                          &ldquo;Como você lida com situações de pressão no trabalho?&rdquo;
                        </p>
                      </div>

                      {/* Timer circular de reflexão */}
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 mb-4">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                            <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted/30" />
                            <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="264" strokeDashoffset="88" className="text-primary" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">30</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mb-4">
                          Use esse tempo para pensar
                        </p>
                        <button className="w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-lg">
                          Estou pronto, começar
                        </button>
                      </div>

                      {/* Info */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Até 3 min por resposta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                {/* Analysis card - Página de avaliação real */}
                <div className="bg-background rounded-2xl border shadow-xl p-5 sm:p-6">
                  {/* Header com recomendação */}
                  <div className="flex items-center gap-4 p-3 mb-5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-700">Recomendado para Próxima Fase</p>
                      <p className="text-xs text-muted-foreground">Recomendação da IA</p>
                    </div>
                  </div>

                  {/* Scores circulares */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="relative w-20 h-20 mx-auto mb-2">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" strokeDasharray="214" strokeDashoffset="17" className="text-emerald-500" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold text-emerald-600">92</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Nota Geral</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="relative w-20 h-20 mx-auto mb-2">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" strokeDasharray="214" strokeDashoffset="32" className="text-emerald-500" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold text-emerald-600">85</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Compatibilidade</p>
                    </div>
                  </div>

                  {/* Pontos fortes e de atenção */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Zap className="h-3.5 w-3.5 text-emerald-600" />
                        <p className="text-xs font-medium">Pontos Fortes</p>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                          <span>Excelente comunicação</span>
                        </li>
                        <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                          <span>Experiência em suporte</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Brain className="h-3.5 w-3.5 text-amber-600" />
                        <p className="text-xs font-medium">Pontos de Atenção</p>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <BarChart3 className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                          <span>Conhecimento técnico</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Competências */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium mb-2">Competências Avaliadas</p>
                    {[
                      { name: "Comunicação", score: 95 },
                      { name: "Resolução de Problemas", score: 88 },
                      { name: "Trabalho em Equipe", score: 90 },
                      { name: "Proatividade", score: 87 },
                      { name: "Conhecimento Técnico", score: 82 },
                      { name: "Adaptabilidade", score: 78 },
                    ].map((comp, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-32 truncate">{comp.name}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full">
                          <div
                            className={`h-2 rounded-full ${comp.score >= 85 ? 'bg-emerald-500' : comp.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${comp.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${comp.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{comp.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2.5 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <Brain className="h-6 w-6" />
                  <span className="text-base font-semibold">Análise com IA</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Decisões baseadas em dados
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Cada resposta é transcrita e analisada por inteligência artificial. Você recebe scores,
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

      {/* Technical Evaluation Section - Key differentiator */}
      <section className="py-16 sm:py-24 relative overflow-hidden border-b">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Diferencial exclusivo</span>
              </div>
            </div>

            {/* Main headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 leading-tight">
              Domine qualquer área técnica{" "}
              <span className="text-primary">com o poder da IA</span>
            </h2>

            {/* Subheadline - Pain point */}
            <p className="text-lg sm:text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto leading-relaxed">
              Java, React, Kubernetes, SAP, AutoCAD, Contabilidade Avançada... Você não precisa dominar nenhum desses temas.
              A IA avalia com profundidade técnica que antes só um especialista conseguiria.
            </p>

            {/* Cards grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Pain card */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xl">😰</span>
                  </div>
                  <h3 className="font-semibold">Antes</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Depender de gestores técnicos ocupados",
                    "Não saber avaliar frameworks e linguagens",
                    "Perder candidatos por demora no processo",
                    "Fazer triagens superficiais por currículo",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="text-red-500 mt-0.5">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution card */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Target className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold">Com EntrevistIA</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "IA avalia conhecimento técnico profundo",
                    "Perguntas específicas para cada tecnologia",
                    "Análise detalhada que você entende",
                    "Decisões embasadas em dados técnicos",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Use cases */}
            <div className="bg-muted/50 rounded-2xl p-6 sm:p-8 border">
              <p className="text-sm text-muted-foreground text-center mb-6">Avalie com confiança profissionais de qualquer área</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Desenvolvedores",
                  "Arquitetos de Software",
                  "DevOps / SRE",
                  "Data Scientists",
                  "Engenheiros",
                  "Contadores",
                  "Analistas Financeiros",
                  "Especialistas SAP",
                ].map((role, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-background rounded-full text-sm border"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote/Testimonial style */}
            <div className="mt-12 text-center">
              <p className="text-xl sm:text-2xl italic max-w-2xl mx-auto">
                &ldquo;Agora consigo avaliar desenvolvedores sênior com confiança,
                mesmo sem saber a diferença entre frontend e backend.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-4">— O que nossos clientes de RH dizem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Simple and clear */}
      <section id="precos" className="py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8">Preços</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pague só pelo que usar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sem mensalidade. Você só paga quando um candidato completar a entrevista.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-8">Pay-per-use</Badge>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Users, text: "Equipes de RH enxutas" },
              { icon: Code2, text: "Vagas técnicas especializadas" },
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
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-700" />

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/90">Comece grátis hoje</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto text-white leading-tight">
            Pronto para transformar seu processo seletivo?
          </h2>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ganhe R$ 50 em créditos para testar. Sem cartão, sem compromisso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/cadastro"
              className="group inline-flex items-center justify-center h-14 px-8 bg-white text-primary font-semibold text-base rounded-xl shadow-2xl shadow-black/25 hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center h-14 px-8 text-white font-medium text-base rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              Já tenho uma conta
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Dados protegidos
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Cancele quando quiser
            </span>
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
                  IA Avançada
                </Badge>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Como Funciona</a>
              <a href="#recursos" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Recursos</a>
              <a href="#precos" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Preços</a>
              <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacidade</Link>
              <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Termos</Link>
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
