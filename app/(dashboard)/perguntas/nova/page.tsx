import { FormularioPergunta } from "@/components/perguntas/formulario-pergunta";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NovaPerguntaPage() {
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
          <h1 className="text-3xl font-bold">Nova Pergunta</h1>
          <p className="text-muted-foreground mt-2">
            Crie uma nova pergunta para usar em suas entrevistas
          </p>
        </div>
      </div>

      {/* Formulário */}
      <FormularioPergunta />
    </div>
  );
}
