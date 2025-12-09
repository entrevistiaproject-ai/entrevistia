import { NextResponse } from "next/server";
import OpenAI from "openai";

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

    // Determinar extensão baseada no tipo MIME
    let extension = "webm";
    const mimeType = audioFile.type || "audio/webm";

    if (mimeType.includes("wav")) {
      extension = "wav";
    } else if (mimeType.includes("mp3") || mimeType.includes("mpeg")) {
      extension = "mp3";
    } else if (mimeType.includes("mp4")) {
      extension = "mp4";
    } else if (mimeType.includes("ogg")) {
      extension = "ogg";
    } else if (mimeType.includes("flac")) {
      extension = "flac";
    } else if (mimeType.includes("webm")) {
      extension = "webm";
    }

    // Garantir que o arquivo tenha extensão correta para o Whisper
    const fileName = `audio.${extension}`;
    const fileWithName = new File([audioFile], fileName, {
      type: mimeType,
    });

    console.log("Enviando para Whisper:", {
      fileName,
      mimeType,
      size: fileWithName.size,
    });

    // Transcrever com OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fileWithName,
      model: "whisper-1",
      language: "pt", // Português
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
