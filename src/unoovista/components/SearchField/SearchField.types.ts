import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades do componente SearchField do Unoovista.
 */
export interface UnvSearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Texto exibido quando o campo está vazio.
   * @default 'Buscar'
   */
  placeholder?: string;

  /**
   * Nome acessível do campo.
   * @default 'Buscar'
   */
  ariaLabel?: string;

  /**
   * Ação renderizada FORA da cápsula, à direita dela (ex.: leitor do código
   * pessoal). Para uma ação só de glifo, use `TopBar.Action`.
   */
  trailing?: React.ReactNode;

  /**
   * Exibe o botão de limpar enquanto há texto no campo.
   * @default true
   */
  clearable?: boolean;

  /**
   * Nome acessível do botão de limpar.
   * @default 'Limpar busca'
   */
  clearLabel?: string;

  /**
   * Chamado depois que o botão de limpar esvazia o campo.
   */
  onClear?: () => void;

  /**
   * Ocupa toda a largura disponível do contêiner.
   * @default true
   */
  block?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral
   * por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
