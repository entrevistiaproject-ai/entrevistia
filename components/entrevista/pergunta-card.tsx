import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Pergunta } from "@/types/entrevista";

interface PerguntaCardProps {
  pergunta: Pergunta;
  index: number;
  onUpdate: (id: string, texto: string) => void;
  onRemove: (id: string) => void;
}

const MAX_CARACTERES = 500;

export function PerguntaCard({ pergunta, index, onUpdate, onRemove }: PerguntaCardProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`pergunta-${pergunta.id}`}>Pergunta {index + 1}</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(pergunta.id)}
          >
            Remover
          </Button>
        </div>
        <Textarea
          id={`pergunta-${pergunta.id}`}
          value={pergunta.texto}
          onChange={(e) => onUpdate(pergunta.id, e.target.value)}
          placeholder="Digite a pergunta aqui..."
          maxLength={MAX_CARACTERES}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">
          {pergunta.texto.length}/{MAX_CARACTERES} caracteres
        </p>
      </CardContent>
    </Card>
  );
}
