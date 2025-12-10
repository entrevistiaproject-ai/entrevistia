import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Play,
  Users,
  Mic,
  FileText,
  Brain,
  Sparkles,
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
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <a href="#produto" className="text-sm font-medium hover:text-primary transition-colors">
              Produto
            </a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="#precos" className="text-sm font-medium hover:text-primary transition-colors">
              Preços
            </a>
          </nav>

          {/* Desktop buttons */}
          <div className="hidden sm:flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
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
                  <a href="#produto" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Produto
                  </a>
                  <a href="#como-funciona" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Como Funciona
                  </a>
                  <a href="#precos" className="w-full text-center text-base font-medium hover:bg-muted transition-colors py-3 rounded-lg">
                    Preços
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
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                <Badge variant="secondary" className="px-3 py-1.5 text-xs font-medium">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  Powered by Claude AI
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 text-xs font-medium">
                  <Shield className="h-3 w-3 mr-1.5" />
                  LGPD Compliant
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Entreviste{" "}
                <span className="text-primary relative">
                  10x mais
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 3 150 3 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30"/>
                  </svg>
                </span>{" "}
                candidatos sem aumentar sua equipe
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A IA conduz entrevistas por áudio, transcreve e analisa cada resposta automaticamente.
                Você foca apenas nos melhores talentos.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button size="lg" className="text-base h-12 px-8 shadow-lg shadow-primary/25" asChild>
                  <Link href="/cadastro">
                    Começar grátis agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8" asChild>
                  <Link href="#como-funciona">
                    <Play className="mr-2 h-4 w-4" />
                    Ver como funciona
                  </Link>
                </Button>
              </div>

              {/* Social proof mini */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>R$ 50 em créditos grátis</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Setup em 2 minutos</span>
                </div>
              </div>
            </div>

            {/* Right - Product Preview */}
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="relative bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-2 border border-slate-700">
                <div className="bg-white rounded-xl overflow-hidden">
                  {/* Browser bar */}
                  <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md px-3 py-1 text-xs text-slate-500 w-full max-w-xs">
                        app.entrevistia.com.br
                      </div>
                    </div>
                  </div>
                  {/* Dashboard content mockup */}
                  <div className="p-6 space-y-4 bg-slate-50 min-h-80">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <p className="text-[10px] text-slate-500 mb-1">Candidatos</p>
                        <p className="text-lg font-bold text-slate-900">127</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <p className="text-[10px] text-slate-500 mb-1">Entrevistas</p>
                        <p className="text-lg font-bold text-slate-900">89</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <p className="text-[10px] text-slate-500 mb-1">Aprovados</p>
                        <p className="text-lg font-bold text-emerald-600">24</p>
                      </div>
                    </div>
                    {/* Candidate cards */}
                    <div className="space-y-2">
                      {[
                        { name: "Maria Silva", score: 92, status: "Recomendado" },
                        { name: "João Santos", score: 78, status: "Com ressalvas" },
                        { name: "Ana Costa", score: 85, status: "Recomendado" },
                      ].map((candidate, i) => (
                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm border flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">{candidate.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{candidate.name}</p>
                              <p className="text-[10px] text-slate-500">{candidate.status}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`text-sm font-bold ${candidate.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {candidate.score}
                            </div>
                            <div className={`w-10 h-2 rounded-full bg-slate-200 overflow-hidden`}>
                              <div
                                className={`h-full rounded-full ${candidate.score >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                style={{ width: `${candidate.score}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card - AI Analysis */}
              <div className="absolute -left-4 lg:-left-12 top-1/4 bg-white rounded-xl shadow-xl p-4 border max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold">Análise IA</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  "Candidata demonstrou excelente comunicação e experiência relevante em atendimento."
                </p>
              </div>

              {/* Floating card - Score */}
              <div className="absolute -right-2 lg:-right-8 bottom-1/4 bg-white rounded-xl shadow-xl p-4 border hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90">
                      <circle cx="28" cy="28" r="24" strokeWidth="4" fill="none" className="stroke-slate-200" />
                      <circle cx="28" cy="28" r="24" strokeWidth="4" fill="none" className="stroke-emerald-500" strokeDasharray="150.8" strokeDashoffset="15" strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">92</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-600">Recomendado</p>
                    <p className="text-[10px] text-muted-foreground">Alta compatibilidade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4 text-center">
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">90%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Menos tempo em triagem</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">R$ 3</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Custo médio por candidato</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">24/7</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Candidatos respondem quando quiserem</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">100+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Entrevistas simultâneas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">O problema</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Seu time de RH está sobrecarregado?
            </h2>
            <p className="text-lg text-muted-foreground">
              Entrevistar candidatos consome tempo precioso. Você precisa de uma forma mais inteligente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-600 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-lg">😫</span>
                  </div>
                  <span className="font-semibold">Antes da EntrevistIA</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Horas gastas em calls de triagem",
                    "Conflitos de agenda com candidatos",
                    "Anotações perdidas ou incompletas",
                    "Decisões baseadas em 'feeling'",
                    "Candidatos desistem pela demora",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-red-700">
                      <span className="text-red-400 mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-emerald-600 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-lg">🚀</span>
                  </div>
                  <span className="font-semibold">Com a EntrevistIA</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "IA entrevista 100 candidatos simultaneamente",
                    "Candidatos respondem quando quiserem",
                    "Tudo transcrito e documentado",
                    "Análise objetiva com scores",
                    "Processo ágil, mais candidatos ficam",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-emerald-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Section with Screenshots */}
      <section id="produto" className="py-20 sm:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Conheça a plataforma</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Veja a EntrevistIA em ação
            </h2>
            <p className="text-lg text-muted-foreground">
              Uma plataforma completa para gerenciar todo seu processo seletivo
            </p>
          </div>

          {/* Feature 1 - Create Interview */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Crie entrevistas em minutos</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Monte seu roteiro com perguntas do nosso banco inteligente ou crie as suas.
                Defina competências que deseja avaliar e a IA faz o resto.
              </p>
              <ul className="space-y-3">
                {[
                  "Banco com +100 perguntas prontas por categoria",
                  "Perguntas personalizadas para sua vaga",
                  "Defina competências e critérios de avaliação",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              {/* Screenshot mockup 1 */}
              <div className="bg-white rounded-2xl shadow-xl border p-4">
                <div className="bg-slate-100 rounded-xl p-6 min-h-[300px]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-slate-500">Nova Entrevista</p>
                      <p className="font-semibold text-slate-900">Analista de Suporte</p>
                    </div>
                    <Badge>Rascunho</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Conte sobre sua experiência com atendimento ao cliente",
                      "Como você lida com clientes difíceis?",
                      "Descreva uma situação onde resolveu um problema complexo",
                    ].map((q, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 border flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-primary">{i + 1}</span>
                        </div>
                        <p className="text-sm text-slate-700">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 - Candidate Experience */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 max-w-6xl mx-auto">
            <div>
              {/* Screenshot mockup 2 - Mobile interview */}
              <div className="bg-slate-900 rounded-[2.5rem] p-3 max-w-[280px] mx-auto shadow-2xl">
                <div className="bg-white rounded-4xl overflow-hidden">
                  <div className="bg-primary px-4 py-3">
                    <p className="text-white text-sm font-medium text-center">EntrevistIA</p>
                  </div>
                  <div className="p-4 min-h-[400px] bg-slate-50">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                        <Mic className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-xs text-slate-500">Pergunta 2 de 5</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border mb-4">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        "Como você lida com situações de pressão no trabalho?"
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <Mic className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-3">
                      Toque para gravar sua resposta
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Experiência incrível para candidatos</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Candidatos respondem pelo celular ou computador, quando e onde quiserem.
                Interface simples e acessível que funciona em qualquer dispositivo.
              </p>
              <ul className="space-y-3">
                {[
                  "Funciona em qualquer dispositivo",
                  "Candidato responde no próprio tempo",
                  "Interface intuitiva, sem treinamento",
                  "Feedback imediato sobre andamento",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 - AI Analysis */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Análise completa com IA avançada</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Cada resposta é transcrita e analisada pela Claude AI (Anthropic).
                Você recebe scores, pontos fortes, áreas de atenção e recomendação final.
              </p>
              <ul className="space-y-3">
                {[
                  "Transcrição automática de alta precisão",
                  "Análise de competências por resposta",
                  "Score geral e de fit com a vaga",
                  "Resumo executivo para decisão rápida",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              {/* Screenshot mockup 3 - Analysis */}
              <div className="bg-white rounded-2xl shadow-xl border p-4">
                <div className="bg-slate-50 rounded-xl p-6 min-h-80">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">MS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Maria Silva</p>
                      <p className="text-sm text-slate-500">Analista de Suporte</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        Recomendado
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 -rotate-90">
                          <circle cx="32" cy="32" r="28" strokeWidth="4" fill="none" className="stroke-slate-200" />
                          <circle cx="32" cy="32" r="28" strokeWidth="4" fill="none" className="stroke-emerald-500" strokeDasharray="175.9" strokeDashoffset="14" strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">92</span>
                      </div>
                      <p className="text-xs text-slate-500">Score Geral</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 -rotate-90">
                          <circle cx="32" cy="32" r="28" strokeWidth="4" fill="none" className="stroke-slate-200" />
                          <circle cx="32" cy="32" r="28" strokeWidth="4" fill="none" className="stroke-blue-500" strokeDasharray="175.9" strokeDashoffset="26" strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">85</span>
                      </div>
                      <p className="text-xs text-slate-500">Fit com Vaga</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border">
                    <p className="text-xs font-medium text-slate-500 mb-2">Resumo da IA</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "Candidata demonstrou excelente capacidade de comunicação e experiência sólida em atendimento.
                      Destacou-se na resolução de problemas..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section id="como-funciona" className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Simples e rápido</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Como funciona em 3 passos
            </h2>
            <p className="text-lg text-muted-foreground">
              Da criação da entrevista aos resultados em poucos minutos
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-primary/20 via-primary to-primary/20" />

              {[
                {
                  step: 1,
                  icon: FileText,
                  title: "Crie sua entrevista",
                  description: "Escolha perguntas do banco ou crie as suas. Configure competências e está pronto.",
                  time: "2 min"
                },
                {
                  step: 2,
                  icon: Users,
                  title: "Convide candidatos",
                  description: "Envie o link por email ou WhatsApp. Cada um responde quando puder, 24/7.",
                  time: "1 min"
                },
                {
                  step: 3,
                  icon: BarChart3,
                  title: "Veja os resultados",
                  description: "Receba transcrições, análises e scores. Decida quem avança com confiança.",
                  time: "Automático"
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="relative z-10 mx-auto mb-6 w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="outline" className="mb-3">{item.time}</Badge>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-slate-50">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4">Benefícios</Badge>
          <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            O que você ganha com a EntrevistIA?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Contrate melhor gastando menos tempo e dinheiro
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card className="p-2 border-0 shadow-lg">
            <CardContent className="pt-6">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Recupere seu tempo</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Pare de gastar horas em calls de triagem. A IA faz as perguntas iniciais e você só
                conversa com quem realmente importa.
              </p>
            </CardContent>
          </Card>

          <Card className="p-2 border-0 shadow-lg">
            <CardContent className="pt-6">
              <DollarSign className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Custo previsível</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Pague apenas quando um candidato completar a entrevista. Sem mensalidades,
                sem surpresas na fatura.
              </p>
            </CardContent>
          </Card>

          <Card className="p-2 border-0 shadow-lg">
            <CardContent className="pt-6">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Sem conflito de agenda</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Candidatos respondem quando puderem: de manhã, à noite, fim de semana.
                Você não precisa bloquear horário na sua agenda.
              </p>
            </CardContent>
          </Card>

          <Card className="p-2 border-0 shadow-lg">
            <CardContent className="pt-6">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Escale sem contratar</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Entreviste 10, 50 ou 200 candidatos ao mesmo tempo.
                Todas as respostas chegam analisadas e prontas para você decidir.
              </p>
            </CardContent>
          </Card>

          <Card className="p-2 border-0 shadow-lg">
            <CardContent className="pt-6">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Decisões embasadas</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Cada resposta vem com análise de competências, pontos fortes e score de compatibilidade.
                Chega de depender só do &ldquo;feeling&rdquo;.
              </p>
            </CardContent>
          </Card>

          <Card className="p-2 border-0 shadow-lg">
            <CardContent className="pt-6">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Tudo documentado</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Áudios, transcrições e análises ficam salvos. Perfeito para auditorias,
                revisões com gestores e histórico do processo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4">Preços transparentes</Badge>
          <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Preço justo: pague só pelo que usar
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Sem mensalidade. Você só paga quando um candidato completar a entrevista.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Modelo de Preço Principal */}
          <Card className="border-2 border-primary mb-10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <Badge className="mb-4">Pay-per-Use</Badge>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Pague por entrevista concluída</h3>
                <p className="text-muted-foreground">Sem surpresas, sem taxas escondidas</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8">
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-primary">R$ 1,00</p>
                  <p className="text-sm text-muted-foreground mt-1">taxa base por candidato</p>
                </div>
                <span className="text-2xl text-muted-foreground">+</span>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-primary">R$ 0,25</p>
                  <p className="text-sm text-muted-foreground mt-1">por pergunta analisada</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-5 mb-8">
                <p className="text-sm font-medium mb-3 text-center">Fórmula simples:</p>
                <p className="text-lg font-mono bg-background rounded px-4 py-2.5 inline-block w-full text-center">
                  Custo = R$ 1,00 + (perguntas × R$ 0,25)
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center mb-8">
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1.5">5 perguntas</p>
                  <p className="text-xl font-bold">R$ 2,25</p>
                  <p className="text-xs text-muted-foreground mt-1">por candidato</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1.5">10 perguntas</p>
                  <p className="text-xl font-bold">R$ 3,50</p>
                  <p className="text-xs text-muted-foreground mt-1">por candidato</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1.5">15 perguntas</p>
                  <p className="text-xl font-bold">R$ 4,75</p>
                  <p className="text-xs text-muted-foreground mt-1">por candidato</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-xs text-muted-foreground mb-1.5">20 perguntas</p>
                  <p className="text-xl font-bold">R$ 6,00</p>
                  <p className="text-xs text-muted-foreground mt-1">por candidato</p>
                </div>
              </div>

              {/* O que está incluído */}
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Criar entrevistas", desc: "Ilimitado e gratuito" },
                  { title: "Criar perguntas", desc: "Ilimitado e gratuito" },
                  { title: "Candidatos ilimitados", desc: "Sem limite por vaga" },
                  { title: "Transcrição de áudio", desc: "Incluída na análise" },
                  { title: "Análise com IA avançada", desc: "Claude AI (Anthropic)" },
                  { title: "Relatórios detalhados", desc: "Competências e insights" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Free Trial */}
          <div className="text-center p-8 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Oferta especial</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Ganhe R$ 50 em créditos ao criar sua conta</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Teste sem compromisso. Dá para avaliar até 15 candidatos de graça.
            </p>
            <Button asChild size="lg" className="shadow-lg shadow-primary/25">
              <Link href="/cadastro">
                Criar conta e ganhar créditos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-secondary/30 py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4">Casos de uso</Badge>
            <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Feito para quem precisa contratar mais rápido
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Veja se a EntrevistIA resolve o seu problema
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
            {[
              "Equipes de RH enxutas que precisam entrevistar dezenas de candidatos",
              "Vagas com muitos candidatos onde não dá pra falar com todo mundo",
              "Contratação remota: candidatos de qualquer lugar respondem quando puderem",
              "Processos seletivos que precisam de padronização e documentação",
              "Consultorias e recrutadores que querem entregar mais com menos esforço",
            ].map((useCase, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border bg-card p-5 sm:p-6 transition-colors hover:bg-muted/50">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-primary mt-0.5" />
                <p className="text-sm sm:text-base text-card-foreground leading-relaxed">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 sm:py-24 lg:py-32 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Comece a entrevistar de um jeito mais inteligente
            </h2>
            <p className="mb-10 text-base sm:text-lg opacity-90 leading-relaxed">
              Crie sua conta, ganhe créditos grátis e faça sua primeira entrevista hoje
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-10">
              <Button size="lg" variant="secondary" className="text-base h-14 px-10 shadow-lg" asChild>
                <Link href="/cadastro">
                  Criar conta gratuita <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-10 bg-transparent border-white/30 hover:bg-white/10" asChild>
                <Link href="/login">
                  Já tenho conta
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm opacity-80">
              <span className="flex items-center gap-2">
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
      <footer className="border-t bg-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-5">
                <Logo size="md" />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Entrevistas por IA para equipes que precisam contratar rápido e com qualidade.
              </p>
              <div className="flex gap-3">
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
            <div>
              <h3 className="mb-5 font-semibold">Produto</h3>
              <ul className="space-y-3.5 text-sm">
                <li><a href="#produto" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a></li>
                <li><a href="#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 font-semibold">Empresa</h3>
              <ul className="space-y-3.5 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 font-semibold">Legal</h3>
              <ul className="space-y-3.5 text-sm">
                <li><Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} EntrevistIA. Todos os direitos reservados.</p>
            <p>Feito com dedicação no Brasil</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
