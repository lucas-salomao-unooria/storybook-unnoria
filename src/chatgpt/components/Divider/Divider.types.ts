import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Orientação do divisor.
 */
export type GptDividerOrientation = 'horizontal' | 'vertical';

/**
 * Propriedades do componente `Divider` do Design System ChatGPT.
 */
export interface GptDividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
  /**
   * Orientação do traço.
   * @default 'horizontal'
   */
  orientation?: GptDividerOrientation;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
