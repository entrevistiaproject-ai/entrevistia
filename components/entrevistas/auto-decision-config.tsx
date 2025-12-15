"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AutoDecisionConfigProps {
  // Aprovação
  autoApprovalEnabled: boolean;
  onAutoApprovalEnabledChange: (enabled: boolean) => void;
  autoApprovalMinScore: number;
  onAutoApprovalMinScoreChange: (score: number) => void;
  // Reprovação
  autoRejectEnabled: boolean;
  onAutoRejectEnabledChange: (enabled: boolean) => void;
  autoRejectMaxScore: number;
  onAutoRejectMaxScoreChange: (score: number) => void;
}

export function AutoDecisionConfig({
  autoApprovalEnabled,
  onAutoApprovalEnabledChange,
  autoApprovalMinScore,
  onAutoApprovalMinScoreChange,
  autoRejectEnabled,
  onAutoRejectEnabledChange,
  autoRejectMaxScore,
  onAutoRejectMaxScoreChange,
}: AutoDecisionConfigProps) {
  return (
    <div className="space-y-4">
      {/* Aprovação automática */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <Label htmlFor="auto-approval" className="text-sm sm:text-base">
            Aprovação automática
          </Label>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Candidatos com nota acima do mínimo são aprovados automaticamente
          </p>
        </div>
        <Switch
          id="auto-approval"
          checked={autoApprovalEnabled}
          onCheckedChange={onAutoApprovalEnabledChange}
          className="shrink-0"
        />
      </div>

      {/* Score mínimo para aprovação */}
      {autoApprovalEnabled && (
        <div className="ml-0 sm:ml-4 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="min-score" className="text-sm">
              Nota mínima para aprovação
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="min-score"
                type="number"
                min={0}
                max={100}
                value={autoApprovalMinScore}
                onChange={(e) => onAutoApprovalMinScoreChange(Number(e.target.value))}
                className="w-20 text-center"
              />
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Candidatos com nota igual ou superior serão aprovados automaticamente
          </p>
        </div>
      )}

      {/* Reprovação automática */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <Label htmlFor="auto-reject" className="text-sm sm:text-base">
            Reprovação automática
          </Label>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Candidatos com nota abaixo do máximo são reprovados automaticamente
          </p>
        </div>
        <Switch
          id="auto-reject"
          checked={autoRejectEnabled}
          onCheckedChange={onAutoRejectEnabledChange}
          className="shrink-0"
        />
      </div>

      {/* Score máximo para reprovação */}
      {autoRejectEnabled && (
        <div className="ml-0 sm:ml-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="max-score-reject" className="text-sm">
              Nota máxima para reprovação
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="max-score-reject"
                type="number"
                min={0}
                max={100}
                value={autoRejectMaxScore}
                onChange={(e) => onAutoRejectMaxScoreChange(Number(e.target.value))}
                className="w-20 text-center"
              />
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Candidatos com nota igual ou inferior serão reprovados automaticamente
          </p>
        </div>
      )}

      {/* Aviso de faixa de análise manual */}
      {autoApprovalEnabled && autoRejectEnabled && autoApprovalMinScore > autoRejectMaxScore && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong className="text-blue-900 dark:text-blue-100">Faixa de análise manual:</strong> Candidatos com nota entre {autoRejectMaxScore + 1}% e {autoApprovalMinScore - 1}% ficarão pendentes para sua decisão.
          </p>
        </div>
      )}

      {/* Aviso de conflito */}
      {autoApprovalEnabled && autoRejectEnabled && autoApprovalMinScore <= autoRejectMaxScore && (
        <div className="p-3 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Atenção:</strong> A nota de aprovação ({autoApprovalMinScore}%) deve ser maior que a nota de reprovação ({autoRejectMaxScore}%).
          </p>
        </div>
      )}
    </div>
  );
}
