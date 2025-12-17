import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { respostas, perguntas, candidatoEntrevistas, candidatos, entrevistas } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";
import {
  requireParticipacaoAccess,
  isErrorResponse,
} from "@/lib/security/ownership";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";

// Tipos
interface Competencia {
  nome: string;
  categoria: string;
  nota: number;
  descricao: string;
}

interface PerguntaResposta {
  pergunta: {
    id: string;
    texto: string;
    ordem: number;
  };
  resposta: {
    texto: string | null;
    transcricao: string | null;
    tempoResposta: number | null;
  };
}

// Cores
const colors = {
  primary: "#1e40af",
  green: "#16a34a",
  greenLight: "#dcfce7",
  yellow: "#ca8a04",
  yellowLight: "#fef9c3",
  red: "#dc2626",
  redLight: "#fee2e2",
  gray: "#6b7280",
  grayLight: "#f3f4f6",
  grayDark: "#374151",
  white: "#ffffff",
  black: "#111827",
};

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: colors.white,
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.gray,
  },
  candidatoInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    padding: 15,
    backgroundColor: colors.grayLight,
    borderRadius: 8,
  },
  candidatoNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 4,
  },
  candidatoEmail: {
    fontSize: 10,
    color: colors.gray,
  },
  infoData: {
    textAlign: "right",
  },
  infoLabel: {
    fontSize: 9,
    color: colors.gray,
  },
  infoValue: {
    fontSize: 11,
    color: colors.grayDark,
    fontWeight: "bold",
  },
  scoresSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 15,
  },
  scoreCard: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 10,
    color: colors.gray,
    textAlign: "center",
  },
  scoreStatus: {
    fontSize: 9,
    marginTop: 4,
    fontWeight: "bold",
  },
  recomendacaoCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
  },
  recomendacaoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recomendacaoSubtitle: {
    fontSize: 9,
    color: colors.gray,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  sectionText: {
    fontSize: 10,
    color: colors.grayDark,
    lineHeight: 1.5,
  },
  pontosContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  pontosCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  pontosTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pontoItem: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  pontoBullet: {
    fontSize: 10,
    marginRight: 6,
    marginTop: 1,
  },
  pontoText: {
    fontSize: 9,
    color: colors.grayDark,
    flex: 1,
    lineHeight: 1.4,
  },
  competenciasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  competenciaItem: {
    width: "48%",
    padding: 10,
    backgroundColor: colors.grayLight,
    borderRadius: 6,
    marginBottom: 5,
  },
  competenciaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  competenciaNome: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.black,
    flex: 1,
  },
  competenciaNota: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 8,
  },
  competenciaCategoria: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 4,
  },
  competenciaDescricao: {
    fontSize: 8,
    color: colors.grayDark,
    lineHeight: 1.3,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginTop: 6,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  qaSection: {
    marginTop: 10,
  },
  qaItem: {
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 12,
  },
  qaNumero: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  qaPergunta: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  qaResposta: {
    fontSize: 9,
    color: colors.grayDark,
    lineHeight: 1.5,
    backgroundColor: colors.grayLight,
    padding: 10,
    borderRadius: 4,
  },
  qaTempoResposta: {
    fontSize: 8,
    color: colors.gray,
    marginTop: 4,
    textAlign: "right",
  },
  qaSemResposta: {
    fontSize: 9,
    color: colors.gray,
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: colors.gray,
  },
  decisaoCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
  },
  decisaoTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
  },
  decisaoObservacao: {
    fontSize: 9,
    color: colors.grayDark,
    marginTop: 6,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
});

// Helpers
const getScoreColor = (score: number) => {
  if (score >= 85) return colors.green;
  if (score >= 70) return colors.yellow;
  return colors.red;
};

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Excelente";
  if (score >= 70) return "Bom";
  if (score >= 50) return "Regular";
  return "Insuficiente";
};

const getRecomendacaoConfig = (recomendacao: string | null) => {
  switch (recomendacao) {
    case "recomendado":
      return {
        label: "Recomendado para Proxima Fase",
        bgColor: colors.greenLight,
        borderColor: colors.green,
        textColor: colors.green,
      };
    case "nao_recomendado":
      return {
        label: "Nao Recomendado",
        bgColor: colors.redLight,
        borderColor: colors.red,
        textColor: colors.red,
      };
    case "recomendado_com_ressalvas":
      return {
        label: "Recomendado com Ressalvas",
        bgColor: colors.yellowLight,
        borderColor: colors.yellow,
        textColor: colors.yellow,
      };
    default:
      return null;
  }
};

