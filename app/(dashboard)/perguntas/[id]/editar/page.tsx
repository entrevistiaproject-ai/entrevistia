import { notFound, redirect } from "next/navigation";
import { getDB } from "@/lib/db";
import { perguntasTemplates, PerguntaTemplate } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FormularioPergunta } from "@/components/perguntas/formulario-pergunta";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/lib/auth/get-user";

interface EditarPerguntaPageProps {
  params: Promise<{ id: string }>;
}

type GetPerguntaResult =
  | { success: true; pergunta: PerguntaTemplate }
  | { success: false; error: "not_found" | "padrao" | "permissao" };

async function getPergunta(id: string, userId: string | null): Promise<GetPerguntaResult> {
  const db = getDB();

  const [pergunta] = await db
    .select()
    .from(perguntasTemplates)
    .where(eq(perguntasTemplates.id, id))
    .limit(1);

  if (!pergunta) {
    return { success: false, error: "not_found" };
  }

  // Não permite editar perguntas padrão
  if (pergunta.isPadrao) {
    return { success: false, error: "padrao" };
  }

  // Verifica se a pergunta pertence ao usuário
  if (pergunta.userId !== userId) {
    return { success: false, error: "permissao" };
  }

  return { success: true, pergunta };
}

export default async function EditarPerguntaPage({ params }: EditarPerguntaPageProps) {
  const { id } = await params;
  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const resultado = await getPergunta(id, userId);

  if (!resultado.success) {
    if (resultado.error === "not_found") {
      notFound();
    }

    if (resultado.error === "padrao") {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/perguntas">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Erro</h1>
              <p className="text-muted-foreground mt-2">
                Não é possível editar perguntas padrão do sistema.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (resultado.error === "permissao") {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/perguntas">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Sem Permissão</h1>
              <p className="text-muted-foreground mt-2">
                Você não tem permissão para editar esta pergunta.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Fallback para erros não tratados
    notFound();
  }

  const { pergunta } = resultado;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/perguntas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Editar Pergunta</h1>
          <p className="text-muted-foreground mt-2">
            Atualize os dados da sua pergunta
          </p>
        </div>
      </div>

      {/* Formulário */}
      <FormularioPergunta
        perguntaInicial={{
          id: pergunta.id,
          texto: pergunta.texto,
          cargo: pergunta.cargo,
          nivel: pergunta.nivel,
          categoria: pergunta.categoria,
          competencia: pergunta.competencia,
          tipo: pergunta.tipo,
        }}
        modoEdicao
      />
    </div>
  );
}
