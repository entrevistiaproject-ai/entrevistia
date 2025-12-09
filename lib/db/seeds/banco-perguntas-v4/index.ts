/**
 * Banco de Perguntas v4 - Exportação Consolidada
 *
 * Este arquivo consolida todas as perguntas de todas as áreas.
 * Use este import para ter acesso a todas as perguntas do banco.
 */

// Types
export * from './types';

// Tecnologia
export * from './tecnologia';
import { perguntasTecnologia, estatisticasTecnologia } from './tecnologia';

// Jurídico
export * from './juridico';
import { perguntasJuridico, estatisticasJuridico } from './juridico';

// Varejo
export * from './varejo';
import { perguntasVarejo, estatisticasVarejo } from './varejo';

// Comercial / Marketing
export * from './comercial';
import { perguntasComercial, estatisticasComercial } from './comercial';

// Administrativo / Gestão
export * from './administrativo';
import { perguntasAdministrativo, estatisticasAdministrativo } from './administrativo';

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const todasPerguntas = [
  ...perguntasTecnologia,
  ...perguntasJuridico,
  ...perguntasVarejo,
  ...perguntasComercial,
  ...perguntasAdministrativo,
];

export const estatisticasGerais = {
  totalGeral: todasPerguntas.length,
  porArea: {
    tecnologia: estatisticasTecnologia,
    juridico: estatisticasJuridico,
    varejo: estatisticasVarejo,
    comercial: estatisticasComercial,
    administrativo: estatisticasAdministrativo,
  },
  resumo: {
    tecnologia: estatisticasTecnologia.total,
    juridico: estatisticasJuridico.total,
    varejo: estatisticasVarejo.total,
    comercial: estatisticasComercial.total,
    administrativo: estatisticasAdministrativo.total,
  },
};

// Função utilitária para listar estatísticas
export function imprimirEstatisticas(): void {
  console.log('\n====== BANCO DE PERGUNTAS v4 - ESTATÍSTICAS ======\n');
  console.log(`Total Geral: ${estatisticasGerais.totalGeral} perguntas\n`);

  console.log('Por Área:');
  console.log(`  - Tecnologia: ${estatisticasGerais.resumo.tecnologia} perguntas`);
  console.log(`  - Jurídico: ${estatisticasGerais.resumo.juridico} perguntas`);
  console.log(`  - Varejo: ${estatisticasGerais.resumo.varejo} perguntas`);
  console.log(`  - Comercial/Marketing: ${estatisticasGerais.resumo.comercial} perguntas`);
  console.log(`  - Administrativo/Gestão: ${estatisticasGerais.resumo.administrativo} perguntas`);

  console.log('\n================================================\n');
}
