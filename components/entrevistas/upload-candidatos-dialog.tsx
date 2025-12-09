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
import { Upload, Download, Loader2, FileSpreadsheet, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadCandidatosDialogProps {
  entrevistaId: string;
  onSuccess?: () => void;
}

export function UploadCandidatosDialog({
  entrevistaId,
  onSuccess,
}: UploadCandidatosDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<Record<string, string>[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownloadModelo = () => {
    // Criar CSV modelo com apenas nome e email
    const csvContent = `nome,email
João Silva,joao@example.com
Maria Santos,maria@example.com`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "modelo_candidatos.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArquivo(file);
    setErro(null);

    // Parse CSV
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setErro("Erro ao processar o arquivo. Verifique o formato.");
          return;
        }

        // Validar colunas necessárias
        const data = results.data as Record<string, string>[];
        if (data.length === 0) {
          setErro("O arquivo está vazio.");
          return;
        }

        const primeiraLinha = data[0];
        if (!primeiraLinha.nome || !primeiraLinha.email) {
          setErro("O arquivo deve conter as colunas 'nome' e 'email'.");
          return;
        }

        setPreview(data.slice(0, 5)); // Mostrar apenas 5 primeiros
      },
      error: () => {
        setErro("Erro ao ler o arquivo.");
      },
    });
  };

  const handleSubmit = async () => {
    if (!arquivo) return;

    setLoading(true);
    setErro(null);

    try {
      // Parse completo do arquivo
      Papa.parse(arquivo, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const candidatos = results.data;

            const response = await fetch("/api/candidatos/lote", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                candidatos,
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

            if (resultado.invalidos > 0) {
              mensagem += `\n❌ Inválidos (dados incompletos): ${resultado.invalidos}\n`;
            }

            alert(mensagem);

            router.refresh();
          } catch (error) {
            console.error("Erro ao importar candidatos:", error);
            setErro(error instanceof Error ? error.message : "Erro ao importar candidatos. Tente novamente.");
            setLoading(false);
          }
        },
        error: (error) => {
          console.error("Erro ao processar arquivo:", error);
          setErro("Erro ao processar o arquivo. Verifique o formato.");
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Erro ao importar candidatos:", error);
      setErro("Erro ao importar candidatos. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload em Lote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload de Candidatos em Lote</DialogTitle>
          <DialogDescription>
            Importe múltiplos candidatos de uma vez através de um arquivo CSV
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Botão para baixar modelo */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">Arquivo modelo</p>
                <p className="text-sm text-muted-foreground">
                  Baixe o modelo CSV com as colunas corretas
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadModelo}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar Modelo
            </Button>
          </div>

          {/* Upload do arquivo */}
          <div className="space-y-2">
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {arquivo ? arquivo.name : "Selecionar Arquivo CSV"}
            </Button>
          </div>

          {/* Erro */}
          {erro && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{erro}</AlertDescription>
            </Alert>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Preview ({preview.length} primeiros candidatos):
              </p>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 text-left">Nome</th>
                      <th className="p-2 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((candidato, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{candidato.nome}</td>
                        <td className="p-2">{candidato.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setArquivo(null);
              setPreview([]);
              setErro(null);
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
            Importar Candidatos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
