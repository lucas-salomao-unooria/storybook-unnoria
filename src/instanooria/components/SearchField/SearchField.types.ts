import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente SearchField do Instanooria.
 */
export interface InstaSearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Texto exibido quando o campo está vazio.
   * @default 'Search'
   */
  placeholder?: string;

  /**
   * Rótulo acessível do campo.
   * @default 'Buscar'
   */
  ariaLabel?: string;

  /**
   * Ação renderizada à direita do campo (ex.: leitor de nametag).
   */
  trailing?: React.ReactNode;

  /**
   * Ocupa toda a largura disponível do contêiner.
   * @default true
   */
  block?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
