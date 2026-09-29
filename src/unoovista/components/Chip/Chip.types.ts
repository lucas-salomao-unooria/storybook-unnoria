import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades do componente Chip do Unoovista.
 */
export interface UnvChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Ícone renderizado antes do rótulo.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Marca o chip como selecionado: preenchimento `--unv-color-action-primary` e rótulo `--unv-color-text-on-action`.
   * @default false
   */
  selected?: boolean;

  /**
   * Força o tema visual do chip. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Rótulo do chip.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
