# Roadmap Entrevistia - Pós v1.00.00

> **Visão:** Ser a plataforma de recrutamento mais inteligente e completa do mercado, usando IA para eliminar trabalho repetitivo e vieses, enquanto mantém o humano no controle das decisões importantes.

---

## 📊 Estado Atual (v1.01.00)

### ✅ Funcionalidades Implementadas

**Core (v1.00.00):**
- Criação e gestão de vagas/entrevistas
- Banco de 4.500+ perguntas
- Entrevista por IA (vídeo/áudio)
- Transcrição automática (OpenAI Whisper)
- Análise de candidatos por IA (Claude Sonnet)
- Avaliação de 10 competências em 5 categorias
- Recomendação automática (recomendado/ressalvas/não recomendado)
- Sistema de billing e transações
- Autenticação e autorização
- Rate limiting e segurança

**Módulo 1 - Página do Candidato (v1.01.00):**
- OAuth com LinkedIn e Google para candidatos
- Magic link (autenticação sem senha)
- Upload de CV com parsing por IA
- Extração inteligente de dados (experiências, formação, skills, idiomas, certificações)
- Normalização automática de dados (cargos, empresas, skills)
- Validação e detecção de inconsistências
- Tela de edição completa do perfil
- Sistema de tags para candidatos
- Portal LGPD (acesso, exclusão, portabilidade de dados)
- Preferências de trabalho (remoto, híbrido, salário, disponibilidade)

**Módulo 12 - Agenda e Calendário (v1.01.00):**
- Integração Google Calendar (OAuth, criação de eventos, free/busy)
- Self-scheduling (candidato escolhe horário via link público)
- Cálculo inteligente de slots disponíveis
- Detecção de conflitos de horário
- Lembretes automáticos (24h, 1h, 15min via cron)
- Calendário visual com views semana/mês
- Configuração de disponibilidade por dia da semana
- Bloqueios de horário
- Geração automática de Google Meet

**Módulo 13 - Comunicação Básica (v1.01.00):**
- 9 templates de email padrão pré-configurados
- Variáveis dinâmicas e condicionais em templates
- Caixa de entrada unificada com filtros e busca
- Envio de mensagens com seleção de template
- Histórico de comunicações por candidato
- Tracking de status de email (enviada, aberta, erro)

### 🤖 IA Atualmente em Uso
| Funcionalidade | Provedor | Modelo | Arquivo |
|----------------|----------|--------|---------|
| Transcrição de áudio | OpenAI | whisper-1 | `app/api/transcricao/route.ts` |
| Análise de entrevista | Anthropic | claude-sonnet-4-20250514 | `lib/ai/agent.ts` |
| Parsing de CV | Anthropic | claude-sonnet-4-20250514 | `lib/ai/cv-parser.ts` |
| Normalização de dados | Anthropic | claude-sonnet-4-20250514 | `lib/ai/cv-parser.ts` |

---

## 🎯 Visão Geral dos Módulos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PLATAFORMA ENTREVISTIA                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ENTRADA DE CANDIDATOS                                                  │
│  ├─ Módulo 1: Página do Candidato (cadastro, LinkedIn, CV)             │
│  ├─ Módulo 14: Página de Carreiras (site white-label)                  │
│  ├─ Módulo 15: Banco de Talentos (pool para futuro)                    │
│  └─ Módulo 18: Programa de Indicação (referral)                        │
│                                                                         │
│  INTELIGÊNCIA E MATCHING                                                │
│  ├─ Módulo 2: Banco de Skills (taxonomia, extração)                    │
│  ├─ Módulo 3: Scanner Inteligente (matching IA)                        │
│  └─ Módulo 8: Triagem Automática (ranking de CVs)                      │
│                                                                         │
│  PROCESSO SELETIVO                                                      │
│  ├─ Módulo 4: Trilha Configurável (builder de etapas)                  │
│  ├─ Módulo 5: Entrevista Humana Assistida (Google Meet + IA)           │
│  ├─ Módulo 6: Prova Teórica (geração, correção, anti-fraude)           │
│  ├─ Módulo 7: Avaliação Comportamental (DISC, fit cultural)            │
│  ├─ Módulo 9: Aprovação do Gestor (workflow interno)                   │
│  └─ Módulo 10: Teste Técnico (coding, cases)                           │
│                                                                         │
│  FECHAMENTO                                                             │
│  ├─ Módulo 11: Proposta e Oferta (envio, negociação)                   │
│  └─ Módulo 17: Onboarding (checklist pós-contratação)                  │
│                                                                         │
│  INFRAESTRUTURA                                                         │
│  ├─ Módulo 12: Agenda e Calendário (Google, Outlook)                   │
│  ├─ Módulo 13: Comunicação (email, WhatsApp, SMS)                      │
│  ├─ Módulo 16: Relatórios e Analytics (dashboards, métricas)           │
│  ├─ Módulo 19: Integrações (LinkedIn, Indeed, HRIS)                    │
│  ├─ Módulo 20: API Pública (enterprise)                                │
│  └─ Módulo 21: Multi-idiomas (PT, EN, ES)                              │
│                                                                         │
│  FUTURO                                                                 │
│  └─ Testes Psicológicos (requer psicólogo CRP)                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 📦 MÓDULOS DETALHADOS

---

## 🎯 Módulo 1: Página do Candidato ✅ IMPLEMENTADO

> **Objetivo:** Centralizar todas as informações do candidato, permitindo cadastro rápido via LinkedIn e edição completa do perfil.
>
> **Status:** ✅ Implementado em v1.01.00 (25/03/2026)

### 1.1 Cadastro pelo Recrutador
- [x] Formulário mínimo: email + URL do LinkedIn
- [ ] Importação em lote (CSV, Excel) *(pendente)*
- [ ] Disparo automático de convite para completar perfil *(pendente)*
- [ ] QR Code para cadastro rápido em eventos *(pendente)*

### 1.2 Auto-cadastro do Candidato
- [x] Login/cadastro via LinkedIn OAuth 2.0
- [x] Login via Google (alternativa)
- [x] Magic link por email (sem senha)
- [ ] Importação automática de dados do LinkedIn *(pendente - requer LinkedIn API aprovação)*
- [x] Upload de CV (PDF, DOCX) com parsing automático

### 1.3 Extração Inteligente de Dados (🤖 IA)
- [ ] **Parser de LinkedIn:** experiência, formação, skills, certificações *(pendente - requer LinkedIn API)*
- [x] **Parser de CV:** extração estruturada de PDF/DOCX (usando Claude claude-sonnet-4-20250514)
- [x] **Normalização por IA:** padroniza cargos, empresas, datas
- [x] **Validação opcional:** IA detecta inconsistências (ex: datas sobrepostas)
- [ ] **Enriquecimento:** busca informações públicas complementares *(pendente)*

### 1.4 Gestão do Perfil
- [x] Tela de edição completa e intuitiva (`/candidatos/[id]/editar`)
- [x] Seções: dados pessoais, experiência, formação, skills, idiomas, certificações
- [ ] Foto de perfil (upload ou LinkedIn) *(pendente)*
- [ ] Histórico de alterações (auditoria) *(pendente)*
- [x] Status: ativo, em processo, contratado, indisponível, blacklist
- [x] Tags e notas internas (só recrutador vê)
- [x] Pretensão salarial e disponibilidade
- [x] Preferências: remoto, híbrido, presencial, viagem, mudança

### 1.5 Privacidade e LGPD
- [ ] Candidato controla visibilidade dos dados *(pendente)*
- [x] Consentimento explícito para cada uso
- [x] Direito ao esquecimento (deletar dados) - com período de arrependimento de 30 dias
- [x] Exportação de dados pessoais (portabilidade)
- [x] Portal LGPD para candidatos (`/meus-dados`)

### 📁 Arquivos Implementados (Módulo 1)

**Schemas do Banco de Dados:**
- `lib/db/schema/candidato-perfil.ts` - Experiências, formações, skills, idiomas, certificações, preferências, tags
- `lib/db/schema/magic-links.ts` - Magic links para autenticação

**Autenticação:**
- `auth.config.ts` - OAuth providers (LinkedIn, Google) + extensão de tipos
- `types/next-auth.d.ts` - Tipos estendidos para candidatos e recrutadores
- `lib/auth/magic-link.ts` - Serviço de magic link (criar, validar, enviar email)
- `app/api/auth/magic-link/route.ts` - API para criar magic link
- `app/api/auth/magic-link/validate/route.ts` - API para validar magic link
- `app/auth/magic-link/page.tsx` - Página de validação do magic link

**Armazenamento:**
- `lib/storage/blob.ts` - Utilitários para Vercel Blob (upload de CV)

**Parser de CV (IA):**
- `lib/ai/cv-parser.ts` - Extração, normalização e validação de dados de CV

