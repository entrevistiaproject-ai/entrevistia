import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PerguntaCard } from "./pergunta-card";
import type { Pergunta } from "@/types/entrevista";

interface PerguntasSectionProps {
  perguntas: Pergunta[];
  onAdd: () => void;
  onUpdate: (id: string, texto: string) => void;
  onRemove: (id: string) => void;
}

export function PerguntasSection({ perguntas, onAdd, onUpdate, onRemove }: PerguntasSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Perguntas</Label>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          + Adicionar Pergunta
        </Button>
      </div>

      {perguntas.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma pergunta adicionada ainda. Clique em &quot;Adicionar Pergunta&quot; para começar.
        </p>
      ) : (
        <div className="space-y-4">
          {perguntas.map((pergunta, index) => (
            <PerguntaCard
              key={pergunta.id}
              pergunta={pergunta}
              index={index}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
