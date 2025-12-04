"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormSelectField } from "@/components/entrevista/form-select-field";
import { PerguntasSection } from "@/components/entrevista/perguntas-section";
import { useEntrevistaForm } from "@/hooks/use-entrevista-form";
import { TIPOS_VAGA, SENIORIDADES } from "@/lib/constants/entrevista";

export default function CriarEntrevistaPage() {
  const {
    form,
    updateTipoVaga,
    updateSenioridade,
    adicionarPergunta,
    atualizarPergunta,
    removerPergunta,
  } = useEntrevistaForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entrevista criada:", form);
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Criar Nova Entrevista</CardTitle>
          <CardDescription>
            Configure os detalhes da vaga e adicione as perguntas para a entrevista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSelectField
              id="tipoVaga"
              label="Tipo de Vaga"
              value={form.tipoVaga}
              placeholder="Selecione o tipo de vaga"
              options={TIPOS_VAGA}
              onValueChange={updateTipoVaga}
            />

            <FormSelectField
              id="senioridade"
              label="Senioridade"
              value={form.senioridade}
              placeholder="Selecione a senioridade"
              options={SENIORIDADES}
              onValueChange={updateSenioridade}
            />

            <PerguntasSection
              perguntas={form.perguntas}
              onAdd={adicionarPergunta}
              onUpdate={atualizarPergunta}
              onRemove={removerPergunta}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">Criar Entrevista</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
