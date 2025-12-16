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

// Saúde
export * from './saude';
import { perguntasSaude, estatisticasSaude } from './saude';

// Call Center
export * from './callcenter';
import { perguntasCallCenter, estatisticasCallCenter } from './callcenter';

// Logística
export * from './logistica';
import { perguntasLogistica, estatisticasLogistica } from './logistica';

// Engenharia
export * from './engenharia';
import { perguntasEngenharia, estatisticasEngenharia } from './engenharia';

// Agronegócio
export * from './agronegocio';
import { perguntasAgronegocio, estatisticasAgronegocio } from './agronegocio';

// Educação
export * from './educacao';
import { perguntasEducacao, estatisticasEducacao } from './educacao';

// Hotelaria
export * from './hotelaria';
import { perguntasHotelaria, estatisticasHotelaria } from './hotelaria';

// Indústria
export * from './industria';
import { perguntasIndustria, estatisticasIndustria } from './industria';

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const todasPerguntas = [
  ...perguntasTecnologia,
  ...perguntasJuridico,
  ...perguntasVarejo,
  ...perguntasComercial,
  ...perguntasAdministrativo,
  ...perguntasSaude,
  ...perguntasCallCenter,
  ...perguntasLogistica,
  ...perguntasEngenharia,
  ...perguntasAgronegocio,
  ...perguntasEducacao,
  ...perguntasHotelaria,
  ...perguntasIndustria,
];

export const estatisticasGerais = {
  totalGeral: todasPerguntas.length,
  porArea: {
    tecnologia: estatisticasTecnologia,
    juridico: estatisticasJuridico,
    varejo: estatisticasVarejo,
    comercial: estatisticasComercial,
    administrativo: estatisticasAdministrativo,
    saude: estatisticasSaude,
    callcenter: estatisticasCallCenter,
    logistica: estatisticasLogistica,
    engenharia: estatisticasEngenharia,
    agronegocio: estatisticasAgronegocio,
    educacao: estatisticasEducacao,
    hotelaria: estatisticasHotelaria,
    industria: estatisticasIndustria,
  },
  resumo: {
    tecnologia: estatisticasTecnologia.total,
    juridico: estatisticasJuridico.total,
    varejo: estatisticasVarejo.total,
    comercial: estatisticasComercial.total,
    administrativo: estatisticasAdministrativo.total,
    saude: estatisticasSaude.total,
    callcenter: estatisticasCallCenter.total,
    logistica: estatisticasLogistica.total,
    engenharia: estatisticasEngenharia.total,
    agronegocio: estatisticasAgronegocio.total,
    educacao: estatisticasEducacao.total,
    hotelaria: estatisticasHotelaria.total,
    industria: estatisticasIndustria.total,
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
  console.log(`  - Saúde: ${estatisticasSaude.total} perguntas`);
  console.log(`  - Call Center: ${estatisticasCallCenter.total} perguntas`);
  console.log(`  - Logística: ${estatisticasLogistica.total} perguntas`);
  console.log(`  - Engenharia: ${estatisticasEngenharia.total} perguntas`);
  console.log(`  - Agronegócio: ${estatisticasAgronegocio.total} perguntas`);
  console.log(`  - Educação: ${estatisticasEducacao.total} perguntas`);
  console.log(`  - Hotelaria: ${estatisticasHotelaria.total} perguntas`);
  console.log(`  - Indústria: ${estatisticasIndustria.total} perguntas`);

  console.log('\n================================================\n');
}
