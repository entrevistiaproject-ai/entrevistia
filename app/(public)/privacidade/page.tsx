import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <Link href="/cadastro">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-gray-600 mb-8">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          {/* Resumo Executivo */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">
              Resumo: Como protegemos seus dados
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Coletamos apenas dados necessários para o serviço</li>
              <li>✓ Não vendemos seus dados para terceiros</li>
              <li>✓ Você tem direito de acessar, corrigir e excluir seus dados</li>
              <li>✓ Utilizamos criptografia e medidas de segurança avançadas</li>
              <li>✓ Cumprimos integralmente a LGPD (Lei 13.709/2018)</li>
            </ul>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            {/* 1. Introdução */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                1. Introdução
              </h2>
              <p className="text-gray-700 leading-relaxed">
                A EntrevistIA ("nós", "nosso" ou "plataforma") está comprometida com
                a proteção da privacidade e dos dados pessoais de seus usuários. Esta
                Política de Privacidade descreve como coletamos, usamos,
                armazenamos e compartilhamos informações, em conformidade com a
                <strong> Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Ao utilizar nossa plataforma, você concorda com as práticas
                descritas nesta política.
              </p>
            </section>

            {/* 2. Definições LGPD */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Definições (LGPD)
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Dado Pessoal:</strong> Informação relacionada a pessoa
                  natural identificada ou identificável.
                </li>
                <li>
                  <strong>Titular:</strong> Pessoa natural a quem se referem os dados
                  pessoais (você, usuário ou candidato).
                </li>
                <li>
                  <strong>Controlador:</strong> Quem toma decisões sobre o tratamento
                  de dados (no caso de candidatos, o recrutador/empresa).
                </li>
                <li>
                  <strong>Operador:</strong> Quem realiza o tratamento de dados em
                  nome do controlador (EntrevistIA, para dados de candidatos).
                </li>
                <li>
                  <strong>Tratamento:</strong> Toda operação com dados (coleta,
                  armazenamento, uso, compartilhamento, exclusão).
                </li>
              </ul>
            </section>

            {/* 3. Dados Coletados */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                3. Quais Dados Coletamos
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                3.1. Dados de Usuários (Recrutadores/Empresas)
              </h3>
              <p className="text-gray-700 mb-2">Coletamos:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong>Dados cadastrais:</strong> Nome, email, telefone, empresa, cargo</li>
                <li><strong>Dados de autenticação:</strong> Senha (criptografada)</li>
                <li><strong>Dados de pagamento:</strong> Informações processadas por gateway seguro</li>
                <li><strong>Dados de uso:</strong> IP, navegador, ações na plataforma, logs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                3.2. Dados de Candidatos
              </h3>
              <p className="text-gray-700 mb-2">
                Os dados de candidatos são de responsabilidade do recrutador
                (controlador). Processamos:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong>Dados fornecidos:</strong> Nome, email, respostas às perguntas</li>
                <li><strong>Dados de mídia:</strong> Gravações de áudio/vídeo (quando aplicável)</li>
                <li><strong>Dados de análise:</strong> Pontuações e avaliações geradas pela IA</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                3.3. Dados Coletados Automaticamente
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Endereço IP e localização aproximada</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas acessadas e tempo de uso</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            {/* 4. Base Legal e Finalidade */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Base Legal e Finalidade do Tratamento
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Tratamos seus dados com base nas seguintes bases legais (Art. 7º da LGPD):
              </p>

              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-800">
                    Execução de Contrato (Art. 7º, V)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Para fornecer os serviços contratados, processar entrevistas e
                    gerar relatórios.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-800">
                    Consentimento (Art. 7º, I)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Para enviar comunicações de marketing e newsletter (você pode
                    revogar a qualquer momento).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-800">
                    Legítimo Interesse (Art. 7º, IX)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Para melhorar a plataforma, prevenir fraudes e garantir segurança.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold text-gray-800">
                    Cumprimento de Obrigação Legal (Art. 7º, II)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Para cumprir obrigações fiscais, trabalhistas e regulatórias.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Como Usamos os Dados */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Como Usamos Seus Dados
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fornecer e manter os serviços da plataforma</li>
                <li>Processar e analisar entrevistas com IA</li>
                <li>Autenticar usuários e prevenir fraudes</li>
                <li>Processar pagamentos e emitir notas fiscais</li>
                <li>Enviar notificações importantes sobre o serviço</li>
                <li>Melhorar a experiência e desenvolver novos recursos</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Responder solicitações de suporte</li>
              </ul>
            </section>

            {/* 6. Compartilhamento de Dados */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Compartilhamento de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Não vendemos seus dados.</strong> Podemos compartilhar
                informações apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Prestadores de serviço:</strong> Empresas que nos auxiliam
                  (hospedagem, pagamento, analytics) sob contrato de
                  confidencialidade
                </li>
                <li>
                  <strong>Obrigações legais:</strong> Quando exigido por lei, ordem
                  judicial ou autoridades competentes
                </li>
                <li>
                  <strong>Com seu consentimento:</strong> Em outros casos, mediante
                  sua autorização expressa
                </li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-gray-700">
                  <strong>Transferência Internacional:</strong> Alguns de nossos
                  prestadores podem estar fora do Brasil. Garantimos que seguem
                  padrões adequados de proteção de dados.
                </p>
              </div>
            </section>

            {/* 7. Segurança */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lock className="w-6 h-6 text-blue-600" />
                7. Segurança dos Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Implementamos medidas técnicas e organizacionais para proteger seus dados:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Criptografia SSL/TLS em todas as conexões</li>
                <li>Senhas armazenadas com hash seguro (bcrypt)</li>
                <li>Controle de acesso baseado em permissões</li>
                <li>Monitoramento e logs de segurança</li>
                <li>Backups regulares e recuperação de desastres</li>
                <li>Testes de segurança e auditorias periódicas</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                <strong>Importante:</strong> Nenhum sistema é 100% seguro. Em caso de
                incidente de segurança, notificaremos você e a ANPD conforme a LGPD.
              </p>
            </section>

            {/* 8. Seus Direitos (LGPD) */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-blue-600" />
                8. Seus Direitos (Art. 18 da LGPD)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Como titular de dados pessoais, você tem direito a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Confirmação e acesso:</strong> Saber se tratamos seus dados
                  e acessá-los
                </li>
                <li>
                  <strong>Correção:</strong> Atualizar dados incompletos, inexatos ou
                  desatualizados
                </li>
                <li>
                  <strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar
                  remoção de dados desnecessários ou excessivos
                </li>
                <li>
                  <strong>Portabilidade:</strong> Receber seus dados em formato
                  estruturado e interoperável
                </li>
                <li>
                  <strong>Exclusão:</strong> Solicitar eliminação de dados tratados
                  com consentimento
                </li>
                <li>
                  <strong>Revogação do consentimento:</strong> Retirar consentimento
                  a qualquer momento
                </li>
                <li>
                  <strong>Oposição:</strong> Opor-se ao tratamento realizado com base
                  em legítimo interesse
                </li>
                <li>
                  <strong>Informação sobre compartilhamento:</strong> Saber com quem
                  compartilhamos seus dados
                </li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="font-semibold text-gray-900 mb-2">
                  Como exercer seus direitos:
                </p>
                <p className="text-sm text-gray-700">
                  Entre em contato através do email:{" "}
                  <strong>privacidade@entrevistia.com.br</strong> ou pela área de
                  configurações da plataforma. Responderemos em até 15 dias.
                </p>
              </div>
            </section>

            {/* 9. Retenção de Dados */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Retenção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Mantemos seus dados pessoais apenas pelo tempo necessário:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Dados de conta:</strong> Enquanto a conta estiver ativa +
                  prazo legal (até 5 anos para obrigações fiscais)
                </li>
                <li>
                  <strong>Dados de candidatos:</strong> Conforme definido pelo
                  recrutador (controlador), ou até solicitação de exclusão
                </li>
                <li>
                  <strong>Logs de acesso:</strong> 6 meses (Marco Civil da Internet)
                </li>
                <li>
                  <strong>Dados de marketing:</strong> Até revogação do consentimento
                </li>
              </ul>
            </section>

            {/* 10. Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Cookies e Tecnologias Similares
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                Utilizamos cookies para melhorar sua experiência:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Essenciais:</strong> Necessários para o funcionamento
                  (autenticação, segurança)
                </li>
                <li>
                  <strong>Funcionais:</strong> Lembram suas preferências
                </li>
                <li>
                  <strong>Analíticos:</strong> Medem uso e performance (anônimos)
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Você pode gerenciar cookies nas configurações do navegador.
              </p>
            </section>

            {/* 11. Menores de Idade */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                11. Crianças e Adolescentes
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nossa plataforma não é direcionada a menores de 18 anos. Se
                tomarmos conhecimento de coleta inadvertida de dados de menores,
                excluiremos tais informações imediatamente. Dados de adolescentes
                candidatos devem ser tratados com consentimento específico de um dos
                pais/responsáveis, conforme Art. 14 da LGPD.
              </p>
            </section>

            {/* 12. Alterações */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                12. Alterações nesta Política
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente.
                Alterações substanciais serão comunicadas por email ou notificação
                na plataforma. A data da última atualização estará sempre visível
                no topo deste documento.
              </p>
            </section>

            {/* 13. Encarregado de Dados (DPO) */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                13. Encarregado de Proteção de Dados (DPO)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nosso Encarregado de Proteção de Dados está disponível para
                esclarecer dúvidas sobre tratamento de dados:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>
                  <strong>Email:</strong> dpo@entrevistia.com.br
                </li>
                <li>
                  <strong>Também:</strong> privacidade@entrevistia.com.br
                </li>
              </ul>
            </section>

            {/* 14. Contato e Reclamações */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                14. Contato e Autoridade Nacional
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Para questões sobre privacidade, entre em contato:
              </p>
              <ul className="list-none space-y-2 text-gray-700 mb-4">
                <li>
                  <strong>Email:</strong> privacidade@entrevistia.com.br
                </li>
                <li>
                  <strong>Email:</strong> contato@entrevistia.com.br
                </li>
                <li>
                  <strong>Endereço:</strong> São Paulo - SP, Brasil
                </li>
                <li className="text-sm text-gray-500">
                  (Endereço completo será atualizado após formalização da empresa)
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Você também pode registrar reclamações junto à{" "}
                <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>:
              </p>
              <ul className="list-none space-y-1 text-gray-700 mt-2">
                <li>Site: https://www.gov.br/anpd</li>
                <li>Ouvidoria ANPD</li>
              </ul>
            </section>
          </div>

          {/* Footer com Selos */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Conforme LGPD</p>
              </div>
              <div className="text-center">
                <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Criptografia SSL</p>
              </div>
              <div className="text-center">
                <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Dados Protegidos</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Esta política está em conformidade com a Lei Geral de Proteção de
              Dados (Lei 13.709/2018) e demais legislações aplicáveis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