**APIs:**
- `app/api/candidatos/[id]/upload-cv/route.ts` - Upload e parsing de CV
- `app/api/candidatos/[id]/perfil/route.ts` - GET/PUT do perfil completo
- `app/api/candidatos/[id]/tags/route.ts` - CRUD de tags
- `app/api/candidatos/[id]/lgpd/route.ts` - Direitos LGPD (acesso, exclusão, correção)
- `app/api/meus-dados/verificar/route.ts` - Verificar sessão do candidato

**Páginas:**
- `app/(dashboard)/candidatos/[id]/editar/page.tsx` - Edição completa do perfil
- `app/(public)/meus-dados/page.tsx` - Portal LGPD do candidato

**Migração:**
- `drizzle/migrations/0004_candidato_modulo1.sql` - Criação das novas tabelas e enums

### ⚙️ Configuração Necessária

Para usar as funcionalidades do Módulo 1, configure as variáveis de ambiente:

```env
# LinkedIn OAuth (opcional - para auto-cadastro)
AUTH_LINKEDIN_ID=seu_linkedin_client_id
AUTH_LINKEDIN_SECRET=seu_linkedin_client_secret

# Google OAuth (opcional - para auto-cadastro)
AUTH_GOOGLE_ID=seu_google_client_id
AUTH_GOOGLE_SECRET=seu_google_client_secret

# Vercel Blob (para upload de CV)
BLOB_READ_WRITE_TOKEN=seu_blob_token
```

### 🚀 Para Rodar

1. Execute a migração do banco: `npm run db:migrate`
2. Configure as variáveis de ambiente acima
3. Para LinkedIn/Google OAuth, crie os apps nos respectivos developer consoles

---

## 🎯 Módulo 2: Banco de Skills

> **Objetivo:** Criar uma base padronizada de competências para matching preciso entre candidatos e vagas.

### 2.1 Extração Automática de Skills (🤖 IA)
- [ ] IA analisa CV e LinkedIn e extrai skills
- [ ] Detecta skills implícitas (ex: "desenvolvi em React" → React, JavaScript, Frontend)
- [ ] Categorização automática:
  - **Técnicas:** linguagens, frameworks, ferramentas
  - **Comportamentais:** liderança, comunicação, trabalho em equipe
  - **Idiomas:** nível (básico, intermediário, avançado, fluente, nativo)
  - **Certificações:** AWS, PMP, Scrum, etc.
  - **Domínios:** finanças, saúde, varejo, etc.

### 2.2 Taxonomia Padronizada
- [ ] Base de skills curada (início com ~5.000 skills)
- [ ] Sinônimos e agrupamentos:
  - "React" = "ReactJS" = "React.js"
  - "Node" = "Node.js" = "NodeJS"
- [ ] Hierarquia: Frontend > JavaScript > React > React Hooks
- [ ] Skills relacionadas (quem sabe React provavelmente sabe JavaScript)
- [ ] Atualização contínua baseada em uso

### 2.3 Níveis de Proficiência
- [ ] Escala: Básico (1) → Intermediário (2) → Avançado (3) → Expert (4)
- [ ] Autodeclarado pelo candidato
- [ ] Validado por provas/testes (opcional)
- [ ] Inferido pela IA (anos de experiência, contexto)

### 2.4 Página de Skills do Candidato
- [ ] Visualização clara das skills extraídas
- [ ] Candidato pode editar, adicionar, remover
- [ ] Indicador de confiança (IA vs confirmado vs validado)
- [ ] Sugestões de skills para adicionar

### 2.5 Skills da Vaga
- [ ] Recrutador define skills obrigatórias e desejáveis
- [ ] Autocomplete inteligente da base
- [ ] Sugestão de skills baseada no cargo
- [ ] Peso/importância por skill

---

## 🎯 Módulo 3: Scanner Inteligente de Candidatos

> **Objetivo:** Encontrar automaticamente os melhores candidatos do banco para cada vaga.

### 3.1 Matching Vaga x Candidato (🤖 IA)
- [ ] Algoritmo compara skills, experiência, formação
- [ ] Score de fit: 0-100%
- [ ] Breakdown do score (quanto cada critério contribuiu)
- [ ] Ranking dos N melhores candidatos
- [ ] Matching semântico (não só keyword exata)

### 3.2 Critérios de Matching
- [ ] Skills (obrigatórias vs desejáveis, com pesos)
- [ ] Anos de experiência (total e específica)
- [ ] Formação (área, nível)
- [ ] Localização (considera remoto, híbrido)
- [ ] Pretensão salarial vs orçamento da vaga
- [ ] Disponibilidade de início
- [ ] Histórico com a empresa (já participou de processo?)

### 3.3 Convite Automático
- [ ] Threshold configurável (ex: fit > 80% = convite automático)
- [ ] Disparo de convite personalizado
- [ ] Notificação ao recrutador sobre convites enviados
- [ ] Limite diário de convites automáticos
- [ ] Blacklist de candidatos (não convidar automaticamente)

### 3.4 Busca Manual Assistida
- [ ] Filtros avançados combinados
- [ ] Busca por texto livre (IA interpreta)
- [ ] Salvar buscas frequentes
- [ ] Ações em lote (convidar, adicionar a lista, exportar)
- [ ] IA sugere candidatos similares a um selecionado

### 3.5 Alertas Inteligentes
- [ ] Notifica quando novo candidato com alto fit se cadastra
- [ ] Notifica quando candidato do banco atualiza perfil
- [ ] Resumo semanal de candidatos relevantes

---

## 🎯 Módulo 4: Trilha de Recrutamento Configurável

> **Objetivo:** Permitir que cada empresa monte seu próprio processo seletivo com as etapas que fizerem sentido.

### 4.1 Builder de Trilha (drag-and-drop)
- [ ] Interface visual para montar etapas
- [ ] Arrastar e soltar para reordenar
- [ ] Etapas paralelas (ex: prova E entrevista ao mesmo tempo)
- [ ] Etapas condicionais (se score > X, pula etapa)
- [ ] Preview do fluxo completo

### 4.2 Templates Pré-definidos
- [ ] **Técnico:** Triagem → Teste Técnico → Entrevista IA → Entrevista Humana → Proposta
- [ ] **Comercial:** Triagem → Avaliação Comportamental → Role Play → Entrevista → Proposta
- [ ] **Executivo:** Triagem → Assessment → Entrevista RH → Entrevista Diretoria → Proposta
- [ ] **Estágio:** Triagem → Prova Teórica → Dinâmica → Entrevista → Proposta
- [ ] **Volume:** Triagem IA → Entrevista IA → Aprovação Automática → Proposta
- [ ] Empresa pode criar e salvar seus próprios templates

### 4.3 Tipos de Etapas Disponíveis

| Etapa | Descrição | IA? |
|-------|-----------|-----|
| **Triagem de Currículos** | Análise automática e ranking | 🤖 Sim |
| **Aprovação Interna** | Workflow de aprovação (gestor, diretor) | Não |
| **Entrevista por IA** | Entrevista assíncrona com IA (já existe) | 🤖 Sim |
| **Entrevista Humana Assistida** | Google Meet + IA observando | 🤖 Sim |
| **Prova Teórica** | Questões objetivas e dissertativas | 🤖 Correção |
| **Teste Técnico** | Coding challenge, case prático | 🤖 Análise |
| **Avaliação Comportamental** | DISC, fit cultural, soft skills | 🤖 Análise |
| **Dinâmica de Grupo** | Presencial ou online, avaliação manual | Não |
| **Entrevista Final** | Com gestor/diretoria, presencial | Não |
| **Proposta** | Envio e negociação de oferta | Não |
| **Onboarding** | Checklist pós-contratação | Não |

### 4.4 Automações por Etapa
- [ ] Critérios de aprovação automática (ex: nota > 70)
- [ ] Critérios de reprovação automática (ex: nota < 30)
- [ ] Movimentação automática para próxima etapa
- [ ] Notificações configuráveis (email, WhatsApp, plataforma)
- [ ] SLAs e alertas de atraso
- [ ] Feedback automático ao candidato (aprovado/reprovado)

### 4.5 Acompanhamento
- [ ] Kanban visual do processo (arrastar candidatos entre etapas)
- [ ] Filtros por vaga, recrutador, período
- [ ] Métricas por etapa:
  - Candidatos em cada etapa
  - Tempo médio por etapa
  - Taxa de conversão (passou/total)
  - Gargalos identificados
- [ ] Histórico completo do candidato na trilha
- [ ] Timeline visual de todas as ações

---

## 🎯 Módulo 5: Entrevista Humana Assistida por IA

> **Objetivo:** Recrutador faz entrevista no Google Meet enquanto IA assiste, transcreve e sugere perguntas em tempo real.

### 5.1 Agendamento Integrado
- [ ] Integração com Google Calendar API
- [ ] Integração com Microsoft Outlook
- [ ] Criação automática de evento com link do Meet
- [ ] Self-scheduling: candidato escolhe horário disponível
- [ ] Convite automático para todos os participantes
- [ ] Lembretes configuráveis (24h, 1h, 15min antes)
- [ ] Reagendamento pelo candidato (com limite)

