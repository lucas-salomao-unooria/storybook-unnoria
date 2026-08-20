import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Orientação do divisor.
 */
export type InstaDividerOrientation = 'horizontal' | 'vertical';

/**
 * Peso visual do divisor.
 * - 'hairline': 0.33px translúcido, padrão iOS usado entre linhas de lista
 * - 'solid': 1px sólido com `--insta-color-border-default`
 */
export type InstaDividerWeight = 'hairline' | 'solid';

/**
 * Propriedades do componente Divider do Instanooria.
 */
export interface InstaDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientação do divisor.
   * @default 'horizontal'
   */
  orientation?: InstaDividerOrientation;

  /**
   * Peso visual do traço.
   * @default 'hairline'
   */
  weight?: InstaDividerWeight;

  /**
   * Recuo lateral aplicado ao divisor, em pixels.
   * @default 0
   */
  inset?: number;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
