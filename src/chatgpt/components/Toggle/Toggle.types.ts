import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `Toggle` do Design System ChatGPT.
 *
 * Reproduz o conjunto `Toggle` do Figma (propriedade `State`: `Off` e `On`).
 */
export interface GptToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'onChange' | 'children'> {
  /**
   * Estado ligado/desligado do interruptor.
   * @default false
   */
  checked?: boolean;

  /**
   * Notifica o novo estado quando o interruptor é acionado.
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Desabilita a interação.
   * @default false
   */
  disabled?: boolean;

  /**
   * Rótulo acessível — obrigatório quando não há `aria-labelledby`.
   */
  'aria-label'?: string;

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