### 5.2 Bot Assistente na Call
- [ ] Bot Entrevistia entra automaticamente no Google Meet
- [ ] Identifica-se claramente ("Entrevistia - Assistente de Gravação")
- [ ] Captura de áudio em tempo real (com consentimento)
- [ ] Gravação da call (armazenamento seguro)
- [ ] Suporte futuro: Zoom, Microsoft Teams
- [ ] Tecnologia: Recall.ai ou implementação própria

### 5.3 Painel do Recrutador (só ele vê)
- [ ] Abre em outra aba/segundo monitor
- [ ] Transcrição ao vivo sincronizada
- [ ] Resumo do CV do candidato
- [ ] Skills detectadas com destaque
- [ ] Histórico do candidato (processos anteriores)
- [ ] Checklist de tópicos a abordar
- [ ] Campo de notas em tempo real (salva automaticamente)
- [ ] Timer por tópico/etapa
- [ ] Indicador de tempo total da entrevista

### 5.4 Assistente IA em Tempo Real (🤖)
- [ ] **Transcrição:** Deepgram, AssemblyAI ou Whisper
- [ ] **Sugestões de perguntas:** baseadas no CV e na vaga
  - "Candidato mencionou projeto X, pergunte sobre desafios enfrentados"
  - "Ainda não cobriu experiência com AWS, considere perguntar"
- [ ] **Alertas contextuais:**
  - "Candidato parece nervoso, considere aliviar"
  - "Resposta vaga, peça exemplos concretos"
- [ ] **Detecção de tópicos:** marca automaticamente o que já foi coberto
- [ ] **Indicadores:** sentimento, engajamento, clareza
- [ ] **Resumo parcial:** atualizado a cada 5 minutos

### 5.5 Análise Pós-Entrevista (🤖)
- [ ] Resumo executivo automático (1-2 parágrafos)
- [ ] Transcrição completa pesquisável
- [ ] Gravação com marcadores de momentos-chave
- [ ] Score por competência avaliada
- [ ] Highlights (momentos positivos)
- [ ] Red flags (pontos de atenção)
- [ ] Comparativo com outros candidatos da vaga
- [ ] Sugestão de decisão: aprovar / reprovar / revisitar
- [ ] Perguntas sugeridas para próxima etapa (se houver)

### 5.6 Compliance e Privacidade
- [ ] Aviso no convite: "Esta entrevista será gravada e analisada por IA"
- [ ] Candidato confirma consentimento antes da call
- [ ] Bot se identifica ao entrar na call
- [ ] Candidato pode solicitar exclusão da gravação
- [ ] Política de retenção configurável (30, 60, 90 dias)
- [ ] Adequação LGPD/GDPR

---

## 🎯 Módulo 6: Prova Teórica com Anti-Fraude

> **Objetivo:** Avaliar conhecimentos teóricos e comportamentais por escrito, com geração e correção por IA e múltiplas camadas anti-fraude.

### 6.1 Geração de Provas por IA (🤖)
- [ ] Botão "Gerar Prova" baseado na vaga e skills
- [ ] Tipos de questões:
  - **Objetivas:** múltipla escolha, V/F, associação
  - **Dissertativas curtas:** 2-3 parágrafos
  - **Situacionais:** "O que você faria se..."
  - **Casos práticos:** análise de cenário
- [ ] Prova técnica E/OU comportamental (configurável)
- [ ] Banco de questões randomizado (cada candidato recebe versão diferente)
- [ ] Perguntas personalizadas baseadas no CV
- [ ] Dificuldade adaptativa (começa médio, ajusta baseado em respostas)
- [ ] Recrutador pode editar/remover/adicionar questões antes de publicar
- [ ] Prévia da prova antes de liberar

### 6.2 Experiência do Candidato
- [ ] Interface limpa, sem distrações
- [ ] Instruções claras antes de começar
- [ ] Timer visível (por questão OU prova toda - configurável)
- [ ] Indicador de progresso
- [ ] Salvamento automático a cada resposta
- [ ] Navegação entre questões (se permitido)
- [ ] Botão de revisar antes de enviar
- [ ] Tela de confirmação final
- [ ] Feedback imediato ou aguardar (configurável)

### 6.3 Correção por IA (🤖)

#### Questões Objetivas
- [ ] Correção instantânea automática
- [ ] Pontuação configurável por questão
- [ ] Sem correção parcial (certo ou errado)

#### Questões Dissertativas
- [ ] IA avalia com critérios definidos:
  - **Conteúdo:** conhecimento demonstrado (0-40 pontos)
  - **Estrutura:** organização e clareza (0-30 pontos)
  - **Argumentação:** lógica e exemplos (0-30 pontos)
- [ ] Rubrica configurável pelo recrutador
- [ ] Justificativa da nota (explicação da IA)
- [ ] Pontuação parcial (0-100 por questão)
- [ ] Revisão humana opcional (recrutador pode ajustar nota)
- [ ] Feedback construtivo para o candidato (se habilitado)

#### Análise Adicional
- [ ] Comparação com respostas de outros candidatos
- [ ] Detecção de respostas muito similares (possível cola)
- [ ] Análise de profundidade vs superficialidade

### 6.4 Camada 1: Design Anti-Fraude
- [ ] Perguntas contextuais ("Com base na sua experiência em X...")
- [ ] Limite de tempo por questão (dificulta consultar IA externa)
- [ ] Questões reveladas uma por vez (não mostra tudo)
- [ ] Mix de formatos (objetiva + dissertativa + caso)
- [ ] Ordem das questões randomizada
- [ ] Ordem das alternativas randomizada (objetivas)

### 6.5 Camada 2: Monitoramento (tudo configurável)
- [ ] **Detecção de troca de aba:**
  - Alerta prévio: "Mantenha apenas esta aba aberta"
  - Registra cada saída (quantidade, duração)
  - Alerta em tempo real na tela
  - Relatório final para recrutador
  - Configurável: permitir / alertar / registrar
- [ ] **Uso de IA externa:**
  - Configurável: permitir / não permitir
  - Se não permitido, alerta sobre detecção
- [ ] **Padrão de digitação:**
  - Detecta copy/paste (vs digitar letra a letra)
  - Tempo por resposta (muito rápido = flag)
  - Pausa suspeita (foi consultar algo?)
- [ ] **Webcam (configurável):**
  - Desativada / Opcional / Obrigatória
  - Grava snapshots periódicos (não vídeo contínuo)
  - Detecta múltiplas pessoas, olhar para fora
- [ ] **Compartilhamento de tela (configurável):**
  - Desativado / Opcional / Obrigatório
  - ⚠️ Aviso ao recrutador: "Recurso invasivo"
  - Candidato pode recusar (recrutador decide se elimina)
- [ ] **Registro completo de eventos** para auditoria

### 6.6 Camada 3: Análise Pós-Prova (🤖)
- [ ] Detecção de texto gerado por IA (GPTZero, etc)
- [ ] Score de confiança por resposta
- [ ] Comparação de estilo com CV e entrevista
- [ ] Análise de consistência (respostas contraditórias?)
- [ ] Relatório de suspeitas para RH
- [ ] **Não reprova automaticamente** - RH decide

### 6.7 Camada 4: Validação Posterior
- [ ] Flag automático: "Validar na entrevista"
- [ ] Sugestão de perguntas sobre respostas suspeitas
- [ ] Mini-entrevista de confirmação (se necessário)

### 6.8 Configurações por Vaga
| Configuração | Opções |
|--------------|--------|
| Nível de rigor | Baixo / Médio / Alto / Customizado |
| Webcam | Desativada / Opcional / Obrigatória |
| Compartilhamento de tela | Desativado / Opcional / Obrigatório |
| Uso de outras abas | Permitido / Alertar / Registrar |
| Uso de IA externa | Permitido / Não permitido |
| Tempo limite | Por prova / Por questão / Sem limite |
| Voltar em questões | Permitido / Não permitido |
| Ordem das questões | Fixa / Randomizada |
| Feedback ao candidato | Imediato / Após revisão / Nunca |
| Score mínimo para aprovação | 0-100 (ou desabilitado) |

### 6.9 Direitos do Candidato
- [ ] Informado sobre todos os monitoramentos ativos ANTES de começar
- [ ] Pode recusar recursos opcionais (webcam, compartilhamento)
- [ ] Se recusar obrigatório: notifica recrutador para decisão
- [ ] Pode solicitar revisão humana da correção

---

## 🎯 Módulo 7: Avaliação Comportamental e Perfil

> **Objetivo:** Entender o perfil comportamental, valores e fit cultural do candidato sem necessidade de psicólogo.

### 7.1 Avaliações Disponíveis (sem psicólogo ✅)

