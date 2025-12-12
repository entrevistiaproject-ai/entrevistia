import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import { auth } from "@/auth";
import {
  checkAIRateLimit,
  getClientIP,
  getRateLimitHeaders,
  checkAIEndpointProtection,
  recordFailedAttempt,
} from "@/lib/security";

// Cliente OpenAI - será inicializado apenas se a API key estiver configurada
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Tipos de arquivo de áudio permitidos
const ALLOWED_AUDIO_TYPES = [
  "audio/webm",
  "audio/ogg",
  "audio/wav",
  "audio/mp3",
  "audio/mpeg",
  "audio/mp4",
  "audio/flac",
  "audio/x-m4a",
  "video/webm", // Alguns navegadores enviam áudio como video/webm
];

const VALID_EXTENSIONS = ["flac", "m4a", "mp3", "mp4", "mpeg", "mpga", "oga", "ogg", "wav", "webm"];

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  try {
    // Verifica se API key está configurada
    if (!openai) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada" },
        { status: 500 }
      );
    }

    // Verifica sessão (opcional para transcrição em entrevistas públicas)
    const session = await auth();
    const userId = session?.user?.id;

    // Proteção contra bots para endpoints de IA
    const botCheck = checkAIEndpointProtection(request, "transcription");
    if (!botCheck.allowed) {
      // Registra tentativa suspeita
      recordFailedAttempt(clientIP, "transcription");
      return botCheck.response;
    }

    // Rate limiting específico para IA
    const rateLimitCheck = checkAIRateLimit(request, userId, "transcription");
    if (!rateLimitCheck.allowed) {
      return rateLimitCheck.response;
    }

    // Validação do Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      recordFailedAttempt(clientIP, "transcription");
      return NextResponse.json(
        { error: "Content-Type deve ser multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Arquivo de áudio não fornecido" },
        { status: 400 }
      );
    }

    // Validação do tipo de arquivo
    const fileType = audioFile.type.toLowerCase();
    const isValidType = ALLOWED_AUDIO_TYPES.some(type =>
      fileType.includes(type.split("/")[1]) || fileType === type
    );

    if (!isValidType && audioFile.type !== "") {
      recordFailedAttempt(clientIP, "transcription");
      return NextResponse.json(
        { error: "Tipo de arquivo não suportado. Use: webm, ogg, wav, mp3, mp4, flac" },
        { status: 400 }
      );
    }

    // Verificar tamanho do arquivo (25MB limite da OpenAI)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (audioFile.size > maxSize) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo: 25MB" },
        { status: 400 }
      );
    }

    // Tamanho mínimo (evita requisições vazias ou com arquivos corrompidos)
    const minSize = 1024; // 1KB
    if (audioFile.size < minSize) {
      recordFailedAttempt(clientIP, "transcription");
      return NextResponse.json(
        { error: "Arquivo muito pequeno ou corrompido" },
        { status: 400 }
      );
    }

    // Converter File para Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verificar se o arquivo tem conteúdo
    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "Arquivo de áudio vazio" },
        { status: 400 }
      );
    }

    // Usar extensão do nome original do arquivo ou detectar pelo tipo
    let fileName = audioFile.name || "audio.webm";

    // Se o nome não tem extensão válida, adicionar baseado no tipo
    const currentExt = fileName.split(".").pop()?.toLowerCase();

    if (!currentExt || !VALID_EXTENSIONS.includes(currentExt)) {
      // Determinar extensão baseada no tipo MIME
      const mimeType = audioFile.type || "";
      if (mimeType.includes("webm")) {
        fileName = "audio.webm";
      } else if (mimeType.includes("ogg")) {
        fileName = "audio.ogg";
      } else if (mimeType.includes("wav")) {
        fileName = "audio.wav";
      } else if (mimeType.includes("mp3") || mimeType.includes("mpeg")) {
        fileName = "audio.mp3";
      } else if (mimeType.includes("mp4")) {
        fileName = "audio.mp4";
      } else if (mimeType.includes("flac")) {
        fileName = "audio.flac";
      } else {
        // Padrão para webm que é o formato do navegador
        fileName = "audio.webm";
      }
    }

    // Transcrever com OpenAI Whisper
    const file = await toFile(buffer, fileName);
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
    });

    // Retorna com headers de rate limit para feedback ao cliente
    return NextResponse.json(
      { transcricao: transcription.text },
      {
        headers: getRateLimitHeaders(rateLimitCheck.result),
      }
    );
  } catch (error) {
    // Registra erro mas não conta como tentativa falhada de segurança
    // pois pode ser erro legítimo da API do OpenAI
    if (process.env.NODE_ENV === "development") {
      console.error("Erro ao transcrever áudio:", error);
    }

    if (error instanceof Error) {
      // Não expõe detalhes internos em produção
      const message = process.env.NODE_ENV === "development"
        ? `Erro na transcrição: ${error.message}`
        : "Erro ao processar transcrição";

      return NextResponse.json(
        { error: message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao processar transcrição" },
      { status: 500 }
    );
  }
}
