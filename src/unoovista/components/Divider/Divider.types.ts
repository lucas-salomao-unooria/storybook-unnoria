import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Orientação do divisor.
 */
export type UnvDividerOrientation = 'horizontal' | 'vertical';

/**
 * Peso visual do divisor.
 * - 'hairline': fio de 1px em `--unv-color-border-subtle`, usado entre linhas de lista
 * - 'solid': fio de 1px em `--unv-color-border-default`, mais marcado
 */
export type UnvDividerWeight = 'hairline' | 'solid';

/**
 * Propriedades do componente Divider do Unoovista.
 */
export interface UnvDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientação do divisor.
   * @default 'horizontal'
   */
  orientation?: UnvDividerOrientation;

  /**
   * Peso visual do traço.
   * @default 'hairline'
   */
  weight?: UnvDividerWeight;

  /**
   * Recuo lateral aplicado ao divisor, em pixels.
   * @default 0
   */
  inset?: number;

  /**
   * Força o tema visual do divisor. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
