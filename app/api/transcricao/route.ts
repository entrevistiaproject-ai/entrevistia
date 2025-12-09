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

    // Transcrever com OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
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