| Tipo | Descrição | Metodologia |
|------|-----------|-------------|
| **DISC** | Dominância, Influência, Estabilidade, Conformidade | Questionário padrão DISC |
| **Fit Cultural** | Compatibilidade com valores da empresa | Comparação de valores |
| **Soft Skills** | Comunicação, liderança, trabalho em equipe | Perguntas situacionais |
| **Valores e Motivações** | O que motiva o candidato | Ranking de prioridades |
| **Preferências de Trabalho** | Remoto, equipe, autonomia, ritmo | Questionário de preferências |
| **Estilo de Liderança** | Para vagas de gestão | Assessment específico |
| **Resolução de Conflitos** | Como lida com situações difíceis | Cenários hipotéticos |

### 7.2 Geração por IA (🤖)
- [ ] Questionários sugeridos baseados na vaga
- [ ] Perguntas situacionais contextualizadas
- [ ] Adaptação dinâmica (próxima pergunta depende da anterior)
- [ ] Recrutador pode customizar antes de aplicar
- [ ] Banco de perguntas por competência

### 7.3 Experiência do Candidato
- [ ] Interface amigável e não intimidadora
- [ ] Explicação clara: "Não há respostas certas ou erradas"
- [ ] Tempo estimado de conclusão
- [ ] Progresso visível
- [ ] Pode pausar e continuar depois
- [ ] Mobile-friendly

### 7.4 Análise de Resultados (🤖)
- [ ] Perfil comportamental visual (gráficos radar, barras)
- [ ] Descrição textual do perfil
- [ ] Compatibilidade com a vaga (% fit)
- [ ] Pontos fortes identificados
- [ ] Áreas de atenção
- [ ] Comparativo com outros candidatos
- [ ] Comparativo com perfil ideal da vaga (se definido)

### 7.5 Fit Cultural
- [ ] Empresa cadastra seus valores e cultura:
  - Valores (inovação, estabilidade, meritocracia, etc)
  - Estilo de trabalho (formal, informal, startup, corporativo)
  - Comunicação (direta, diplomática)
  - Tomada de decisão (hierárquica, consenso, autônoma)
- [ ] IA compara perfil do candidato com cultura da empresa
- [ ] Score de compatibilidade cultural (0-100%)
- [ ] Alertas de possíveis desalinhamentos
- [ ] Sugestões de perguntas para explorar na entrevista

### 7.6 Integração com Trilha
- [ ] Resultados disponíveis em todas as etapas seguintes
- [ ] Entrevistador vê perfil antes da entrevista
- [ ] Sugestões de abordagem baseadas no perfil
- [ ] Alertas: "Candidato tem perfil X, evite abordagem Y"

---

## 🎯 Módulo 8: Triagem Automática de Currículos

> **Objetivo:** IA analisa e rankeia todos os currículos recebidos, economizando horas de trabalho manual.

### 8.1 Análise Automática (🤖)
- [ ] IA lê CV em qualquer formato (PDF, DOCX, LinkedIn)
- [ ] Extrai informações estruturadas:
  - Experiências (cargo, empresa, período, descrição)
  - Formação (curso, instituição, ano)
  - Skills (técnicas e comportamentais)
  - Idiomas e níveis
  - Certificações
- [ ] Compara com requisitos da vaga
- [ ] Gera score de aderência (0-100%)
- [ ] Justifica cada score (transparência)

### 8.2 Critérios Configuráveis
- [ ] Requisitos obrigatórios (se não tiver, elimina)
- [ ] Requisitos desejáveis (soma pontos)
- [ ] Pesos por critério:
  - Experiência: X%
  - Formação: Y%
  - Skills: Z%
  - Idiomas: W%
- [ ] Filtros eliminatórios customizados
- [ ] Palavras-chave obrigatórias
- [ ] Experiência mínima em anos

### 8.3 Ranking e Ações
- [ ] Lista rankeada de candidatos por fit
- [ ] Visualização: tabela, cards, kanban
- [ ] Filtros e ordenação
- [ ] Aprovação/reprovação automática por threshold
- [ ] Aprovação em lote dos top N
- [ ] Visualização lado-a-lado para comparar

### 8.4 Justificativa da IA
- [ ] Para cada candidato:
  - Pontos que aumentaram o score
  - Pontos que diminuíram o score
  - Gaps identificados (o que falta)
  - Highlights (diferenciais)
- [ ] Explicação em linguagem natural
- [ ] Drill-down: clicar para ver detalhes

### 8.5 Revisão Humana
- [ ] Recrutador pode revisar qualquer decisão
- [ ] Override manual com justificativa
- [ ] Feedback para IA (isso estava errado porque...)
- [ ] Ajuste de critérios baseado em feedback
- [ ] Modo "auditoria": IA sugere, humano decide sempre

---

## 🎯 Módulo 9: Aprovação do Gestor

> **Objetivo:** Workflow de aprovação interna antes de avançar candidatos para próximas etapas.

### 9.1 Fluxo de Aprovação
- [ ] Recrutador envia candidato(s) para aprovação
- [ ] Seleciona aprovador(es)
- [ ] Adiciona contexto/mensagem opcional
- [ ] Aprovador recebe notificação (email, WhatsApp, plataforma)
- [ ] Visualiza perfil resumido do candidato
- [ ] Acessa detalhes completos se quiser
- [ ] Ações: Aprovar / Reprovar / Solicitar mais informações

### 9.2 Configurações de Workflow
- [ ] Múltiplos aprovadores:
  - Em paralelo (qualquer um aprova)
  - Em sequência (A aprova, depois B)
  - Unânime (todos precisam aprovar)
  - Maioria (>50% aprova)
- [ ] Níveis de aprovação (RH → Gestor → Diretor)
- [ ] Aprovação condicional (aprova, mas com ressalvas)
- [ ] Delegação (encaminhar para outro aprovador)

### 9.3 SLA e Escalação
- [ ] Prazo para aprovação (ex: 48h)
- [ ] Lembretes automáticos (24h restantes, 2h restantes)
- [ ] Escalação automática se não responder:
  - Notifica superior
  - Ou aprova automaticamente
  - Ou marca como "sem resposta"

### 9.4 Registro e Histórico
- [ ] Comentários e justificativa (obrigatória ou opcional)
- [ ] Histórico completo de aprovações
- [ ] Quem aprovou, quando, com qual comentário
- [ ] Auditoria completa

---

## 🎯 Módulo 10: Teste Técnico

> **Objetivo:** Avaliar habilidades técnicas práticas através de coding challenges, cases e projetos.

### 10.1 Tipos de Testes

| Tipo | Descrição | Ambiente |
|------|-----------|----------|
| **Coding Challenge** | Resolver problema de código em tempo limitado | Editor no browser |
| **Take-home Project** | Projeto completo para fazer em casa (24-72h) | Ambiente próprio |
| **Code Review** | Avaliar código existente, encontrar bugs, sugerir melhorias | Visualizador |
| **System Design** | Desenhar arquitetura de sistema | Whiteboard digital |
| **Case Prático** | Resolver problema de negócio (não-código) | Documento/Apresentação |
| **SQL/Data** | Queries, análise de dados, modelagem | Editor SQL |
| **Debug Challenge** | Encontrar e corrigir bugs em código | Editor no browser |

### 10.2 Ambiente de Código
- [ ] Editor de código no browser (Monaco/CodeMirror)
- [ ] Syntax highlighting
- [ ] Múltiplas linguagens: Python, JavaScript, TypeScript, Java, C#, Go, Ruby, PHP, SQL
- [ ] Console/terminal para output
- [ ] Execução de código em sandbox seguro
- [ ] Testes automatizados (test cases)
- [ ] Ou integração com plataformas existentes:
  - HackerRank
  - Codility
  - LeetCode
  - CodeSignal

### 10.3 Avaliação (🤖)
- [ ] **Testes automatizados:**
  - Passou / Não passou por test case
  - Cobertura de edge cases
  - Performance (tempo de execução, memória)
- [ ] **Análise de código por IA:**
  - Qualidade (clean code, legibilidade)
  - Boas práticas (SOLID, DRY, etc)
  - Segurança (vulnerabilidades comuns)
  - Performance (complexidade, otimizações)
  - Documentação (comentários úteis)
- [ ] **Pontuação composta:**
  - Funcionou: X%
  - Qualidade: Y%
  - Performance: Z%
- [ ] Avaliação humana opcional (code review do recrutador)
- [ ] Rubrica configurável por vaga

### 10.4 Anti-fraude
- [ ] Mesmas camadas do Módulo 6 (Prova Teórica)
- [ ] **Detecção de plágio:**
  - Comparação com soluções conhecidas (Stack Overflow, GitHub)
  - Comparação com outros candidatos
  - Análise de estilo de código (consistência)
- [ ] **Análise de padrão:**
  - Tempo entre teclas digitadas
  - Copy/paste detectado
  - Padrão de desenvolvimento (tudo de uma vez vs iterativo)

### 10.5 Take-home Projects
- [ ] Briefing claro com requisitos
- [ ] Prazo flexível (24h, 48h, 72h, 1 semana)
- [ ] Entrega via:
  - Upload de ZIP
  - Link do GitHub
  - Deploy em ambiente de teste
- [ ] Critérios de avaliação transparentes
- [ ] Feedback construtivo opcional

