"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Award,
  MapPin,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Experiencia {
  id?: string;
  cargo: string;
  empresa: string;
  localidade: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  atual: boolean;
  nivel: string;
}

interface Formacao {
  id?: string;
  instituicao: string;
  curso: string;
  area: string;
  nivel: string;
  dataInicio: string;
  dataFim: string;
  emAndamento: boolean;
}

interface Skill {
  id?: string;
  nome: string;
  categoria: string;
  nivel: string;
  anosExperiencia: number;
}

interface Idioma {
  id?: string;
  idioma: string;
  nivel: string;
  certificacao: string;
}

interface Certificacao {
  id?: string;
  nome: string;
  instituicao: string;
  dataEmissao: string;
  dataExpiracao: string;
}

interface CandidatoPerfil {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  status: string;
  preferenciaTrabalho: string;
  aceitaViagem: boolean;
  aceitaMudanca: boolean;
  pretensaoSalarialMin: number;
  pretensaoSalarialMax: number;
  disponibilidadeImediata: boolean;
  cidade: string;
  estado: string;
  pais: string;
  resumoProfissional: string;
  cvUrl: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  skills: Skill[];
  idiomas: Idioma[];
  certificacoes: Certificacao[];
}

const NIVEIS_EXPERIENCIA = [
  { value: "estagiario", label: "Estagiário" },
  { value: "junior", label: "Júnior" },
  { value: "pleno", label: "Pleno" },
  { value: "senior", label: "Sênior" },
  { value: "especialista", label: "Especialista" },
  { value: "gerente", label: "Gerente" },
  { value: "diretor", label: "Diretor" },
  { value: "c_level", label: "C-Level" },
];

const NIVEIS_FORMACAO = [
  { value: "ensino_medio", label: "Ensino Médio" },
  { value: "tecnico", label: "Técnico" },
  { value: "graduacao", label: "Graduação" },
  { value: "pos_graduacao", label: "Pós-Graduação" },
  { value: "mba", label: "MBA" },
  { value: "mestrado", label: "Mestrado" },
  { value: "doutorado", label: "Doutorado" },
];

