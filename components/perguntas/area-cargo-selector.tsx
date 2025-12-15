"use client";

import { useState, useCallback, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AREAS_CARGOS, AREAS_LABELS, AreaProfissional } from "@/lib/db/seeds/banco-perguntas-v4/types";

interface AreaCargoSelectorProps {
  selectedCargos: string[];
  onChange: (cargos: string[]) => void;
  className?: string;
}

export function AreaCargoSelector({
  selectedCargos,
  onChange,
  className,
}: AreaCargoSelectorProps) {
  const [expandedAreas, setExpandedAreas] = useState<Set<AreaProfissional>>(
    new Set(Object.keys(AREAS_CARGOS) as AreaProfissional[])
  );

  const areas = Object.keys(AREAS_CARGOS) as AreaProfissional[];
  const todosCargos = useMemo(() => Object.values(AREAS_CARGOS).flat(), []);

  // Verifica se uma área está totalmente selecionada
  const isAreaFullySelected = useCallback(
    (area: AreaProfissional) => {
      const cargosArea = AREAS_CARGOS[area];
      return cargosArea.every((cargo) => selectedCargos.includes(cargo));
    },
    [selectedCargos]
  );

  // Verifica se uma área está parcialmente selecionada
  const isAreaPartiallySelected = useCallback(
    (area: AreaProfissional) => {
      const cargosArea = AREAS_CARGOS[area];
      const selectedCount = cargosArea.filter((cargo) =>
        selectedCargos.includes(cargo)
      ).length;
      return selectedCount > 0 && selectedCount < cargosArea.length;
    },
    [selectedCargos]
  );

  // Toggle área expandida
  const toggleArea = useCallback((area: AreaProfissional) => {
    setExpandedAreas((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(area)) {
        newSet.delete(area);
      } else {
        newSet.add(area);
      }
      return newSet;
    });
  }, []);

  // Toggle todos os cargos de uma área
  const toggleAreaCargos = useCallback(
    (area: AreaProfissional) => {
      const cargosArea = AREAS_CARGOS[area];
      const isFullySelected = isAreaFullySelected(area);

      if (isFullySelected) {
        // Remove todos os cargos da área
        onChange(selectedCargos.filter((cargo) => !cargosArea.includes(cargo)));
      } else {
        // Adiciona todos os cargos da área
        const newCargos = new Set([...selectedCargos, ...cargosArea]);
        onChange(Array.from(newCargos));
      }
    },
    [selectedCargos, onChange, isAreaFullySelected]
  );

  // Toggle cargo individual
  const toggleCargo = useCallback(
    (cargo: string) => {
      if (selectedCargos.includes(cargo)) {
        onChange(selectedCargos.filter((c) => c !== cargo));
      } else {
        onChange([...selectedCargos, cargo]);
      }
    },
    [selectedCargos, onChange]
  );

  // Selecionar todos
  const selectAll = useCallback(() => {
    onChange(todosCargos);
  }, [onChange, todosCargos]);

  // Desselecionar todos
  const deselectAll = useCallback(() => {
    onChange([]);
  }, [onChange]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = todosCargos.length;
    const selected = selectedCargos.length;
    return { total, selected };
  }, [todosCargos, selectedCargos]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Header com ações globais */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b">
        <span className="text-sm text-muted-foreground">
          {stats.selected} de {stats.total} cargos selecionados
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={selectAll}
            disabled={stats.selected === stats.total}
          >
            <Check className="h-4 w-4 mr-1" />
            Selecionar todos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={deselectAll}
            disabled={stats.selected === 0}
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        </div>
      </div>

      {/* Lista de áreas e cargos */}
      <div className="flex flex-col gap-2">
        {areas.map((area) => {
          const isExpanded = expandedAreas.has(area);
          const cargosArea = AREAS_CARGOS[area];
          const fullySelected = isAreaFullySelected(area);
          const partiallySelected = isAreaPartiallySelected(area);
          const selectedInArea = cargosArea.filter((c) =>
            selectedCargos.includes(c)
          ).length;

          return (
            <div key={area} className="border rounded-lg overflow-hidden">
              {/* Header da área */}
              <div
                className={cn(
                  "flex items-center gap-3 p-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors",
                  fullySelected && "bg-primary/10"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleArea(area)}
                  className="p-0.5 hover:bg-muted rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                <div
                  className="flex items-center gap-3 flex-1"
                  onClick={() => toggleAreaCargos(area)}
                >
                  <Checkbox
                    checked={fullySelected}
                    // @ts-expect-error - indeterminate é válido mas não tipado
                    indeterminate={partiallySelected && !fullySelected}
                    className={cn(
                      partiallySelected && !fullySelected && "bg-primary/50"
                    )}
                  />
                  <span className="font-medium">{AREAS_LABELS[area]}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {selectedInArea}/{cargosArea.length}
                  </span>
                </div>
              </div>

              {/* Lista de cargos */}
              {isExpanded && (
                <div className="p-2 pl-10 flex flex-col gap-1 bg-background">
                  {cargosArea.map((cargo) => {
                    const isSelected = selectedCargos.includes(cargo);
                    return (
                      <label
                        key={cargo}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-muted/50 transition-colors",
                          isSelected && "bg-primary/5"
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleCargo(cargo)}
                        />
                        <span className="text-sm">{cargo}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
