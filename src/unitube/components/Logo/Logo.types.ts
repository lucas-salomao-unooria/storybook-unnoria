import React from 'react';

/**
 * Variantes de composição do logotipo publicadas pelo arquivo.
 *
 * - 'full': emblema e logotipo tipográfico, como em `Brand/YoutubeLogo` (2:88)
 * - 'badge': apenas o emblema arredondado, para alvos quadrados
 */
export type UniLogoVariant = 'full' | 'badge';

/**
 * Propriedades do componente Logo do Unitube.
 */
export interface UniLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Composição do logotipo.
   * @default 'full'
   */
  variant?: UniLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada do `viewBox` original
   * para preservar a proporção do arquivo (90×20 na variante completa).
   * @default 20
   */
  height?: number;

  /**
   * Rótulo acessível. Quando omitido, o SVG é tratado como decorativo.
   * @default 'Unitube'
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
