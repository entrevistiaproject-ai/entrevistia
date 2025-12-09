"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Download,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

// Mock data - substituir por dados reais da API
const mockCandidato = {
  id: "1",
  nome: "Ana Carolina Silva",
  email: "ana.silva@email.com",
  cargo: "Desenvolvedora Full Stack Sênior",
  dataEntrevista: "2025-12-05T14:30:00",
  duracao: "32 minutos",
};

const mockResultado = {
  scoreGeral: 82,
  recomendacao: "aprovar",
  resumo: "Candidata demonstrou excelente domínio técnico e forte capacidade de comunicação. Experiência sólida em desenvolvimento full stack com foco em React e Node.js. Apresentou bom raciocínio lógico e capacidade analítica acima da média. Soft skills bem desenvolvidas, especialmente trabalho em equipe e proatividade.",
  pontosFortes: [
    "Domínio técnico excepcional em JavaScript/TypeScript e ecossistema React",
    "Excelente capacidade de comunicação e clareza na expressão de ideias complexas",
    "Forte proatividade e senso de dono demonstrados em projetos anteriores",
    "Boa adaptabilidade e abertura para aprender novas tecnologias",
    "Experiência prática com metodologias ágeis e trabalho em equipe",
  ],
  pontosFracos: [
    "Conhecimento limitado em infraestrutura cloud (AWS/GCP)",
    "Pouca experiência com testes automatizados end-to-end",
    "Pode melhorar habilidades de liderança técnica e mentoria",
  ],
  justificativaInterna: "Candidata apresenta perfil técnico muito forte e fit cultural excelente. Apesar de algumas lacunas em cloud e testes, demonstrou grande capacidade de aprendizado. Recomendo fortemente para próxima fase. Considerar para posição sênior com potencial de crescimento para tech lead em 12-18 meses. Salário sugerido: R$ 12-14k.",
};

const competenciasSelecionadas = [
  // Habilidades Técnicas
  { nome: "Conhecimento Técnico", categoria: "Habilidades Técnicas", nota: 88, descricao: "Domínio de ferramentas e tecnologias da função" },
  { nome: "Resolução de Problemas", categoria: "Habilidades Técnicas", nota: 85, descricao: "Raciocínio lógico e analítico" },
  { nome: "Qualidade do Trabalho", categoria: "Habilidades Técnicas", nota: 78, descricao: "Atenção aos detalhes e precisão" },
  { nome: "Capacidade de Aprendizado", categoria: "Habilidades Técnicas", nota: 82, descricao: "Velocidade e facilidade para aprender" },

  // Comunicação
  { nome: "Clareza na Comunicação", categoria: "Comunicação", nota: 90, descricao: "Expressão verbal e escrita clara" },
  { nome: "Escuta Ativa", categoria: "Comunicação", nota: 85, descricao: "Compreensão e atenção ao interlocutor" },
  { nome: "Capacidade de Síntese", categoria: "Comunicação", nota: 87, descricao: "Resumir ideias complexas objetivamente" },

  // Atitude & Iniciativa
  { nome: "Proatividade", categoria: "Atitude & Iniciativa", nota: 88, descricao: "Iniciativa própria e antecipação" },
  { nome: "Senso de Dono", categoria: "Atitude & Iniciativa", nota: 85, descricao: "Responsabilidade e comprometimento" },
  { nome: "Autonomia", categoria: "Atitude & Iniciativa", nota: 83, descricao: "Capacidade de trabalhar independentemente" },

  // Adaptabilidade
  { nome: "Flexibilidade", categoria: "Adaptabilidade", nota: 80, descricao: "Adaptação a mudanças e novos contextos" },
  { nome: "Gestão de Pressão", categoria: "Adaptabilidade", nota: 75, descricao: "Performance sob prazos e desafios" },
  { nome: "Abertura a Feedback", categoria: "Adaptabilidade", nota: 82, descricao: "Receptividade e aplicação de feedback" },

  // Colaboração
  { nome: "Trabalho em Equipe", categoria: "Colaboração", nota: 85, descricao: "Cooperação e sinergia com colegas" },
  { nome: "Compartilhamento", categoria: "Colaboração", nota: 82, descricao: "Troca de conhecimento e experiências" },

  // Motivação & Engajamento
  { nome: "Interesse pela Vaga", categoria: "Motivação & Engajamento", nota: 90, descricao: "Genuíno interesse e alinhamento com oportunidade" },
  { nome: "Energia e Entusiasmo", categoria: "Motivação & Engajamento", nota: 87, descricao: "Motivação e disposição demonstradas" },
];

const categorias = Array.from(new Set(competenciasSelecionadas.map(c => c.categoria)));

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBgColor = (score: number) => {
  if (score >= 85) return "bg-green-100";
  if (score >= 70) return "bg-yellow-100";
  return "bg-red-100";
};

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Excelente";
  if (score >= 70) return "Bom";
  if (score >= 50) return "Regular";
  return "Insuficiente";
};

const getRecomendacaoConfig = (recomendacao: string) => {
  switch (recomendacao) {
    case "aprovar":
      return {
        label: "Recomendado para Próxima Fase",
        icon: CheckCircle2,
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-700",
        iconColor: "text-green-600",
      };
    case "rejeitar":
      return {
        label: "Não Recomendado",
        icon: XCircle,
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-700",
        iconColor: "text-red-600",
      };
    default:
      return {
        label: "Análise Pendente",
        icon: AlertCircle,
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-700",
        iconColor: "text-yellow-600",
      };
  }
};