---

## 🎯 Módulo 11: Proposta e Oferta

> **Objetivo:** Enviar, negociar e fechar propostas de emprego de forma profissional.

### 11.1 Criação da Proposta
- [ ] Templates configuráveis por empresa
- [ ] Campos padrão:
  - Cargo e nível
  - Salário (fixo, variável, bônus)
  - Benefícios (VR, VA, plano de saúde, etc)
  - Data de início
  - Modelo de trabalho (remoto, híbrido, presencial)
  - Carga horária
  - Local de trabalho
- [ ] Campos customizados
- [ ] Anexos (contrato, políticas)
- [ ] Preview antes de enviar
- [ ] Aprovação interna antes de enviar (se configurado)
- [ ] Geração de PDF profissional

### 11.2 Envio e Acompanhamento
- [ ] Envio por email integrado
- [ ] Candidato visualiza proposta na plataforma
- [ ] Tracking:
  - Email enviado
  - Email aberto
  - Proposta visualizada
  - Tempo visualizando
- [ ] Prazo para resposta (configurável)
- [ ] Lembretes automáticos (3 dias, 1 dia antes)

### 11.3 Negociação
- [ ] Candidato pode:
  - ✅ Aceitar proposta
  - ❌ Recusar proposta (com motivo)
  - 🔄 Contrapropor (sugere alterações)
- [ ] Chat/mensagens para negociação
- [ ] Histórico de versões da proposta
- [ ] Comparativo entre versões
- [ ] Alertas de prazo expirando
- [ ] Limite de rodadas de negociação (opcional)

### 11.4 Aceite e Fechamento
- [ ] Aceite formal na plataforma
- [ ] Assinatura digital (integração Clicksign, DocuSign)
- [ ] Ou confirmação por email
- [ ] Disparo automático para onboarding
- [ ] Notificação para RH e gestor
- [ ] Candidato muda status para "Contratado"
- [ ] Encerramento da vaga (se única posição)
- [ ] Notificação para outros candidatos (se configurado)

---

## 🎯 Módulo 12: Agenda e Calendário ✅ IMPLEMENTADO

> **Objetivo:** Agendamento integrado de entrevistas e etapas com calendários existentes.
>
> **Status:** ✅ Implementado em v1.01.00 (30/03/2026)

### 12.1 Integração com Calendários
- [x] Google Calendar (OAuth 2.0) - conexão/desconexão, criação de eventos, free/busy
- [ ] Microsoft Outlook / Office 365 *(pendente)*
- [ ] Apple Calendar (iCal/CalDAV) *(pendente)*
- [x] Sincronização:
  - [x] Evento criado na Entrevistia → aparece no calendário
  - [x] Horário bloqueado no calendário → indisponível na Entrevistia (via free/busy)

### 12.2 Agendamento Inteligente
- [x] **Self-scheduling:**
  - [x] Candidato recebe link com horários disponíveis (`/agendar/[token]`)
  - [x] Escolhe o que preferir
  - [x] Confirmação automática + criação de evento no Google Calendar
- [x] **Detecção de conflitos:**
  - [x] Verifica agendamentos existentes, bloqueios e Google Calendar
  - [x] Retorna erro 409 se houver conflito
- [ ] **Múltiplos participantes:** *(pendente)*
- [ ] **Fusos horários:** suporte básico implementado *(melhorias pendentes)*

### 12.3 Lembretes e Confirmações
- [x] Confirmação automática ao agendar via self-scheduling
- [x] Lembretes automáticos via cron:
  - [x] 24 horas antes
  - [x] 1 hora antes
  - [x] 15 minutos antes
- [x] Link da reunião incluído (Google Meet gerado automaticamente)
- [ ] Botão para adicionar ao calendário pessoal *(pendente)*
- [x] Reagendamento pelo candidato (com limite configurável)
- [x] Cancelamento com motivo

### 12.4 Visão Geral
- [x] Calendário visual de todas as entrevistas (`/agenda`)
- [x] Views: semana, mês
- [x] Cores por status do evento
- [x] Lista de próximos eventos
- [ ] Filtros: por vaga, recrutador, etapa *(pendente)*
- [ ] Métricas *(pendente)*

### 12.5 Configuração de Disponibilidade
- [x] Configuração por dia da semana (`/agenda/configurar`)
- [x] Horário de início e fim por dia
- [x] Duração de slot e intervalo configuráveis
- [x] Bloqueios de horário (feriados, férias)

### 📁 Arquivos Implementados (Módulo 12)

**Schemas:** `lib/db/schema/agendamentos.ts` (disponibilidades, bloqueios, agendamentos, self-scheduling, google tokens)

**Serviços:**
- `lib/calendar/google-calendar.ts` - Integração Google Calendar via REST API
- `lib/calendar/scheduling.ts` - Cálculo de slots disponíveis

**APIs:**
- `app/api/agendamentos/route.ts` - CRUD de agendamentos
- `app/api/agendamentos/[id]/route.ts` - Detalhes/atualização/cancelamento
- `app/api/agendamentos/disponibilidade/route.ts` - Configurar disponibilidade
- `app/api/agendamentos/slots/route.ts` - Buscar slots disponíveis
- `app/api/agendamentos/self-scheduling/route.ts` - Criar link de self-scheduling
- `app/api/agendamentos/self-scheduling/[token]/route.ts` - Candidato escolhe horário
- `app/api/calendar/google/connect/route.ts` - Conectar Google Calendar
- `app/api/calendar/google/callback/route.ts` - Callback OAuth
- `app/api/calendar/google/status/route.ts` - Status da conexão
- `app/api/cron/send-reminders/route.ts` - Cron de lembretes

**Páginas:**
- `app/(dashboard)/agenda/page.tsx` - Calendário visual
- `app/(dashboard)/agenda/configurar/page.tsx` - Configurar disponibilidade
- `app/(public)/agendar/[token]/page.tsx` - Self-scheduling (candidato)

---

## 🎯 Módulo 13: Comunicação Centralizada ✅ IMPLEMENTADO

> **Objetivo:** Todas as mensagens com candidatos em um único lugar, com templates e automações.
>
> **Status:** ✅ Implementado em v1.01.00 (30/03/2026)

### 13.1 Canais Integrados
- [x] **Email:**
  - [x] Envio dentro da plataforma (Resend API)
  - [x] Templates HTML responsivos
  - [x] Tracking de status (enviada, aberta, erro)
- [ ] **WhatsApp Business API:** *(pendente)*
- [ ] **SMS (opcional):** *(pendente)*
- [ ] **Mensagens internas:** *(pendente)*

### 13.2 Templates e Automações
- [x] 9 templates padrão por etapa/evento:
  - [x] Convite para entrevista
  - [x] Lembrete de entrevista (24h e 1h)
  - [x] Confirmação de agendamento
  - [x] Reagendamento
  - [x] Cancelamento
  - [x] Aprovação de etapa
  - [x] Reprovação de etapa
  - [x] Boas-vindas
