-- Adiciona campos de controle para processamento de decisão automática
-- Estes campos ajudam a evitar race conditions e duplicação de processamento

-- Lock temporário para evitar que múltiplas execuções do cron processem o mesmo registro
ALTER TABLE candidato_entrevistas
ADD COLUMN IF NOT EXISTS auto_decision_lock_until TIMESTAMP;

-- Contador de tentativas de processamento (útil para debugging e retry limits)
ALTER TABLE candidato_entrevistas
ADD COLUMN IF NOT EXISTS auto_decision_tentativas REAL DEFAULT 0;

-- Último erro de processamento (para debugging)
ALTER TABLE candidato_entrevistas
ADD COLUMN IF NOT EXISTS auto_decision_erro TEXT;

-- Índice para otimizar queries do cron
CREATE INDEX IF NOT EXISTS idx_candidato_entrevistas_auto_decision_pending
ON candidato_entrevistas (avaliado_em, decisao_recrutador, auto_decision_lock_until)
WHERE avaliado_em IS NOT NULL AND decisao_recrutador IS NULL;

COMMENT ON COLUMN candidato_entrevistas.auto_decision_lock_until IS 'Lock temporário para evitar race conditions no processamento automático';
COMMENT ON COLUMN candidato_entrevistas.auto_decision_tentativas IS 'Número de tentativas de processamento automático';
COMMENT ON COLUMN candidato_entrevistas.auto_decision_erro IS 'Último erro ocorrido no processamento automático';
