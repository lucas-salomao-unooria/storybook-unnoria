import React from 'react';
import type { UniShortsLogoVariant } from './ShortsLogoVector';

export type { UniShortsLogoVariant };

/**
 * Propriedades do logotipo do Shorts.
 */
export interface UniShortsLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Qual das duas formas publicadas usar.
   *
   * - `brand`: raio maciço vermelho com o triângulo vazado. Marca do produto.
   * - `mono`: raio em contorno monocromático. Ícone de navegação.
   *
   * @default 'brand'
   */
  variant?: UniShortsLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada da razão do `viewBox`
   * literal — o raio não é quadrado em nenhuma das duas formas.
   * @default 20
   */
  size?: number;

  /**
   * Rótulo acessível. Quando informado, o SVG recebe `role="img"` e um
   * `<title>`; quando omitido, é tratado como decorativo (`aria-hidden`), que é
   * o caso corrente — o rótulo "Shorts" costuma estar ao lado, em texto.
   */
  title?: string;

  /** Classe CSS adicional. */
  className?: string;
}
