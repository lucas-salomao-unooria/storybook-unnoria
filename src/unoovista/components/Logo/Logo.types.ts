import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Composição da marca.
 * - 'lockup': símbolo + logotipo tipográfico “Unoovista”
 * - 'mark': só o símbolo (o infinito orgânico da Unooria), para espaços
 *   estreitos como o ícone do aplicativo e o avatar da marca
 */
export type UnvLogoVariant = 'lockup' | 'mark';

/**
 * Tons aplicáveis ao logotipo Unoovista.
 * - 'primary': símbolo em `--unv-color-action-primary` e logotipo em `--unv-color-text-primary`; acompanha o tema
 * - 'inverse': tudo em `--unv-color-text-on-media` (branco), para uso sobre mídia
 * - 'inherit': herda `currentColor` do elemento pai, numa tinta só
 */
export type UnvLogoTone = 'primary' | 'inverse' | 'inherit';

/**
 * Propriedades do componente Logo do Unoovista.
 */
export interface UnvLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Altura do logotipo em pixels. A largura é derivada da proporção do
   * `viewBox` (lockup 158,84 × 24; símbolo 100 × 54).
   * @default 28
   */
  height?: number;

  /**
   * Composição da marca: lockup completo ou só o símbolo.
   * @default 'lockup'
   */
  variant?: UnvLogoVariant;

  /**
   * Tom cromático do logotipo.
   * @default 'primary'
   */
  tone?: UnvLogoTone;

  /**
   * Força o tema visual usado para resolver as variáveis de cor. Quando
   * omitido, herda o tema do contêiner ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Rótulo acessível do logotipo.
   * @default 'Unoovista'
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
