import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Tons aplicáveis ao logotipo Instanooria.
 * - 'primary': acompanha `--insta-color-text-primary` (preto no Light, branco no Dark)
 * - 'inverse': sempre branco, para uso sobre mídia e fundos escuros
 * - 'inherit': herda `currentColor` do elemento pai
 */
export type InstaLogoTone = 'primary' | 'inverse' | 'inherit';

/**
 * Propriedades do componente Logo do Instanooria.
 */
export interface InstaLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Altura do logotipo em pixels. A largura é derivada da proporção original 105×28.
   * @default 28
   */
  height?: number;

  /**
   * Tom cromático do logotipo.
   * @default 'primary'
   */
  tone?: InstaLogoTone;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Rótulo acessível do logotipo.
   * @default 'Instanooria'
   */
  title?: string;

  /**
   * Marca o logotipo como decorativo, removendo-o da árvore de acessibilidade.
   * @default false
   */
  decorative?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
