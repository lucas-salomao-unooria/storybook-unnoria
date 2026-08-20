import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente Chip do Instanooria.
 */
export interface InstaChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Ícone renderizado antes do rótulo.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Marca o chip como selecionado, invertendo o contraste.
   * @default false
   */
  selected?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Rótulo do chip.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
