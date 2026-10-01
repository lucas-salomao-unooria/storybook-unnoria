import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Composição da marca.
 * - 'lockup': “Un” + símbolo + “jornal”: o símbolo é o “oo” da palavra
 * - 'mark': só o símbolo (o anel em forma de amendoim da Unooria), para espaços
 *   estreitos como o ícone do aplicativo e o avatar da publicação
 */
export type UjnLogoVariant = 'lockup' | 'mark';

/**
 * Tons aplicáveis ao logotipo Unoojornal.
 * - 'primary': símbolo em `--ujn-color-action-primary` e letras em
 *   `--ujn-color-text-primary`; acompanha o tema
 * - 'inherit': herda `currentColor` do elemento pai, numa tinta só
 */
export type UjnLogoTone = 'primary' | 'inherit';

/**
 * Propriedades do componente Logo da Unoojornal.
 */
export interface UjnLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Composição da marca: lockup completo ou só o símbolo.
   * @default 'lockup'
   */
  variant?: UjnLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada da proporção do
   * `viewBox` (lockup 135,91 × 25; símbolo 100 × 49,13).
   * @default 32
   */
  height?: number;

  /**
   * Tom cromático do logotipo.
   * @default 'primary'
   */
  tone?: UjnLogoTone;

  /**
   * Força o tema visual usado para resolver as variáveis de cor. Quando
   * omitido, herda o tema do contêiner ancestral por `data-ujn-theme`.
   */
  theme?: UjnTheme;

  /**
   * Rótulo acessível do logotipo.
   * @default 'Unoojornal'
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
