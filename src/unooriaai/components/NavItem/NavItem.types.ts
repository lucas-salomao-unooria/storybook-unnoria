import React from 'react';
import type { UaiTheme } from '../../tokens';
import type { UaiIconName } from '../Icon/IconGlyphs';

/**
 * Estados visuais do `NavItem`.
 * - `default`: sem superfície, rótulo em `--uai-text-soft-60`
 * - `active`: superfície `--uai-fill-4`, rótulo em `--uai-text-primary`
 * - `hover`: superfície `--uai-fill-2`, rótulo em `--uai-text-soft-80`
 */
export type UaiNavItemState = 'default' | 'active' | 'hover';

/**
 * Propriedades do componente `NavItem` do Design System UnooriaAI.
 */
export interface UaiNavItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Estado visual. `hover` fixa a superfície de hover para matrizes de
   * documentação; o estado também aparece naturalmente ao passar o cursor.
   * @default 'default'
   */
  state?: UaiNavItemState;

  /**
   * Glifo arbitrário renderizado antes do rótulo. Tem precedência sobre
   * `icon`.
   */
  glyph?: React.ReactNode;

  /**
   * Nome de um ícone da biblioteca do módulo (por exemplo `chatBubble`),
   * renderizado em 16px antes do rótulo.
   */
  icon?: UaiIconName;

  /**
   * Elemento raiz renderizado — permite usar o item como âncora.
   * @default 'button'
   */
  as?: React.ElementType;

  /**
   * URL de destino quando `as` renderiza uma âncora.
   */
  href?: string;

  /**
   * Alvo de navegação quando `as` renderiza uma âncora.
   */
  target?: React.HTMLAttributeAnchorTarget;

  /**
   * Relação do link quando `as` renderiza uma âncora.
   */
  rel?: string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Rótulo da conversa.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
