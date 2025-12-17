"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export interface MemberPermissions {
  canViewInterviews: boolean;
  canCreateInterviews: boolean;
  canEditInterviews: boolean;
  canDeleteInterviews: boolean;
  canViewCandidates: boolean;
  canApproveCandidates: boolean;
  canRejectCandidates: boolean;
  canViewFinancials: boolean;
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canEditMemberPermissions: boolean;
  canEditSettings: boolean;
  canEditAutoApproval: boolean;
}

// Definição das categorias e permissões para a matriz
export const permissionCategories = [
  {
    id: "interviews",
    label: "Entrevistas",
    description: "Gerenciamento de vagas e entrevistas",
    permissions: [
      { key: "canViewInterviews", label: "Ver", description: "Visualizar entrevistas e vagas" },
      { key: "canCreateInterviews", label: "Criar", description: "Criar novas entrevistas e vagas" },
      { key: "canEditInterviews", label: "Editar", description: "Editar entrevistas existentes" },
      { key: "canDeleteInterviews", label: "Excluir", description: "Excluir entrevistas" },
    ],
  },
  {
    id: "candidates",
    label: "Candidatos",
    description: "Gerenciamento de candidatos",
    permissions: [
      { key: "canViewCandidates", label: "Ver", description: "Visualizar candidatos e resultados" },
      { key: "canApproveCandidates", label: "Aprovar", description: "Aprovar candidatos" },
      { key: "canRejectCandidates", label: "Reprovar", description: "Reprovar candidatos" },
    ],
  },
  {
    id: "financial",
    label: "Financeiro",
    description: "Acesso às informações financeiras",
    permissions: [
      { key: "canViewFinancials", label: "Ver custos", description: "Acessar página de custos e fatura" },
    ],
  },
  {
    id: "team",
    label: "Time",
    description: "Gerenciamento de membros do time",
    permissions: [
      { key: "canInviteMembers", label: "Convidar", description: "Convidar novos membros" },
      { key: "canRemoveMembers", label: "Remover", description: "Remover membros do time" },
      { key: "canEditMemberPermissions", label: "Permissões", description: "Editar permissões de membros" },
    ],
  },
  {
    id: "settings",
    label: "Configurações",
    description: "Configurações gerais e automação",
    permissions: [
      { key: "canEditSettings", label: "Gerais", description: "Editar configurações gerais" },
      { key: "canEditAutoApproval", label: "Aprovação auto.", description: "Configurar aprovação/reprovação automática" },
    ],
  },
] as const;

