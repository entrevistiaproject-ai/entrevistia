import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDB } from "@/lib/db";
import {
  candidatos,
  candidatoPreferencias,
  candidatoExperiencias,
  candidatoFormacoes,
  candidatoSkills,
  candidatoIdiomas,
  candidatoCertificacoes,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { uploadFile, MAX_CV_SIZE, ALLOWED_CV_TYPES, isValidFileType, isValidFileSize } from "@/lib/storage/blob";
import { processCV, type DadosExtraidos } from "@/lib/ai/cv-parser";
import { getEffectiveOwnerId } from "@/lib/services/team-service";

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/candidatos/[id]/upload-cv
 * Faz upload do CV, parseia com IA e salva os dados extraídos
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id: candidatoId } = await params;
    const db = getDB();
    const effectiveOwnerId = await getEffectiveOwnerId(session.user.id);

    // Verifica se o candidato existe e pertence ao usuário
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.id, candidatoId),
          eq(candidatos.userId, effectiveOwnerId),
          isNull(candidatos.deletedAt)
        )
      );

    if (!candidato) {
      return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
    }

    // Processa o upload
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
    }

    // Validações
    if (!isValidFileType(file.name, ALLOWED_CV_TYPES)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido. Use PDF ou DOCX." },
        { status: 400 }
      );
    }

    if (!isValidFileSize(file.size, MAX_CV_SIZE)) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 10MB." },
        { status: 400 }
      );
    }

    // Upload para Vercel Blob
    const uploadResult = await uploadFile(file, {
      candidatoId,
      tipo: "cv",
      nomeOriginal: file.name,
    });

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error || "Erro ao fazer upload" },
        { status: 500 }
      );
    }

    // Processa o CV com IA
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parseResult = await processCV(buffer, file.type);

    if (!parseResult.success || !parseResult.data) {
      // Mesmo se o parsing falhar, salvamos a URL do arquivo
      await savePreferences(db, candidatoId, {
        cvUrl: uploadResult.url,
        cvNomeArquivo: file.name,
      });

      return NextResponse.json({
        success: true,
        parsed: false,
        cvUrl: uploadResult.url,
        error: parseResult.error,
      });
    }

    // Salva os dados extraídos
    await saveExtractedData(db, candidatoId, parseResult.data, uploadResult.url!, file.name);

    return NextResponse.json({
      success: true,
      parsed: true,
      cvUrl: uploadResult.url,
      dadosExtraidos: {
        experiencias: parseResult.data.experiencias.length,
        formacoes: parseResult.data.formacoes.length,
        skills: parseResult.data.skills.length,
        idiomas: parseResult.data.idiomas.length,
        certificacoes: parseResult.data.certificacoes.length,
      },
      alertas: parseResult.data.alertas,
      confianca: parseResult.data.confiancaGeral,
    });
  } catch (error) {
    console.error("Erro ao processar upload de CV:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function savePreferences(db: any, candidatoId: string, data: Partial<typeof candidatoPreferencias.$inferInsert>) {
  const [existing] = await db
    .select()
    .from(candidatoPreferencias)
    .where(eq(candidatoPreferencias.candidatoId, candidatoId));

  if (existing) {
    await db
      .update(candidatoPreferencias)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(candidatoPreferencias.candidatoId, candidatoId));
  } else {
    await db.insert(candidatoPreferencias).values({
      candidatoId,
      ...data,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function saveExtractedData(
  db: any,
  candidatoId: string,
  data: DadosExtraidos,
  cvUrl: string,
  cvNomeArquivo: string
) {
  // Atualiza dados básicos do candidato
  const candidatoUpdate: Record<string, unknown> = { updatedAt: new Date() };
  if (data.nome) candidatoUpdate.nome = data.nome;
  if (data.telefone) candidatoUpdate.telefone = data.telefone;
  if (data.linkedin) candidatoUpdate.linkedin = data.linkedin;

  await db
    .update(candidatos)
    .set(candidatoUpdate)
    .where(eq(candidatos.id, candidatoId));

  // Salva/atualiza preferências
  await savePreferences(db, candidatoId, {
    cvUrl,
    cvNomeArquivo,
    cvParseadoEm: new Date(),
    cvDadosExtraidos: data,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais,
    resumoProfissional: data.resumoProfissional,
  });

  // Deleta dados antigos para reinserir
  await db.delete(candidatoExperiencias).where(eq(candidatoExperiencias.candidatoId, candidatoId));
  await db.delete(candidatoFormacoes).where(eq(candidatoFormacoes.candidatoId, candidatoId));
  await db.delete(candidatoSkills).where(eq(candidatoSkills.candidatoId, candidatoId));
  await db.delete(candidatoIdiomas).where(eq(candidatoIdiomas.candidatoId, candidatoId));
  await db.delete(candidatoCertificacoes).where(eq(candidatoCertificacoes.candidatoId, candidatoId));

  // Insere experiências
  if (data.experiencias.length > 0) {
    await db.insert(candidatoExperiencias).values(
      data.experiencias.map((exp) => ({
        candidatoId,
        cargo: exp.cargo,
        empresa: exp.empresa,
        localidade: exp.localidade,
        descricao: exp.descricao,
        dataInicio: exp.dataInicio ? new Date(exp.dataInicio) : new Date(),
        dataFim: exp.dataFim ? new Date(exp.dataFim) : null,
        atual: exp.atual ?? false,
        nivel: exp.nivel as "estagiario" | "junior" | "pleno" | "senior" | "especialista" | "gerente" | "diretor" | "c_level" | null,
        skillsExtraidas: exp.skillsIdentificadas,
        confiancaIA: data.confiancaGeral,
      }))
    );
  }

  // Insere formações
  if (data.formacoes.length > 0) {
    await db.insert(candidatoFormacoes).values(
      data.formacoes.map((form) => ({
        candidatoId,
        instituicao: form.instituicao,
        curso: form.curso,
        area: form.area,
        nivel: form.nivel as "ensino_medio" | "tecnico" | "graduacao" | "pos_graduacao" | "mba" | "mestrado" | "doutorado",
        dataInicio: form.dataInicio ? new Date(form.dataInicio) : null,
        dataFim: form.dataFim ? new Date(form.dataFim) : null,
        emAndamento: form.emAndamento ?? false,
      }))
    );
  }

  // Insere skills
  if (data.skills.length > 0) {
    await db.insert(candidatoSkills).values(
      data.skills.map((skill) => ({
        candidatoId,
        nome: skill.nome,
        categoria: skill.categoria,
        nivel: skill.nivel as "basico" | "intermediario" | "avancado" | "expert" | null,
        anosExperiencia: skill.anosExperiencia,
        origem: "cv" as const,
        confiancaIA: data.confiancaGeral,
      }))
    );
  }

  // Insere idiomas
  if (data.idiomas.length > 0) {
    await db.insert(candidatoIdiomas).values(
      data.idiomas.map((idioma) => ({
        candidatoId,
        idioma: idioma.idioma,
        nivel: idioma.nivel as "basico" | "intermediario" | "avancado" | "fluente" | "nativo",
        certificacao: idioma.certificacao,
      }))
    );
  }

  // Insere certificações
  if (data.certificacoes.length > 0) {
    await db.insert(candidatoCertificacoes).values(
      data.certificacoes.map((cert) => ({
        candidatoId,
        nome: cert.nome,
        instituicao: cert.instituicao,
        dataEmissao: cert.dataEmissao ? new Date(cert.dataEmissao) : null,
        dataExpiracao: cert.dataExpiracao ? new Date(cert.dataExpiracao) : null,
      }))
    );
  }
}
