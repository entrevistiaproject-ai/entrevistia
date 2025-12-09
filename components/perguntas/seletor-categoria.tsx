'use client';

import { useState, useEffect } from 'react';
import { CATEGORIAS_DISPONIVEIS, sugerirCategoria, type CategoriaPerguntas } from '@/lib/utils/classificacao-perguntas';

interface SeletorCategoriaProps {
  textoPergunta: string;
  categoriaAtual?: CategoriaPerguntas;
  onChange: (categoria: CategoriaPerguntas) => void;
  className?: string;
}

/**
 * Componente para selecionar categoria de pergunta
 * - Sugere automaticamente baseado no texto
 * - Permite usuário mudar manualmente
 * - Mostra nível de confiança da sugestão
 */
export function SeletorCategoria({
  textoPergunta,
  categoriaAtual,
  onChange,
  className = '',
}: SeletorCategoriaProps) {
  const [categoriaLocal, setCategoriaLocal] = useState<CategoriaPerguntas>(
    (categoriaAtual || 'tecnica') as CategoriaPerguntas
  );
  const [sugestao, setSugestao] = useState<ReturnType<typeof sugerirCategoria> | null>(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  // Sugere categoria quando texto mudar
  useEffect(() => {
    if (textoPergunta.length > 10) {
      const novaSugestao = sugerirCategoria(textoPergunta);

      // Agenda a atualização de estado para o próximo tick
      // para evitar chamadas síncronas no corpo do efeito
      const timer = setTimeout(() => {
        setSugestao(novaSugestao);

        // Se categoria não foi definida manualmente, usa sugestão
        if (!categoriaAtual) {
          setCategoriaLocal(novaSugestao.categoria);
          onChange(novaSugestao.categoria);
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [textoPergunta, categoriaAtual, onChange]);

  const handleMudarCategoria = (novaCategoria: CategoriaPerguntas) => {
    setCategoriaLocal(novaCategoria);
    onChange(novaCategoria);
    setMostrarOpcoes(false);
  };

  const categoriaInfo = CATEGORIAS_DISPONIVEIS.find(c => c.id === categoriaLocal);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        Categoria
        <span className="text-gray-400 ml-1 font-normal">(opcional - sugestão automática)</span>
      </label>

      <div className="relative">
        {/* Badge da categoria atual */}
        <button
          type="button"
          onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{categoriaInfo?.icone}</span>
            <span className="font-medium">{categoriaInfo?.nome}</span>
          </div>

          {sugestao && sugestao.categoria === categoriaLocal && (
            <span className={`text-xs px-2 py-0.5 rounded ${
              sugestao.confianca === 'alta' ? 'bg-green-100 text-green-700' :
              sugestao.confianca === 'media' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              Sugerido
            </span>
          )}

          <svg
            className={`w-4 h-4 transition-transform ${mostrarOpcoes ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown de opções */}
        {mostrarOpcoes && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {CATEGORIAS_DISPONIVEIS.map(categoria => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => handleMudarCategoria(categoria.id)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  categoriaLocal === categoria.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{categoria.icone}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{categoria.nome}</span>
                      {sugestao?.categoria === categoria.id && (
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          sugestao.confianca === 'alta' ? 'bg-green-100 text-green-700' :
                          sugestao.confianca === 'media' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {sugestao.confianca === 'alta' ? 'Recomendado' : 'Sugerido'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{categoria.descricao}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Motivo da sugestão (se houver) */}
      {sugestao && sugestao.categoria === categoriaLocal && sugestao.confianca !== 'baixa' && (
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {sugestao.motivo}
        </p>
      )}
    </div>
  );
}
