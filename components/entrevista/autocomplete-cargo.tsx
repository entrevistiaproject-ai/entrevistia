"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, Briefcase, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { AREAS_CARGOS, AREAS_LABELS, AreaProfissional } from "@/lib/db/seeds/banco-perguntas-v4/types";

interface CargoInfo {
  nome: string;
  isCustom: boolean;
  area?: AreaProfissional;
}

interface AreaComCargos {
  area: AreaProfissional;
  label: string;
  cargos: CargoInfo[];
}

interface CargosResponse {
  areas: AreaComCargos[];
  cargosCustomizados: CargoInfo[];
  busca: string | null;
  cargoExato: string | null;
  totalResultados: number;
  podecriar: boolean;
}

interface AutocompleteCargoProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AutocompleteCargo({
  value,
  onChange,
  placeholder = "Digite ou selecione",
}: AutocompleteCargoProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cargosData, setCargosData] = useState<CargosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Buscar cargos iniciais (apenas visíveis)
  useEffect(() => {
    async function fetchCargosIniciais() {
      setLoading(true);
      try {
        const response = await fetch("/api/cargos?apenasVisiveis=true");
        const data = await response.json();
        setCargosData(data);
      } catch (error) {
        console.error("Erro ao buscar cargos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCargosIniciais();
  }, []);

  // Buscar cargos quando digitar (busca em todos)
  const handleSearch = useCallback(async (searchValue: string) => {
    setInputValue(searchValue);

    if (!searchValue.trim()) {
      // Voltar para cargos visíveis
      setIsSearching(false);
      try {
        const response = await fetch("/api/cargos?apenasVisiveis=true");
        const data = await response.json();
        setCargosData(data);
      } catch (error) {
        console.error("Erro ao buscar cargos:", error);
      }
      return;
    }

    setIsSearching(true);

    try {
      // Buscar em TODOS os cargos quando estiver digitando
      const response = await fetch(`/api/cargos?busca=${encodeURIComponent(searchValue)}`);
      const data = await response.json();
      setCargosData(data);
    } catch (error) {
      console.error("Erro ao buscar cargos:", error);
    }
  }, []);

  const handleSelect = (cargo: string) => {
    onChange(cargo);
    setInputValue("");
    setOpen(false);
  };

  const handleCreateCargo = () => {
    if (inputValue.trim().length >= 3) {
      onChange(inputValue.trim());
      setInputValue("");
      setOpen(false);
    }
  };

  // Verificar se pode criar o cargo (não existe e tem ao menos 3 caracteres)
  const podecriar = useMemo(() => {
    if (!inputValue.trim() || inputValue.trim().length < 3) return false;

    const todosCargos = [
      ...Object.values(AREAS_CARGOS).flat(),
      ...(cargosData?.cargosCustomizados?.map(c => c.nome) || []),
    ];

    return !todosCargos.some(
      c => c.toLowerCase() === inputValue.trim().toLowerCase()
    );
  }, [inputValue, cargosData]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-11 sm:h-10"
        >
          <span className={cn(!value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Digite o cargo..."
            value={inputValue}
            onValueChange={handleSearch}
          />

          {/* Dica de uso */}
          {!inputValue && !loading && (
            <div className="px-3 py-2 border-b bg-muted/30">
              <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>
                  Não encontrou seu cargo? Basta digitar o nome para cadastrar um novo.
                </span>
              </p>
            </div>
          )}

          <CommandList className="max-h-[300px]">
            {loading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Carregando...
              </div>
            ) : (
              <>
                {/* Opção de criar novo cargo */}
                {podecriar && (
                  <>
                    <CommandGroup>
                      <CommandItem
                        onSelect={handleCreateCargo}
                        className="bg-primary/5 border border-primary/20 mx-1 my-1 rounded-md"
                      >
                        <div className="flex items-start gap-2 w-full py-1">
                          <Plus className="h-4 w-4 text-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-primary">
                              Criar &quot;{inputValue.trim()}&quot;
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Cargo personalizado - visível apenas para você
                            </p>
                          </div>
                          <Sparkles className="h-4 w-4 text-primary/60 mt-0.5" />
                        </div>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}

                {/* Cargos customizados do usuário */}
                {cargosData?.cargosCustomizados && cargosData.cargosCustomizados.length > 0 && (
                  <>
                    <CommandGroup heading="Seus cargos personalizados">
                      {cargosData.cargosCustomizados.map((cargo) => (
                        <CommandItem
                          key={`custom-${cargo.nome}`}
                          value={cargo.nome}
                          onSelect={() => handleSelect(cargo.nome)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === cargo.nome ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          {cargo.nome}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}

                {/* Cargos por área */}
                {cargosData?.areas?.map((areaData) => (
                  <CommandGroup key={areaData.area} heading={areaData.label}>
                    {areaData.cargos.map((cargo) => (
                      <CommandItem
                        key={`${areaData.area}-${cargo.nome}`}
                        value={cargo.nome}
                        onSelect={() => handleSelect(cargo.nome)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === cargo.nome ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {cargo.nome}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}

                {/* Mensagem quando não há resultados */}
                {cargosData?.totalResultados === 0 && !podecriar && (
                  <CommandEmpty>
                    <div className="py-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Nenhum cargo encontrado.
                      </p>
                      {inputValue.trim().length < 3 && inputValue.trim().length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Digite ao menos 3 caracteres para criar um novo cargo.
                        </p>
                      )}
                    </div>
                  </CommandEmpty>
                )}

                {/* Mensagem informativa durante busca */}
                {isSearching && cargosData?.totalResultados !== undefined && cargosData.totalResultados > 0 && (
                  <div className="px-3 py-2 border-t bg-muted/30">
                    <p className="text-xs text-muted-foreground">
                      {cargosData.totalResultados} {cargosData.totalResultados === 1 ? "cargo encontrado" : "cargos encontrados"}
                    </p>
                  </div>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
