import React from 'react';

/**
 * Variantes de composição do logotipo publicadas pelo arquivo.
 *
 * - 'full': emblema mais o logotipo tipográfico “Unootube” (109,83 × 20)
 * - 'badge': apenas o emblema arredondado, para alvos quadrados
 */
export type UniLogoVariant = 'full' | 'badge';

/**
 * Propriedades do componente Logo do Unootube.
 */
export interface UniLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Composição do logotipo.
   * @default 'full'
   */
  variant?: UniLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada do `viewBox` para
   * preservar a proporção do lockup (109,83×20 na variante completa, 28,57×20
   * na variante `badge`).
   * @default 20
   */
  height?: number;

  /**
   * Rótulo acessível. Quando omitido, o SVG é tratado como decorativo.
   * @default 'Unootube'
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
