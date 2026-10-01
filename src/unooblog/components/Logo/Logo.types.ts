import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Composição da marca.
 * - 'lockup': “Un” + símbolo + “blog”: o símbolo é o “oo” da palavra
 * - 'mark': só o símbolo (o anel em forma de amendoim da Unooria), para espaços
 *   estreitos como o ícone do aplicativo e o avatar do blog
 */
export type UblLogoVariant = 'lockup' | 'mark';

/**
 * Tons aplicáveis ao logotipo Unooblog.
 * - 'primary': símbolo em `--ubl-color-action-primary` e letras em
 *   `--ubl-color-text-primary`; acompanha o tema
 * - 'inherit': herda `currentColor` do elemento pai, numa tinta só
 */
export type UblLogoTone = 'primary' | 'inherit';

/**
 * Propriedades do componente Logo da Unooblog.
 */
export interface UblLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Composição da marca: lockup completo ou só o símbolo.
   * @default 'lockup'
   */
  variant?: UblLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada da proporção do
   * `viewBox` (lockup 117 × 25; símbolo 100 × 49,13).
   * @default 32
   */
  height?: number;

  /**
   * Tom cromático do logotipo.
   * @default 'primary'
   */
  tone?: UblLogoTone;

  /**
   * Força o tema visual usado para resolver as variáveis de cor. Quando
   * omitido, herda o tema do contêiner ancestral por `data-ubl-theme`.
   */
  theme?: UblTheme;

  /**
   * Rótulo acessível do logotipo.
   * @default 'Unooblog'
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
