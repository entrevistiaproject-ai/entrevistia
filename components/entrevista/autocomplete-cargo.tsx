"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [cargos, setCargos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar cargos únicos do banco de perguntas
    async function fetchCargos() {
      try {
        const response = await fetch("/api/perguntas");
        const perguntas = await response.json();
        const cargosUnicos = Array.from(
          new Set(perguntas.map((p: any) => p.cargo))
        ) as string[];
        setCargos(cargosUnicos.sort());
      } catch (error) {
        console.error("Erro ao buscar cargos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCargos();
  }, []);

  const handleSelect = (currentValue: string) => {
    onChange(currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Digite o cargo..."
            value={value}
            onValueChange={onChange}
          />
          <CommandList>
            {loading ? (
              <div className="py-6 text-center text-sm">Carregando...</div>
            ) : (
              <>
                {value && !cargos.includes(value) && (
                  <CommandEmpty>
                    <button
                      onClick={() => handleSelect(value)}
                      className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm"
                    >
                      Criar &quot;<strong>{value}</strong>&quot;
                    </button>
                  </CommandEmpty>
                )}
                {cargos.length > 0 && (
                  <CommandGroup heading="Cargos cadastrados">
                    {cargos.map((cargo) => (
                      <CommandItem
                        key={cargo}
                        value={cargo}
                        onSelect={() => handleSelect(cargo)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === cargo ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {cargo}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