export default function ResultadoCandidatoPage() {
  const params = useParams();
  const router = useRouter();
  const [mostrarJustificativa, setMostrarJustificativa] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("todas");

  const recomendacaoConfig = getRecomendacaoConfig(mockResultado.recomendacao);
  const RecomendacaoIcon = recomendacaoConfig.icon;

  const competenciasFiltradas = categoriaSelecionada === "todas"
    ? competenciasSelecionadas
    : competenciasSelecionadas.filter(c => c.categoria === categoriaSelecionada);

  const mediaPorCategoria = categorias.reduce((acc, categoria) => {
    const comps = competenciasSelecionadas.filter(c => c.categoria === categoria);
    const media = comps.reduce((sum, c) => sum + c.nota, 0) / comps.length;
    acc[categoria] = Math.round(media);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Resultado da Avaliação</h1>
          <p className="text-muted-foreground mt-1">
            {mockCandidato.nome} • {mockCandidato.cargo}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button size="sm">
            <Send className="h-4 w-4 mr-2" />
            Enviar Resultado
          </Button>
        </div>
      </div>

      {/* Score Geral e Recomendação */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Score Geral */}
        <Card>
          <CardHeader>
            <CardTitle>Score Geral</CardTitle>
            <CardDescription>Pontuação consolidada da avaliação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - mockResultado.scoreGeral / 100)}`}
                    className={getScoreColor(mockResultado.scoreGeral)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${getScoreColor(mockResultado.scoreGeral)}`}>
                    {mockResultado.scoreGeral}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {getScoreLabel(mockResultado.scoreGeral)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recomendação */}
        <Card className={`border-2 ${recomendacaoConfig.borderColor} ${recomendacaoConfig.bgColor}`}>
          <CardHeader>
            <CardTitle>Recomendação</CardTitle>
            <CardDescription>Decisão sobre seguir no processo seletivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <RecomendacaoIcon className={`w-20 h-20 ${recomendacaoConfig.iconColor}`} />
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${recomendacaoConfig.textColor}`}>
                  {recomendacaoConfig.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Avaliação realizada em {new Date(mockCandidato.dataEntrevista).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
          <CardDescription>Visão geral do desempenho do candidato</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{mockResultado.resumo}</p>
        </CardContent>
      </Card>

      {/* Pontos Fortes e Fracos */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle>Pontos Fortes</CardTitle>
            </div>
            <CardDescription>Competências e qualidades destacadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockResultado.pontosFortes.map((ponto, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm">{ponto}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              <CardTitle>Pontos de Atenção</CardTitle>
            </div>
            <CardDescription>Áreas para desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockResultado.pontosFracos.map((ponto, index) => (
                <li key={index} className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                  <span className="text-sm">{ponto}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Justificativa Interna */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-amber-900">Justificativa Interna</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMostrarJustificativa(!mostrarJustificativa)}
            >
              {mostrarJustificativa ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Ocultar
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Mostrar
                </>
              )}
            </Button>
          </div>
          <CardDescription className="text-amber-700">
            Informação confidencial - não será compartilhada com o candidato
          </CardDescription>
        </CardHeader>
        {mostrarJustificativa && (
          <CardContent>
            <p className="text-sm leading-relaxed text-amber-900">
              {mockResultado.justificativaInterna}
            </p>
          </CardContent>
        )}
      </Card>

      {/* Competências Avaliadas */}
      <Card>
        <CardHeader>
          <CardTitle>Competências Avaliadas</CardTitle>
          <CardDescription>Análise detalhada por categoria de competências</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Médias por Categoria */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Médias por Categoria</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categorias.map((categoria) => {
                const media = mediaPorCategoria[categoria];
                return (
                  <div
                    key={categoria}
                    className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setCategoriaSelecionada(categoria)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{categoria}</span>
                      <span className={`text-lg font-bold ${getScoreColor(media)}`}>
                        {media}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          media >= 85 ? 'bg-green-500' : media >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${media}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Filtro de Categorias */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant={categoriaSelecionada === "todas" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaSelecionada("todas")}
              >
                Todas
              </Button>
              {categorias.map((categoria) => (
                <Button
                  key={categoria}
                  variant={categoriaSelecionada === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoriaSelecionada(categoria)}
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>

          {/* Lista de Competências */}
          <div className="space-y-4">
            {competenciasFiltradas.map((competencia, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{competencia.nome}</p>
                    <p className="text-xs text-muted-foreground">{competencia.descricao}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getScoreBgColor(competencia.nota)}>
                      {getScoreLabel(competencia.nota)}
                    </Badge>
                    <span className={`text-xl font-bold min-w-[3rem] text-right ${getScoreColor(competencia.nota)}`}>
                      {competencia.nota}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      competencia.nota >= 85
                        ? 'bg-green-500'
                        : competencia.nota >= 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${competencia.nota}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações da Entrevista */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Entrevista</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Candidato</p>
              <p className="text-sm font-semibold mt-1">{mockCandidato.nome}</p>
              <p className="text-xs text-muted-foreground">{mockCandidato.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data da Entrevista</p>
              <p className="text-sm font-semibold mt-1">
                {new Date(mockCandidato.dataEntrevista).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(mockCandidato.dataEntrevista).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duração</p>
              <p className="text-sm font-semibold mt-1">{mockCandidato.duracao}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