const NIVEIS_IDIOMA = [
  { value: "basico", label: "Básico" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
  { value: "fluente", label: "Fluente" },
  { value: "nativo", label: "Nativo" },
];

const NIVEIS_SKILL = [
  { value: "basico", label: "Básico" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
  { value: "expert", label: "Expert" },
];

const STATUS_CANDIDATO = [
  { value: "ativo", label: "Ativo" },
  { value: "em_processo", label: "Em Processo" },
  { value: "contratado", label: "Contratado" },
  { value: "indisponivel", label: "Indisponível" },
  { value: "blacklist", label: "Blacklist" },
];

const PREFERENCIAS_TRABALHO = [
  { value: "remoto", label: "Remoto" },
  { value: "hibrido", label: "Híbrido" },
  { value: "presencial", label: "Presencial" },
  { value: "indiferente", label: "Indiferente" },
];

export default function EditarCandidatoPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const candidatoId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parseAlerts, setParseAlerts] = useState<string[]>([]);
  const [perfil, setPerfil] = useState<CandidatoPerfil>({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    status: "ativo",
    preferenciaTrabalho: "indiferente",
    aceitaViagem: false,
    aceitaMudanca: false,
    pretensaoSalarialMin: 0,
    pretensaoSalarialMax: 0,
    disponibilidadeImediata: false,
    cidade: "",
    estado: "",
    pais: "Brasil",
    resumoProfissional: "",
    cvUrl: "",
    experiencias: [],
    formacoes: [],
    skills: [],
    idiomas: [],
    certificacoes: [],
  });

  const fetchPerfil = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/candidatos/${candidatoId}/perfil`);
      if (response.ok) {
        const data = await response.json();
        setPerfil(data);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil do candidato",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [candidatoId, toast]);

  useEffect(() => {
    fetchPerfil();
  }, [fetchPerfil]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/candidatos/${candidatoId}/perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(perfil),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso",
        });
        router.push(`/candidatos/${candidatoId}`);
      } else {
        throw new Error("Erro ao salvar");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o perfil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/candidatos/${candidatoId}/upload-cv`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: data.parsed
            ? `CV processado! Extraídos: ${data.dadosExtraidos.experiencias} experiências, ${data.dadosExtraidos.skills} skills`
            : "CV enviado com sucesso",
        });

        if (data.alertas && data.alertas.length > 0) {
          setParseAlerts(data.alertas);
        }

        // Recarrega o perfil para mostrar os dados extraídos
        await fetchPerfil();
      } else {
        throw new Error(data.error || "Erro ao enviar CV");
      }
    } catch (error) {
      console.error("Erro ao enviar CV:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao enviar CV",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handlers para listas
  const addExperiencia = () => {
    setPerfil((p) => ({
      ...p,
      experiencias: [
        ...p.experiencias,
        {
          cargo: "",
          empresa: "",
          localidade: "",
          descricao: "",
          dataInicio: "",
          dataFim: "",
          atual: false,
          nivel: "",
        },
      ],
    }));
  };

  const updateExperiencia = (index: number, field: keyof Experiencia, value: string | boolean) => {
    setPerfil((p) => ({
      ...p,
      experiencias: p.experiencias.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperiencia = (index: number) => {
    setPerfil((p) => ({
      ...p,
      experiencias: p.experiencias.filter((_, i) => i !== index),
    }));
  };

  const addFormacao = () => {
    setPerfil((p) => ({
      ...p,
      formacoes: [
        ...p.formacoes,
        {
          instituicao: "",
          curso: "",
          area: "",
          nivel: "graduacao",
          dataInicio: "",
          dataFim: "",
          emAndamento: false,
        },
      ],
    }));
  };

  const updateFormacao = (index: number, field: keyof Formacao, value: string | boolean) => {
    setPerfil((p) => ({
      ...p,
      formacoes: p.formacoes.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      ),
    }));
  };

  const removeFormacao = (index: number) => {
    setPerfil((p) => ({
      ...p,
      formacoes: p.formacoes.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setPerfil((p) => ({
      ...p,
      skills: [
        ...p.skills,
        { nome: "", categoria: "", nivel: "intermediario", anosExperiencia: 0 },
      ],
    }));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    setPerfil((p) => ({
      ...p,
      skills: p.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (index: number) => {
    setPerfil((p) => ({
      ...p,
      skills: p.skills.filter((_, i) => i !== index),
    }));
  };

  const addIdioma = () => {
    setPerfil((p) => ({
      ...p,
      idiomas: [
        ...p.idiomas,
        { idioma: "", nivel: "intermediario", certificacao: "" },
      ],
    }));
  };

  const updateIdioma = (index: number, field: keyof Idioma, value: string) => {
    setPerfil((p) => ({
      ...p,
      idiomas: p.idiomas.map((idioma, i) =>
        i === index ? { ...idioma, [field]: value } : idioma
      ),
    }));
  };

  const removeIdioma = (index: number) => {
    setPerfil((p) => ({
      ...p,
      idiomas: p.idiomas.filter((_, i) => i !== index),
    }));
  };

  const addCertificacao = () => {
    setPerfil((p) => ({
      ...p,
      certificacoes: [
        ...p.certificacoes,
        { nome: "", instituicao: "", dataEmissao: "", dataExpiracao: "" },
      ],
    }));
  };

  const updateCertificacao = (index: number, field: keyof Certificacao, value: string) => {
    setPerfil((p) => ({
      ...p,
      certificacoes: p.certificacoes.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertificacao = (index: number) => {
    setPerfil((p) => ({
      ...p,
      certificacoes: p.certificacoes.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Editar Perfil</h1>
            <p className="text-muted-foreground">{perfil.nome || "Novo Candidato"}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Salvar
        </Button>
      </div>

      {/* Alertas de parsing */}
      {parseAlerts.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Atenção:</strong> A IA detectou possíveis inconsistências no CV:
            <ul className="mt-2 list-disc list-inside">
              {parseAlerts.map((alert, i) => (
                <li key={i}>{alert}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Upload de CV */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Currículo
          </CardTitle>
          <CardDescription>
            Faça upload do CV para extração automática de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleUploadCV}
              disabled={uploading}
              className="max-w-xs"
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
            {perfil.cvUrl && (
              <a
                href={perfil.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Ver CV atual
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs de edição */}
      <Tabs defaultValue="dados" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dados" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Dados</span>
          </TabsTrigger>
          <TabsTrigger value="experiencias" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Experiência</span>
          </TabsTrigger>
          <TabsTrigger value="formacao" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Formação</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="idiomas" className="flex items-center gap-1">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Idiomas</span>
          </TabsTrigger>
          <TabsTrigger value="certificacoes" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Certificações</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab: Dados Pessoais */}
        <TabsContent value="dados">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais e Preferências</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dados básicos */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    value={perfil.nome}
                    onChange={(e) => setPerfil((p) => ({ ...p, nome: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={perfil.email}
                    onChange={(e) => setPerfil((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={perfil.telefone}
                    onChange={(e) => setPerfil((p) => ({ ...p, telefone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={perfil.linkedin}
                    onChange={(e) => setPerfil((p) => ({ ...p, linkedin: e.target.value }))}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              {/* Status e preferências */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={perfil.status}
                    onValueChange={(value) => setPerfil((p) => ({ ...p, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_CANDIDATO.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferência de trabalho</Label>
                  <Select
                    value={perfil.preferenciaTrabalho}
                    onValueChange={(value) => setPerfil((p) => ({ ...p, preferenciaTrabalho: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PREFERENCIAS_TRABALHO.map((pref) => (
                        <SelectItem key={pref.value} value={pref.value}>
                          {pref.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Localização */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={perfil.cidade}
                    onChange={(e) => setPerfil((p) => ({ ...p, cidade: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={perfil.estado}
                    onChange={(e) => setPerfil((p) => ({ ...p, estado: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Input
                    id="pais"
                    value={perfil.pais}
                    onChange={(e) => setPerfil((p) => ({ ...p, pais: e.target.value }))}
                  />
                </div>
              </div>

              {/* Pretensão salarial */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salarioMin">Pretensão salarial (mín)</Label>
                  <Input
                    id="salarioMin"
                    type="number"
                    value={perfil.pretensaoSalarialMin || ""}
                    onChange={(e) =>
                      setPerfil((p) => ({ ...p, pretensaoSalarialMin: Number(e.target.value) }))
                    }
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salarioMax">Pretensão salarial (máx)</Label>
                  <Input
                    id="salarioMax"
                    type="number"
                    value={perfil.pretensaoSalarialMax || ""}
                    onChange={(e) =>
                      setPerfil((p) => ({ ...p, pretensaoSalarialMax: Number(e.target.value) }))
                    }
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>

              {/* Switches */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="disponibilidade"
                    checked={perfil.disponibilidadeImediata}
                    onCheckedChange={(checked) =>
                      setPerfil((p) => ({ ...p, disponibilidadeImediata: checked }))
                    }
                  />
                  <Label htmlFor="disponibilidade">Disponibilidade imediata</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="viagem"
                    checked={perfil.aceitaViagem}
                    onCheckedChange={(checked) =>
                      setPerfil((p) => ({ ...p, aceitaViagem: checked }))
                    }
                  />
                  <Label htmlFor="viagem">Aceita viagens</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="mudanca"
                    checked={perfil.aceitaMudanca}
                    onCheckedChange={(checked) =>
                      setPerfil((p) => ({ ...p, aceitaMudanca: checked }))
                    }
                  />
                  <Label htmlFor="mudanca">Aceita mudança</Label>
                </div>
              </div>

              {/* Resumo profissional */}
              <div className="space-y-2">
                <Label htmlFor="resumo">Resumo profissional</Label>
                <Textarea
                  id="resumo"
                  value={perfil.resumoProfissional}
                  onChange={(e) => setPerfil((p) => ({ ...p, resumoProfissional: e.target.value }))}
                  rows={4}
                  placeholder="Breve descrição da trajetória profissional..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Experiências */}
        <TabsContent value="experiencias">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Experiências Profissionais</CardTitle>
                <CardDescription>Adicione as experiências de trabalho do candidato</CardDescription>
              </div>
              <Button onClick={addExperiencia} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {perfil.experiencias.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma experiência cadastrada</p>
                </div>
              ) : (
                perfil.experiencias.map((exp, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Experiência {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperiencia(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input
                          value={exp.cargo}
                          onChange={(e) => updateExperiencia(index, "cargo", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Empresa</Label>
                        <Input
                          value={exp.empresa}
                          onChange={(e) => updateExperiencia(index, "empresa", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Localidade</Label>
                        <Input
                          value={exp.localidade}
                          onChange={(e) => updateExperiencia(index, "localidade", e.target.value)}
                          placeholder="Cidade, Estado"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nível</Label>
                        <Select
                          value={exp.nivel}
                          onValueChange={(value) => updateExperiencia(index, "nivel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {NIVEIS_EXPERIENCIA.map((nivel) => (
                              <SelectItem key={nivel.value} value={nivel.value}>
                                {nivel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Data de início</Label>
                        <Input
                          type="date"
                          value={exp.dataInicio?.split("T")[0] || ""}
                          onChange={(e) => updateExperiencia(index, "dataInicio", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Data de término</Label>
                        <Input
                          type="date"
                          value={exp.dataFim?.split("T")[0] || ""}
                          onChange={(e) => updateExperiencia(index, "dataFim", e.target.value)}
                          disabled={exp.atual}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={exp.atual}
                        onCheckedChange={(checked) => updateExperiencia(index, "atual", checked)}
                      />
                      <Label>Trabalho atual</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Textarea
                        value={exp.descricao}
                        onChange={(e) => updateExperiencia(index, "descricao", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Formação */}
        <TabsContent value="formacao">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Formação Acadêmica</CardTitle>
                <CardDescription>Adicione a formação acadêmica do candidato</CardDescription>
              </div>
              <Button onClick={addFormacao} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {perfil.formacoes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma formação cadastrada</p>
                </div>
              ) : (
                perfil.formacoes.map((form, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Formação {index + 1}</Badge>
                      <Button variant="ghost" size="icon" onClick={() => removeFormacao(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Instituição</Label>
                        <Input
                          value={form.instituicao}
                          onChange={(e) => updateFormacao(index, "instituicao", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Curso</Label>
                        <Input
                          value={form.curso}
                          onChange={(e) => updateFormacao(index, "curso", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Área</Label>
                        <Input
                          value={form.area}
                          onChange={(e) => updateFormacao(index, "area", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nível</Label>
                        <Select
                          value={form.nivel}
                          onValueChange={(value) => updateFormacao(index, "nivel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {NIVEIS_FORMACAO.map((nivel) => (
                              <SelectItem key={nivel.value} value={nivel.value}>
                                {nivel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Data de início</Label>
                        <Input
                          type="date"
                          value={form.dataInicio?.split("T")[0] || ""}
                          onChange={(e) => updateFormacao(index, "dataInicio", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Data de conclusão</Label>
                        <Input
                          type="date"
                          value={form.dataFim?.split("T")[0] || ""}
                          onChange={(e) => updateFormacao(index, "dataFim", e.target.value)}
                          disabled={form.emAndamento}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={form.emAndamento}
                        onCheckedChange={(checked) => updateFormacao(index, "emAndamento", checked)}
                      />
                      <Label>Em andamento</Label>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Skills */}
        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Skills e Competências</CardTitle>
                <CardDescription>Adicione as habilidades do candidato</CardDescription>
              </div>
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {perfil.skills.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma skill cadastrada</p>
                </div>
              ) : (
                perfil.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4 border rounded-lg p-4">
                    <div className="flex-1 grid gap-4 sm:grid-cols-4">
                      <Input
                        placeholder="Nome da skill"
                        value={skill.nome}
                        onChange={(e) => updateSkill(index, "nome", e.target.value)}
                      />
                      <Input
                        placeholder="Categoria"
                        value={skill.categoria}
                        onChange={(e) => updateSkill(index, "categoria", e.target.value)}
                      />
                      <Select
                        value={skill.nivel}
                        onValueChange={(value) => updateSkill(index, "nivel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Nível" />
                        </SelectTrigger>
                        <SelectContent>
                          {NIVEIS_SKILL.map((nivel) => (
                            <SelectItem key={nivel.value} value={nivel.value}>
                              {nivel.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Anos"
                        value={skill.anosExperiencia || ""}
                        onChange={(e) => updateSkill(index, "anosExperiencia", Number(e.target.value))}
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Idiomas */}
        <TabsContent value="idiomas">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Idiomas</CardTitle>
                <CardDescription>Adicione os idiomas que o candidato domina</CardDescription>
              </div>
              <Button onClick={addIdioma} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {perfil.idiomas.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum idioma cadastrado</p>
                </div>
              ) : (
                perfil.idiomas.map((idioma, index) => (
                  <div key={index} className="flex items-center gap-4 border rounded-lg p-4">
                    <div className="flex-1 grid gap-4 sm:grid-cols-3">
                      <Input
                        placeholder="Idioma"
                        value={idioma.idioma}
                        onChange={(e) => updateIdioma(index, "idioma", e.target.value)}
                      />
                      <Select
                        value={idioma.nivel}
                        onValueChange={(value) => updateIdioma(index, "nivel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Nível" />
                        </SelectTrigger>
                        <SelectContent>
                          {NIVEIS_IDIOMA.map((nivel) => (
                            <SelectItem key={nivel.value} value={nivel.value}>
                              {nivel.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Certificação (opcional)"
                        value={idioma.certificacao}
                        onChange={(e) => updateIdioma(index, "certificacao", e.target.value)}
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeIdioma(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Certificações */}
        <TabsContent value="certificacoes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Certificações</CardTitle>
                <CardDescription>Adicione as certificações do candidato</CardDescription>
              </div>
              <Button onClick={addCertificacao} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {perfil.certificacoes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma certificação cadastrada</p>
                </div>
              ) : (
                perfil.certificacoes.map((cert, index) => (
                  <div key={index} className="flex items-center gap-4 border rounded-lg p-4">
                    <div className="flex-1 grid gap-4 sm:grid-cols-4">
                      <Input
                        placeholder="Nome da certificação"
                        value={cert.nome}
                        onChange={(e) => updateCertificacao(index, "nome", e.target.value)}
                      />
                      <Input
                        placeholder="Instituição"
                        value={cert.instituicao}
                        onChange={(e) => updateCertificacao(index, "instituicao", e.target.value)}
                      />
                      <Input
                        type="date"
                        value={cert.dataEmissao?.split("T")[0] || ""}
                        onChange={(e) => updateCertificacao(index, "dataEmissao", e.target.value)}
                      />
                      <Input
                        type="date"
                        placeholder="Expiração (opcional)"
                        value={cert.dataExpiracao?.split("T")[0] || ""}
                        onChange={(e) => updateCertificacao(index, "dataExpiracao", e.target.value)}
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeCertificacao(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