- [x] Variáveis dinâmicas: {{nome}}, {{vaga}}, {{empresa}}, {{data}}, {{hora}}, {{link}}, etc.
- [x] Condicionais em templates: {{#var}}conteúdo{{/var}}
- [x] Templates customizáveis pelo recrutador
- [ ] Personalização por IA *(pendente)*
- [ ] Sequências de follow-up *(pendente)*

### 13.3 Caixa de Entrada Unificada
- [x] Todas as conversas em um lugar (`/mensagens`)
- [x] Filtros: por candidato, busca por texto, não lidas, arquivadas
- [x] Marcar como lida/não lida
- [x] Arquivar mensagens
- [x] Enviar nova mensagem com seleção de template
- [ ] Atribuição para membros da equipe *(pendente)*
- [ ] Atalhos de teclado *(pendente)*
- [ ] Notificações de novas mensagens *(pendente)*

### 13.4 Histórico
- [x] Histórico de mensagens por candidato (filtro por candidatoId)
- [x] Busca em mensagens (texto completo)
- [ ] Timeline visual completa *(pendente)*
- [ ] Exportação do histórico *(pendente)*

### 📁 Arquivos Implementados (Módulo 13)

**Schemas:** `lib/db/schema/mensagens.ts` (templates, mensagens)

**Serviços:**
- `lib/mensagens/template-renderer.ts` - Renderização de templates com variáveis

**APIs:**
- `app/api/mensagens/route.ts` - Listar e enviar mensagens
- `app/api/mensagens/[id]/route.ts` - Atualizar mensagem (lida, arquivada)
- `app/api/mensagens/templates/route.ts` - CRUD de templates

**Páginas:**
- `app/(dashboard)/mensagens/page.tsx` - Caixa de entrada unificada

---

## 🎯 Módulo 14: Página de Carreiras

> **Objetivo:** Site de vagas white-label para a empresa, com branding próprio.

### 14.1 Página Customizável
- [ ] Subdomínio: empresa.entrevistia.com.br
- [ ] Ou domínio próprio: carreiras.empresa.com.br
- [ ] Branding completo:
  - Logo
  - Cores (primária, secundária)
  - Fontes
  - Favicon
- [ ] Conteúdo editável:
  - Sobre a empresa
  - Missão, visão, valores
  - Cultura e ambiente
  - Benefícios
  - Depoimentos de funcionários
- [ ] Fotos e vídeos institucionais
- [ ] Seção de diversidade e inclusão

### 14.2 Listagem de Vagas
- [ ] Vagas abertas com filtros:
  - Área/departamento
  - Localidade
  - Tipo (CLT, PJ, estágio)
  - Modelo (remoto, híbrido, presencial)
  - Nível (júnior, pleno, sênior)
- [ ] Busca por texto
- [ ] Página individual por vaga:
  - Descrição completa
  - Requisitos
  - Benefícios
  - Etapas do processo
- [ ] Formulário de candidatura integrado
- [ ] Candidato já entra no funil automaticamente
- [ ] Login social (LinkedIn, Google)

### 14.3 SEO e Compartilhamento
- [ ] URLs amigáveis: /vagas/desenvolvedor-senior-sp
- [ ] Meta tags otimizadas (title, description)
- [ ] Open Graph para redes sociais
- [ ] Schema.org/JobPosting (Google Jobs)
- [ ] Sitemap XML automático
- [ ] Botões de compartilhar (LinkedIn, WhatsApp, Twitter)

### 14.4 Métricas
- [ ] Visitantes por vaga
- [ ] Taxa de conversão (visitou → candidatou)
- [ ] Origem do tráfego (direto, Google, LinkedIn, etc)
- [ ] Tempo na página
- [ ] Abandono no formulário

### 14.5 Recursos Avançados
- [ ] Alertas de vagas (candidato se inscreve para receber)
- [ ] Candidatura expressa (um clique se já tem cadastro)
- [ ] Indicação de amigos (com tracking)
- [ ] FAQ da empresa
- [ ] Chat/chatbot para dúvidas

---

## 🎯 Módulo 15: Banco de Talentos

> **Objetivo:** Pool de candidatos qualificados para vagas futuras.

### 15.1 Entrada no Banco
- [ ] Candidatos não aprovados podem ir para o banco
- [ ] Convite: "Não foi desta vez, mas gostaríamos de manter contato"
- [ ] Candidatos se cadastram sem vaga específica
- [ ] Importação em massa (CSV, Excel)
- [ ] Integração com LinkedIn Recruiter

### 15.2 Organização
- [ ] Tags personalizadas (área, senioridade, skills)
- [ ] Listas customizadas ("Finalistas 2024", "Desenvolvedores SP")
- [ ] Status:
  - Ativo (buscando oportunidade)
  - Passivo (empregado, mas aberto)
  - Indisponível (temporariamente)
  - Contratado por outra empresa
  - Blacklist (não contatar)
- [ ] Notas e histórico de interações

### 15.3 Busca e Matching (🤖)
- [ ] Mesmos filtros do Scanner Inteligente
- [ ] IA sugere candidatos do banco para novas vagas
- [ ] Alertas: "5 candidatos do banco têm fit > 80% para nova vaga"
- [ ] Reativação em lote

### 15.4 Engajamento
- [ ] Newsletter periódica (novas vagas, conteúdo)
- [ ] Comunicações segmentadas (só para devs, só para SP)
- [ ] Candidato pode atualizar perfil quando quiser
- [ ] Notificação de novas vagas compatíveis
- [ ] Aniversário de cadastro (manter relacionamento)

### 15.5 Métricas
- [ ] Tamanho do banco por área/skill
- [ ] Taxa de conversão (banco → contratado)
- [ ] Tempo médio no banco antes de contratar
- [ ] Engajamento (aberturas, cliques)

---

## 🎯 Módulo 16: Relatórios e Analytics

> **Objetivo:** Dashboards e métricas para RH provar valor e otimizar processos.

### 16.1 Dashboards
- [ ] **Visão geral:**
  - Vagas abertas / fechadas
  - Candidatos ativos
  - Contratações no período
  - Pipeline visual
- [ ] **Funil de recrutamento:**
  - Candidatos por etapa
  - Taxa de conversão entre etapas
  - Gargalos identificados
- [ ] **Tempo real:**
  - Entrevistas hoje
  - Pendências de aprovação
  - Candidatos aguardando resposta

### 16.2 Métricas de Processo

| Métrica | Descrição | Meta típica |
|---------|-----------|-------------|
| **Time to hire** | Dias desde abertura até contratação | < 30 dias |
| **Time to fill** | Dias até preencher a vaga | < 45 dias |
| **Time in stage** | Tempo médio em cada etapa | Varia |
| **Taxa de conversão** | % que passa para próxima etapa | > 20% |
| **Source of hire** | De onde vêm os contratados | Varia |
| **Cost per hire** | Custo total / contratações | < R$ 5.000 |
| **Quality of hire** | Performance após 90 dias | > 80% |
| **Offer acceptance rate** | % de propostas aceitas | > 85% |
| **Candidate satisfaction** | NPS do processo | > 50 |

### 16.3 Relatórios
- [ ] Por vaga, recrutador, departamento, período
- [ ] Comparativo entre períodos
- [ ] Drill-down (clicar para detalhar)
- [ ] Exportação: PDF, Excel, CSV
- [ ] Agendamento periódico (semanal, mensal)
- [ ] Envio automático por email

### 16.4 Analytics Avançado (🤖)
- [ ] IA identifica gargalos automaticamente
- [ ] Previsão de tempo para fechar vaga
- [ ] Recomendações de melhoria:
  - "Etapa X está demorando 3x mais que a média"
  - "Candidatos de source Y têm 2x mais conversão"
- [ ] Benchmarking (comparação com mercado, se dados permitirem)
- [ ] Detecção de anomalias

### 16.5 Relatórios de Diversidade
- [ ] Distribuição por gênero (se declarado)
- [ ] Distribuição por faixa etária
- [ ] Distribuição por região
- [ ] Conversão por grupo
- [ ] Identificação de vieses no processo

---

## 🎯 Módulo 17: Onboarding do Contratado

> **Objetivo:** Checklist e acompanhamento pós-contratação para garantir uma boa integração.

### 17.1 Checklist de Onboarding
- [ ] Templates configuráveis por cargo/área
- [ ] Tarefas para diferentes responsáveis:
  - **RH:** contrato, exames, documentos
  - **TI:** equipamento, acessos, email
  - **Gestor:** apresentação da equipe, objetivos
  - **Contratado:** preencher dados, ler políticas
- [ ] Prazos por tarefa
- [ ] Dependências (B só pode começar depois de A)
- [ ] Notificações automáticas

### 17.2 Portal do Novo Colaborador
- [ ] Área exclusiva do contratado
- [ ] Visualiza suas pendências
- [ ] Upload de documentos (RG, comprovante, etc)
- [ ] Formulários online (dados bancários, benefícios)
- [ ] Informações da empresa:
  - Organograma
  - Políticas e manuais
  - Ferramentas utilizadas
  - Contatos importantes
- [ ] FAQ do onboarding

### 17.3 Acompanhamento
- [ ] Status visual de cada item
- [ ] Dashboard de onboardings em andamento
- [ ] Alertas de itens atrasados
- [ ] Escalação automática
- [ ] Check-ins programados (7 dias, 30 dias, 90 dias)

### 17.4 Integração com Sistemas
- [ ] Exportação para sistemas de RH/folha
- [ ] API para automações
- [ ] Webhooks para eventos
- [ ] Integração com ferramentas de TI (provisionar acessos)

---

## 🎯 Módulo 18: Programa de Indicação (Referral)

> **Objetivo:** Funcionários indicam candidatos e ganham recompensas.

### 18.1 Portal de Indicação
- [ ] Área exclusiva para funcionários
- [ ] Lista de vagas abertas para indicação
- [ ] Formulário simples de indicação
- [ ] Acompanhamento do status (onde está no processo)
- [ ] Histórico de indicações

### 18.2 Regras e Recompensas
- [ ] Configuração de bônus por vaga/cargo:
  - Desenvolvedor Sênior: R$ 2.000
  - Gerente: R$ 5.000
- [ ] Regras de elegibilidade:
  - Tempo mínimo de empresa
  - Não pode indicar parente direto
  - Não pode indicar para própria equipe
- [ ] Quando o bônus é liberado:
  - Após contratação
  - Após período de experiência (90 dias)
  - Dividido (50% contratação, 50% experiência)

### 18.3 Gamificação
- [ ] Ranking de indicadores
- [ ] Badges e conquistas:
  - "Primeira indicação"
  - "5 indicações"
  - "Indicação contratada"
  - "Super indicador do mês"
- [ ] Campanhas especiais:
  - "Mês de indicações: bônus em dobro"
- [ ] Leaderboard por período

### 18.4 Gestão
- [ ] Dashboard de indicações
- [ ] Relatório de ROI do programa:
  - Custo de contratação via indicação vs outros canais
  - Retenção de contratados via indicação
- [ ] Controle de pagamento de bônus
- [ ] Exportação para folha de pagamento

---

## 🎯 Módulo 19: Integrações

> **Objetivo:** Conectar com o ecossistema de RH e recrutamento.

### 19.1 Job Boards
- [ ] **LinkedIn Jobs:** publicação automática
- [ ] **Indeed:** publicação e recebimento de candidatos
- [ ] **Glassdoor:** publicação
- [ ] **Google Jobs:** schema automático
- [ ] **Brasil:** Catho, Infojobs, Vagas.com, Trampos.co
- [ ] Publicação em lote
- [ ] Sincronização de candidatos

### 19.2 HRIS / Sistemas de RH
- [ ] Exportação de dados para:
  - Gupy (se migração)
  - Totvs
  - SAP SuccessFactors
  - Workday
  - Senior Sistemas
  - Convenia
- [ ] Importação de funcionários (para referral)
- [ ] Sincronização de estrutura organizacional

### 19.3 Comunicação
- [ ] **Slack:**
  - Notificações em canais
  - Comandos (/entrevistia pendencias)
  - Bot para ações rápidas
- [ ] **Microsoft Teams:**
  - Mesmas funcionalidades
  - Tab dentro do Teams

### 19.4 Produtividade
- [ ] **Google Workspace:**
  - Calendar
  - Meet
  - Drive (anexos)
- [ ] **Microsoft 365:**
  - Outlook
  - Teams
  - OneDrive

### 19.5 Assinatura Digital
- [ ] **Clicksign**
- [ ] **DocuSign**
- [ ] **D4Sign**
- [ ] Contratos e propostas assinados digitalmente

### 19.6 Automação
- [ ] **Zapier:** milhares de integrações possíveis
- [ ] **Make (Integromat):** alternativa
- [ ] Webhooks customizados

---

## 🎯 Módulo 20: API Pública

> **Objetivo:** Para clientes enterprise integrarem com seus sistemas.

### 20.1 API RESTful
- [ ] Endpoints completos:
  - Vagas: CRUD, publicar, encerrar
  - Candidatos: CRUD, mover etapa, avaliar
  - Entrevistas: agendar, resultados
  - Relatórios: métricas, exportação
- [ ] Autenticação: OAuth 2.0 e API Keys
- [ ] Rate limiting por plano
- [ ] Versionamento (/v1/, /v2/)

### 20.2 Webhooks
- [ ] Eventos configuráveis:
  - Candidato criado
  - Candidato mudou de etapa
  - Entrevista agendada
  - Proposta enviada/aceita/recusada
  - Vaga encerrada
- [ ] Retry automático (3x com backoff)
- [ ] Logs de chamadas
- [ ] Teste de webhook no painel

### 20.3 Documentação
- [ ] Swagger/OpenAPI interativo
- [ ] Exemplos em múltiplas linguagens
- [ ] SDKs oficiais:
  - Python
  - Node.js/TypeScript
  - PHP
- [ ] Sandbox para testes
- [ ] Guias de integração

---

## 🎯 Módulo 21: Multi-idiomas

> **Objetivo:** Plataforma disponível em múltiplos idiomas para expansão internacional.

### 21.1 Idiomas Suportados
- [ ] 🇧🇷 Português (Brasil) - padrão
- [ ] 🇺🇸 Inglês (EN)
- [ ] 🇪🇸 Espanhol (ES)
- [ ] 🇫🇷 Francês (futuro)
- [ ] 🇩🇪 Alemão (futuro)

### 21.2 O que é Traduzido
- [ ] Interface completa da plataforma
- [ ] Emails e notificações
- [ ] Página de carreiras
- [ ] Comunicações automáticas
- [ ] Termos e políticas
- [ ] Central de ajuda

### 21.3 Configuração
- [ ] Idioma padrão da empresa
- [ ] Idioma por vaga (vaga internacional em inglês)
- [ ] Candidato escolhe seu idioma preferido
- [ ] Detecção automática pelo navegador
- [ ] Fácil troca de idioma

### 21.4 Implementação
- [ ] Arquivos de tradução (i18n)
- [ ] Formatação regional (datas, moedas)
- [ ] RTL support (futuro: árabe, hebraico)

---

## 🎯 Requisito Transversal: Mobile-First

> **Toda a plataforma responsiva, funciona bem no celular sem app nativo.**

### Interface Responsiva
- [ ] Todas as telas adaptadas para mobile
- [ ] Touch-friendly (botões grandes, espaçamento)
- [ ] Gestos (swipe para ações)
- [ ] Performance otimizada para conexões lentas
- [ ] PWA (Progressive Web App) - instalar na home

### Experiência do Candidato (mobile)
- [ ] Candidatura fácil pelo celular
- [ ] Upload de CV direto do celular
- [ ] Entrevista por IA funciona no mobile
- [ ] Provas e testes responsivos
- [ ] Notificações push (via browser)
- [ ] Self-scheduling funcional

### Experiência do Recrutador (mobile)
- [ ] Visualizar candidatos e vagas
- [ ] Aprovar/reprovar com swipe
- [ ] Responder mensagens
- [ ] Receber notificações urgentes
- [ ] Dashboards simplificados
- [ ] Ações rápidas (não gestão completa)

---

## 🔮 Módulo Futuro: Testes Psicológicos

> **⚠️ Requer psicólogo com CRP ativo como responsável técnico.**
> Apenas testes aprovados pelo SATEPSI/CFP.

### Pré-requisitos
- [ ] Parceria ou contratação de psicólogo responsável
- [ ] Licenciamento de testes aprovados pelo SATEPSI
- [ ] Estrutura de laudo com assinatura digital
- [ ] Conformidade com CFP

### Testes Possíveis
| Teste | Objetivo | Editora |
|-------|----------|---------|
| Palográfico | Personalidade | Vetor |
| AC (Atenção Concentrada) | Atenção | Vetor |
| G-36 / G-38 | Inteligência | CEPA |
| IFP-II | Personalidade | Casa do Psicólogo |
| BPR-5 | Raciocínio | CEPA |
| Quati | Personalidade | Vetor |

### Alternativa: Integração com Parceiros
- [ ] API com Mindsight, Vetor, etc
- [ ] Psicólogo deles aplica, resultado aparece na Entrevistia
- [ ] Menor investimento inicial
- [ ] Compartilhar responsabilidade legal

---

## 🤖 Consolidado: Uso de IA na Plataforma

### IA Implementada (v1.01.00)
| Funcionalidade | Provedor | Modelo | Arquivo |
|----------------|----------|--------|---------|
| Transcrição de áudio | OpenAI | whisper-1 | `app/api/transcricao/route.ts` |
| Análise de entrevista | Anthropic | claude-sonnet-4-20250514 | `lib/ai/agent.ts` |
| **Parsing de CV** | Anthropic | claude-sonnet-4-20250514 | `lib/ai/cv-parser.ts` |
| **Normalização de dados** | Anthropic | claude-sonnet-4-20250514 | `lib/ai/cv-parser.ts` |
| **Validação de CV** | Anthropic | claude-sonnet-4-20250514 | `lib/ai/cv-parser.ts` |

### IA Planejada (Roadmap)
| Módulo | Uso de IA |
|--------|-----------|
| 1. Candidato | Parsing de LinkedIn/CV, normalização de dados |
| 2. Skills | Extração automática, categorização |
| 3. Scanner | Matching vaga x candidato, scoring |
| 5. Entrevista Humana | Transcrição tempo real, sugestões de perguntas |
| 6. Prova Teórica | Geração de provas, correção de dissertativas, detecção de fraude |
| 7. Comportamental | Análise de perfil, fit cultural |
| 8. Triagem | Ranking de CVs, justificativa de decisões |
| 10. Teste Técnico | Análise de qualidade de código |
| 13. Comunicação | Personalização de mensagens |
| 15. Banco Talentos | Sugestão de candidatos para novas vagas |
| 16. Analytics | Identificação de gargalos, previsões |

---

## 📅 Fases de Implementação

### Fase 1 - Fundação (v1.01.xx) ✅ CONCLUÍDA
> Base para entrada de candidatos e comunicação

1. **Módulo 1:** Página do Candidato ✅ **CONCLUÍDO**
   - ✅ Cadastro básico, LinkedIn OAuth, Google OAuth, Magic Link
   - ✅ Upload CV com parsing por IA (extração + normalização + validação)
   - ✅ Gestão completa do perfil (experiências, formação, skills, idiomas, certificações)
   - ✅ Tags e preferências
   - ✅ Portal LGPD (acesso, exclusão, portabilidade)
   - ⏳ Pendente: Importação em lote, foto de perfil, histórico de alterações

2. **Módulo 12:** Agenda e Calendário ✅ **CONCLUÍDO**
   - ✅ Integração Google Calendar (OAuth, criação de eventos, free/busy)
   - ✅ Self-scheduling (candidato escolhe horário via link público)
   - ✅ Detecção de conflitos e cálculo de slots disponíveis
   - ✅ Lembretes automáticos (24h, 1h, 15min via cron)
   - ✅ Calendário visual com views semana/mês
   - ✅ Configuração de disponibilidade por dia da semana
   - ⏳ Pendente: Microsoft Outlook, múltiplos participantes, métricas

3. **Módulo 13:** Comunicação Básica ✅ **CONCLUÍDO**
   - ✅ 9 templates de email padrão (convite, lembrete, aprovação, reprovação, etc.)
   - ✅ Variáveis dinâmicas e condicionais em templates
   - ✅ Caixa de entrada unificada com filtros e busca
   - ✅ Envio de mensagens com seleção de template
   - ✅ Histórico de comunicações por candidato
   - ⏳ Pendente: WhatsApp, SMS, sequências de follow-up, personalização por IA

---

### 📋 Instruções para Fase 2

A Fase 2 foca em **Inteligência** - IA para triagem e matching de candidatos.

**Pré-requisitos:**
1. Aplicar migração `0005_agenda_comunicacao.sql` (`npm run db:migrate`)
2. Configurar Google Calendar OAuth (se desejado)
3. Configurar cron para lembretes: `CRON_SECRET` + Vercel Cron em `/api/cron/send-reminders`

**Módulo 2 - Banco de Skills:**
1. Criar taxonomia padronizada de skills (~5.000 skills iniciais)
2. Implementar extração automática de skills por IA (a partir do CV parser existente)
3. Hierarquia e sinônimos de skills
4. Página de skills do candidato com indicador de confiança

**Módulo 8 - Triagem Automática:**
1. Análise automática de CV vs requisitos da vaga (scoring 0-100%)
2. Critérios configuráveis (obrigatórios, desejáveis, pesos)
3. Ranking de candidatos com justificativa da IA
4. Aprovação/reprovação automática por threshold

**Módulo 3 - Scanner Inteligente:**
1. Matching vaga x candidatos do banco (score de fit)
2. Convite automático para candidatos com alto fit
3. Busca manual assistida com filtros avançados
4. Alertas quando novo candidato com alto fit se cadastra

---

### Fase 2 - Inteligência (v1.02.xx)
> IA para triagem e matching

1. **Módulo 2:** Banco de Skills
   - Taxonomia, extração automática
2. **Módulo 8:** Triagem Automática
   - Ranking de CVs, critérios configuráveis
3. **Módulo 3:** Scanner Inteligente
   - Matching, convite automático

### Fase 3 - Trilha Completa (v1.03.xx)
> Processo seletivo configurável

1. **Módulo 4:** Trilha Configurável
   - Builder drag-and-drop, automações
2. **Módulo 9:** Aprovação do Gestor
   - Workflow, SLA, escalação
3. **Módulo 6:** Prova Teórica
   - Geração, correção IA, anti-fraude
4. **Módulo 10:** Teste Técnico
   - Coding challenges, análise de código

### Fase 4 - Entrevistas Avançadas (v1.04.xx)
> Entrevista humana assistida e avaliações

1. **Módulo 5:** Entrevista Humana Assistida
   - Google Meet + bot, sugestões tempo real
2. **Módulo 7:** Avaliação Comportamental
   - DISC, fit cultural, soft skills

### Fase 5 - Fechamento (v1.05.xx)
> Da proposta ao onboarding

1. **Módulo 11:** Proposta e Oferta
   - Templates, negociação, assinatura
2. **Módulo 17:** Onboarding
   - Checklist, portal do colaborador
3. **Módulo 15:** Banco de Talentos
   - Pool, engajamento, reativação

### Fase 6 - Escala (v1.06.xx)
> Aquisição e métricas

1. **Módulo 14:** Página de Carreiras
   - Site white-label, SEO
2. **Módulo 16:** Relatórios e Analytics
   - Dashboards, métricas, IA insights
3. **Módulo 18:** Programa de Indicação
   - Referral, gamificação, recompensas

### Fase 7 - Enterprise (v1.07.xx)
> Integrações e expansão

1. **Módulo 19:** Integrações
   - Job boards, HRIS, comunicação
2. **Módulo 20:** API Pública
   - REST, webhooks, SDKs
3. **Módulo 21:** Multi-idiomas
   - PT, EN, ES

---

## 💰 Modelo de Monetização

> **Filosofia:** Pay-per-use como AWS. Paga apenas o que usar. Sem mensalidade, sem surpresas.

### Recursos Pagos (uso de IA)

| Recurso | Preço | Unidade |
|---------|-------|---------|
| **Análise de entrevista** | R$ 0,15 | por pergunta analisada |
| **Transcrição de áudio** | R$ 0,10 | por minuto |
| **Correção de prova (IA)** | R$ 0,80 | por prova completa |
| **Bot entrevista ao vivo** | R$ 7,50 | por hora |
| **Matching automático** | R$ 0,20 | por candidato avaliado |

### Recursos Gratuitos (sem limite)

- Criar vagas e entrevistas
- Convidar candidatos
- Pipeline de recrutamento
- Armazenamento de vídeos/áudios
- Emails e notificações
- Relatórios e dashboard
- Extração de currículo (beneficia a plataforma)
- Tudo que não usa IA

### Exemplo Prático

Empresa contratando 1 pessoa:
- 10 candidatos fazem entrevista (5 perguntas cada)
- 5 são analisados por IA: 5 × 5 × R$ 0,15 = **R$ 3,75**
- 3 fazem prova técnica: 3 × R$ 0,80 = **R$ 2,40**
- 1 entrevista ao vivo (45min): 0,75 × R$ 7,50 = **R$ 5,63**
- **Total: R$ 11,78** para contratar 1 pessoa

### Princípios

1. **Entrada gratuita:** Qualquer empresa pode começar sem custo
2. **Paga pelo valor:** IA economiza horas de trabalho manual, justifica o custo
3. **Transparente:** Preços claros, sem taxas escondidas
4. **Escalável:** Quanto mais usa, mais paga (alinhado com valor entregue)

> Se a empresa usar a plataforma sem IA (avaliar tudo manualmente), usa de graça.
> Isso é aceitável - custo de infra é baixo e eventualmente vai querer a IA quando escalar.

---

## 🎨 Melhorias na Landing Page

> **Objetivo:** Comunicar valor de forma clara, converter visitantes em usuários.

### Comunicação de Valor

- [ ] Destacar modelo pay-per-use (sem mensalidade)
- [ ] Calculadora de economia: "Quanto você gastaria para contratar X pessoas?"
- [ ] Comparativo com plataformas tradicionais (custo mensal vs pay-per-use)
- [ ] Mostrar exemplo prático: "Contrate por R$ 11,78"

### Seções a Adicionar/Melhorar

- [ ] **Como funciona:** Fluxo visual em 3-4 passos
- [ ] **Preços transparentes:** Tabela de recursos e valores
- [ ] **Casos de uso:** Por tamanho (startup, PME, enterprise)
- [ ] **Depoimentos:** Quando houver clientes
- [ ] **FAQ:** Perguntas frequentes sobre IA, privacidade, LGPD
- [ ] **Demo interativa:** Vídeo ou tour guiado

### Otimizações

- [ ] SEO: Meta tags, schema.org, sitemap
- [ ] Performance: Core Web Vitals otimizados
- [ ] Mobile: 100% responsivo
- [ ] CTA claro: "Comece grátis" em destaque
- [ ] Trust signals: Segurança, LGPD, logos de clientes

### Páginas Adicionais

- [ ] `/precos` - Detalhamento completo de preços
- [ ] `/como-funciona` - Explicação detalhada do processo
- [ ] `/para-empresas` - Landing específica B2B
- [ ] `/para-candidatos` - Valor para candidatos
- [ ] `/seguranca` - Políticas de privacidade e segurança
- [ ] `/blog` - Conteúdo para SEO e autoridade

---

## 📝 Princípios de Design

1. **IA como assistente, não substituto:** IA acelera e sugere, humano decide
2. **Transparência:** Candidato sempre sabe o que está sendo avaliado
3. **Flexibilidade:** Tudo configurável por empresa/vaga
4. **Mobile-first:** Funciona em qualquer dispositivo
5. **Privacidade:** LGPD/GDPR compliance desde o design
6. **Simplicidade:** Interface limpa, sem complexidade desnecessária
7. **Dados:** Métricas para provar valor e melhorar processos

---

## 📝 Notas Finais

- Cada módulo será detalhado em documento próprio antes da implementação
- Prioridades podem ser ajustadas conforme feedback dos usuários
- IA será usada de forma ponderada, sempre permitindo edição humana
- **Mobile-first:** Toda interface deve funcionar bem no celular
- Testes psicológicos só serão implementados quando houver psicólogo responsável
- Módulos podem ser lançados em beta para early adopters antes do GA

---

*Documento criado em: 25/03/2026*
*Versão base: v1.00.00*
*Última atualização: 30/03/2026*
*Fase 1 concluída: Módulos 1, 12 e 13*
