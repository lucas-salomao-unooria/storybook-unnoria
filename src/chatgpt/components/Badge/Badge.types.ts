import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Variantes do conjunto `Badge` do Figma (propriedade `Variant`).
 * Cada variante usa a cor semântica correspondente a 10% de opacidade como
 * superfície e a 100% como texto — exceto `default`, que usa a escada
 * translúcida neutra de 4%.
 */
export type GptBadgeVariant = 'default' | 'primary' | 'success' | 'error' | 'warning';

/**
 * Propriedades do componente `Badge` do Design System ChatGPT.
 */
export interface GptBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: GptBadgeVariant;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Rótulo do selo.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
