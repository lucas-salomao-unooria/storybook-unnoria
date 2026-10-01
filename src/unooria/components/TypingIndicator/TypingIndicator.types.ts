import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do `TypingIndicator`: "o agente de IA do professor está
 * escrevendo".
 */
export interface TypingIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * O que o indicador diz. É o nome acessível (`role="status"`) e, com
   * `showLabel` ou movimento reduzido, o texto visível.
   * @default 'O agente de IA do professor está escrevendo'
   */
  label?: string;

  /**
   * Mostra o texto ao lado dos três pontos. Com `prefers-reduced-motion:
   * reduce` o texto aparece SEMPRE, e os pontos param: sem animação, o que diz
   * "está escrevendo" é a frase.
   * @default false
   */
  showLabel?: boolean;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
