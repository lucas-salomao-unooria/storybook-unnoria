import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Variantes do logotipo, lidas da instância `ChatGPTLogo` do Figma.
 * - `horizontal`: marca e wordmark lado a lado — 220 × 64 no arquivo
 * - `mark`: apenas a marca — 64,39 × 64
 * - `wordmark`: apenas o texto — 139,51 × 24
 */
export type GptLogoVariant = 'horizontal' | 'mark' | 'wordmark';

/**
 * Propriedades do componente `Logo` do Design System ChatGPT.
 */
export interface GptLogoProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  /**
   * Composição renderizada.
   * @default 'horizontal'
   */
  variant?: GptLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada da proporção do
   * `viewBox`, preservando a forma das três composições.
   * @default 64
   */
  height?: number;

  /**
   * Rótulo acessível. Quando omitido, o logotipo recebe `aria-hidden` — o
   * correto quando ele acompanha um título textual.
   * @default 'ChatGPT'
   */
  title?: string;

  /**
   * Marca o logotipo como decorativo, suprimindo o `<title>` e expondo
   * `aria-hidden`.
   * @default false
   */
  decorative?: boolean;

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