const getDecisaoConfig = (decisao: string | null) => {
  switch (decisao) {
    case "aprovado":
      return {
        label: "Aprovado pelo Recrutador",
        bgColor: colors.greenLight,
        borderColor: colors.green,
        textColor: colors.green,
      };
    case "reprovado":
      return {
        label: "Reprovado pelo Recrutador",
        bgColor: colors.redLight,
        borderColor: colors.red,
        textColor: colors.red,
      };
    default:
      return null;
  }
};

// Parse do resumoGeral
function parseResumoGeral(resumo: string | null) {
  if (!resumo) return { texto: "", pontosFortes: [] as string[], pontosMelhoria: [] as string[] };

  const parts = resumo.split("**Pontos Fortes:**");
  const textoBase = parts[0]?.trim() || "";

  let pontosFortes: string[] = [];
  let pontosMelhoria: string[] = [];

  if (parts[1]) {
    const fortesEMelhoria = parts[1].split("**Pontos de Melhoria:**");

    const fortesText = fortesEMelhoria[0] || "";
    pontosFortes = fortesText
      .split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .map((line) => line.trim().substring(2));

    if (fortesEMelhoria[1]) {
      pontosMelhoria = fortesEMelhoria[1]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .map((line) => line.trim().substring(2));
    }
  }

  return { texto: textoBase, pontosFortes, pontosMelhoria };
}

// Componente PDF
interface PDFDocumentProps {
  candidato: {
    nome: string;
    email: string;
  };
  participacao: {
    notaGeral: number | null;
    compatibilidadeVaga: number | null;
    recomendacao: string | null;
    resumoGeral: string | null;
    competencias: Competencia[] | null;
    concluidaEm: Date | null;
    decisaoRecrutador: string | null;
    decisaoRecrutadorObservacao: string | null;
  };
  perguntasRespostas: PerguntaResposta[];
  entrevistaTitulo?: string;
}

