import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `Tag` do Design System UnooriaAI.
 *
 * Cápsula com dois estados (padrão e selecionado), usada como sugestão de
 * prompt na tela de nova conversa.
 */
export interface UaiTagProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Estado de seleção. `true` aplica a superfície invertida e `aria-pressed`.
   * @default false
   */
  selected?: boolean;

  /**
   * Ícone renderizado antes do rótulo, tipicamente
   * `<Icon name="sparkle" size={16} />`.
   */
  glyph?: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Rótulo da cápsula.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
