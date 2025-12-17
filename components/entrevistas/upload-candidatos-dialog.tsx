"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Download, Loader2, FileSpreadsheet, AlertCircle, FileWarning, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

interface UploadCandidatosDialogProps {
  entrevistaId: string;
  onSuccess?: () => void;
  className?: string;
}

interface CandidatoData {
  nome: string;
  email: string;
  telefone?: string;
  linkedin?: string;
}

interface FormatError {
  type: "format";
  colunasEncontradas: string[];
}

export function UploadCandidatosDialog({
  entrevistaId,
  onSuccess,
  className,
}: UploadCandidatosDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<CandidatoData[]>([]);
  const [allData, setAllData] = useState<CandidatoData[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [formatError, setFormatError] = useState<FormatError | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownloadModelo = () => {
    // Criar planilha XLSX modelo com todos os campos
    const data = [
      { nome: "João Silva", email: "joao@example.com", "telefone (opcional)": "(11) 99999-9999", "linkedin (opcional)": "https://linkedin.com/in/joaosilva" },
      { nome: "Maria Santos", email: "maria@example.com", "telefone (opcional)": "(11) 98888-8888", "linkedin (opcional)": "https://linkedin.com/in/mariasantos" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Ajustar largura das colunas
    worksheet["!cols"] = [
      { wch: 25 }, // nome
      { wch: 30 }, // email
      { wch: 22 }, // telefone (opcional)
      { wch: 45 }, // linkedin (opcional)
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidatos");

    // Gerar arquivo e download
    XLSX.writeFile(workbook, "modelo_candidatos.xlsx");
  };

  const parseFile = (file: File): Promise<CandidatoData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });

          // Pegar a primeira planilha
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Converter para JSON
          const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
            raw: false,
            defval: "",
          });

          if (jsonData.length === 0) {
            reject(new Error("O arquivo está vazio."));
            return;
          }

          // Normalizar nomes das colunas (lowercase e trim, remove "(opcional)")
          const normalizedData: CandidatoData[] = jsonData.map((row) => {
            const normalized: Record<string, string> = {};
            for (const [key, value] of Object.entries(row)) {
              // Remove "(opcional)" e normaliza o nome da coluna
              const normalizedKey = key.toLowerCase().replace(/\s*\(opcional\)\s*/g, "").trim();
              normalized[normalizedKey] = String(value || "").trim();
            }
            return {
              nome: normalized.nome || "",
              email: normalized.email || "",
              telefone: normalized.telefone || undefined,
              linkedin: normalized.linkedin || undefined,
            };
          });

          // Filtrar linhas vazias
          const validData = normalizedData.filter(
            (row) => row.nome && row.email
          );

          if (validData.length === 0) {
            // Mostrar colunas encontradas para ajudar o usuário
            const headers = Object.keys(jsonData[0] || {});
            reject({
              type: "format",
              colunasEncontradas: headers,
            });
            return;
          }

          resolve(validData);
        } catch {
          reject(new Error("Erro ao processar o arquivo. Verifique o formato."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Erro ao ler o arquivo."));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArquivo(file);
    setErro(null);
    setFormatError(null);
    setPreview([]);
    setAllData([]);

    try {
      const data = await parseFile(file);
      setAllData(data);
      setPreview(data.slice(0, 5)); // Mostrar apenas 5 primeiros
    } catch (error) {
      if (error && typeof error === "object" && "type" in error && error.type === "format") {
        setFormatError(error as FormatError);
      } else {
        setErro(error instanceof Error ? error.message : "Erro ao processar arquivo.");
      }
    }
  };

  const handleTryAgain = () => {
    setArquivo(null);
    setErro(null);
    setFormatError(null);
    setPreview([]);
    setAllData([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!arquivo || allData.length === 0) return;

    setLoading(true);
    setErro(null);

    try {
      const response = await fetch("/api/candidatos/lote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidatos: allData,
          entrevistaId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao importar candidatos");
      }

      const resultado = await response.json();

      setOpen(false);
      setArquivo(null);
      setPreview([]);
      setAllData([]);

      if (onSuccess) {
        onSuccess();
      }

      let mensagem = `✅ Importação concluída!\n\n`;
      mensagem += `📊 Total processado: ${resultado.total}\n\n`;

      mensagem += `✨ Candidatos novos: ${resultado.candidatosNovos}\n`;

      if (resultado.candidatosExistentes > 0) {
        mensagem += `👤 Candidatos existentes: ${resultado.candidatosExistentes}\n`;
      }

      mensagem += `\n📧 Vinculados à entrevista: ${resultado.vinculadosEntrevista}\n`;

      if (resultado.jaVinculadosEntrevista > 0) {
        mensagem += `⚠️ Já vinculados previamente: ${resultado.jaVinculadosEntrevista}\n`;
      }

      if (resultado.emailsEnviados > 0) {
        mensagem += `\n✉️ Convites enviados: ${resultado.emailsEnviados}\n`;
      }

      if (resultado.emailsFalharam > 0) {
        mensagem += `⚠️ Falha ao enviar: ${resultado.emailsFalharam}\n`;
      }

      if (resultado.invalidos > 0) {
        mensagem += `\n❌ Inválidos (dados incompletos): ${resultado.invalidos}\n`;
      }

      alert(mensagem);

      router.refresh();
    } catch (error) {
      console.error("Erro ao importar candidatos:", error);
      setErro(error instanceof Error ? error.message : "Erro ao importar candidatos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Se há erro de formato, mostra tela especial
  if (formatError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className={className}>
            <Upload className="mr-2 h-4 w-4" />
            Importar lista
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <FileWarning className="h-8 w-8 text-amber-600" />
            </div>

            <DialogTitle className="text-xl mb-2">Formato da planilha incorreto</DialogTitle>

            <DialogDescription className="mb-6">
              Não foi possível identificar as colunas obrigatórias <strong>nome</strong> e <strong>email</strong> na sua planilha.
            </DialogDescription>

            {/* Colunas encontradas */}
            <div className="w-full bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Colunas encontradas no seu arquivo:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {formatError.colunasEncontradas.map((col, i) => (
                  <span key={i} className="px-2 py-1 bg-background border rounded text-sm font-mono">
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Instruções */}
            <div className="w-full border rounded-xl p-4 mb-6 text-left">
              <p className="font-medium mb-3">Como corrigir:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                  <span>Baixe nosso modelo de planilha clicando no botão abaixo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                  <span>Preencha os dados dos candidatos nas colunas corretas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
                  <span>Salve e faça o upload novamente</span>
                </li>
              </ol>
            </div>

            {/* Colunas esperadas */}
            <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Colunas esperadas:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-green-100 border border-green-300 rounded text-sm font-mono text-green-800">nome</span>
                <span className="px-2 py-1 bg-green-100 border border-green-300 rounded text-sm font-mono text-green-800">email</span>
                <span className="px-2 py-1 bg-green-50 border border-green-200 rounded text-sm font-mono text-green-600">telefone (opcional)</span>
                <span className="px-2 py-1 bg-green-50 border border-green-200 rounded text-sm font-mono text-green-600">linkedin (opcional)</span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleTryAgain}
              className="w-full sm:w-auto"
            >
              Tentar novamente
            </Button>
            <Button
              onClick={handleDownloadModelo}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar modelo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Upload className="mr-2 h-4 w-4" />
          Importar lista
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Importar candidatos em lote</DialogTitle>
          <DialogDescription className="mt-1.5">
            Envie uma planilha Excel com nome e email. Todos receberão o convite automaticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Botão para baixar modelo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border rounded-xl bg-muted/50">
            <div className="flex items-center gap-4">
              <FileSpreadsheet className="h-10 w-10 text-green-600 shrink-0" />
              <div>
                <p className="font-medium">Precisa de um modelo?</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Baixe a planilha de exemplo com as colunas certas
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadModelo}
              className="shrink-0"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar modelo
            </Button>
          </div>

          {/* Upload do arquivo */}
          <div className="space-y-2.5">
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {arquivo ? arquivo.name : "Escolher planilha (Excel ou CSV)"}
            </Button>
          </div>

          {/* Erro genérico */}
          {erro && (
            <div className="flex items-start gap-3 p-4 border border-destructive/50 bg-destructive/10 rounded-xl">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Erro ao processar arquivo</p>
                <p className="text-sm text-muted-foreground mt-1">{erro}</p>
              </div>
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium">
                Prévia ({preview.length} de {allData.length} candidatos):
              </p>
              <div className="border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left font-medium">Nome</th>
                      <th className="p-3 text-left font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((candidato, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{candidato.nome}</td>
                        <td className="p-3">{candidato.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-3 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setArquivo(null);
              setPreview([]);
              setAllData([]);
              setErro(null);
              setFormatError(null);
            }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !arquivo || preview.length === 0}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Importar e enviar convites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