interface PermissionsMatrixProps {
  permissions: MemberPermissions;
  onChange: (permissions: MemberPermissions) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function PermissionsMatrix({
  permissions,
  onChange,
  disabled = false,
  compact = false,
}: PermissionsMatrixProps) {
  const handlePermissionChange = (key: keyof MemberPermissions, checked: boolean) => {
    onChange({
      ...permissions,
      [key]: checked,
    });
  };

  const handleCategoryToggle = (categoryKeys: string[], checked: boolean) => {
    const updates: Partial<MemberPermissions> = {};
    categoryKeys.forEach(key => {
      updates[key as keyof MemberPermissions] = checked;
    });
    onChange({
      ...permissions,
      ...updates,
    });
  };

  const isCategoryFullyEnabled = (categoryKeys: string[]) => {
    return categoryKeys.every(key => permissions[key as keyof MemberPermissions]);
  };

  const isCategoryPartiallyEnabled = (categoryKeys: string[]) => {
    const enabled = categoryKeys.filter(key => permissions[key as keyof MemberPermissions]).length;
    return enabled > 0 && enabled < categoryKeys.length;
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {permissionCategories.map(category => {
          const categoryKeys = category.permissions.map(p => p.key);
          const fullyEnabled = isCategoryFullyEnabled(categoryKeys);
          const partiallyEnabled = isCategoryPartiallyEnabled(categoryKeys);

          return (
            <div key={category.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{category.label}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{category.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-3">
                {category.permissions.map(permission => (
                  <div key={permission.key} className="flex items-center gap-1.5">
                    <Checkbox
                      id={`compact-${permission.key}`}
                      checked={permissions[permission.key as keyof MemberPermissions]}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(permission.key as keyof MemberPermissions, checked as boolean)
                      }
                      disabled={disabled}
                    />
                    <Label
                      htmlFor={`compact-${permission.key}`}
                      className="text-xs text-muted-foreground cursor-pointer"
                    >
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-medium text-sm">Categoria</th>
              <th className="text-center p-3 font-medium text-sm" colSpan={4}>Permissões</th>
            </tr>
          </thead>
          <tbody>
            {permissionCategories.map((category, idx) => {
              const categoryKeys = category.permissions.map(p => p.key);
              const fullyEnabled = isCategoryFullyEnabled(categoryKeys);
              const partiallyEnabled = isCategoryPartiallyEnabled(categoryKeys);

              return (
                <tr
                  key={category.id}
                  className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className="p-3 border-r">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={fullyEnabled}
                        ref={(el) => {
                          if (el) {
                            (el as HTMLButtonElement & { indeterminate?: boolean }).indeterminate = partiallyEnabled;
                          }
                        }}
                        onCheckedChange={(checked) =>
                          handleCategoryToggle(categoryKeys, checked as boolean)
                        }
                        disabled={disabled}
                      />
                      <div>
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {category.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3" colSpan={4}>
                    <div className="flex flex-wrap gap-4">
                      {category.permissions.map(permission => (
                        <Tooltip key={permission.key}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`permission-${permission.key}`}
                                checked={permissions[permission.key as keyof MemberPermissions]}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(permission.key as keyof MemberPermissions, checked as boolean)
                                }
                                disabled={disabled}
                              />
                              <Label
                                htmlFor={`permission-${permission.key}`}
                                className="text-sm cursor-pointer"
                              >
                                {permission.label}
                              </Label>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{permission.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}

// Componente de presets de permissões (para aplicar templates rápidos)
interface PermissionsPresetsProps {
  onSelect: (permissions: MemberPermissions) => void;
  disabled?: boolean;
}

export const permissionPresets: Record<string, { label: string; description: string; permissions: MemberPermissions }> = {
  admin: {
    label: "Administrador",
    description: "Acesso total exceto financeiro",
    permissions: {
      canViewInterviews: true,
      canCreateInterviews: true,
      canEditInterviews: true,
      canDeleteInterviews: true,
      canViewCandidates: true,
      canApproveCandidates: true,
      canRejectCandidates: true,
      canViewFinancials: false,
      canInviteMembers: true,
      canRemoveMembers: true,
      canEditMemberPermissions: true,
      canEditSettings: true,
      canEditAutoApproval: true,
    },
  },
  recruiter: {
    label: "Recrutador",
    description: "Gerenciar entrevistas e candidatos",
    permissions: {
      canViewInterviews: true,
      canCreateInterviews: true,
      canEditInterviews: true,
      canDeleteInterviews: false,
      canViewCandidates: true,
      canApproveCandidates: true,
      canRejectCandidates: true,
      canViewFinancials: false,
      canInviteMembers: false,
      canRemoveMembers: false,
      canEditMemberPermissions: false,
      canEditSettings: false,
      canEditAutoApproval: true,
    },
  },
  financial: {
    label: "Financeiro",
    description: "Apenas acesso financeiro",
    permissions: {
      canViewInterviews: false,
      canCreateInterviews: false,
      canEditInterviews: false,
      canDeleteInterviews: false,
      canViewCandidates: false,
      canApproveCandidates: false,
      canRejectCandidates: false,
      canViewFinancials: true,
      canInviteMembers: false,
      canRemoveMembers: false,
      canEditMemberPermissions: false,
      canEditSettings: false,
      canEditAutoApproval: false,
    },
  },
  viewer: {
    label: "Visualizador",
    description: "Apenas visualização",
    permissions: {
      canViewInterviews: true,
      canCreateInterviews: false,
      canEditInterviews: false,
      canDeleteInterviews: false,
      canViewCandidates: true,
      canApproveCandidates: false,
      canRejectCandidates: false,
      canViewFinancials: false,
      canInviteMembers: false,
      canRemoveMembers: false,
      canEditMemberPermissions: false,
      canEditSettings: false,
      canEditAutoApproval: false,
    },
  },
};

export function PermissionsPresets({ onSelect, disabled }: PermissionsPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(permissionPresets).map(([key, preset]) => (
        <TooltipProvider key={key}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onSelect(preset.permissions)}
                disabled={disabled}
                className="px-3 py-1.5 text-xs font-medium rounded-full border bg-background hover:bg-muted transition-colors disabled:opacity-50"
              >
                {preset.label}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{preset.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
