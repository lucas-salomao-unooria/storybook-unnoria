import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Variantes semânticas do `Badge`.
 * Cada variante usa o preenchimento translúcido de 10% (`--uai-fill-*`) como
 * superfície e a cor semântica plena como texto — exceto `default`, que usa a
 * escada translúcida neutra (`--uai-fill-4`) com o texto primário.
 */
export type UaiBadgeVariant = 'default' | 'primary' | 'success' | 'error' | 'warning';

/**
 * Propriedades do componente `Badge` do Design System UnooriaAI.
 */
export interface UaiBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UaiBadgeVariant;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Rótulo do selo.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
