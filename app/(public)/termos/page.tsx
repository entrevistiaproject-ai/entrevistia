import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermosPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-gray-600 mb-8">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <div className="prose prose-gray max-w-none space-y-6">
            {/* 1. Aceitação dos Termos */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e utilizar a plataforma EntrevistIA ("Plataforma"), você
                concorda em cumprir e estar vinculado aos presentes Termos de Uso.
                Se você não concordar com qualquer parte destes termos, não deverá
                utilizar nossos serviços.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                A EntrevistIA é uma plataforma de automação de entrevistas que
                utiliza inteligência artificial para auxiliar processos seletivos
                de empresas e recrutadores.
              </p>
            </section>

            {/* 2. Definições */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Definições
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Usuário/Recrutador:</strong> Pessoa física ou jurídica que
                  contrata os serviços da plataforma.
                </li>
                <li>
                  <strong>Candidato:</strong> Pessoa física que participa de
                  entrevistas criadas pelos usuários.
                </li>
                <li>
                  <strong>Entrevista:</strong> Processo de avaliação criado pelo
                  usuário e realizado pelo candidato através da plataforma.
                </li>
                <li>
                  <strong>Dados Pessoais:</strong> Informações relacionadas a pessoa
                  natural identificada ou identificável.
                </li>
              </ul>
            </section>

            {/* 3. Cadastro e Conta */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Cadastro e Conta de Usuário
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.1.</strong> Para utilizar a plataforma, você deve criar
                uma conta fornecendo informações verdadeiras, completas e
                atualizadas.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.2.</strong> Você é responsável pela confidencialidade de
                sua senha e por todas as atividades realizadas em sua conta.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.3.</strong> É vedado o compartilhamento de credenciais de
                acesso com terceiros.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.4.</strong> O usuário deve ter capacidade civil plena ou,
                se menor de idade, estar devidamente representado.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.5.</strong> Reservamo-nos o direito de suspender ou
                encerrar contas que violem estes termos.
              </p>
            </section>

            {/* 4. Uso da Plataforma */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Uso Adequado da Plataforma
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                O usuário compromete-se a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Utilizar a plataforma apenas para fins lícitos e profissionais</li>
                <li>
                  Não praticar discriminação de qualquer natureza (raça, gênero,
                  religião, orientação sexual, etc.) nos processos seletivos
                </li>
                <li>
                  Respeitar os direitos dos candidatos, incluindo privacidade e
                  proteção de dados
                </li>
                <li>Não coletar dados além do necessário para o processo seletivo</li>
                <li>
                  Não utilizar a plataforma para spam, phishing ou fraudes
                </li>
                <li>Não tentar acessar áreas restritas ou violar a segurança</li>
              </ul>
            </section>

            {/* 5. Propriedade Intelectual */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Propriedade Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>5.1.</strong> Todo o conteúdo da plataforma (código, design,
                textos, logotipos, etc.) é de propriedade da EntrevistIA ou de seus
                licenciadores.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>5.2.</strong> O usuário mantém todos os direitos sobre os
                dados e conteúdos que cria (entrevistas, perguntas, avaliações).
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>5.3.</strong> É proibida a reprodução, distribuição ou
                engenharia reversa da plataforma sem autorização expressa.
              </p>
            </section>

            {/* 6. Proteção de Dados (LGPD) */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Proteção de Dados Pessoais (LGPD)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>6.1.</strong> A EntrevistIA atua como{" "}
                <strong>operadora</strong> de dados, processando informações sob
                instrução do usuário (controlador).
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>6.2.</strong> O usuário é o <strong>controlador</strong> dos
                dados dos candidatos e deve:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2 mb-3">
                <li>Obter consentimento válido dos candidatos</li>
                <li>Informar claramente a finalidade do tratamento de dados</li>
                <li>Garantir os direitos dos titulares (acesso, correção, exclusão)</li>
                <li>Cumprir a Lei Geral de Proteção de Dados (Lei 13.709/2018)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>6.3.</strong> Para detalhes sobre como tratamos dados,
                consulte nossa{" "}
                <Link
                  href="/privacidade"
                  className="text-blue-600 hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>

            {/* 7. Limitação de Responsabilidade */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>7.1.</strong> A plataforma é fornecida "como está", sem
                garantias de qualquer tipo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>7.2.</strong> Não garantimos disponibilidade ininterrupta ou
                ausência de erros.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>7.3.</strong> Não nos responsabilizamos por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Decisões de contratação baseadas nas análises da IA</li>
                <li>Conteúdo criado pelos usuários</li>
                <li>Perda de dados por caso fortuito ou força maior</li>
                <li>Danos indiretos, lucros cessantes ou danos consequenciais</li>
              </ul>
            </section>

            {/* 8. Planos e Pagamentos */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Planos e Pagamentos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>8.1.</strong> Os preços e planos disponíveis estão descritos
                em nosso site e podem ser alterados a qualquer momento.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>8.2.</strong> Alterações de preço para assinantes vigentes
                serão comunicadas com 30 dias de antecedência.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>8.3.</strong> O não pagamento resultará na suspensão do
                acesso aos serviços.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>8.4.</strong> Cancelamentos devem ser solicitados através da
                plataforma e serão efetivados conforme o ciclo de cobrança.
              </p>
            </section>

            {/* 9. Cancelamento */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Cancelamento e Rescisão
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>9.1.</strong> Você pode cancelar sua conta a qualquer momento
                através das configurações da plataforma.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>9.2.</strong> Podemos suspender ou encerrar sua conta em caso
                de violação destes termos.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>9.3.</strong> Após o cancelamento, seus dados serão mantidos
                conforme nossa Política de Privacidade e obrigações legais.
              </p>
            </section>

            {/* 10. Modificações */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Alterações nos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
                momento. Alterações substanciais serão comunicadas por email ou
                através da plataforma. O uso continuado após as alterações constitui
                aceitação dos novos termos.
              </p>
            </section>

            {/* 11. Lei Aplicável */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                11. Lei Aplicável e Foro
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa
                do Brasil. Fica eleito o foro da comarca de São Paulo - SP, com
                exclusão de qualquer outro, por mais privilegiado que seja, para
                dirimir quaisquer dúvidas ou controvérsias oriundas deste documento.
              </p>
            </section>

            {/* 12. Contato */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                12. Contato
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Para dúvidas sobre estes Termos de Uso, entre em contato:
              </p>
              <ul className="list-none space-y-2 text-gray-700 mt-3">
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
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Ao utilizar a EntrevistIA, você declara ter lido e concordado com
              estes Termos de Uso e nossa Política de Privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