function PDFDocument({
  candidato,
  participacao,
  perguntasRespostas,
  entrevistaTitulo,
}: PDFDocumentProps) {
  const temAvaliacao = participacao?.notaGeral !== null && participacao?.notaGeral !== undefined;
  const { texto: resumoTexto, pontosFortes, pontosMelhoria } = parseResumoGeral(
    participacao?.resumoGeral || null
  );
  const recomendacaoConfig = getRecomendacaoConfig(participacao?.recomendacao || null);
  const decisaoConfig = getDecisaoConfig(participacao?.decisaoRecrutador || null);
  const competencias = participacao?.competencias || [];

  // Data e hora da conclusão da entrevista
  const dataConclusao = participacao?.concluidaEm
    ? new Date(participacao.concluidaEm).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  return (
    <Document>
      {/* Pagina 1 - Resumo e Avaliacao */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Relatorio de Avaliacao</Text>
          <Text style={styles.headerSubtitle}>
            {entrevistaTitulo || "Entrevista"} - {participacao?.concluidaEm ? "Concluida em" : "Gerado em"}{" "}
            {dataConclusao}
          </Text>
        </View>

        {/* Info do Candidato */}
        <View style={styles.candidatoInfo}>
          <View>
            <Text style={styles.candidatoNome}>{candidato.nome}</Text>
            <Text style={styles.candidatoEmail}>{candidato.email}</Text>
          </View>
          <View style={styles.infoData}>
            {participacao?.concluidaEm && (
              <>
                <Text style={styles.infoLabel}>Entrevista concluida em</Text>
                <Text style={styles.infoValue}>
                  {new Date(participacao.concluidaEm).toLocaleDateString("pt-BR")}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Scores */}
        {temAvaliacao && (
          <View style={styles.scoresSection}>
            {/* Nota Geral */}
            <View
              style={[
                styles.scoreCard,
                {
                  backgroundColor: colors.grayLight,
                  borderColor: getScoreColor(participacao?.notaGeral || 0),
                },
              ]}
            >
              <Text
                style={[
                  styles.scoreValue,
                  { color: getScoreColor(participacao?.notaGeral || 0) },
                ]}
              >
                {Math.round(participacao?.notaGeral || 0)}
              </Text>
              <Text style={styles.scoreLabel}>Nota Geral</Text>
              <Text
                style={[
                  styles.scoreStatus,
                  { color: getScoreColor(participacao?.notaGeral || 0) },
                ]}
              >
                {getScoreLabel(participacao?.notaGeral || 0)}
              </Text>
            </View>

            {/* Compatibilidade */}
            <View
              style={[
                styles.scoreCard,
                {
                  backgroundColor: colors.grayLight,
                  borderColor: getScoreColor(participacao?.compatibilidadeVaga || 0),
                },
              ]}
            >
              <Text
                style={[
                  styles.scoreValue,
                  { color: getScoreColor(participacao?.compatibilidadeVaga || 0) },
                ]}
              >
                {Math.round(participacao?.compatibilidadeVaga || 0)}
              </Text>
              <Text style={styles.scoreLabel}>Compatibilidade com a Vaga</Text>
              <Text
                style={[
                  styles.scoreStatus,
                  { color: getScoreColor(participacao?.compatibilidadeVaga || 0) },
                ]}
              >
                {getScoreLabel(participacao?.compatibilidadeVaga || 0)}
              </Text>
            </View>
          </View>
        )}

        {/* Recomendacao da IA */}
        {recomendacaoConfig && (
          <View
            style={[
              styles.recomendacaoCard,
              {
                backgroundColor: recomendacaoConfig.bgColor,
                borderColor: recomendacaoConfig.borderColor,
              },
            ]}
          >
            <Text style={[styles.recomendacaoTitle, { color: recomendacaoConfig.textColor }]}>
              {recomendacaoConfig.label}
            </Text>
            <Text style={styles.recomendacaoSubtitle}>Recomendacao da IA</Text>
          </View>
        )}

        {/* Decisao do Recrutador */}
        {decisaoConfig && (
          <View
            style={[
              styles.decisaoCard,
              {
                backgroundColor: decisaoConfig.bgColor,
                borderColor: decisaoConfig.borderColor,
              },
            ]}
          >
            <Text style={[styles.decisaoTitle, { color: decisaoConfig.textColor }]}>
              {decisaoConfig.label}
            </Text>
            {participacao?.decisaoRecrutadorObservacao && (
              <Text style={styles.decisaoObservacao}>
                Observacao: {participacao.decisaoRecrutadorObservacao}
              </Text>
            )}
          </View>
        )}

        {/* Resumo Executivo */}
        {resumoTexto && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo Executivo</Text>
            <Text style={styles.sectionText}>{resumoTexto}</Text>
          </View>
        )}

        {/* Pontos Fortes e Melhoria */}
        {(pontosFortes.length > 0 || pontosMelhoria.length > 0) && (
          <View style={styles.pontosContainer}>
            {pontosFortes.length > 0 && (
              <View style={[styles.pontosCard, { backgroundColor: colors.greenLight }]}>
                <Text style={[styles.pontosTitle, { color: colors.green }]}>Pontos Fortes</Text>
                {pontosFortes.map((ponto, index) => (
                  <View key={index} style={styles.pontoItem}>
                    <Text style={[styles.pontoBullet, { color: colors.green }]}>+</Text>
                    <Text style={styles.pontoText}>{ponto}</Text>
                  </View>
                ))}
              </View>
            )}
            {pontosMelhoria.length > 0 && (
              <View style={[styles.pontosCard, { backgroundColor: colors.yellowLight }]}>
                <Text style={[styles.pontosTitle, { color: colors.yellow }]}>Pontos de Atencao</Text>
                {pontosMelhoria.map((ponto, index) => (
                  <View key={index} style={styles.pontoItem}>
                    <Text style={[styles.pontoBullet, { color: colors.yellow }]}>!</Text>
                    <Text style={styles.pontoText}>{ponto}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Entrevistia - Relatorio de Avaliacao</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} de ${totalPages}`}
          />
        </View>
      </Page>

      {/* Pagina 2 - Competencias */}
      {competencias.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competencias Avaliadas</Text>
            <View style={styles.competenciasGrid}>
              {competencias.map((competencia, index) => (
                <View key={index} style={styles.competenciaItem}>
                  <View style={styles.competenciaHeader}>
                    <Text style={styles.competenciaNome}>{competencia.nome}</Text>
                    <Text
                      style={[
                        styles.competenciaNota,
                        { color: getScoreColor(competencia.nota) },
                      ]}
                    >
                      {competencia.nota}
                    </Text>
                  </View>
                  <Text style={styles.competenciaCategoria}>{competencia.categoria}</Text>
                  <Text style={styles.competenciaDescricao}>{competencia.descricao}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${competencia.nota}%`,
                          backgroundColor: getScoreColor(competencia.nota),
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>Entrevistia - Relatorio de Avaliacao</Text>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} de ${totalPages}`}
            />
          </View>
        </Page>
      )}

      {/* Pagina 3+ - Perguntas e Respostas */}
      {perguntasRespostas.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Perguntas e Respostas ({perguntasRespostas.length})
            </Text>
            <View style={styles.qaSection}>
              {perguntasRespostas.map((item, index) => (
                <View key={item.pergunta.id} style={styles.qaItem} wrap={false}>
                  <Text style={styles.qaNumero}>Pergunta {item.pergunta.ordem || index + 1}</Text>
                  <Text style={styles.qaPergunta}>{item.pergunta.texto}</Text>
                  {item.resposta.texto || item.resposta.transcricao ? (
                    <>
                      <Text style={styles.qaResposta}>
                        {item.resposta.texto || item.resposta.transcricao}
                      </Text>
                      {item.resposta.tempoResposta && (
                        <Text style={styles.qaTempoResposta}>
                          Tempo de resposta: {item.resposta.tempoResposta}s
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text style={styles.qaSemResposta}>Sem resposta registrada</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>Entrevistia - Relatorio de Avaliacao</Text>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} de ${totalPages}`}
            />
          </View>
        </Page>
      )}
    </Document>
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: candidatoId } = await params;
    const { searchParams } = new URL(request.url);
    const entrevistaId = searchParams.get("entrevistaId");

    if (!entrevistaId) {
      return NextResponse.json({ error: "entrevistaId obrigatorio" }, { status: 400 });
    }

    // Verifica autenticacao e ownership
    const accessResult = await requireParticipacaoAccess(candidatoId, entrevistaId);
    if (isErrorResponse(accessResult)) {
      return accessResult;
    }

    const db = getDB();

    // Busca candidato
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, candidatoId));

    if (!candidato) {
      return NextResponse.json({ error: "Candidato nao encontrado" }, { status: 404 });
    }

    // Busca entrevista
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(eq(entrevistas.id, entrevistaId));

    // Busca participacao
    const [participacao] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevistaId)
        )
      );

    if (!participacao) {
      return NextResponse.json({ error: "Participacao nao encontrada" }, { status: 404 });
    }

    // Busca respostas
    const respostasData = await db
      .select({
        id: respostas.id,
        textoResposta: respostas.textoResposta,
        transcricao: respostas.transcricao,
        tempoResposta: respostas.tempoResposta,
        perguntaId: perguntas.id,
        perguntaTexto: perguntas.texto,
        perguntaOrdem: perguntas.ordem,
      })
      .from(respostas)
      .innerJoin(perguntas, eq(respostas.perguntaId, perguntas.id))
      .where(
        and(
          eq(respostas.candidatoId, candidatoId),
          eq(respostas.entrevistaId, entrevistaId)
        )
      )
      .orderBy(asc(perguntas.ordem));

    const perguntasRespostas: PerguntaResposta[] = respostasData.map((r) => ({
      pergunta: {
        id: r.perguntaId,
        texto: r.perguntaTexto,
        ordem: r.perguntaOrdem,
      },
      resposta: {
        texto: r.textoResposta,
        transcricao: r.transcricao,
        tempoResposta: r.tempoResposta,
      },
    }));

    // Gera PDF
    const pdfBuffer = await renderToBuffer(
      <PDFDocument
        candidato={{
          nome: candidato.nome,
          email: candidato.email,
        }}
        participacao={{
          notaGeral: participacao.notaGeral,
          compatibilidadeVaga: participacao.compatibilidadeVaga,
          recomendacao: participacao.recomendacao,
          resumoGeral: participacao.resumoGeral,
          competencias: participacao.competencias as Competencia[] | null,
          concluidaEm: participacao.concluidaEm,
          decisaoRecrutador: participacao.decisaoRecrutador,
          decisaoRecrutadorObservacao: participacao.decisaoRecrutadorObservacao,
        }}
        perguntasRespostas={perguntasRespostas}
        entrevistaTitulo={entrevista?.titulo}
      />
    );

    // Retorna PDF
    const filename = `avaliacao-${candidato.nome.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return NextResponse.json(
      { error: "Erro ao gerar PDF", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
