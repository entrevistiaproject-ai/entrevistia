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
import { getEffectiveOwnerId } from "@/lib/services/team-service";

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidatos/[id]/perfil
 * Retorna o perfil completo do candidato com todas as informações
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id: candidatoId } = await params;
    const db = getDB();
    const effectiveOwnerId = await getEffectiveOwnerId(session.user.id);

    // Busca o candidato
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

    // Busca preferências
    const [preferencias] = await db
      .select()
      .from(candidatoPreferencias)
      .where(eq(candidatoPreferencias.candidatoId, candidatoId));

    // Busca experiências
    const experiencias = await db
      .select()
      .from(candidatoExperiencias)
      .where(eq(candidatoExperiencias.candidatoId, candidatoId));

    // Busca formações
    const formacoes = await db
      .select()
      .from(candidatoFormacoes)
      .where(eq(candidatoFormacoes.candidatoId, candidatoId));

    // Busca skills
    const skills = await db
      .select()
      .from(candidatoSkills)
      .where(eq(candidatoSkills.candidatoId, candidatoId));

    // Busca idiomas
    const idiomas = await db
      .select()
      .from(candidatoIdiomas)
      .where(eq(candidatoIdiomas.candidatoId, candidatoId));

    // Busca certificações
    const certificacoes = await db
      .select()
      .from(candidatoCertificacoes)
      .where(eq(candidatoCertificacoes.candidatoId, candidatoId));

    return NextResponse.json({
      id: candidato.id,
      nome: candidato.nome,
      email: candidato.email,
      telefone: candidato.telefone || "",
      linkedin: candidato.linkedin || "",
      status: preferencias?.status || "ativo",
      preferenciaTrabalho: preferencias?.preferenciaTrabalho || "indiferente",
      aceitaViagem: preferencias?.aceitaViagem ?? false,
      aceitaMudanca: preferencias?.aceitaMudanca ?? false,
      pretensaoSalarialMin: preferencias?.pretensaoSalarialMin || 0,
      pretensaoSalarialMax: preferencias?.pretensaoSalarialMax || 0,
      disponibilidadeImediata: preferencias?.disponibilidadeImediata ?? false,
      cidade: preferencias?.cidade || "",
      estado: preferencias?.estado || "",
      pais: preferencias?.pais || "Brasil",
      resumoProfissional: preferencias?.resumoProfissional || "",
      cvUrl: preferencias?.cvUrl || "",
      experiencias: experiencias.map((exp) => ({
        id: exp.id,
        cargo: exp.cargo,
        empresa: exp.empresa,
        localidade: exp.localidade || "",
        descricao: exp.descricao || "",
        dataInicio: exp.dataInicio?.toISOString() || "",
        dataFim: exp.dataFim?.toISOString() || "",
        atual: exp.atual,
        nivel: exp.nivel || "",
      })),
      formacoes: formacoes.map((form) => ({
        id: form.id,
        instituicao: form.instituicao,
        curso: form.curso,
        area: form.area || "",
        nivel: form.nivel,
        dataInicio: form.dataInicio?.toISOString() || "",
        dataFim: form.dataFim?.toISOString() || "",
        emAndamento: form.emAndamento,
      })),
      skills: skills.map((skill) => ({
        id: skill.id,
        nome: skill.nome,
        categoria: skill.categoria || "",
        nivel: skill.nivel || "intermediario",
        anosExperiencia: skill.anosExperiencia || 0,
      })),
      idiomas: idiomas.map((idioma) => ({
        id: idioma.id,
        idioma: idioma.idioma,
        nivel: idioma.nivel,
        certificacao: idioma.certificacao || "",
      })),
      certificacoes: certificacoes.map((cert) => ({
        id: cert.id,
        nome: cert.nome,
        instituicao: cert.instituicao,
        dataEmissao: cert.dataEmissao?.toISOString() || "",
        dataExpiracao: cert.dataExpiracao?.toISOString() || "",
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/candidatos/[id]/perfil
 * Atualiza o perfil completo do candidato
 */
export async function PUT(request: NextRequest, { params }: Params) {
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

    const body = await request.json();

    // Atualiza dados básicos do candidato
    await db
      .update(candidatos)
      .set({
        nome: body.nome,
        email: body.email?.toLowerCase(),
        telefone: body.telefone || null,
        linkedin: body.linkedin || null,
        updatedAt: new Date(),
      })
      .where(eq(candidatos.id, candidatoId));

    // Atualiza ou cria preferências
    const [existingPrefs] = await db
      .select()
      .from(candidatoPreferencias)
      .where(eq(candidatoPreferencias.candidatoId, candidatoId));

    const prefsData = {
      status: body.status as "ativo" | "em_processo" | "contratado" | "indisponivel" | "blacklist",
      preferenciaTrabalho: body.preferenciaTrabalho as "remoto" | "hibrido" | "presencial" | "indiferente",
      aceitaViagem: body.aceitaViagem ?? false,
      aceitaMudanca: body.aceitaMudanca ?? false,
      pretensaoSalarialMin: body.pretensaoSalarialMin || null,
      pretensaoSalarialMax: body.pretensaoSalarialMax || null,
      disponibilidadeImediata: body.disponibilidadeImediata ?? false,
      cidade: body.cidade || null,
      estado: body.estado || null,
      pais: body.pais || "Brasil",
      resumoProfissional: body.resumoProfissional || null,
      updatedAt: new Date(),
    };

    if (existingPrefs) {
      await db
        .update(candidatoPreferencias)
        .set(prefsData)
        .where(eq(candidatoPreferencias.candidatoId, candidatoId));
    } else {
      await db.insert(candidatoPreferencias).values({
        candidatoId,
        ...prefsData,
      });
    }

    // Atualiza experiências (delete e reinsere)
    await db
      .delete(candidatoExperiencias)
      .where(eq(candidatoExperiencias.candidatoId, candidatoId));

    if (body.experiencias?.length > 0) {
      await db.insert(candidatoExperiencias).values(
        body.experiencias.map((exp: { cargo: string; empresa: string; localidade?: string; descricao?: string; dataInicio: string; dataFim?: string; atual?: boolean; nivel?: string }) => ({
          candidatoId,
          cargo: exp.cargo,
          empresa: exp.empresa,
          localidade: exp.localidade || null,
          descricao: exp.descricao || null,
          dataInicio: exp.dataInicio ? new Date(exp.dataInicio) : new Date(),
          dataFim: exp.dataFim ? new Date(exp.dataFim) : null,
          atual: exp.atual ?? false,
          nivel: (exp.nivel as "estagiario" | "junior" | "pleno" | "senior" | "especialista" | "gerente" | "diretor" | "c_level") || null,
        }))
      );
    }

    // Atualiza formações
    await db
      .delete(candidatoFormacoes)
      .where(eq(candidatoFormacoes.candidatoId, candidatoId));

    if (body.formacoes?.length > 0) {
      await db.insert(candidatoFormacoes).values(
        body.formacoes.map((form: { instituicao: string; curso: string; area?: string; nivel: string; dataInicio?: string; dataFim?: string; emAndamento?: boolean }) => ({
          candidatoId,
          instituicao: form.instituicao,
          curso: form.curso,
          area: form.area || null,
          nivel: form.nivel as "ensino_medio" | "tecnico" | "graduacao" | "pos_graduacao" | "mba" | "mestrado" | "doutorado",
          dataInicio: form.dataInicio ? new Date(form.dataInicio) : null,
          dataFim: form.dataFim ? new Date(form.dataFim) : null,
          emAndamento: form.emAndamento ?? false,
        }))
      );
    }

    // Atualiza skills
    await db
      .delete(candidatoSkills)
      .where(eq(candidatoSkills.candidatoId, candidatoId));

    if (body.skills?.length > 0) {
      await db.insert(candidatoSkills).values(
        body.skills.map((skill: { nome: string; categoria?: string; nivel?: string; anosExperiencia?: number }) => ({
          candidatoId,
          nome: skill.nome,
          categoria: skill.categoria || null,
          nivel: (skill.nivel as "basico" | "intermediario" | "avancado" | "expert") || null,
          anosExperiencia: skill.anosExperiencia || null,
          origem: "manual" as const,
        }))
      );
    }

    // Atualiza idiomas
    await db
      .delete(candidatoIdiomas)
      .where(eq(candidatoIdiomas.candidatoId, candidatoId));

    if (body.idiomas?.length > 0) {
      await db.insert(candidatoIdiomas).values(
        body.idiomas.map((idioma: { idioma: string; nivel: string; certificacao?: string }) => ({
          candidatoId,
          idioma: idioma.idioma,
          nivel: idioma.nivel as "basico" | "intermediario" | "avancado" | "fluente" | "nativo",
          certificacao: idioma.certificacao || null,
        }))
      );
    }

    // Atualiza certificações
    await db
      .delete(candidatoCertificacoes)
      .where(eq(candidatoCertificacoes.candidatoId, candidatoId));

    if (body.certificacoes?.length > 0) {
      await db.insert(candidatoCertificacoes).values(
        body.certificacoes.map((cert: { nome: string; instituicao: string; dataEmissao?: string; dataExpiracao?: string }) => ({
          candidatoId,
          nome: cert.nome,
          instituicao: cert.instituicao,
          dataEmissao: cert.dataEmissao ? new Date(cert.dataEmissao) : null,
          dataExpiracao: cert.dataExpiracao ? new Date(cert.dataExpiracao) : null,
        }))
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
