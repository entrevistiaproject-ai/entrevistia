import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Arquivo de áudio não fornecido" },
        { status: 400 }
      );
    }

    // Verificar tamanho do arquivo (25MB no free tier)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (audioFile.size > maxSize) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo: 25MB" },
        { status: 400 }
      );
    }

    // Transcrever com Groq Whisper Large v3 Turbo
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      language: "pt", // Português
      response_format: "json",
      temperature: 0.0, // Maior precisão
    });

    return NextResponse.json({
      transcricao: transcription.text,
      duracao: transcription.duration,
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
