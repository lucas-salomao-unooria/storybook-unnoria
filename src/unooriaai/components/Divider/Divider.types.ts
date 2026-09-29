import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Orientação do divisor.
 */
export type UaiDividerOrientation = 'horizontal' | 'vertical';

/**
 * Propriedades do componente `Divider` do Design System UnooriaAI.
 */
export interface UaiDividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
  /**
   * Orientação do traço.
   * @default 'horizontal'
   */
  orientation?: UaiDividerOrientation;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
