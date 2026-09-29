import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Composição da marca.
 * - 'horizontal': “Un” + símbolo + “ria” + “AI” — o símbolo é o “oo” da palavra
 * - 'mark': só o símbolo (o anel em forma de amendoim da Unooria), para espaços
 *   estreitos como o ícone do aplicativo e o avatar da marca
 * - 'wordmark': só o logotipo tipográfico “UnooriaAI”, com os dois “o” desenhados
 */
export type UaiLogoVariant = 'horizontal' | 'mark' | 'wordmark';

/**
 * Tons aplicáveis ao logotipo UnooriaAI.
 * - 'primary': símbolo e “AI” em `--uai-text-brand` e “Unooria” em `--uai-text-primary`; acompanha o tema
 * - 'inherit': herda `currentColor` do elemento pai, numa tinta só
 */
export type UaiLogoTone = 'primary' | 'inherit';

/**
 * Propriedades do componente `Logo` do Design System UnooriaAI.
 */
export interface UaiLogoProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  /**
   * Composição renderizada.
   * @default 'horizontal'
   */
  variant?: UaiLogoVariant;

  /**
   * Altura do logotipo em pixels. A largura é derivada da proporção do
   * `viewBox` (horizontal 121,61 × 24; logotipo tipográfico 121,52 × 24;
   * símbolo 100 × 49,13).
   * @default 32
   */
  height?: number;

  /**
   * Tom cromático do logotipo.
   * @default 'primary'
   */
  tone?: UaiLogoTone;

  /**
   * Rótulo acessível do logotipo.
   * @default 'UnooriaAI'
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
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
