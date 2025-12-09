import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "placeholder-for-build",
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada" },
        { status: 500 }
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

    // Verificar tamanho do arquivo (25MB limite da OpenAI)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (audioFile.size > maxSize) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo: 25MB" },
        { status: 400 }
      );
    }

    // Log para debug
    console.log("Arquivo recebido:", {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size,
    });

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
    const validExtensions = ["flac", "m4a", "mp3", "mp4", "mpeg", "mpga", "oga", "ogg", "wav", "webm"];
    const currentExt = fileName.split(".").pop()?.toLowerCase();

    if (!currentExt || !validExtensions.includes(currentExt)) {
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

    console.log("Enviando para Whisper:", {
      fileName,
      originalType: audioFile.type,
      size: buffer.length,
    });

    // Transcrever com OpenAI Whisper - NÃO passar o type, deixar a SDK detectar pela extensão
    const file = await toFile(buffer, fileName);
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
    });

    return NextResponse.json({
      transcricao: transcription.text,
    });
  } catch (error) {
    console.error("Erro ao transcrever áudio:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Erro na transcrição: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao processar transcrição" },
      { status: 500 }
    );
  }
}
